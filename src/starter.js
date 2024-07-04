const attackMode = false

async function basicAttack() {
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

  let runeMd = 'attackRune'
  if (dw.c.gear.mainHand) {
    const weaponTags = dw.mdInfo[dw.c.gear.mainHand?.md]?.tags
    if (weaponTags instanceof Set && weaponTags?.has(dw.enums.Tag.RANGED)) {
      runeMd = 'rangedRune'
    }

    if (weaponTags instanceof Set && weaponTags?.has(dw.enums.Tag.CASTER)) {
      runeMd = 'physbolt1'
    }
  }

  const skillIndex = dw.character.skills.findIndex(
    (skill) => skill && skill.md === runeMd
  )
  if (skillIndex === -1) {
    // No attackRune found
    return
  }

  if (!dw.isInRange(skillIndex, target.x, target.y)) {
    // Too far away
    dw.move(target.x, target.y)
    return
  }

  if (!dw.isOnCd(skillIndex) || !dw.canPayCost(skillIndex)) {
    // Skill is either on cooldown or not enough resources
    return
  }

  dw.stop()
  await dw.useSkill(skillIndex, target.id)
}

setInterval(basicAttack, 250)
