import { getMonsterBattleScore, getCharacterBattleScore } from './battlescore'
import getSmoothPosition from './getSmoothPosition'
import { BOSSES, UI_SCALE } from './consts'
import { addMenuButton } from './ui-buttons'

const icons = new Image()
icons.src = '/images/icons.png'

const COLOR_HP = '#c55050'
const COLOR_BORDER = '#3c3c3c'
const COLOR_BACKGROUND = '#0c0c0c'

let showBattleScore = dw.get('showBattleScore') ?? true

addMenuButton('💯', () => {
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
      let name = entity.md
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

      const fxs = Object.entries(entity.fx)
      let fxX = x - UI_SCALE / 2 - 34
      const fxY = y - UI_SCALE - 48 - (isBoss ? 12 : 2)
      for (let i = 0; i < fxs.length; i++) {
        const fx = fxs[i]

        if (['dmgMore', 'hpRegen', 'hpMore', 'quick', 'skull'].includes(fx[0])) {
          fxX += 34
          ctx.fillStyle = COLOR_BACKGROUND
          ctx.beginPath()
          ctx.arc(fxX + 16, fxY + 16, 16, 0, 2 * Math.PI)
          ctx.fill()
        }

        switch (fx[0]) {
          case 'dmgMore':
            drawIcon(9, 14, fxX, fxY)
            drawIcon(7, 58, fxX, fxY)
            break
          case 'hpRegen':
            drawIcon(9, 14, fxX, fxY)
            drawIcon(2, 58, fxX, fxY)
            break
          case 'hpMore':
            drawIcon(9, 14, fxX, fxY)
            drawIcon(1, 0, fxX, fxY)
            break
          case 'quick':
            drawIcon(9, 14, fxX, fxY)
            drawIcon(0, 58, fxX, fxY)
            break
          case 'skull':
            drawIcon(6, 0, fxX, fxY)
            break
          default:
            break
        }

        const fxData = fx[1]
        if (fxData && typeof fxData === 'object' && 's' in fxData && typeof fxData.s === 'number') {
          const s = `${fxData.s}`
          ctx.fillStyle = 'white'
          ctx.strokeStyle = 'black'
          ctx.strokeText(s, fxX + 24, fxY + 28)
          ctx.fillText(s, fxX + 24, fxY + 28)
        }
      }
    }
  }
})
