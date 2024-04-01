import { bosses } from "./bosses"

const tracker = {
  levels: 0,
  total: 0,
  normal: 0,
  skullKills: {
    total: 0,
    bySkulls: new Array<number>(10).fill(0),
  },
  bossKills: 0,
}

dw.on('hit', (hits) => {
  hits
    .filter((hit) => !!hit.rip && hit.actor === dw.c.id)
    .forEach((kill) => {
      const entity = dw.entities.find((e) => e.id === kill.target)
      if (!entity || !('ai' in entity)) {
        return
      }

      tracker.levels += entity.level
      tracker.total++

      if (bosses.includes(entity.md)) {
        tracker.bossKills++
        return
      }

      // TODO: adjust to new fx annotation
      if (entity.r > 0) {
        tracker.skullKills.total++
        tracker.skullKills.bySkulls[entity.r - 1]++
        return
      }

      tracker.normal++
    })
})

export default tracker
