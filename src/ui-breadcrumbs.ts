import getBreadcrumbs from './breadcrumbs'
import { addMenuButton } from './ui-buttons'
import { UI_SCALE } from './ui-scale'

let show = dw.get('showBreadcrumbs') ?? true

addMenuButton('🍞', 'Toggle Breadcrumbs', () => {
  show = !show
  dw.set('showBreadcrumbs', show)
})

dw.on('drawUnder', (ctx, cx, cy) => {
  if (!show) {
    return
  }

  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  const transpose = (wx: number, wy: number): [number, number] => [
    mx + Math.floor((wx - cx) * UI_SCALE),
    my + Math.floor((wy - cy) * UI_SCALE),
  ]

  ctx.lineWidth = 2
  ctx.fillStyle = '#ffff0040'

  getBreadcrumbs().forEach((breadcrumb) => {
    if (breadcrumb.value <= 0) {
      return
    }

    const [x, y] = transpose(breadcrumb.x + 0.5, breadcrumb.y + 0.5)

    ctx.beginPath()
    ctx.arc(x, y, breadcrumb.value * UI_SCALE / 2, 0, 2 * Math.PI)
    ctx.fill()
  })
})
