import { BOSSES } from "./consts"

const tracker = {
  levels: 0,
  kills: 0,
  skullKills: 0,
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

      if (BOSSES.includes(entity.md)) {
        tracker.bossKills++
        return
      }

      if (entity.r > 0) {
        tracker.skullKills++
        return
      }

      tracker.levels += entity.level
      tracker.kills++
    })
})

export default tracker
