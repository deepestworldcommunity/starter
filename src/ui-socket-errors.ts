let lastError = ''

dw.on('*', (message, d) => {
  let data = d
  // Message payload sometimes varies and is an array instead of an object
  if (Array.isArray(data) && data[0] === message) {
    data = data.slice(1)
  }

  // Check if the message is an error message
  if (
    !data
    || typeof data !== 'object'
    || !('error' in data)
    || !data.error
    || typeof data.error !== 'string'
  ) {
    return
  }

  // Do some formatting
  const error = `"${message}": ${data.error}`

  // Only log the error if it's different from the last one, to prevent spamming
  if (error === lastError) {
    return
  }
  lastError = error

  // Log the error
  dw.log(`[${new Date().toLocaleTimeString()}] <span style="color: red">🔴 ${error}</span>`)
})

function cleanUpError() {
  lastError = ''
}

// Clean up the last error every 3 seconds,
// so will still get the same error if it's repeated
setInterval(cleanUpError, 3000)
