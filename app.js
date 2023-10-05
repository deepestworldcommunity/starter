require('dotenv').config()
const esbuild = require('esbuild')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("node:path");

const tracking = require('./tracking')

/** @var {string | undefined} */
const username = process.env.DW_USERNAME
if (typeof username !== 'string') {
  console.error('set DW_USERNAME in .env file')
  process.exit(1)
}

/** @var {string | undefined} */
const password = process.env.DW_PASSWORD
if (typeof password !== 'string') {
  console.error('set DW_PASSWORD in .env file')
  process.exit(2)
}

if (!process.env.DW_CHARACTER) {
  console.error('set DW_CHARACTER in .env file')
  process.exit(3)
}

const disableTracking = process.env.DW_DISABLE_TRACKING === "true"

const characterName = process.env.DW_CHARACTER
const script = process.argv[2] ?? process.env.DW_SCRIPT ?? 'src/starter.js'

function log(...args) {
  console.log(new Date().toLocaleTimeString('en-GB'), ...args)
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

    if (!disableTracking) {
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
  })

  const win = new BrowserWindow({
    webPreferences: {
      // Prevents slowdown of script execution
      backgroundThrottling: false,

      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
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

    if (url === 'https://deepestworld.com/login') {
      await win.webContents.executeJavaScript(`
        document.querySelector("input#username").value = ${JSON.stringify(username)};
        document.querySelector("input#password").value = ${JSON.stringify(password)};
        document.querySelector("button[type=submit]").click();
      `)
      return
    }

    if (url.startsWith('https://deepestworld.com/perso/list')) {
      await win.webContents.executeJavaScript(`
        [...document.querySelectorAll("a")]
          .filter((a) => a.href.startsWith("https://deepestworld.com/game/") && a.innerHTML === ${JSON.stringify(characterName)})
          .shift()
          ?.click();
      `)
      return
    }

    if (url.startsWith('https://deepestworld.com/game/')) {
      ctx = await esbuild.context({
        entryPoints: [script],
        bundle: true,
        target: 'chrome116',
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

              log('Updating code in game')

              try {
                while (!(await win.webContents.executeJavaScript(`dw.connected`))) {
                  log(`Waiting for connection to be established`)
                  await new Promise((resolve) => setTimeout(resolve, 200))
                }

                await win.webContents.executeJavaScript(`
                  document.querySelector("#stop-code").click();
                  document.querySelector("textarea#code-editor").value = ${JSON.stringify(result.outputFiles[0].text)};
                  document.querySelector("#start-code").click();
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

      log(`Watching for file changes on ${script}`)
      await ctx.watch()
      return
    }

    log(`Unexpected url: ${url}`)
  })
}

run().catch(console.error)
