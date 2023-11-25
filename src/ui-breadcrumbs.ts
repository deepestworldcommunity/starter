import getBreadcrumbs from './breadcrumbs'
import { addMenuButton } from './ui-buttons'

let show = dw.get('showBreadcrumbs') ?? true

addMenuButton('🍞', () => {
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
    mx + Math.floor((wx - cx) * dw.constants.PIXELS_PER_UNIT),
    my + Math.floor((wy - cy) * dw.constants.PIXELS_PER_UNIT),
  ]

  ctx.lineWidth = 2
  ctx.fillStyle = '#ffff0040'

  getBreadcrumbs().forEach((breadcrumb) => {
    if (breadcrumb.value <= 0) {
      return
    }

    const [x, y] = transpose(breadcrumb.x + 0.5, breadcrumb.y + 0.5)

    ctx.beginPath()
    ctx.arc(x, y, breadcrumb.value * dw.constants.PIXELS_PER_UNIT / 2, 0, 2 * Math.PI)
    ctx.fill()
  })
})
