function gatherer() {
  // Find the closest tree
  const target = dw.findClosestEntity(
    (e) => dw.isGatherable(e),
  )

  if (!target) {
    // No target found
    return
  }

  // Show target in game UI
  dw.setTarget(target.id)

  if (dw.distance(dw.c.x, dw.c.y, target.x, target.y) > dw.constants.MELEE_RANGE) {
    // Too far away
    dw.move(target.x, target.y)
    return
  }

  if (!dw.isReady()) {
    // We have to wait for GCD
    return
  }

  dw.gather(target.id)
}

setInterval(gatherer, 250)
