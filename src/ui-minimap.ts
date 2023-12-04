import { PASSABLE_TERRAIN } from './consts'

const RANGE = 15

const TOP = 40
const RIGHT = 8

dw.on('drawEnd', (ctx) => {
  const { width } = ctx.canvas

  const size = 8 * (2 * RANGE + 1)

  ctx.lineWidth = 2
  ctx.fillStyle = '#151515e6'
  ctx.strokeStyle = '#3c3c3c'
  ctx.beginPath()
  ctx.rect(width - RIGHT - size - 1, TOP, size+2, size+2)
  ctx.fill()
  ctx.stroke()

  const ez = Math.floor(dw.c.z)
  const ey = Math.floor(dw.c.y)
  const ex = Math.floor(dw.c.x)
  for (let dy = -RANGE; dy < RANGE; dy++) {
    for (let dx = -RANGE; dx < RANGE; dx++) {
      const terrain = dw.getTerrain(ex+dx, ey+dy, ez)
      const terrainBelow = dw.getTerrain(ex+dx, ey+dy, ez - 1)
      if (!PASSABLE_TERRAIN.includes(terrain)) {
        ctx.fillStyle = '#000000'
      } else {
        switch (terrainBelow) {
          case dw.constants.TERRAIN_WATER:
            ctx.fillStyle = '#00ffff'
            break
          case dw.constants.TERRAIN_EMPTY:
            ctx.fillStyle = '#ff00ff'
            break
          case dw.constants.TERRAIN_GRASS:
            ctx.fillStyle = '#228b22'
            break
          case dw.constants.TERRAIN_DIRT:
            ctx.fillStyle = '#9b7653'
            break
          case dw.constants.TERRAIN_DESERT:
            ctx.fillStyle = '#edc9af'
            break
          case dw.constants.TERRAIN_UNDERWATER:
            ctx.fillStyle = '#376eff'
            break
          case dw.constants.TERRAIN_WINTER:
            ctx.fillStyle = '#f4fbe4'
            break
          case dw.constants.TERRAIN_CLOUD:
            ctx.fillStyle = 'lightblue'
            break
          default:
            ctx.fillStyle = '#dddddd'
            break
        }
      }

      ctx.beginPath()
      ctx.rect(
        width - RIGHT - size / 2 - 1 + dx * 8,
        TOP + size / 2 + dy * 8,
        8,
        8,
      )
      ctx.fill()
    }
  }

  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.rect(width - RIGHT - size / 2 - 1, TOP + size / 2, 8, 8)
  ctx.fill()
})
