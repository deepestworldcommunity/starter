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

  if (!dw.isSkillInRange(skillIndex, target.x, target.y)) {
    // Too far away
    dw.move(target.x, target.y)
    return
  }

  if (!dw.isSkillReady(skillIndex)) {
    // Skill is on cooldown
    return
  }

  dw.useSkill(skillIndex, target.id)
}

setInterval(basicAttack, 250)
