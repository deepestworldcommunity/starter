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
        || wall > 0
        || floor <= 0
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

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const breadcrumb = breadcrumbs.find(
        (b) => b.x === x + dx && b.y === y + dy && b.z === z,
      )

      const value = 1 / (1 + Math.abs(dx) + Math.abs(dy))

      if (breadcrumb) {
        breadcrumb.value = Math.max(breadcrumb.value, value)
        breadcrumb.time = Date.now()
        continue
      }

      breadcrumbs.push({ x: x + dx, y: y + dy, z, value, time: Date.now() })
    }
  }
}

setInterval(dropBreadcrumb, 100)
