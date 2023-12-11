function mineOres() {
  // Find the closest ore
  const target = dw.findEntities(
      (e) => 'ore' in e,
    ).sort(
      (a, b) => dw.distance(dw.c.x, dw.c.y, a.x, a.y) - dw.distance(dw.c.x, dw.c.y, b.x, b.y),
    ).shift()

  if (!target) {
    // No target found
    return
  }

  // Show target in game UI
  dw.setTarget(target.id)

  const toolIndex = dw.c.toolBag.findIndex((i) => i?.md === 'pickaxe')
  if (toolIndex === -1) {
    // No pickaxe found
    return
  }

  if (dw.distance(dw.c.x, dw.c.y, target.x, target.y) > dw.constants.RANGE_MELEE_BASE) {
    // Too far away
    dw.move(target.x, target.y)
    return
  }

  if (!dw.isSkillReady()) {
    // We have to wait for GCD
    return
  }

  dw.mine(toolIndex, target.id)
}

setInterval(mineOres, 250)
