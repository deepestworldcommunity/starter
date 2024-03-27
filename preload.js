const { ipcRenderer } = require('electron')

/**
 * @type {MediaRecorder | undefined}
 */
let mediaRecorder
let recentDeath = false

function startRecording() {
  const canvas = document.querySelector('canvas#main-canvas')
  if (!canvas) {
    if (mediaRecorder) {
      mediaRecorder.stop()
      mediaRecorder = null
    }
    return
  }

  mediaRecorder = new MediaRecorder(canvas.captureStream(25))
  mediaRecorder.addEventListener('dataavailable', (e) => {
    if (!recentDeath) {
      return
    }
    recentDeath = false

    const blob = new Blob([e.data], { 'type': e.data.type })
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      /** @type {string} */
      const dataUrl = reader.result
      ipcRenderer.send('death-recording', dataUrl)
    })
    reader.addEventListener('error', (e) => {
      console.error('There was an error reading the video blob', e.error)
    })
    reader.readAsDataURL(blob)
  })
  mediaRecorder.addEventListener('error', (e) => {
    console.error('There was an error recording the video stream', e.error)
  })
  mediaRecorder.start()
}

class WebSocketProxy extends window.WebSocket {
  constructor(...args) {
    super(...args)

    this.addEventListener('message', (event) => {
      ipcRenderer.send('received-ws-data', event.data)

      const data = JSON.parse(event.data)
      if (data[1] === 'combat' && data[2] === 0) {
        window.setTimeout(((oldMediaRecorder) => () => {
          if (oldMediaRecorder && oldMediaRecorder.state !== 'inactive') {
            oldMediaRecorder.stop()
          }
        })(mediaRecorder), 500)

        startRecording()
      }

      if (
        data[1] === 'hit'
        && Array.isArray(data[2])
        && data[2].some((hit) => hit.target === dw?.c?.id && hit.rip === 1)
      ) {
        recentDeath = true
      }
    })
  }

  send(data) {
    ipcRenderer.send('send-ws-data', data)
    super.send(data)
  }
}

window.WebSocket = WebSocketProxy

setInterval(() => {
  if (mediaRecorder) {
    return
  }

  startRecording()
}, 100)
