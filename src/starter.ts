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
    if (weaponTags?.has('rangedWeapon')) {
      runeMd = 'aimingRune'
    }

    if (weaponTags?.has('casterWeapon')) {
      runeMd = 'castingRune'
    }
  }

  const skillIndex = dw.character.skillBag.findIndex(
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

  if (dw.isOnCd(skillIndex) || !dw.canPayCost(skillIndex) || dw.c.casting) {
    // Skill is either on cooldown, not enough resources or we are already casting sth
    return
  }

  dw.stop()
  await dw.useSkill(skillIndex, target.id)
}

setInterval(basicAttack, 250)
