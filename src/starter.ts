const attackMode = false

setInterval(function () {
  if (!attackMode) {
    return
  }

  let target = dw.findEntities((entity) => entity.id === dw.targetId).shift()

  // Target it on a different layer
  if (target && target.l !== dw.c.l) {
    target = undefined
  }

  if (!target) {
    target = dw.findClosestMonster((monster) => monster.md === 'goo' && monster.r === 0)
    if (target && target.id !== dw.targetId) {
      dw.setTarget({id: target.id})
    }
  }

  if (!target) {
    console.log('No monsters nearby')
    return
  }

  const skillName = 'attackRune'
  const skill = dw.character.skills.find((s) => s && s.md === skillName)
  if (!skill) {
    console.error(`No skill named "${skillName}" found in skill bag`)
    return
  }

  const distance = dw.distance(dw.character, target)
  if (distance > skill.range) {
    // Walk half the distance
    dw.move(
      (dw.character.x + target.x) / 2,
      (dw.character.y + target.y) / 2,
    )
    return
  }

  if (!dw.isSkillReady(skillName)) {
    return
  }

  dw.useSkill(skillName, {id: target.id})
}, 1000 / 4)
