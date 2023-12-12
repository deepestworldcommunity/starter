import { addMenuButton } from './ui-buttons'

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
