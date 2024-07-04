import { addMinimapButton } from './ui-buttons'

function onClick() {
  dw.debug = !dw.debug
  dw.set('debug', dw.debug)
}

dw.debug = dw.get('debug') !== false

addMinimapButton('🐛', 'Toggle Debug', onClick)
