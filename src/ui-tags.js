const icons = new Array(3).fill(0).map((_, i) => {
  const img = new Image()
  img.src = `/images/${i}.png`
  return img
})

/** @type {Record<string, [number, number, number, number, number][]>} */
const tags = {
  'rare': [[282, 339, 11, 12, 2], [467, 345, 10, 10, 2]],
  'glitched': [[282, 326, 11, 12, 2], [497, 262, 14, 16, 0]],
  'blink': [[282, 313, 11, 12, 2], [32, 50, 13, 14, 2]],
  'shielding': [[294, 494, 11, 12, 2], [88, 123, 12, 14, 2]],
  'trample': [[294, 481, 11, 12, 2], [455, 345, 11, 10, 2]],
  'bouncy': [[294, 468, 11, 12, 2], [396, 181, 10, 10, 0]],
  'kite': [[294, 455, 11, 12, 2], [404, 381, 15, 11, 2]],
  'charge': [[294, 442, 11, 12, 2], [88, 106, 12, 16, 2]],
  'aiPower': [[294, 429, 11, 12, 2], [369, 129, 10, 10, 0]],
  'aiSpeed': [[294, 416, 11, 12, 2], [440, 345, 14, 10, 2]],
  'aiReach': [[294, 403, 11, 12, 2], [407, 129, 14, 14, 0]],
  'aiStrDef': [[294, 390, 11, 12, 2], [428, 345, 11, 10, 2]],
  'aiDexDef': [[294, 377, 11, 12, 2], [32, 35, 13, 14, 2]],
  'aiIntDef': [[294, 364, 11, 12, 2], [441, 220, 10, 8, 0]],
  'aiDef': [[294, 351, 11, 12, 2], [88, 91, 12, 14, 2]],
  'aiCrit': [[294, 338, 11, 12, 2], [50, 487, 14, 14, 0]],
  'aiBlock': [[294, 325, 11, 12, 2], [133, 93, 14, 12, 0]],
  'aiRegen': [[426, 499, 11, 12, 2], [340, 129, 9, 14, 0]],
  'projNova': [[306, 487, 11, 12, 2], [430, 220, 10, 8, 0]],
}

dw.on('drawEnd', (ctx) => {
  ctx.fillStyle = '#0c0c0c'

  for (const entity of dw.entities) {
    if (entity.z !== dw.c.z) continue
    if (!('tags' in entity)) continue

    let x = dw.toCanvasX(entity.x - 0.5)
    let y = dw.toCanvasY(entity.y - 1.5)

    for (const tag of entity.tags) {
      const imgMap = tags[tag]
      if (!imgMap) continue

      ctx.beginPath()
      ctx.arc(x, y, 16, 0, 2 * Math.PI)
      ctx.fill()
      for (const img of imgMap) {
        ctx.drawImage(icons[img[4]], img[0], img[1], img[2], img[3], x - img[2], y - img[3], img[2] << 1, img[3] << 1)
      }

      x += dw.constants.PX_PER_UNIT_ZOOMED * 0.4
    }
  }
})
