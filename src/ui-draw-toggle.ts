import combatTracker from './combatTracker'
import formatDuration from './formatDuration'
import killTracker from './killTracker'
import lootTracker from './lootTracker'
import { addMenuButton } from './ui-buttons'

const startedAt = Date.now()

function getContext() {
  const canvas = window.top?.document?.querySelector('#main-canvas')
  if (!canvas || canvas.nodeName !== 'CANVAS') {
    throw new Error('Could not find canvas')
  }

  const ctx = (canvas as HTMLCanvasElement).getContext('2d')
  if (!ctx) {
    throw new Error('Could not get 2d context')
  }

  return ctx
}

addMenuButton('🎨', 'Toggle Drawing',() => {
  dw.draw = !dw.draw

  if (dw.draw) {
    return
  }

  const ctx = getContext()
  const { width, height } = ctx.canvas

  ctx.clearRect(0, 0, width, height)
})

setInterval(() => {
  if (!window.top) {
    return
  }

  let statsPanel: HTMLDivElement | null = window.top.document.querySelector('#statsPanel')

  if (dw.draw) {
    if (statsPanel) {
      statsPanel.remove()
    }
    return
  }

  if (!statsPanel) {
    const ui = window.top.document.querySelector('#ui')
    if (!ui) {
      return
    }

    statsPanel = window.top.document.createElement('div')
    statsPanel.id = 'statsPanel'
    statsPanel.className = 'position-absolute top-50 start-50 ui ui-content translate-middle'
    statsPanel.style.width = '500px'
    // statsPanel.style.background = 'gold'

    // text = `Runtime ${formatDuration(seconds, true)}`

    ui.appendChild(statsPanel)

    statsPanel.innerHTML = `<div class="ui-content2">
      <table class="table mb-0">
        <tbody>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Runtime</td>
            <td class="text-end border-0 p-0 pb-1" colspan="2" data-content="runtime"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Idle</td>
            <td class="text-end border-0 p-0 pb-1" colspan="2" data-content="idle"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1 pt-2">Average level</td>
            <td class="text-end border-0 p-0 pb-1 pt-2" data-content="kills-level"></td>
            <td class="text-end border-0 p-0 pb-1 pt-2"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Kills</td>
            <td class="text-end border-0 p-0 pb-1" data-content="kills"></td>
            <td class="text-end border-0 p-0 pb-1" data-content="kills-rate"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Skull kills</td>
            <td class="text-end border-0 p-0 pb-1" data-content="skull-kills"></td>
            <td class="text-end border-0 p-0 pb-1" data-content="skull-kills-rate"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Boss kills</td>
            <td class="text-end border-0 p-0 pb-1" data-content="boss-kills"></td>
            <td class="text-end border-0 p-0 pb-1" data-content="boss-kills-rate"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1 pt-2">Green drops</td>
            <td class="text-end border-0 p-0 pb-1 pt-2" data-content="green"></td>
            <td class="text-end border-0 p-0 pb-1 pt-2" data-content="green-rate"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Blue drops</td>
            <td class="text-end border-0 p-0 pb-1" data-content="blue"></td>
            <td class="text-end border-0 p-0 pb-1" data-content="blue-rate"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Purple drops</td>
            <td class="text-end border-0 p-0 pb-1" data-content="purple"></td>
            <td class="text-end border-0 p-0 pb-1" data-content="purple-rate"></td>
          </tr>
          <tr>
            <td class="text-alt border-0 p-0 pb-1">Orange drops</td>
            <td class="text-end border-0 p-0 pb-1" data-content="orange"></td>
            <td class="text-end border-0 p-0 pb-1" data-content="orange-rate"></td>
          </tr>
        </tbody>
      </table>
    </div>`
  }

  const runtime = Math.max(1, Math.floor((Date.now() - startedAt) / 1000))

  let stat = window.top.document.querySelector('[data-content="runtime"]')
  if (stat) {
    const seconds = Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
    stat.innerHTML = formatDuration(seconds, true)
  }

  stat = window.top.document.querySelector('[data-content="idle"]')
  if (stat) {
    const seconds = Math.max(0, Math.floor((Date.now() - combatTracker.idle) / 1000))
    stat.innerHTML = dw.character.combat ? '-' : formatDuration(seconds, true)
  }

  stat = window.top.document.querySelector('[data-content="kills-level"]')
  if (stat) {
    stat.innerHTML = killTracker.kills > 0 ? `${(killTracker.levels / killTracker.kills).toLocaleString([], { maximumFractionDigits: 1 })}` : '-'
  }

  stat = window.top.document.querySelector('[data-content="kills"]')
  if (stat) {
    stat.innerHTML = `${killTracker.kills}`
  }

  stat = window.top.document.querySelector('[data-content="kills-rate"]')
  if (stat) {
    stat.innerHTML = `${(killTracker.kills * 60 * 60 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/h`
  }

  stat = window.top.document.querySelector('[data-content="skull-kills"]')
  if (stat) {
    stat.innerHTML = `${killTracker.skullKills}`
  }

  stat = window.top.document.querySelector('[data-content="skull-kills-rate"]')
  if (stat) {
    stat.innerHTML = `${(killTracker.skullKills * 60 * 60 * 24 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/d`
  }

  stat = window.top.document.querySelector('[data-content="boss-kills"]')
  if (stat) {
    stat.innerHTML = `${killTracker.bossKills}`
  }

  stat = window.top.document.querySelector('[data-content="boss-kills-rate"]')
  if (stat) {
    stat.innerHTML = `${(killTracker.bossKills * 60 * 60 * 24 * 7 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/w`
  }

  stat = window.top.document.querySelector('[data-content="green"]')
  if (stat) {
    stat.innerHTML = `${lootTracker.green}`
  }

  stat = window.top.document.querySelector('[data-content="green-rate"]')
  if (stat) {
    stat.innerHTML = `${(lootTracker.green * 60 * 60 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/h`
  }

  stat = window.top.document.querySelector('[data-content="blue"]')
  if (stat) {
    stat.innerHTML = `${lootTracker.blue}`
  }

  stat = window.top.document.querySelector('[data-content="blue-rate"]')
  if (stat) {
    stat.innerHTML = `${(lootTracker.blue * 60 * 60 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/h`
  }

  stat = window.top.document.querySelector('[data-content="purple"]')
  if (stat) {
    stat.innerHTML = `${lootTracker.purple}`
  }

  stat = window.top.document.querySelector('[data-content="purple-rate"]')
  if (stat) {
    stat.innerHTML = `${(lootTracker.purple * 60 * 60 * 24 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/d`
  }

  stat = window.top.document.querySelector('[data-content="orange"]')
  if (stat) {
    stat.innerHTML = `${lootTracker.orange}`
  }

  stat = window.top.document.querySelector('[data-content="orange-rate"]')
  if (stat) {
    stat.innerHTML = `${(lootTracker.orange * 60 * 60 * 24 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/d`
  }
}, 1000)
