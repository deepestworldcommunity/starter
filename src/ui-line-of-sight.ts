import { hasLineOfSight } from './hasLineOfSight'
import { addMenuButton } from './ui-buttons'

let show = dw.get('showLineOfSight') ?? true

addMenuButton('👀', () => {
  show = !show
  dw.set('showLineOfSight', show)
})

dw.on('drawUnder', (ctx, cx, cy) => {
  if (!show) {
    return
  }

  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  const transpose = (wx: number, wy: number) => [
    mx + Math.floor((wx - cx) * dw.constants.PIXELS_PER_UNIT),
    my + Math.floor((wy - cy) * dw.constants.PIXELS_PER_UNIT),
  ]

  ctx.lineWidth = 4

  dw.entities.forEach((entity) => {
    if (!('ai' in entity)) {
      return
    }

    const [x, y] = transpose(entity.x, entity.y)
    ctx.strokeStyle = hasLineOfSight(entity) ? '#00ff0080' : '#ff000080'
    ctx.beginPath()
    ctx.moveTo(mx, my)
    ctx.lineTo(x, y)
    ctx.stroke()
  })
})
