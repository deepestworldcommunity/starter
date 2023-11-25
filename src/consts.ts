// The max distance (to x,y) to receive mission contribution
export const RANGE_MISSION = 100

export const MATERIALS = ['wood', 'bronze', 'iron', 'steel']

export const ELEMENTS = ['acid', 'cold', 'elec', 'fire', 'phys']

export const TIERS = ['1', '2', '3', '4']

export const GEMS = ['diamond', 'emerald', 'ruby', 'sapphire', 'topaz']

export const BOSSES = [
  'kingGoo',        // Event Boss: spawned by killing goo
  'kingSpikedGoo',  // Event Boss: spawned by killing goo
  'alarmBoss',      // Event Boss: spawned by killing alarmOnDeath
  'bouncyGoo',      // Event Boss: spawned by killing goo
  'sdBoss',         // Dungeon Boss: Squirrel Den
]

export const ARMOR_SLOTS = [
  'helmet',
  'chest',
  'gloves',
  'boots',
]

export const SHIELD_SLOTS = [
  'shield',
]

export const ACCESSORY_SLOTS = [
  'amulet',
  'ring1',
  'ring2',
  'belt',
]

export const WEAPON_SLOTS = [
  'mainHand',
]

export const WEAPON_TYPES = [
  'sword',
  'dagger',
  'staff',
  'mace',
  'axe',
  'spear',
  'wand',
  'scepter',
  'bow',
  'boomerang',
  'crossbow',
]

export const PASSABLE_TERRAIN = [
  dw.constants.TERRAIN_WATER,
  dw.constants.TERRAIN_EMPTY,
]

export const mobNames: Array<[string, number, string]> = [
  ['mob1', 1, 'Squirrel'],
  ['mob1', 2, 'Rodent'],
  ['mob1', 4, 'Squirrel'],
  ['mob1', 7, 'Squirrel'],
  ['mob2', 1, 'Wolf'],
  ['mob2', 2, 'Rat'],
  ['mob2', 4, 'Wolf'],
  ['mob2', 7, 'Wolf'],
  ['mob2', 16, 'Squirrel'],
  ['meleeDps', 1, 'Deer'],
  ['meleeDps', 2, 'Myconid'],
  ['meleeDps', 4, 'Spider'],
  ['meleeDps', 7, 'Penguin'],
  ['meleeDps', 15, 'Harpy'],
  ['meleeHealer', 1, 'Fairy'],
  ['meleeHealer', 2, 'Fairy'],
  ['meleeHealer', 4, 'Fairy'],
  ['meleeHealer', 7, 'Fairy'],
  ['meleeHealer', 15, 'Harpy'],
  ['ranged', 1, 'Kobold'],
  ['ranged', 2, 'Myconid'],
  ['ranged', 4, 'Fire Spirit'],
  ['ranged', 7, 'Ice Spirit'],
  ['ranged', 15, 'Harpy'],
  ['healerRanged', 1, 'Fairy'],
  ['healerRanged', 2, 'Fairy'],
  ['healerRanged', 4, 'Fairy'],
  ['healerRanged', 7, 'Fairy'],
  ['healerRanged', 15, 'Harpy'],
  ['orc', 1, 'Orc Warrior'],
  ['orc', 2, 'Orc Warrior'],
  ['orc', 4, 'Orc Warrior'],
  ['orc', 7, 'Orc Warrior'],
  ['orcRanged', 1, 'Orc Ranger'],
  ['orcRanged', 2, 'Orc Ranger'],
  ['orcRanged', 4, 'Orc Ranger'],
  ['orcRanged', 7, 'Orc Ranger'],
  ['alarmOnDeathMob', 1, 'Bee'],
  ['alarmOnDeathMob', 2, 'Myconid'],
  ['alarmOnDeathMob', 4, 'Bee'],
  ['alarmOnDeathMob', 7, 'Bee'],
  ['alarmBoss', 1, 'Giant Wasp'],
  ['alarmBoss', 2, 'Myconid'],
  ['alarmBoss', 4, 'Giant Wasp'],
  ['alarmBoss', 7, 'Giant Wasp'],
  ['elemental', 1, 'Acid Elemental'],
  ['elemental', 2, 'Earth Elemental'],
  ['elemental', 4, 'Fire Elemental'],
  ['elemental', 7, 'Ice Elemental'],
  ['elemental', 15, 'Lightning Elemental'],
  ['magicShrubGrass1', 1, 'Magic Shrub'],
  ['magicShrubGrass1', 2, 'Magic Shrub'],
  ['magicShrubGrass1', 4, 'Magic Shrub'],
  ['magicShrubGrass1', 7, 'Magic Shrub'],
  ['bouncyGoo', 1, 'Bouncy Goo'],
  ['bouncyGoo', 2, 'Bouncy Goo'],
  ['bouncyGoo', 4, 'Bouncy Goo'],
  ['bouncyGoo', 7, 'Bouncy Goo'],
  ['sdBoss', 2, 'Nutcracker'],
  ['goo', 1, 'Goo'],
  ['goo', 2, 'Goo'],
  ['goo', 4, 'Goo'],
  ['goo', 7, 'Goo'],
  ['goo', 15, 'Goo'],
  ['spikedGoo', 1, 'Spiked Goo'],
  ['spikedGoo', 2, 'Spiked Goo'],
  ['spikedGoo', 4, 'Spiked Goo'],
  ['spikedGoo', 7, 'Spiked Goo'],
  ['spikedGoo', 15, 'Spiked Goo'],
  ['giantGoo', 1, 'Giant Goo'],
  ['giantGoo', 2, 'Giant Goo'],
  ['giantGoo', 4, 'Giant Goo'],
  ['giantGoo', 7, 'Giant Goo'],
  ['giantGoo', 15, 'Giant Goo'],
  ['giantSpikedGoo', 1, 'Giant Spiked Goo'],
  ['giantSpikedGoo', 2, 'Giant Spiked Goo'],
  ['giantSpikedGoo', 4, 'Giant Spiked Goo'],
  ['giantSpikedGoo', 7, 'Giant Spiked Goo'],
  ['giantSpikedGoo', 15, 'Giant Spiked Goo'],
  ['kingGoo', 1, 'King Goo'],
  ['kingGoo', 2, 'King Goo'],
  ['kingGoo', 4, 'King Goo'],
  ['kingGoo', 7, 'King Goo'],
  ['kingGoo', 15, 'King Goo'],
  ['kingSpikedGoo', 1, 'King Spiked Goo'],
  ['kingSpikedGoo', 2, 'King Spiked Goo'],
  ['kingSpikedGoo', 4, 'King Spiked Goo'],
  ['kingSpikedGoo', 7, 'King Spiked Goo'],
  ['kingSpikedGoo', 15, 'King Spiked Goo'],
]
