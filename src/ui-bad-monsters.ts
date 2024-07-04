import { UI_SCALE } from './ui-scale'

dw.on('drawUnder', (ctx, cx, cy) => {
  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  const transpose = (wx: number, wy: number) => [
    mx + Math.floor((wx - cx) * UI_SCALE),
    my + Math.floor((wy - cy) * UI_SCALE),
  ]

  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    if (!('ai' in entity) || entity.z !== dw.c.z || !!entity.targetId) {
      continue
    }

    const [x, y] = transpose(
      entity.x,
      entity.y,
    )

    let dx = entity.dx ?? 0
    let dy = entity.dy ?? 1
    const dLength = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    dx *= entity.moveSpeed / dLength
    dy *= entity.moveSpeed / dLength

    const [tx, ty] = transpose(
      entity.x + dx,
      entity.y + dy,
    )

    ctx.lineWidth = 4
    ctx.strokeStyle = '#ff0000'
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(tx, ty)
    const headLength = 10
    const tdx = tx - x
    const tdy = ty - y
    const tAngle = Math.atan2(tdy, tdx)
    ctx.lineTo(tx - headLength * Math.cos(tAngle - Math.PI / 6), ty - headLength * Math.sin(tAngle - Math.PI / 6))
    ctx.moveTo(tx, ty)
    ctx.lineTo(tx - headLength * Math.cos(tAngle + Math.PI / 6), ty - headLength * Math.sin(tAngle + Math.PI / 6))
    ctx.stroke()

    if (!entity.bad || !dw.md.entities[entity.md].isMonster) {
      continue
    }

    if (entity.dx === undefined || entity.dy === undefined) {
      ctx.beginPath()
      ctx.fillStyle = '#ffff0040'
      ctx.arc(x, y, 3 * UI_SCALE, 0, Math.PI * 2)
      ctx.fill()
    }

    if (entity.dx !== undefined && entity.dy !== undefined) {
      const angle = Math.atan2(entity.dy, entity.dx)
      ctx.beginPath()
      ctx.fillStyle = '#ff000040'
      ctx.arc(x, y, 3 * UI_SCALE, angle - Math.PI / 2, angle + Math.PI / 2)
      ctx.fill()
    }
  }
})
