let attackMode = true

setInterval(function () {
  if (!attackMode) {
    return
  }

  let target = dw.findEntities((entity) => entity.id === dw.targetId).shift()

  if (!target) {
    target = dw.findClosestMonster((monster) => monster.md === 'greenGoo' && monster.r === 0)
    if (target && target.id !== dw.targetId) {
      dw.setTarget({id: target.id})
    }
  }

  if (!target) {
    console.log('No monsters nearby')
    return
  }

  const skillName = 'attack'
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
