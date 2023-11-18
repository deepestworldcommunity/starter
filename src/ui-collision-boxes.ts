import { UI_SCALE } from './consts'

type CollisionObject = {
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
    const chunk = data[chunkName].terrain[0]

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
  if (!dw.md.items[entity.md]?.collision) {
    continue
  }

  const { w, h } = dw.md.items[entity.md]?.hitbox
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
    if (!dw.md.items[entity.md]?.collision) {
      continue
    }

    if (collisionObjects.some((o) => o.id === entity.id)) {
      continue
    }

    const { w, h } = dw.md.items[entity.md]?.hitbox
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

dw.on('drawEnd', (ctx, cx, cy) => {
  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  const transpose = (wx: number, wy: number): [number, number] => [
    mx + Math.floor((wx - cx) * UI_SCALE),
    my + Math.floor((wy - cy) * UI_SCALE),
  ]

  const collisionObjectsInCurrentLayer = collisionObjects.filter(o => o.z === dw.c.z)

  ctx.lineWidth = 2

  for (const collisionObject of collisionObjectsInCurrentLayer) {
    if (dw.c.z !== collisionObject.z) {
      continue
    }

    const [x, y] = transpose(
      collisionObject.x - collisionObject.w * 0.5,
      collisionObject.y - collisionObject.h,
    )

    if (
      x + collisionObject.w * UI_SCALE < 0
      || x > ctx.canvas.width
      || y + collisionObject.h * UI_SCALE < 0
      || y > ctx.canvas.height
    ) {
      continue
    }

    ctx.strokeStyle = collisionObject.c
    ctx.fillStyle = ctx.strokeStyle + '40'
    ctx.beginPath()
    ctx.rect(x, y, collisionObject.w * UI_SCALE, collisionObject.h * UI_SCALE)
    ctx.stroke()
    ctx.fill()
  }

  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    if ('player' in entity || dw.c.z !== entity.z || dw.md.items[entity.md]?.collision || !dw.md.items[entity.md]?.hitbox) {
      continue
    }

    const { w, h } = dw.md.items[entity.md].hitbox

    const [x, y] = transpose(
      entity.x - w * 0.5,
      entity.y - h,
    )
    ctx.strokeStyle = '#00FF00'
    ctx.fillStyle = ctx.strokeStyle + '40'
    ctx.beginPath()
    ctx.rect(x, y, w * UI_SCALE, h * UI_SCALE)
    ctx.stroke()
    ctx.fill()
  }

  ctx.strokeStyle = '#FF00FF'
  ctx.fillStyle = ctx.strokeStyle + '40'
  ctx.beginPath()
  ctx.rect(
    mx - dw.md.items.human.hitbox.w * UI_SCALE / 2,
    my - dw.md.items.human.hitbox.h * UI_SCALE,
    dw.md.items.human.hitbox.w * UI_SCALE,
    dw.md.items.human.hitbox.h * UI_SCALE,
  )
  ctx.stroke()
  ctx.fill()
})
