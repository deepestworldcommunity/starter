import { xpTracker, resetXPTracker } from "./xpTracker"
import formatDuration from './formatDuration'

const SHOW_LAST_MINUTES = 60
const COLOR_XP = '#9e50c5'
const COLOR_STEP = '#ffffff' // '#329532' //'#5077c5'
const COLOR_XP_LOSS = '#c55050'
const COLOR_BACKGROUND = '#151515'

const SIBLING_SELECTOR = '#questTracker'
const ELEMENT_CLASS = 'custom-xp-tracker'

let done = false

function createXPTracker() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  const sibling = window.top.document.querySelector(SIBLING_SELECTOR)
  if (!sibling || !sibling.parentElement) {
    return
  }

  const container = window.top.document.createElement('div')!
  container.className = `${ELEMENT_CLASS} ui ui-outset-frame mb-1`
  container.style.width = '240px'
  sibling.parentElement.insertBefore(container, sibling)

  const text = window.top.document.createElement('div')!
  text.className = 'p-1'
  text.innerHTML = `
    <div class="d-flex justify-content-between small"><span class='text-alt'>XP/h</span><span data-content='xpPerHour'></span></div>
    <div class="d-flex justify-content-between small"><span class='text-alt'>XP/h - death</span><span data-content='xpPerHour2'></span></div>
    <div class="d-flex justify-content-between small"><span class='text-alt'>xpToLose</span><span data-content='xpToLose'></span></div>
    <div class="d-flex justify-content-between small"><span class='text-alt'>next step</span><span data-content='nextXPStep'></span></div>
    <div class="d-flex justify-content-between small"><span class='text-alt'>next step in</span><span data-content='nextStepIn'></span></div>
    <div class="d-flex justify-content-between small"><span class='text-alt'>level up in</span><span data-content='levelUpIn'></span></div>
<!--    <div class="d-flex justify-content-between small"><span class='text-alt'>death cost</span><span data-content='deathCost'></span></div>-->
  `
  container.insertBefore(text, container.firstChild)

  const canvas = window.top.document.createElement('canvas')!
  canvas.className = 'ui mb-2'
  canvas.style.width = '100%'
  canvas.style.height = 'auto'
  canvas.width = SHOW_LAST_MINUTES
  canvas.height = Math.floor(SHOW_LAST_MINUTES / 32 * 9)
  canvas.addEventListener('click', () => resetXPTracker())
  container.insertBefore(canvas, container.firstChild)
}

function onUnload() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  done = true

  for (const elem of window.top.document.querySelectorAll(`.${ELEMENT_CLASS}`)) {
    elem.remove()
  }
}

let xpHash = ''

function isCanvas(element: Element): element is HTMLCanvasElement {
  return element.nodeName === 'CANVAS'
}

function isSpan(element: Element): element is HTMLSpanElement {
  return element.nodeName === 'SPAN'
}

function updateXPTracker() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  const canvas = window.top.document.querySelector(`.${ELEMENT_CLASS} canvas`)
  if (!canvas || !isCanvas(canvas)) {
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const max = Math.floor(1500 * Math.pow(1.1, dw.c.level - 1))
  const recentXp = xpTracker.slice(-SHOW_LAST_MINUTES)

  const first = xpTracker[0]
  const last = xpTracker[xpTracker.length - 1]

  let xpPerHour2 = 0
  for (let i = 1; i <= xpTracker.length - 1; i++) {
    const delta = xpTracker[i] - xpTracker[i - 1]
    if (delta > 0) {
      xpPerHour2 += delta
    }
  }
  xpPerHour2 = Math.floor(xpPerHour2 / xpTracker.length * 60)

  const xpPerHour = Math.floor(Math.max(0, last - first) / xpTracker.length * 60)
  const stepSize = Math.floor(dw.constants.XP_DEATH_PENALTY * max)
  // const deathToll = Math.floor(stepSize / xpPerHour2 * 3600)
  const xpToLose = Math.floor(((dw.c.xp / max) % dw.constants.XP_DEATH_PENALTY) * max)
  const nextXPStep = stepSize // Math.ceil(stepSize - xpToLose)

  const hash  = recentXp.join('|')
  if (hash !== xpHash) {
    ctx.fillStyle = COLOR_BACKGROUND
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()

    let previousValue = recentXp[0]
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

      const stepProgress = Math.floor(((value / max) % dw.constants.XP_DEATH_PENALTY) * max) / nextXPStep

      ctx.fillStyle = COLOR_STEP
      ctx.beginPath()
      ctx.rect(i, (1 - stepProgress) * canvas.height, 1, 1)
      ctx.fill()
    }
  }
  xpHash = hash


  const updateText = (content: string, data: string) => {
    if (!window.top) {
      return
    }

    const span = window.top.document.querySelector(`.${ELEMENT_CLASS} [data-content='${content}']`)
    if (span && isSpan(span)) {
      span.innerHTML = data
    }
  }

  updateText('xpPerHour', xpPerHour.toLocaleString())
  updateText('xpPerHour2', xpPerHour2.toLocaleString())
  updateText('xpToLose', xpToLose.toLocaleString())
  updateText('nextXPStep', nextXPStep.toLocaleString())
  updateText('nextStepIn', xpPerHour > 0 ? formatDuration(Math.ceil(nextXPStep / xpPerHour * 3600), true, 1) : '')
  updateText('levelUpIn', xpPerHour > 0 ? formatDuration(Math.ceil((max - dw.c.xp) / xpPerHour * 3600), true, 1) : '')
  // updateText('deathCost', deathToll.toLocaleString())

  // if (text && isDiv(text)) {
  //   text.innerHTML = `<table class="container">
  //     <tr><td class="text-alt">XP/h</td><td class="text-end">${xpPerHour.toLocaleString()}</td></tr>
  //     <tr><td class="text-alt">XP/h - death</td><td class="text-end">${xpPerHour2.toLocaleString()}</td></tr>
  //     <tr><td class="text-alt">xpToLose</td><td class="text-end">${xpToLose.toLocaleString()}</td></tr>
  //     <tr><td class="text-alt">next step</td><td class="text-end">${nextXPStep.toLocaleString()}</td></tr>
  //     ${xpPerHour2 > 0
  //     ? `
  //         <tr>
  //           <td class="text-alt">next step in</td>
  //           <td class="text-end">${formatDuration(Math.ceil(nextXPStep / xpPerHour2 * 3600), true)}</td>
  //       `
  //     : ''}
  //     ${xpPerHour > 0
  //     ? `
  //         <tr>
  //           <td class="text-alt">level up in</td>
  //           <td class="text-end">${formatDuration(Math.ceil((max - dw.c.xp) / xpPerHour * 3600), true)}</td>
  //         </tr>
  //         <tr>
  //           <td class="text-alt">death cost</td>
  //           <td class="text-end">${formatDuration(deathToll, true)}</td>
  //         </tr>
  //       `
  //     : ''}
  //   </table>`
  // }

  if (!done) {
    window.top.requestAnimationFrame(updateXPTracker)
  }
}

createXPTracker()

if (window.top) {
  window.top.requestAnimationFrame(updateXPTracker)
}

window.addEventListener('unload', onUnload)
