import killTracker from './killTracker'
import errorTracker from './errorTracker'

const startedAt = Date.now()

const panels: Record<string, { label: string, data: () => string}> = {
  'errors': {
    label: 'Errors',
    data: () => `${errorTracker.allErrors.reduce((total, { count }) => total + count, 0)}`,
  },
  'avg-level': {
    label: 'Average Level',
    data: () => killTracker.total > 0 ? `${(killTracker.levels / killTracker.total).toLocaleString([], { maximumFractionDigits: 1 })}` : '-',
  },
  'kill-rate': {
    label: 'All Kills',
    data: () => {
      const runtime = Math.max(1, Math.floor((Date.now() - startedAt) / 1000))
      return `${(killTracker.total * 60 * 60 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/h`
    },
  },
}

function addMinimapPanels() {
  if (!window.top) {
    return []
  }

  const minimap = window.top.document.querySelector('#minimap')
  if (!minimap) {
    return []
  }

  return Object.entries(panels)
    .reverse()
    .map(([key, { label }]) => {
      const panel = window.top?.document.createElement('span')!
      panel.className = 'custom-minimap-panel ui px-2 mx-05'
      panel.innerHTML = `<span class="text-alt">${label}</span> <span data-content="${key}"></span>`

      minimap.insertBefore(panel, minimap.firstChild)

      return panel
    })
}

function getMinimapPanels() {
  if (!window.top) {
    return []
  }

  const panels = [...window.top.document.querySelectorAll('#minimap .custom-minimap-panel')]

  if (panels.length > 0) {
    return panels as HTMLSpanElement[]
  }

  return addMinimapPanels()
}

function removeMinimapPanels() {
  getMinimapPanels().forEach((elem) => elem.remove())
}

function updateMinimapPanels() {
  if (!window.top) {
    return
  }

  if (getMinimapPanels().length === 0) {
    return
  }

  Object.entries(panels).forEach(([content, { data }]) => {
    const element = window.top?.document.querySelector(`#minimap [data-content="${content}"]`)
    if (!element) {
      return
    }

    element.innerHTML = data()
  })
}

window.addEventListener('unload', removeMinimapPanels)

setInterval(updateMinimapPanels, 1000)
