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

setInterval(onTick, 60 * 1000)
dw.on('levelUp', onLevelUp)
