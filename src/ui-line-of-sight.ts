import { hasLineOfSight } from './hasLineOfSight'
import { addMenuButton } from './ui-buttons'
import { UI_SCALE } from './ui-scale'

let show = dw.get('showLineOfSight') ?? true

addMenuButton('👀', 'Toggle Line of Sight', () => {
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
    mx + Math.floor((wx - cx) * UI_SCALE),
    my + Math.floor((wy - cy) * UI_SCALE),
  ]

  ctx.lineWidth = 4

  dw.entities.forEach((entity) => {
    if (entity.z !== dw.c.z) {
      return
    }

    if (
      !('ai' in entity)
      && !dw.md.entities[entity.md].canChop
      && !dw.md.entities[entity.md].canGather
      && !dw.md.entities[entity.md].canMine
    ) {
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
