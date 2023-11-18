const entitiesSmoothPosition = new Map<number, { x: number, y: number }>

setInterval(function() {
  const currentEntities = new Set()

  for (const entity of dw.findEntities((e) => 'ai' in e || 'player' in e)) {
    currentEntities.add(entity.id)

    if (!entitiesSmoothPosition.has(entity.id)) {
      entitiesSmoothPosition.set(entity.id, { x: entity.x, y: entity.y })
    }

    const smoothPosition = entitiesSmoothPosition.get(entity.id)
    if (!smoothPosition) {
      continue
    }

    let dx = entity.x - smoothPosition.x
    let dy = entity.y - smoothPosition.y
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      smoothPosition.x += dx
      smoothPosition.y += dy
      continue
    }

    smoothPosition.x += dx / 10
    smoothPosition.y += dy / 10
  }

  for (const entityId of entitiesSmoothPosition.keys()) {
    if (!currentEntities.has(entityId)) {
      entitiesSmoothPosition.delete(entityId)
    }
  }
}, 16)

export default function getSmoothPosition(entity: DeepestWorld.Entity) {
  const smoothPosition = entitiesSmoothPosition.get(entity.id)
  if (smoothPosition) {
    return smoothPosition
  }

  return { x: entity.x, y: entity.y }
}
