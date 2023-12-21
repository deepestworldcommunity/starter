import { PASSABLE_TERRAIN } from './consts'

type Breadcrumb = {
  x: number
  y: number
  z: number
  value: number
  time: number
}

let breadcrumbs = new Array<Breadcrumb>()

function getBreadcrumb(x: number, y: number, z: number) {
  const breadcrumb = breadcrumbs.find(
    (b) => b.x === x && b.y === y && b.z === z,
  )

  if (!breadcrumb) {
    return 0
  }

  return breadcrumb.value
}

export default function getBreadcrumbs() {
  const result = new Array<Pick<Breadcrumb, 'x' | 'y' | 'value'>>()

  for (let wy = Math.floor(dw.c.y - 10); wy <= dw.c.y + 10; wy++) {
    for (let wx = Math.floor(dw.c.x - 10); wx <= dw.c.x + 10; wx++) {
      const wall = dw.getTerrain(wx, wy, dw.c.z)
      const floor = dw.getTerrain(wx, wy, dw.c.z - 1)

      if (
        wall === undefined
        || floor === undefined
        || !PASSABLE_TERRAIN.includes(wall)
        || PASSABLE_TERRAIN.includes(floor)
      ) {
        continue
      }

      result.push({ x: wx, y: wy, value: getBreadcrumb(wx, wy, dw.c.z) })
    }
  }

  return result
}

function dropBreadcrumb() {
  const x = Math.floor(dw.c.x)
  const y = Math.floor(dw.c.y)
  const z = Math.floor(dw.c.z)

  breadcrumbs.forEach((b) => b.value *= 0.999)

  const breadcrumb = breadcrumbs.find(
    (b) => b.x === x && b.y === y && b.z === z,
  )

  if (breadcrumb) {
    breadcrumb.value = 1
    breadcrumb.time = Date.now()
    return
  }

  breadcrumbs.push({ x, y, z, value: 1, time: Date.now() })
}

setInterval(dropBreadcrumb, 100)
