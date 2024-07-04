import { addMinimapButton, addMenuButton } from './ui-buttons'

function clearCanvas() {
  const canvas = window.top?.document?.querySelector('#scene')
  if (!canvas || canvas.nodeName !== 'CANVAS') {
    console.error('Could not find canvas')
    return
  }

  const ctx = (canvas as HTMLCanvasElement).getContext('2d')
  if (!ctx) {
    console.error('Could not get 2d context')
    return
  }

  const { width, height } = ctx.canvas

  ctx.clearRect(0, 0, width, height)
}

function onClick() {
  dw.draw = !dw.draw
  dw.set('draw', dw.draw)

  if (!dw.draw) {
    clearCanvas()
  }
}

dw.draw = dw.get('draw') !== false
if (!dw.draw) {
  clearCanvas()
}

addMinimapButton('🎨', 'Toggle Drawing', onClick)
