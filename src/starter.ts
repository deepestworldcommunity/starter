const attackMode = false

function basicAttack() {
  if (!attackMode) {
    return
  }

  const target = dw.findClosestMonster()
  if (!target) {
    // No target found
    return
  }

  // Show target in game UI
  dw.setTarget(target.id)

  const skillIndex = dw.character.skills.findIndex(
    (skill) => skill && skill.md === 'attackRune'
  )
  if (skillIndex === -1) {
    // No attackRune found
    return
  }

  if (!dw.canUseSkillRange(skillIndex, target.x, target.y)) {
    // Too far away
    dw.move(target.x, target.y)
    return
  }

  if (!dw.canUseSkillCd(skillIndex) || !dw.canUseSkillCost(skillIndex)) {
    // Skill is either on cooldown or not enough resources
    return
  }

  dw.useSkill(skillIndex, target.id)
}

setInterval(basicAttack, 250)
