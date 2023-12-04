const tracker = {
  idle: Date.now()
}

dw.on('combat', (data) => {
  if (data === 0) {
    tracker.idle = Date.now()
  }
})

export default tracker
