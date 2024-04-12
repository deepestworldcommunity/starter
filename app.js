const { context } = require('esbuild')
const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require("node:path");
const { versions } = require("node:process");
const { writeFile } = require('node:fs');

const config = require('./config')
const tracking = require('./tracking')

app.setPath('userData', join(__dirname, 'data'))
const chromeVersion = versions.chrome.split('.').shift()

function log(...args) {
  console.log(new Date().toLocaleTimeString('en-GB'), ...args)
}

let characterId
let character
let codeHash

function getCharacterBattleScore() {
  if (!character) {
    return 0
  }

  let maxDmg = 0
  character.skills.forEach((skill) => {
    if (!skill || /heal|shield/.test(skill.md)) {
      return
    }

    let dmg = (skill?.phys ?? 0) + (skill?.fire ?? 0) + (skill.acid ?? 0) + (skill.cold ?? 0) + (skill.elec ?? 0)
    dmg *= 1 + (skill.crit ?? 0) * ((skill.critMult ?? 1) - 1)

    if (dmg > maxDmg) {
      maxDmg = dmg
    }
  })

  // Can we use armor somehow?
  // const armor = Math.min(
  //   character.physArmor,
  //   character.fireArmor,
  //   character.coldArmor,
  //   character.acidArmor,
  //   character.elecArmor,
  // )
  //
  // const effectiveHp = (character.maxHp + 5 * character.hpRegen) / Math.max(0.25, 1 - (armor / (armor + character.level * 100)))
  //
  // return Math.sqrt(maxDmg * effectiveHp)
  return Math.sqrt(maxDmg * character.maxHp)
}

async function run() {
  await app.whenReady()

  ipcMain.on('send-ws-data', (event, data) => {
    // log('>', data)
    // event.
  })

  ipcMain.on('received-ws-data', (event, data) => {
    // log('<', data)
    const json = JSON.parse(data)
    if (!Array.isArray(json)) {
      console.error('received socket data, but expected an array')
      return
    }

    if (json[0] === 0) {
      return
    }

    if (!config.disableTracking) {
      if (json[0] === '' && json[1] === 'seenObjects') {
        tracking.onSeenObjects(json[2])
      }

      if (json[0] === '' && json[1] === 'seenChunks') {
        tracking.onSeenChunks(json[2])
      }

      if (json[0] === '' && json[1] === 'loot') {
        tracking.onLoot(json[2])
      }
    }

    if (json[0] === '' && json[1] === "auth") {
      characterId = json[2]
      log(`Got character id`, characterId)
    }

    if (json[0] === '' && json[1] === "dc") {
      log(`[Disconnect] You've got disconnected due to another login`, json[2])
    }

    if (json[0] === '' && json[1] === "callLimitDc") {
      log(`[Disconnect] You've got disconnected due to sending too many requests (call limit)`)
    }

    if (json[0] === '' && json[1] === "byteLimitDc") {
      log(`[Disconnect] You've got disconnected due to sending too big requests (byte limit)`)
    }

    if (json[0] === '' && json[1] === 'seenObjects') {
      for (let i = 0; i < json[2].length; i++) {
        if (json[2][i].id === characterId) {
          character = json[2][i]
        }
      }
    }

    if (json[0] === '' && json[1] === 'diff') {
      for (let i = 0; i < json[2].length; i++) {
        if (json[2][i].id !== characterId) {
          continue
        }

        const beforeBattleScore = getCharacterBattleScore()
        character = {...character, ...json[2][i]}
        const afterBattleScore = getCharacterBattleScore()

        if (beforeBattleScore !== afterBattleScore) {
          log(`[BattleScore] ${beforeBattleScore.toLocaleString([], { maximumFractionDigits: 0 })} -> ${afterBattleScore.toLocaleString([], { maximumFractionDigits: 0 })}`)
        }
      }
    }
  })

  ipcMain.on('death-recording', (event, dataUrl) => {
    if (!config.recordDeaths) {
      if (!config.hideHints) {
        log('Death detected, but recording is disabled, enable via DW_RECORD_DEATHS=true or hide this hint via DW_HIDE_HINTS=true')
      }
      return
    }

    const contentStartsAt = dataUrl.indexOf('base64,') + 7
    writeFile(
      `./recordings/${new Date().toISOString().substring(0, 19)}.mp4`,
      Buffer.from(dataUrl.substring(contentStartsAt), 'base64'),
      (err) => {
        if (err) {
          console.error('error writing recording', err)
        }
      }
    )
  })

  const win = new BrowserWindow({
    webPreferences: {
      // Prevents slowdown of script execution
      backgroundThrottling: false,

      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  })

  let ctx

  await win.loadURL('https://deepestworld.com/')

  await win.webContents.executeJavaScript(`
    [...document.querySelectorAll('a.nav-link')]
      .filter((a) => a.innerHTML === 'Log In')
      .shift()
      ?.click();
  `)

  win.webContents.on('did-navigate', async (event, url) => {
    if (ctx) {
      log(`Pausing file watcher`)
      await ctx.dispose()
    }

    if (url.startsWith('https://deepestworld.com/login')) {
      await win.webContents.executeJavaScript(`
        document.querySelector("input#username").value = ${JSON.stringify(config.username)};
        document.querySelector("input#password").value = ${JSON.stringify(config.password)};
        document.querySelector("button[type=submit]").click();
      `)
      return
    }

    if (url === 'https://deepestworld.com/') {
      await win.webContents.executeJavaScript(`
        [...document.querySelectorAll('a')]
          .filter((a) => a.innerHTML === 'Play Now')
          .shift()
          ?.click();
      `)
      return
    }

    if (url === 'https://deepestworld.com/game') {
      while (!(await win.webContents.executeJavaScript(`
        !!document.querySelector("div[data-click='playGame']");
      `))) {
        log(`Waiting for play game button to appear`)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      log(`Entering game`)
      await win.webContents.executeJavaScript(`
        document.querySelector("div[data-click='playGame']").click();
      `)

      await new Promise((resolve) => setTimeout(resolve, 200))

      ctx = await context({
        entryPoints: [config.script],
        bundle: true,
        target: `chrome${chromeVersion}`,
        plugins: [{
          name: 'watch-plugin',
          setup: (build) => {
            build.onEnd(async (result) => {
              if (result.errors.length > 0) {
                result.errors.map((message) => {
                  console.error(message)
                })
                return
              }

              result.warnings.map((message) => {
                console.warn(message)
              })

              if (codeHash === result.outputFiles[0].hash) {
                log(`Code unchanged`)
                return
              }

              codeHash = result.outputFiles[0].hash

              log('Updating code in game')

              try {
                while (!(await win.webContents.executeJavaScript(`!!dw.c`))) {
                  log(`Waiting for connection to be established`)
                  await new Promise((resolve) => setTimeout(resolve, 200))
                }

                await win.webContents.executeJavaScript(`
                  document.querySelector("[data-click='stopCode']").click();
                  dw.editor.session.setValue(${JSON.stringify(result.outputFiles[0].text)});
                  document.querySelector("[data-click='startCode']").click();
                `)

                log(`Code updated`)
              } catch (err) {
                log(`An error occurred while updating the code`)
                console.error(err)
              }
            })
          }
        }],
        write: false,
      })

      log(`Watching for file changes on ${config.script}`)
      await ctx.watch()
      return
    }

    log(`Unexpected url: ${url}`)
  })
}

run().catch(console.error)
