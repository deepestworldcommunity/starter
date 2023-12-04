let green = 0
let blue = 0
let purple = 0
let orange = 0
let prism = 0
let wood = 0

dw.on('loot', (lootList) => {
  for (const loot of lootList) {
    if (!loot.item.mods) {
      if (loot.item.md === 'prism') {
        prism++
      }

      if (loot.item.md === 'wood') {
        wood++
      }
      continue
    }

    switch (loot.item.r) {
      case 4:
        orange++
        break
      case 3:
        purple++
        break
      case 2:
        blue++
        break
      case 1:
        green++
        break
      default:
        break
    }
  }
})

export default {
  green,
  blue,
  purple,
  orange,
  prism,
  wood,
}
