const updateIntervals: number[] = []

export function addDataPanel(key: string, label: string, data: () => string, updateInterval = 1000) {
  if (!window.top) {
    return []
  }

  const container = window.top.document.querySelector('#minimap')
  if (!container) {
    return []
  }

  const panel = window.top?.document.createElement('div')!
  panel.className = 'custom-data-panel ui ui-content'
  panel.innerHTML = `<span class="text-alt">${label}</span> <span data-content="${key}"></span>`

  container.insertBefore(panel, container.firstChild)

  updateIntervals.push(window.top.setInterval(() => {
    const element = window.top?.document.querySelector(`#coords [data-content="${key}"]`)
    if (!element) {
      return
    }

    element.innerHTML = data()
  }, updateInterval))
}

function onUnload() {
  if (!window.top) {
    return
  }

  for (const interval of updateIntervals) {
    window.top.clearInterval(interval)
  }

  for (const elem of window.top.document.querySelectorAll('#minimap .custom-data-panel')) {
    elem.remove()
  }
}

window.addEventListener('unload', onUnload)
