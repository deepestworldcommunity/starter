dw.on('drawUnder', (ctx) => {
  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    if (!('ai' in entity) || entity.z !== dw.c.z || !!entity.targetId) {
      continue
    }

    const x = dw.toCanvasX(entity.x)
    const y = dw.toCanvasY(entity.y)

    let dx = entity.dx ?? 0
    let dy = entity.dy ?? 1
    const dLength = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    dx *= (entity.moveSpeed ?? 0.25) / dLength
    dy *= (entity.moveSpeed ?? 0.25) / dLength

    const tx = dw.toCanvasX(entity.x + dx)
    const ty = dw.toCanvasY(entity.y + dy)

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

    if (!entity.bad || entity.class !== dw.enums.Class.MONSTER) {
      continue
    }

    ctx.beginPath()
    if (entity.dx !== undefined && entity.dy !== undefined) {
      const angle = Math.atan2(entity.dy, entity.dx)
      ctx.fillStyle = '#ff000040'
      ctx.arc(x, y, 3 * dw.constants.PX_PER_UNIT_ZOOMED, angle - Math.PI / 2, angle + Math.PI / 2)
    } else {
      ctx.fillStyle = '#ffff0040'
      ctx.arc(x, y, 3 * dw.constants.PX_PER_UNIT_ZOOMED, 0, Math.PI * 2)
    }
    ctx.fill()
  }
})
