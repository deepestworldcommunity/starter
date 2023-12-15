import { getMonsterBattleScore, getCharacterBattleScore } from './battlescore'
import getSmoothPosition from './getSmoothPosition'
import { BOSSES, mobNames } from './consts'
import { addMenuButton } from './ui-buttons'

const UI_SCALE = dw.constants.PIXELS_PER_UNIT

const icons = new Image()
icons.src = '/images/icons.png'

const COLOR_HP = '#c55050'
const COLOR_BORDER = '#3c3c3c'
const COLOR_BACKGROUND = '#0c0c0c'

let showBuffNames = dw.get('showBuffNames') ?? false
let showBattleScore = dw.get('showBattleScore') ?? false

addMenuButton('💪', 'Toggle Buff Names', () => {
  showBuffNames = !showBuffNames
  dw.set('showBuffNames', showBuffNames)
})

addMenuButton('💯', 'Toggle BattleScore', () => {
  showBattleScore = !showBattleScore
  dw.set('showBattleScore', showBattleScore)
})

dw.on('drawEnd', (ctx, cx, cy) => {
  const { width, height } = ctx.canvas
  const mx = width / 2
  const my = height / 2

  const transpose = (wx: number, wy: number): [number, number] => [
    mx + Math.floor((wx - cx) * UI_SCALE),
    my + Math.floor((wy - cy) * UI_SCALE),
  ]

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

    const [x, y] = transpose(
      'player' in entity && entity.name === dw.c.name ? cx : smoothPosition.x,
      'player' in entity && entity.name === dw.c.name ? cy : smoothPosition.y,
    )

    if (dw.debug) {
      const debug = `#${entity.id}`
      ctx.lineWidth = 4
      ctx.font = '10px system-ui'
      ctx.fillStyle = 'black'
      ctx.strokeStyle = 'white'
      ctx.textAlign = 'center'
      ctx.strokeText(debug, x, y)
      ctx.fillText(debug, x, y)
    }

    if ('tree' in entity || 'ore' in entity) {
      ctx.lineWidth = 4
      ctx.strokeStyle = 'blue'
      ctx.fillStyle = 'lightblue'
      ctx.font = '14px system-ui'
      ctx.textAlign = 'center'
      const hp = `${entity.hp}`
      ctx.strokeText(hp, x, y - 16)
      ctx.fillText(hp, x, y - 16)
      continue
    }

    if ('player' in entity) {
      ctx.lineWidth = 4

      // Level
      ctx.fillStyle = dw.c.name === entity.name ? 'white' : '#00ff00'
      ctx.strokeStyle = COLOR_BORDER
      ctx.font = '32px system-ui'
      ctx.textAlign = 'right'
      const level = `${entity.level}`
      ctx.strokeText(level, x - UI_SCALE / 2 - 4, y - UI_SCALE + 8)
      ctx.fillText(level, x - UI_SCALE / 2 - 4, y - UI_SCALE + 8)

      // Name + BattleScore?
      ctx.textAlign = 'left'
      ctx.font = '14px system-ui'
      let name = entity.name
      if (dw.c.name === entity.name && showBattleScore) {
        name += ` · ${getCharacterBattleScore().toLocaleString([], { maximumFractionDigits: 0 })}`
      }
      ctx.strokeText(name, x - UI_SCALE / 2, y - UI_SCALE - 5)
      ctx.fillText(name, x - UI_SCALE / 2, y - UI_SCALE - 5)


      ctx.lineWidth = 1

      // Backdrop
      ctx.fillStyle = COLOR_BACKGROUND
      ctx.beginPath()
      ctx.rect(x - UI_SCALE * 0.5, y - UI_SCALE, UI_SCALE, 8)
      ctx.fill()

      // Current HP
      ctx.fillStyle = COLOR_HP
      ctx.beginPath()
      ctx.rect(x - UI_SCALE * 0.5, y - UI_SCALE, UI_SCALE * entity.hp / entity.hpMax, 8)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - UI_SCALE * 0.5, y - UI_SCALE, UI_SCALE, 8)
      ctx.stroke()

      continue
    }

    if ('ai' in entity) {
      const fxs = Object.entries(entity.fx).sort((a, b) => a[0].localeCompare(b[0]))
      const isBoss = BOSSES.includes(entity.md)

      ctx.lineWidth = 4

      // Level
      ctx.fillStyle = 'white'
      if (entity.bad) {
        ctx.fillStyle = 'orange'
      }
      if (entity.targetId === dw.c.id) {
        ctx.fillStyle = 'red'
      }
      ctx.strokeStyle = COLOR_BORDER
      ctx.font = `${isBoss ? 48 : 32}px system-ui`
      ctx.textAlign = 'right'
      let level = `${entity.level}`
      if (entity.md.includes('ealer')) {
        level = '❤️‍🩹' + level
      }
      if (entity.md.includes('alarm')) {
        level = '🔔' + level
      }
      ctx.strokeText(level, x - UI_SCALE / 2 - 4, y - UI_SCALE + 8)
      ctx.fillText(level, x - UI_SCALE / 2 - 4, y - UI_SCALE + 8)

      // Name + BattleScore?
      ctx.textAlign = 'left'
      ctx.font = `${isBoss ? 20 : 14}px system-ui`
      let name = mobNames.find(([md, terrain]) => entity.md === md && entity.terrain === terrain)?.[2] ?? entity.md

      if (showBuffNames) {
        for (let i = 0; i < fxs.length; i++) {
          const fx = fxs[i]

          switch (fx[0]) {
            case 'dmgMore':
              name = `Fierce ${name}`
              break
            case 'hpRegen':
              name = `Regenerating ${name}`
              break
            case 'hpMore':
              name = `Healthy ${name}`
              break
            case 'quick':
              name = `Quick ${name}`
              break
            case 'skull':
              name = `Elite ${name}`
              break
            default:
              break
          }
        }
      }

      if (showBattleScore) {
        name += `· ${getMonsterBattleScore(entity).toLocaleString([], { maximumFractionDigits: 0 })}`
      }
      ctx.strokeText(name, x - UI_SCALE / 2, y - UI_SCALE - (isBoss ? 11 : 5))
      ctx.fillText(name, x - UI_SCALE / 2, y - UI_SCALE - (isBoss ? 11 : 5))

      // Cooldown before entity starts moving/attacking
      if (entity.badCd && entity.hp === entity.hpMax) {
        const activation = Math.floor((entity.badCd - Date.now()) / 1000)
        if (activation > 0) {
          ctx.font = '32px system-ui'
          ctx.textAlign = 'center'
          ctx.strokeText(`${activation}`, x, y - 32)
          ctx.fillText(`${activation}`, x, y - 32)
        }
      }

      ctx.lineWidth = 1

      // Backdrop
      ctx.fillStyle = COLOR_BACKGROUND
      ctx.beginPath()
      ctx.rect(x - UI_SCALE * 0.5, y - UI_SCALE - (isBoss ? 4 : 0), UI_SCALE, isBoss ? 12 : 8)
      ctx.fill()

      // Current HP
      ctx.fillStyle = COLOR_HP
      ctx.beginPath()
      ctx.rect(x - UI_SCALE * 0.5, y - UI_SCALE - (isBoss ? 4 : 0), UI_SCALE * entity.hp / entity.hpMax, isBoss ? 12 : 8)
      ctx.fill()

      // Border
      ctx.strokeStyle = COLOR_BORDER
      ctx.beginPath()
      ctx.rect(x - UI_SCALE * 0.5, y - UI_SCALE - (isBoss ? 4 : 0), UI_SCALE, isBoss ? 12 : 8)
      ctx.stroke()

      let fxX = x - UI_SCALE / 2
      const fxY = y - UI_SCALE - 48 - (isBoss ? 12 : 2)
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
          ctx.font = '15px system-ui'
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
})
