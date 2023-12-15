const tracker = {
  idle: Date.now(),
  totalIdleTime: 0,
  deaths: 0,
}

dw.on('combat', (data) => {
  const now = Date.now()
  if (data === 0) {
    tracker.idle = now
  }

  if (data === 1) {
    tracker.totalIdleTime += now - tracker.idle
  }
})

dw.on('hit', (hits) => {
  hits
    .filter((hit) => !!hit.rip && hit.target === dw.c.id)
    .forEach(() => {
      tracker.deaths++
    })
})

export default tracker
