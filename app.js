const fs = require('node:fs')
const crypto = require('node:crypto')

require('dotenv').config()
const { app, BrowserWindow } = require('electron')

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

if (process.argv.length < 3) {
  console.error('Missing character name')
  console.error('  npm start <charactername> [<script>]')
  process.exit(3)
}

const characterName = process.argv[2]
const script = process.argv[3] ?? './starter.js'

/**
 * @param {string} data
 * @returns {string}
 */
function md5(data) {
  return crypto.createHash('md5').update(data).digest("hex")
}

async function run() {
  await app.whenReady()

  const win = new BrowserWindow({
    webPreferences: {
      // Prevents slowdown of script execution
      backgroundThrottling: false,
    },
  })

  await win.loadURL('https://deepestworld.com/')

  await win.webContents.executeJavaScript(`
    [...document.querySelectorAll('a.nav-link')]
      .filter((a) => a.innerHTML === 'Login')
      .shift()
      ?.click();
  `)

  win.webContents.on('did-navigate', async (event, url) => {
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
      return
    }

    console.log(`Unexpected url: ${url}`)
  })

  console.log(`Watching for file changes on ${script}`)

  let md5Previous = ''
  let fsWait = false
  fs.watch(script, (event, filename) => {
    if (!filename || fsWait) {
      return
    }

    fsWait = true
    setTimeout(() => {
      fsWait = false
    }, 100)

    const fileContent = fs.readFileSync(script).toString()
    const md5Current = md5(fileContent)
    if (md5Current === md5Previous) {
      return
    }

    md5Previous = md5Current
    console.log(`${filename} changed`)

    win.webContents.executeJavaScript(`
      document.querySelector("#stop-code").click();
      document.querySelector("textarea#code-editor").value = ${JSON.stringify(fileContent)};
      document.querySelector("#start-code").click();
    `)
  })
}

run().catch(console.error)
