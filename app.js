require('dotenv').config()
const esbuild = require('esbuild')
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
const script = process.argv[3] ?? './src/starter.js'

async function run() {
  await app.whenReady()

  const win = new BrowserWindow({
    webPreferences: {
      // Prevents slowdown of script execution
      backgroundThrottling: false,
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
      console.log('Pausing file watcher')
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
        plugins: [{
          name: 'watch-plugin',
          setup: build => {
            build.onEnd((result) => {
              if (result.errors.length > 0) {
                result.errors.map((message) => {
                  console.error(message)
                })
                return
              }

              result.warnings.map((message) => {
                console.warn(message)
              })

              console.log('Updating code in game')

              win.webContents.executeJavaScript(`
            document.querySelector("#stop-code").click();
            document.querySelector("textarea#code-editor").value = ${JSON.stringify(result.outputFiles[0].text)};
            document.querySelector("#start-code").click();
          `)
            })
          }
        }],
        write: false,
      })

      console.log(`Watching for file changes on ${script}`)
      await ctx.watch()
      return
    }

    console.log(`Unexpected url: ${url}`)
  })
}

run().catch(console.error)
