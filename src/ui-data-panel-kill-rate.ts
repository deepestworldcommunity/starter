import killTracker from './killTracker'
import { addDataPanel } from './ui-data-panel'

const startedAt = Date.now()

addDataPanel(
  'kill-rate',
  'All Kills',
  () => {
    const runtime = Math.max(1, Math.floor((Date.now() - startedAt) / 1000))
    return `${(killTracker.total * 60 * 60 / runtime).toLocaleString([], { maximumFractionDigits: 0 })}/h`
  },
)
