import { PASSABLE_TERRAIN } from './consts'

export function doesIntersect(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number) {
  const bottom = (dy - cy) * (bx - ax) - (dx - cx) * (by - ay)
  if (bottom === 0) {
    return false
  }

  const tTop = (dx - cx) * (ay - cy) - (dy - cy) * (ax - cx)
  const uTop = (cy - ay) * (ax - bx) - (cx - ax) * (ay - by)

  const t = tTop / bottom
  const u = uTop / bottom

  return t >= 0 && t <= 1 && u >= 0 && u <= 1
}

export function hasLineOfSight(target: { x: number, y: number, z: number, id?: number }, px?: number, py?: number) {
  const cx = px ?? dw.c.x
  const cy = py ?? dw.c.y
  const z = dw.c.z

  if (target.z !== z) {
    // Wrong world layer
    return false
  }

  if (target.x === cx && target.y === cy) {
    // Standing on top of it
    return true
  }

  const minX = Math.min(cx, target.x)
  const maxX = Math.max(cx, target.x)
  const minY = Math.min(cy, target.y)
  const maxY = Math.max(cy, target.y)

  for (let y = Math.floor(minY); y <= maxY; y++) {
    for (let x = Math.floor(minX); x <= maxX; x++) {
      const wall = dw.getTerrain(x, y, z)
      const floor = dw.getTerrain(x, y, z - 1)

      if (wall === undefined || floor === undefined) {
        return false
      }

      if (
        PASSABLE_TERRAIN.includes(wall)
        && !PASSABLE_TERRAIN.includes(floor)
      ) {
        continue
      }

      if (doesIntersect(cx, cy, target.x, target.y, x, y, x + 1, y)) {
        return false
      }

      if (doesIntersect(cx, cy, target.x, target.y, x, y + 1, x + 1, y + 1)) {
        return false
      }

      if (doesIntersect(cx, cy, target.x, target.y, x, y, x, y + 1)) {
        return false
      }

      if (doesIntersect(cx, cy, target.x, target.y, x + 1, y + 1, x + 1, y + 1)) {
        return false
      }
    }
  }

  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    if (entity.id === target.id) {
      // Never collide with target
      continue
    }

    if (!(entity.md in dw.md.entities) || !dw.md.entities[entity.md].canCollide) {
      // Doesn't have collision
      continue
    }

    let variant = 0
    if ('v' in entity && typeof entity.v === 'number') {
      variant = entity.v
    }

    const [w, h] = dw.getHitbox(entity.md, variant)
    const x1 = entity.x - w / 2
    const x2 = entity.x + w / 2
    const y1 = entity.y - h
    const y2 = entity.y

    if (doesIntersect(cx, cy, target.x, target.y, x1, y1, x2, y1)) {
      return false
    }

    if (doesIntersect(cx, cy, target.x, target.y, x2, y1, x2, y2)) {
      return false
    }

    if (doesIntersect(cx, cy, target.x, target.y, x2, y2, x1, y2)) {
      return false
    }

    if (doesIntersect(cx, cy, target.x, target.y, x1, y2, x1, y1)) {
      return false
    }
  }

  return true
}
