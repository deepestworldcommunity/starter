let attackMode = false

async function basicAttack() {
  if (!attackMode) {
    dw.log('Attack mode is off, edit src/starter.ts to enable')
    return
  }

  const target = dw.findClosestMonster()
  if (!target) {
    dw.log('<span style="color: yellow">No target found</span>')
    return
  }

  if (dw.targetId !== target.id) {
    dw.log(`Switching target to ${target.md}#${target.id}`)
    dw.setTarget(target.id)
  }

  let skillMd = 'dmg1'
  const weaponType = dw.character.gear.mainHand?.type
  if (weaponType !== undefined) {
    if ([
      dw.enums.Type.BOW,
      dw.enums.Type.BOOMERANG,
      dw.enums.Type.CROSSBOW,
    ].includes(weaponType)) {
      skillMd = 'dmg2'
    }

    if ([
      dw.enums.Type.SCEPTER,
      dw.enums.Type.STAFF,
      dw.enums.Type.WAND,
    ].includes(weaponType)) {
      skillMd = 'dmg3'
    }
  }

  const skillIndex = dw.character.skills.findIndex(
    (skill) => skill && skill.md === skillMd
  )
  if (skillIndex === -1) {
    dw.log(`<span style="color: red">Could not find ${skillMd}</span>`)
    return
  }

  if (!dw.isInRange(skillIndex, target.x, target.y)) {
    dw.log(`Too far away from target, moving closer`)
    dw.move(target.x, target.y)
    return
  }

  if (dw.isReady(skillIndex)) {
    dw.log(`<span style="color: yellow">Skill ${skillMd}#${skillIndex} is on cooldown</span>`)
    return
  }

  if (!dw.canPayCost(skillIndex)) {
    dw.log(`<span style="color: yellow">Not enough resources for ${skillMd}#${skillIndex}</span>`)
    return
  }

  if (dw.character.casting > Date.now()) {
    dw.log(`<span style="color: yellow">Already casting</span>`)
    return
  }

  dw.stop()
  await dw.useSkill(skillIndex, target.id)
}

setInterval(basicAttack, 250)
