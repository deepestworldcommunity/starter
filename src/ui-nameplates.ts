import { getMonsterBattleScore, getCharacterBattleScore } from './battlescore'
import { bosses } from './bosses'
import getSmoothPosition from './getSmoothPosition'
import { addMenuButton } from './ui-buttons'

const ZOOM = dw.constants.PX_PER_UNIT_ZOOMED / dw.constants.PX_PER_UNIT

const COLOR_HP = '#c55050'
const COLOR_BORDER = '#3c3c3c'
const COLOR_BACKGROUND = '#0c0c0c'

let showBattleScore = dw.get('showBattleScore') ?? false
const fontFamily = 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'

addMenuButton('💯', 'Toggle BattleScore', () => {
  showBattleScore = !showBattleScore
  dw.set('showBattleScore', showBattleScore)
})

dw.on('drawEnd', (ctx, cx, cy) => {
  for (let i = 0; i < dw.entities.length; i++) {
    const entity = dw.entities[i]
    if (entity.z !== dw.c.z) {
      continue
    }

    const smoothPosition = getSmoothPosition(entity)

    const x = dw.toCanvasX('player' in entity && entity.name === dw.c.name ? cx : smoothPosition.x)
    const y = dw.toCanvasY('player' in entity && entity.name === dw.c.name ? cy : smoothPosition.y)

    if (dw.debug) {
      const debug = `#${entity.id}`
      ctx.lineWidth = 4
      ctx.font = `${3 * ZOOM}px ${fontFamily}`
      ctx.fillStyle = 'black'
      ctx.strokeStyle = 'white'
      ctx.textAlign = 'center'
      ctx.strokeText(debug, x, y + 4)
      ctx.fillText(debug, x, y + 4)
    }

    const isGatherable =  dw.isGatherable(entity)
    if (!isGatherable && 'station' in entity && (entity.hp ?? 100) <= (entity.maxHp ?? 100) - 10) {
      ctx.lineWidth = 4
      ctx.strokeStyle = 'white'
      ctx.fillStyle = 'red'
      ctx.font = `${5 * ZOOM}px ${fontFamily}`
      ctx.textAlign = 'center'
      const hp = `${entity.hp}`
      ctx.strokeText(hp, x, y - 8)
      ctx.fillText(hp, x, y - 8)
      continue
    }

    if (isGatherable) {
      ctx.lineWidth = 4
      ctx.strokeStyle = 'blue'
      ctx.fillStyle = 'lightblue'
      ctx.font = `${5 * ZOOM}px ${fontFamily}`
      ctx.textAlign = 'center'
      const hp = `${entity.hp}`
      ctx.strokeText(hp, x, y - 8)
      ctx.fillText(hp, x, y - 8)
      continue
    }

    if ('player' in entity) {
      ctx.lineWidth = 4

      // Level
      ctx.fillStyle = dw.c.name === entity.name ? 'white' : '#00ffff'
      ctx.strokeStyle = COLOR_BORDER
      ctx.font = `${11 * ZOOM}px ${fontFamily}`
      ctx.textAlign = 'right'
      const level = `${entity.level}`
      ctx.strokeText(level, x - dw.constants.PX_PER_UNIT_ZOOMED / 2 - 4, y - dw.constants.PX_PER_UNIT_ZOOMED + 8)
      ctx.fillText(level, x - dw.constants.PX_PER_UNIT_ZOOMED / 2 - 4, y - dw.constants.PX_PER_UNIT_ZOOMED + 8)

      // Name + BattleScore?
      ctx.textAlign = 'left'
      ctx.font = `${5 * ZOOM}px ${fontFamily}`
      let name = entity.name ?? ''
      if (dw.c.name === entity.name && showBattleScore) {
        name += ` · ${getCharacterBattleScore().toLocaleString([], { maximumFractionDigits: 0 })}`
      }
      ctx.strokeText(name, x - dw.constants.PX_PER_UNIT_ZOOMED / 2, y - dw.constants.PX_PER_UNIT_ZOOMED - 5)
      ctx.fillText(name, x - dw.constants.PX_PER_UNIT_ZOOMED / 2, y - dw.constants.PX_PER_UNIT_ZOOMED - 5)

      ctx.lineWidth = 1

      // Backdrop
      ctx.fillStyle = COLOR_BACKGROUND
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED, dw.constants.PX_PER_UNIT_ZOOMED, 12)
      ctx.fill()

      // Current HP
      ctx.fillStyle = COLOR_HP
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED, dw.constants.PX_PER_UNIT_ZOOMED * (entity.hp ?? 100) / (entity.maxHp ?? 100), 8)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED, dw.constants.PX_PER_UNIT_ZOOMED, 8)
      ctx.stroke()

      // Current MP
      ctx.fillStyle = 'blue'
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED + 8, dw.constants.PX_PER_UNIT_ZOOMED * (entity.mp ?? 100) / (entity.maxMp ?? 100), 2)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED + 8, dw.constants.PX_PER_UNIT_ZOOMED, 3)
      ctx.stroke()

      continue
    }

    if ('ai' in entity) {
      const isBoss = bosses.includes(entity.type)

      ctx.lineWidth = 4

      // Level
      ctx.fillStyle = 'white'
      if (entity.bad) {
        ctx.fillStyle = 'orange'
      }
      if (entity.player) {
        ctx.fillStyle = '#00ff00'
      }
      if (entity.targetId === dw.c.id) {
        ctx.fillStyle = 'red'
      }
      ctx.strokeStyle = COLOR_BORDER
      ctx.font = `${(isBoss ? 16 : 11) * ZOOM}px ${fontFamily}`
      ctx.textAlign = 'right'
      let level = `${entity.level}`
      if (entity.tags.has('heal')) {
        level = '❤️‍🩹' + level
      }
      // if (entity.md.includes('alarm')) {
      //   level = '🔔' + level
      // }
      if (entity.profession === dw.enums.Profession.HUNTING) {
        level = '🎯' + level
      }
      ctx.strokeText(level, x - dw.constants.PX_PER_UNIT_ZOOMED / 2 - 4, y - dw.constants.PX_PER_UNIT_ZOOMED + 8)
      ctx.fillText(level, x - dw.constants.PX_PER_UNIT_ZOOMED / 2 - 4, y - dw.constants.PX_PER_UNIT_ZOOMED + 8)

      // Name + BattleScore?
      ctx.textAlign = 'left'
      ctx.font = `${(isBoss ? 6 : 5) * ZOOM}px ${fontFamily}`
      let name = entity.name ?? entity.md

      if (showBattleScore) {
        name += ` · ${getMonsterBattleScore(entity).toLocaleString([], { maximumFractionDigits: 0 })}`
      }
      ctx.strokeText(name, x - dw.constants.PX_PER_UNIT_ZOOMED / 2, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 11 : 5))
      ctx.fillText(name, x - dw.constants.PX_PER_UNIT_ZOOMED / 2, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 11 : 5))

      // Cooldown before entity starts moving/attacking
      if (entity.badCd && entity.hp === entity.maxHp && !entity.targetId) {
        const activation = Math.floor((entity.badCd - Date.now()) / 1000)
        if (activation > 0) {
          ctx.font = `${11 * ZOOM}px ${fontFamily}`
          ctx.textAlign = 'center'
          ctx.strokeText(`${activation}`, x, y - 32)
          ctx.fillText(`${activation}`, x, y - 32)
        }
      }

      ctx.lineWidth = 1

      // Backdrop
      ctx.fillStyle = COLOR_BACKGROUND
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 4 : 0), dw.constants.PX_PER_UNIT_ZOOMED, isBoss ? 12 : 8)
      ctx.fill()

      // Current shield
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 4 : 0), dw.constants.PX_PER_UNIT_ZOOMED * (entity.hps ?? 100) / (entity.maxHp ?? 100), isBoss ? 12 : 8)
      ctx.fill()

      // Current HP
      ctx.fillStyle = COLOR_HP
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 4 : 0), dw.constants.PX_PER_UNIT_ZOOMED * (entity.hp ?? 100) / (entity.maxHp ?? 100), isBoss ? 12 : 8)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 4 : 0), dw.constants.PX_PER_UNIT_ZOOMED, isBoss ? 12 : 8)
      ctx.stroke()
    }
  }
})
