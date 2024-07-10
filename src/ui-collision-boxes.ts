import { addMenuButton } from './ui-buttons'

const playerHitbox = dw.getHitbox(dw.c.md, 0)

export type CollisionObject = {
  id?: number
  ref?: string
  x: number
  y: number
  z: number
  w: number
  h: number
  c: string
}

let collisionObjects = new Array<CollisionObject>()

for (const chunkName in dw.chunks) {
  const chunk = dw.chunks[chunkName][0]

  const [z, y, x] = chunkName.split('.').map(Number)

  for (let j = 0; j < chunk.length; j++) {
    for (let i = 0; i < chunk[j].length; i++) {
      if (chunk[j][i] !== 0) {
        collisionObjects.push({
          x: x * 16 + i + 0.5,
          y: y * 16 + j + 1,
          z,
          w: 1,
          h: 1,
          c: '#000000',
          ref: chunkName,
        })
      }
    }
  }
}

dw.on('seenChunks', (data) => {
  for (const chunkName in data) {
    const chunk = data[chunkName][0]

    const [l, y, x] = chunkName.split('.').map(Number)

    for (let j = 0; j < chunk.length; j++) {
      for (let i = 0; i < chunk[j].length; i++) {
        if (l < 0 && l % 2 !== 0) {
          continue
        }

        if (chunk[j][i] !== 0) {
          collisionObjects.push({
            z: l,
            x: x * 16 + i + 0.5,
            y: y * 16 + j + 1,
            w: 1,
            h: 1,
            c: '#000000',
            ref: chunkName,
          })
        }
      }
    }

    if (dw.debug) console.log(`Added chunk ${chunkName}`)
  }
})

dw.on('unseenChunks', (chunkName) => {
  if (dw.debug) console.log(`Removed chunk ${chunkName}`)
  collisionObjects = collisionObjects.filter(o => o.ref !== chunkName)
})

for (let i = 0; i < dw.entities.length; i++) {
  const entity = dw.entities[i]
  if (!dw.mdInfo[entity.md].canCollide) {
    continue
  }

  const {w, h} = dw.getHitbox(entity.md, 'v' in entity ? entity.v : 0)
  collisionObjects.push({
    id: entity.id,
    x: entity.x,
    y: entity.y,
    z: entity.z,
    w,
    h,
    c: '#0000FF',
  })
}

dw.on('seenObjects', () => {
  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    if (!dw.mdInfo[entity.md].canCollide) {
      continue
    }

    if (collisionObjects.some((o) => o.id === entity.id)) {
      continue
    }

    const { w, h } = dw.getHitbox(entity.md, 'v' in entity ? entity.v : 0)
    collisionObjects.push({
      id: entity.id,
      x: entity.x,
      y: entity.y,
      z: entity.z,
      w,
      h,
      c: '#0000FF',
    })
  }
})

dw.on('unseenObjects', (entityIds) => {
  collisionObjects = collisionObjects.filter((obj) => !obj?.id || !entityIds.includes(obj.id))
})

let show = dw.get('showCollisionBoxes') ?? true

addMenuButton('📦', 'Toggle Collision Boxes', () => {
  show = !show
  dw.set('showCollisionBoxes', show)
})

dw.on('drawEnd', (ctx) => {
  if (!show) {
    return
  }

  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  const collisionObjectsInCurrentLayer = collisionObjects.filter(o => o.z === dw.c.z)

  ctx.lineWidth = 2

  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    const { w, h } = dw.getHitbox(entity.md, 'v' in entity ? entity.v : 0)
    const { w: pw, h: ph } = dw.getPlacebox(entity.md, 'v' in entity ? entity.v : 0)

    if (w === pw && h === ph) {
      continue
    }

    const x = dw.toCanvasX(entity.x)
    const y = dw.toCanvasY(entity.y - ph)
    ctx.strokeStyle = '#FF000080'
    ctx.fillStyle = '#FF000020'
    ctx.beginPath()
    ctx.rect(
      x - pw * dw.constants.PX_PER_UNIT_ZOOMED / 2,
      y,
      pw * dw.constants.PX_PER_UNIT_ZOOMED,
      ph * dw.constants.PX_PER_UNIT_ZOOMED,
    )
    ctx.stroke()
    ctx.fill()
  }

  for (const collisionObject of collisionObjectsInCurrentLayer) {
    if (dw.c.z !== collisionObject.z) {
      continue
    }

    const x = dw.toCanvasX(collisionObject.x - collisionObject.w / 2)
    const y = dw.toCanvasY(collisionObject.y - collisionObject.h)

    if (
      x + collisionObject.w * dw.constants.PX_PER_UNIT_ZOOMED < 0
      || x > ctx.canvas.width
      || y + collisionObject.h * dw.constants.PX_PER_UNIT_ZOOMED < 0
      || y > ctx.canvas.height
    ) {
      continue
    }

    ctx.strokeStyle = collisionObject.c
    ctx.fillStyle = ctx.strokeStyle + '40'
    ctx.beginPath()
    ctx.rect(
      x,
      y,
      collisionObject.w * dw.constants.PX_PER_UNIT_ZOOMED,
      collisionObject.h * dw.constants.PX_PER_UNIT_ZOOMED,
    )
    ctx.stroke()
    ctx.fill()
  }

  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    if (dw.c.z !== entity.z || dw.mdInfo[entity.md].isPlayer || dw.mdInfo[entity.md].canCollide) {
      continue
    }

    const { w, h } = dw.getHitbox(entity.md, 'v' in entity ? entity.v : 0)

    const x = dw.toCanvasX(entity.x)
    const y = dw.toCanvasY(entity.y - h)

    ctx.strokeStyle = '#00FF00'
    ctx.fillStyle = ctx.strokeStyle + '40'
    ctx.beginPath()
    ctx.rect(
      x - w * dw.constants.PX_PER_UNIT_ZOOMED / 2,
      y,
      w * dw.constants.PX_PER_UNIT_ZOOMED,
      h * dw.constants.PX_PER_UNIT_ZOOMED,
    )
    ctx.stroke()
    ctx.fill()
  }

  ctx.strokeStyle = '#FF00FF'
  ctx.fillStyle = ctx.strokeStyle + '40'
  ctx.beginPath()
  ctx.rect(
    mx - playerHitbox.w * dw.constants.PX_PER_UNIT_ZOOMED / 2,
    my - playerHitbox.h * dw.constants.PX_PER_UNIT_ZOOMED,
    playerHitbox.w * dw.constants.PX_PER_UNIT_ZOOMED,
    playerHitbox.h * dw.constants.PX_PER_UNIT_ZOOMED,
  )
  ctx.stroke()
  ctx.fill()
})

dw.on('drawUnder', (ctx) => {
  if (!show) {
    return
  }

  ctx.lineWidth = 2
  ctx.strokeStyle = '#FFFFFF7F'

  for (const plot of dw.a.plots) {
    if (dw.distance(dw.c.x, dw.c.y, plot.x, plot.y) > 32) {
      continue
    }

    const x = dw.toCanvasX(plot.x)
    const y = dw.toCanvasY(plot.y)

    ctx.beginPath()
    ctx.rect(
      x,
      y,
      plot.w * dw.constants.PX_PER_UNIT_ZOOMED,
      plot.h * dw.constants.PX_PER_UNIT_ZOOMED,
    )
    ctx.stroke()
  }
})
