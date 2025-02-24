import './ui-collision-boxes'
import './ui-nameplates'
import './ui-bad-monsters'

dw.log(`[${new Date().toLocaleTimeString()}] 🎬 Bot is starting!`)
window.addEventListener('unload', () => dw.log(`[${new Date().toLocaleTimeString()}] 🛑️ ️Bot is stopped!`))

const FONT_FAMILY = 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
const ATTACK_SKILL_INDEX = dw.c.skills.findIndex(s => s?.md?.startsWith('dmg'))
const HEAL_SKILL_INDEX = dw.c.skills.findIndex(s => s?.md?.startsWith('heal'))

function gameLoop() {
  const target = dw.findClosestEntity()

  if (!target) {
    return
  }

  if (target.id !== dw.targetId) {
    dw.setTarget(target.id)
  }

  if (!dw.c.combat && dw.c.hp < dw.c.maxHp && HEAL_SKILL_INDEX !== -1) {
    if (!dw.canUseSkill(HEAL_SKILL_INDEX, dw.c)) {
      return
    }

    dw.useSkill(HEAL_SKILL_INDEX, dw.c)
    return
  }

  if (dw.isGatherable(target)) {
    if (!dw.isInRange(-1, target)) {
      // dw.log('Not in range')
      return
    }

    if (!dw.isReady()) {
      // dw.log('Waiting for cooldown')
      return
    }

    // dw.log('Attempting to gather target')
    dw.gather(target)

    return
  }

  if (target.class === dw.enums.Class.MONSTER && ATTACK_SKILL_INDEX !== -1) {
    if (!dw.isInRange(ATTACK_SKILL_INDEX, target)) {
      // dw.log('Not in range')
      return
    }

    if (!dw.canPayCost(ATTACK_SKILL_INDEX)) {
      // dw.log('Not enough resources')
      return
    }

    if (!dw.isReady(ATTACK_SKILL_INDEX)) {
      // dw.log('Waiting for cooldown')
      return
    }

    // dw.log('Attempting to attack target')
    dw.useSkill(ATTACK_SKILL_INDEX, target)

    return
  }

  dw.log('Not sure what to do with target')
}

setInterval(gameLoop, 50)

dw.on('drawEnd', (ctx, cx, cy) => {
  const target = dw.findOneEntity((e) => e.id === dw.targetId)
  if (!target) {
    return
  }

  ctx.lineWidth = 3

  ctx.strokeStyle = '#000000'
  ctx.fillStyle = '#ffffff'
  if (dw.isGatherable(target)) {
    if (dw.isInRange(-1, target)) {
      ctx.fillStyle = '#00ff00'
    } else {
      ctx.fillStyle = '#ff0000'
    }
  } else if (target.class === dw.enums.Class.MONSTER) {
    if (dw.isInRange(ATTACK_SKILL_INDEX, target)) {
      ctx.fillStyle = '#00ff00'
    } else {
      ctx.fillStyle = '#ff0000'
    }
  }
  ctx.font = `24px ${FONT_FAMILY}`
  ctx.textAlign = 'center'
  const text = dw.distance(dw.c, target).toFixed(2)
  const x = dw.toCanvasX((cx + target.x) / 2)
  const y = dw.toCanvasY((cy + target.y) / 2)
  ctx.strokeText(text, x, y)
  ctx.fillText(text, x, y)

  ctx.strokeStyle = ctx.fillStyle
  ctx.beginPath()
  ctx.moveTo(dw.toCanvasX(cx), dw.toCanvasY(cy))
  ctx.lineTo(dw.toCanvasX(target.x), dw.toCanvasY(target.y))
  ctx.stroke()
})
