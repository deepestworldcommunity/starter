import killTracker from './killTracker'
import { addDataPanel } from './ui-data-panel'

addDataPanel(
  'avg-level',
  'Average Level',
  () => killTracker.total > 0 ? `${(killTracker.levels / killTracker.total).toLocaleString([], { maximumFractionDigits: 1 })}` : '-',
)
