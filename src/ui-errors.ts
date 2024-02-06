import errorTracker from './errorTracker'

dw.on('drawEnd', (ctx, cx, cy) => {
  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  const transpose = (wx: number, wy: number): [number, number] => [
    mx + Math.floor((wx - cx) * dw.constants.PIXELS_PER_UNIT),
    my + Math.floor((wy - cy) * dw.constants.PIXELS_PER_UNIT),
  ]

  for (let i = 0; i < errorTracker.lastErrors.length; i++) {
    const error = errorTracker.lastErrors[i]
    const message = `${error.message}: ${error.error}`
    ctx.lineWidth = 4
    ctx.font = '32px system-ui'
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'black'
    ctx.textAlign = 'center'
    ctx.strokeText(message, mx, my / 3 + i * 40)
    ctx.fillText(message, mx, my / 3 + i * 40)
  }
})


