import { getMonsterBattleScore, getCharacterBattleScore } from './battlescore'
import { bosses } from './bosses'
import getSmoothPosition from './getSmoothPosition'
import { addMenuButton } from './ui-buttons'

const ZOOM = dw.constants.PX_PER_UNIT_ZOOMED / dw.constants.PX_PER_UNIT

const icons = new Image()
icons.src = '/images/icons.png'

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
  const drawBackdrop = (x: number, y: number) => {
    ctx.fillStyle = COLOR_BACKGROUND
    ctx.beginPath()
    ctx.arc(x, y, 16, 0, 2 * Math.PI)
    // ctx.rect(x-16, y-16, 32, 32)
    ctx.fill()
  }

  const drawIcon = (i: number, j: number, x: number, y: number) => {
    ctx.drawImage(icons, i * 16, j * 16, 16, 16, x, y, 32, 32)
  }

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

    const metaData = dw.mdInfo[entity.md]
    const isGatherable =  !!metaData?.canGather || !!metaData?.canChop || !!metaData?.canMine
    if (!isGatherable && 'station' in entity && entity.hp <= entity.maxHp - 10) {
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

    if (isGatherable && 'station' in entity) {
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
      let name = entity.name
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
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED, dw.constants.PX_PER_UNIT_ZOOMED * entity.hp / entity.maxHp, 8)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED, dw.constants.PX_PER_UNIT_ZOOMED, 8)
      ctx.stroke()

      // Current MP
      ctx.fillStyle = 'blue'
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED + 8, dw.constants.PX_PER_UNIT_ZOOMED * entity.mp / entity.maxMp, 2)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED + 8, dw.constants.PX_PER_UNIT_ZOOMED, 3)
      ctx.stroke()

      continue
    }

    if ('ai' in entity) {
      const fxs = Object.entries(entity.fx).sort((a, b) => a[0].localeCompare(b[0]))
      const isBoss = bosses.includes(entity.md)

      ctx.lineWidth = 4

      // Level
      ctx.fillStyle = 'white'
      if (entity.bad) {
        ctx.fillStyle = 'orange'
      }
      if (dw.mdInfo[entity.md]?.isNpc) {
        ctx.fillStyle = '#00ff00'
      }
      if (entity.targetId === dw.c.id) {
        ctx.fillStyle = 'red'
      }
      ctx.strokeStyle = COLOR_BORDER
      ctx.font = `${(isBoss ? 16 : 11) * ZOOM}px ${fontFamily}`
      ctx.textAlign = 'right'
      let level = `${entity.level}`
      // if (entity.aiType.includes('ealer')) {
      //   level = '❤️‍🩹' + level
      // }
      // if (entity.md.includes('alarm')) {
      //   level = '🔔' + level
      // }
      if (dw.mdInfo[entity.md]?.canHunt) {
        level = '🎯' + level
      }
      ctx.strokeText(level, x - dw.constants.PX_PER_UNIT_ZOOMED / 2 - 4, y - dw.constants.PX_PER_UNIT_ZOOMED + 8)
      ctx.fillText(level, x - dw.constants.PX_PER_UNIT_ZOOMED / 2 - 4, y - dw.constants.PX_PER_UNIT_ZOOMED + 8)

      // Name + BattleScore?
      ctx.textAlign = 'left'
      ctx.font = `${(isBoss ? 6 : 5) * ZOOM}px ${fontFamily}`
      let name = dw.mdInfo[entity.md]?.name ?? entity.md

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
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 4 : 0), dw.constants.PX_PER_UNIT_ZOOMED * entity.hps / entity.maxHp, isBoss ? 12 : 8)
      ctx.fill()

      // Current HP
      ctx.fillStyle = COLOR_HP
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 4 : 0), dw.constants.PX_PER_UNIT_ZOOMED * entity.hp / entity.maxHp, isBoss ? 12 : 8)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - dw.constants.PX_PER_UNIT_ZOOMED * 0.5, y - dw.constants.PX_PER_UNIT_ZOOMED - (isBoss ? 4 : 0), dw.constants.PX_PER_UNIT_ZOOMED, isBoss ? 12 : 8)
      ctx.stroke()

      if (dw.mdInfo[entity.md]?.isMonster) {
        let fxX = x - dw.constants.PX_PER_UNIT_ZOOMED / 2
        const fxY = y - dw.constants.PX_PER_UNIT_ZOOMED - 48 - (isBoss ? 12 : 2)
        for (let i = 0; i < fxs.length; i++) {
          const fx = fxs[i]

          switch (fx[0]) {
            case 'skull':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(6, 0, fxX, fxY)
              break
            case 'merge':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(12, 59, fxX, fxY)
              break
            // this is a player only buff
            // case 'frenzy':
            //   drawBackdrop(fxX + 16, fxY + 16)
            //   drawIcon(0, 56, fxX, fxY)
            //   drawIcon(9, 14, fxX, fxY)
            //   drawIcon(0, 29, fxX, fxY)
            //   break
            case 'bloodlust':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(3, 15, fxX, fxY)
              break
            case 'moreDmgMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(7, 58, fxX, fxY)
              break
            case 'hpIncMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(1, 0, fxX, fxY)
              break
            case 'resMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(15, 11, fxX, fxY)
              break
            case 'physDmgMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(10, 1, fxX, fxY)
              break
            case 'fireDmgMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(11, 1, fxX, fxY)
              break
            case 'coldDmgMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(12, 1, fxX, fxY)
              break
            case 'elecDmgMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(13, 1, fxX, fxY)
              break
            case 'acidDmgMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(14, 1, fxX, fxY)
              break
            case 'critMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(15, 0, fxX, fxY)
              break
            case 'strDefMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(8, 0, fxX, fxY)
              break
            case 'dexDefMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(15, 1, fxX, fxY)
              break
            case 'quickMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(0, 58, fxX, fxY)
              break
            case 'hpRegenMission':
              drawBackdrop(fxX + 16, fxY + 16)
              drawIcon(9, 14, fxX, fxY)
              drawIcon(2, 58, fxX, fxY)
              break
            default:
              continue
          }

          const fxData = fx[1]
          if (fxData && typeof fxData === 'object' && 's' in fxData && typeof fxData.s === 'number') {
            const s = `${fxData.s}`
            ctx.font = `${5 * ZOOM}px ${fontFamily}`
            ctx.textAlign = 'right'
            ctx.fillStyle = 'white'
            ctx.strokeStyle = 'black'
            ctx.strokeText(s, fxX + 32, fxY + 32)
            ctx.fillText(s, fxX + 32, fxY + 32)
          }

          fxX += 34
        }
      }
    }
  }
})
