import { hasLineOfSight } from './hasLineOfSight'
import { addMenuButton } from './ui-buttons'

let show = dw.get('showLineOfSight') ?? true

addMenuButton('👀', 'Toggle Line of Sight', () => {
  show = !show
  dw.set('showLineOfSight', show)
})

dw.on('drawUnder', (ctx) => {
  if (!show) {
    return
  }

  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  ctx.lineWidth = 4

  dw.entities.forEach((entity) => {
    if (entity.z !== dw.c.z) {
      return
    }

    if (
      !dw.mdInfo[entity.md].ai
      && !dw.mdInfo[entity.md].canChop
      && !dw.mdInfo[entity.md].canGather
      && !dw.mdInfo[entity.md].canMine
    ) {
      return
    }

    const x = dw.toCanvasX(entity.x)
    const y = dw.toCanvasY(entity.y)
    ctx.strokeStyle = hasLineOfSight(entity) ? '#00ff0080' : '#ff000080'
    ctx.beginPath()
    ctx.moveTo(mx, my)
    ctx.lineTo(x, y)
    ctx.stroke()
  })
})
