function onLoad() {
  if (!window.top) {
    return
  }

  const minimap = window.top.document.querySelector('#minimap') as HTMLElement | null
  if (minimap) {
    minimap.style.width = '240px'
  }

  const minimapCanvas = window.top.document.querySelector('#minimap-canvas') as HTMLElement | null
  if (minimapCanvas) {
    minimapCanvas.style.width = '100%'
  }
}

function onUnload() {
  if (!window.top) {
    return
  }

  const minimap = window.top.document.querySelector('#minimap')
  if (minimap) {
    minimap.removeAttribute('style')
  }

  const minimapCanvas = window.top.document.querySelector('#minimap-canvas')
  if (minimapCanvas) {
    minimapCanvas.removeAttribute('style')
  }
}

onLoad()
window.addEventListener('unload', onUnload)
