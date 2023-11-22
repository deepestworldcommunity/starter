setInterval(function () {
  // Find the closest tree
  const target = dw.findEntities(
      (e) => 'tree' in e,
    ).sort(
      (a, b) => dw.distance(dw.c.x, dw.c.y, a.x, a.y) - dw.distance(dw.c.x, dw.c.y, b.x, b.y),
    ).shift()

  if (!target) {
    // No target found
    return
  }

  // Show target in game UI
  dw.setTarget(target.id)

  const toolIndex = dw.c.toolBag.findIndex((i) => i?.md === 'axe')
  if (toolIndex === -1) {
    // No axe found
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

  dw.chop(toolIndex, target.id)
}, 250)
