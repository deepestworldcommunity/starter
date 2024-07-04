import errorTracker from './errorTracker'

dw.on('drawEnd', (ctx) => {
  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  for (let i = 0; i < errorTracker.lastErrors.length; i++) {
    const error = errorTracker.lastErrors[i]
    const message = `${error.message}: ${error.error}`
    ctx.lineWidth = 4
    ctx.font = '32px SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'black'
    ctx.textAlign = 'center'
    ctx.strokeText(message, mx, my / 3 + i * 40)
    ctx.fillText(message, mx, my / 3 + i * 40)
  }
})


