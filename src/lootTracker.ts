const tracker = {
  green: 0,
  blue: 0,
  purple: 0,
  orange: 0,
  prism: 0,
  wood: 0,
  rune: 0,
}

dw.on('loot', (lootList) => {
  for (const loot of lootList) {
    if (!loot.item.mods) {
      if (['rune1', 'rune2', 'rune3'].includes(loot.item.md)) {
        tracker.rune++
      }

      if (loot.item.md === 'prism') {
        tracker.prism++
      }

      if (loot.item.md === 'wood') {
        tracker.wood++
      }

      continue
    }

    switch (loot.item.r) {
      case 4:
        tracker.orange++
        break
      case 3:
        tracker.purple++
        break
      case 2:
        tracker.blue++
        break
      case 1:
        tracker.green++
        break
      default:
        break
    }
  }
})

export default tracker
