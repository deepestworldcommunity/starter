import { xpTracker } from "./xpTracker"
import formatDuration from './formatDuration'

const SHOW_LAST_MINUTES = 120
const COLOR_XP = '#5050c5'
const COLOR_XP_LOSS = '#c55050'
const COLOR_BACKGROUND = '#151515'

const CONTAINER_SELECTOR = '#minimap'
const ELEMENT_CLASS = 'custom-xp-tracker'
const ELEMENT_SELECTOR = `${CONTAINER_SELECTOR} .${ELEMENT_CLASS}`

let done = false

function createXPTracker() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  const container = window.top.document.querySelector(CONTAINER_SELECTOR)
  if (!container) {
    return []
  }

  const text = window.top.document.createElement('div')!
  text.className = `${ELEMENT_CLASS} ui ui-content mt-1`
  container.insertBefore(text, container.firstChild)

  const canvas = window.top.document.createElement('canvas')!
  canvas.className = `${ELEMENT_CLASS} ui mt-2`
  canvas.style.width = '100%'
  canvas.style.height = 'auto'
  canvas.width = SHOW_LAST_MINUTES
  canvas.height = Math.floor(SHOW_LAST_MINUTES / 32 * 9)
  container.insertBefore(canvas, container.firstChild)
}

function onUnload() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  done = true

  for (const elem of window.top.document.querySelectorAll(ELEMENT_SELECTOR)) {
    elem.remove()
  }
}

let xpHash = ''

function isCanvas(element: Element): element is HTMLCanvasElement {
  return element.nodeName === 'CANVAS'
}

function isDiv(element: Element): element is HTMLDivElement {
  return element.nodeName === 'DIV'
}

function updateXPTracker() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  const [canvas, text] = window.top.document.querySelectorAll(ELEMENT_SELECTOR)
  if (!canvas || !isCanvas(canvas)) {
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const max = Math.floor(1500 * Math.pow(1.1, dw.c.level - 1))
  const recentXp = xpTracker.slice(-SHOW_LAST_MINUTES)
  const hash  = recentXp.join('|')
  if (hash !== xpHash) {
    ctx.fillStyle = COLOR_BACKGROUND
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()

    let previousValue = max
    for (const [i, value] of recentXp.entries()) {
      let height = Math.floor(value / max * canvas.height)
      let fillStyle =  COLOR_XP
      if (previousValue > value) {
        height = canvas.height
        fillStyle = COLOR_XP_LOSS
      }

      ctx.fillStyle = fillStyle
      ctx.beginPath()
      ctx.rect(i, canvas.height - height, 1, height)
      ctx.fill()

      previousValue = value
    }
  }
  xpHash = hash

  const first = xpTracker[0]
  const last = xpTracker[xpTracker.length - 1]
  const xpPerHour = Math.floor(Math.max(0, last -first) / xpTracker.length * 60)

  if (text && isDiv(text)) {
    text.innerHTML = `<table class="container">
      <tr><td class="text-alt">XP/h</td><td class="text-end">${xpPerHour.toLocaleString()}</td></tr>
      ${xpPerHour > 0 ? `<tr><td class="text-alt">level up in</td><td class="text-end">${formatDuration(Math.ceil((max - dw.c.xp) / xpPerHour * 3600), true)}</td></tr>` : ''}
    </table>`
  }

  if (!done) {
    window.top.requestAnimationFrame(updateXPTracker)
  }
}

createXPTracker()

if (window.top) {
  window.top.requestAnimationFrame(updateXPTracker)
}

window.addEventListener('unload', onUnload)
