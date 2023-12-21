import { addMenuButton } from './ui-buttons'


function clearCanvas() {
  const canvas = window.top?.document?.querySelector('#main-canvas')
  if (!canvas || canvas.nodeName !== 'CANVAS') {
    throw new Error('Could not find canvas')
  }

  const ctx = (canvas as HTMLCanvasElement).getContext('2d')
  if (!ctx) {
    throw new Error('Could not get 2d context')
  }

  const { width, height } = ctx.canvas

  ctx.clearRect(0, 0, width, height)
}

addMenuButton('🎨', 'Toggle Drawing',() => {
  dw.draw = !dw.draw
  dw.set('draw', dw.draw)

  if (!dw.draw) {
    clearCanvas()
  }
})

dw.draw = dw.get('draw') !== false
if (!dw.draw) {
  clearCanvas()
}
