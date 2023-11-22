// The world length of one is scaled for the UI to match that value
export const UI_SCALE = 96

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

export const ARMOR_TYPES = [
  'helmet',
  'chest',
  'gloves',
  'boots',
  'shield',
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

dw.constants = {
  "INTERACT_RANGE": 2.8284271247461903,
  "CHUNK_DIMENSION": [
    16,
    16,
    1
  ],
  "ZONE_LEVEL_RADIUS": 16,
  "ZONE_LEVELS_PER_ZONE_TIER": 10,
  "RANGE_MELEE_BASE": 0.75,
  "RANGE_RANGED_BASE": 3,
  "MOVEMENT_SPEED_BASE": 1.5,
  "PIXELS_PER_UNIT": 96,
  "GCD_BASE": 1500,
  "GCD_MIN": 750,
  "CRIT_BASE": 0.05,
  "CRIT_MULT_BASE": 1.5,
  "CHARACTER_HP_BASE": 100,
  "MONSTER_HP_BASE": 80,
  "CHARACTER_DMG_BASE": 30,
  "TERRAIN_WATER": -1,
  "TERRAIN_EMPTY": 0,
  "TERRAIN_GRASS": 1,
  "TERRAIN_DIRT": 2,
  "TERRAIN_DESERT": 4,
  "TERRAIN_UNDERWATER": 5,
  "TERRAIN_WINTER": 7,
  "TERRAIN_CLOUD": 15,
  "TERRAIN_TREE": 16,
  "CHUNK_DIM": [
    16,
    16,
    1
  ],
  "ZONE_TIER_ZONE_LEVEL_RADIUS": 10,
  "MELEE_RANGE": 0.75,
  "CHARACTER_SPEED": 1.5,
  "GCD": 1500
}

export const PASSABLE_TERRAIN = [
  dw.constants.TERRAIN_WATER,
  dw.constants.TERRAIN_EMPTY,
]
