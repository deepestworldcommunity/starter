const { ipcRenderer } = require('electron')

class WebSocketProxy extends window.WebSocket {
  constructor(...args) {
    super(...args)

    this.addEventListener('message', (event) => {
      ipcRenderer.send('received-ws-data', event.data)
    })
  }

  send(data) {
    ipcRenderer.send('send-ws-data', data)
    super.send(data)
  }
}

window.WebSocket = WebSocketProxy
