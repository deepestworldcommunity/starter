const VIEW_DISTANCE_X = 10
const VIEW_DISTANCE_Y = 6
const dx = 1
const dy = 1

dw.on('drawUnder', (ctx, cx, cy) => {
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'white'
  ctx.textAlign = 'center'
  ctx.font = `${Math.min(dx, dy) * 24}px system-ui`

  const fcx = Math.floor(cx)
  const fcy = Math.floor(cy)

  for (let y = fcy - VIEW_DISTANCE_Y; y < cy + VIEW_DISTANCE_Y; y += dy) {
    for (let x = fcx - VIEW_DISTANCE_X; x < cx + VIEW_DISTANCE_X; x += dx) {
      ctx.strokeRect(
        dw.toCanvasX(x),
        dw.toCanvasY(y),
        dx * dw.constants.PX_PER_UNIT_ZOOMED,
        dy * dw.constants.PX_PER_UNIT_ZOOMED,
      )

      ctx.fillText(
        `${x - fcx},${y - fcy}`,
        dw.toCanvasX(x) + dx * dw.constants.PX_PER_UNIT_ZOOMED / 2,
        dw.toCanvasY(y) + dy * dw.constants.PX_PER_UNIT_ZOOMED / 2 + 8,
      )
    }
  }
})
