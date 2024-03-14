import errorTracker from './errorTracker'
import { addDataPanel } from './ui-data-panel'

addDataPanel(
  'errors',
  'Errors',
  () => `${errorTracker.allErrors.reduce((total, { count }) => total + count, 0)}`,
)
