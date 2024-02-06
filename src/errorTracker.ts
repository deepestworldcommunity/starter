const tracker = {
  lastErrors: new Array<{
    message: string
    error: string
    timestamp: number
  }>(),
  allErrors: new Array<{
    message: string
    error: string
    count: number
  }>(),
}

dw.on('*', (message, d) => {
  let data = d
  if (Array.isArray(data) && data[0] === message) {
    data = data.slice(1)
  }

  if (!data || typeof data !== 'object' || !('error' in data) || !data.error || typeof data.error !== 'string') {
    return
  }

  const error = data.error

  while (tracker.lastErrors.length >= 3) {
    tracker.lastErrors.shift()
  }
  tracker.lastErrors.push({ timestamp: Date.now(), message, error: error})

  const existingError = tracker.allErrors.find((e) => e.message === message && e.error === error)
  if (existingError) {
    existingError.count++
    return
  }

  tracker.allErrors.push({ message, error, count: 1 })
})

function cleanUpErrors() {
  const now = Date.now()
  while (tracker.lastErrors.length > 0 && now - tracker.lastErrors[0].timestamp > 3000) {
    tracker.lastErrors.shift()
  }
}

setInterval(cleanUpErrors, 1000)

export default tracker
