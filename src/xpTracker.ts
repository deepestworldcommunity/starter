export const xpTracker = (dw.get('xpTracker') ?? []) as Array<number>

function onTick() {
  xpTracker.push(dw.c.xp)
  dw.set('xpTracker', xpTracker)
}

function onLevelUp() {
  xpTracker.push(0)
  xpTracker.splice(0, xpTracker.length - 1)
  dw.set('xpTracker', [0])
}

let interval = setInterval(onTick, 60 * 1000)
dw.on('levelUp', onLevelUp)

export function resetXPTracker() {
  clearInterval(interval)
  xpTracker.splice(0, xpTracker.length)
  xpTracker.push(dw.c.xp)
  dw.set('xpTracker', xpTracker)
  interval = setInterval(onTick, 60 * 1000)
}

// dw.on("hit", async (hits) => {
//   for (const hit of hits) {
//     if (!hit.rip) continue
//
//     if (hit.target !== dw.c.id) continue
//   }
// })
