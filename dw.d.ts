declare global {
  const top: typeof window

  const dw: {
    abandonMission(): void

    /**
     * Accept a mission from mission board
     * @param id id of mission board
     * @param index slot of mission in board to accept
     */
    acceptMission(id: number, index: number): void

    /** Reference to your character */
    c: YourCharacter
    /** Another reference to your character */
    char: YourCharacter
    /** Another reference to your character **/
    character: YourCharacter

    chunks: Chunks

    /**
     * Output debug information in the console
     * * 0 = disabled
     * * 1 = enabled
     */
    debug: number

    /**
     * Returns the distance between from and to
     * @param from
     * @param to
     */
    distance(from: Coordinates, to: Coordinates): number

    emit(eventName: "auth", data: { token: string, name: string })

    /**
     * Chops down a tree
     * @param eventName
     * @param data
     */
    emit(eventName: "chop", data: { id: number })

    emit(eventName: "declinePartyInvite", data: { id: number })

    emit(eventName: "deleteItem", data: { i: number, name: string })

    emit(eventName: "equip", data: {
      i: number,
      slot?: string
      bag?: string
    })

    emit(eventName: "magicShrub", data: { id: number })

    emit(eventName: "marketSell", data: { id: number, md: string })

    /**
     * Merges stackable crafting items together and stores them in the bag
     * @param eventName
     */
    emit(eventName: "merge")

    /**
     * Mines ores, like rock, iron, gems...
     * @param eventName
     * @param data
     */
    emit(eventName: "mine", data: { id: number })

    emit(eventName: "move", data: { x: number, y: number })

    emit(eventName: "moveItem", data: {
      a:
        | { name: "bag", i: number }
        | { name: "cardBag", i: number }
        | { name: "craftIn", i: number }
        | { name: "storage", id: number, i: number }
        | { name: "skillBag", i: number },
      b:
        | { name: "bag", i?: number }
        | { name: "cardBag", i?: number }
        | { name: "craftIn", i?: number }
        | { name: "storage", id: number, i?: number }
        | { name: "skillBag", i?: number },
      fId?: number,
    })

    emit(eventName: "partyKick", data: { dbId: number })

    emit(eventName: "partyPromote", data: { dbId: number })

    /**
     * Places a station into the world (can only be done at your spawn area)
     * @param eventName
     * @param data
     */
    emit(eventName: "placeItem", data: {
      bagIndex: number
      x: number
      y: number
    })

    emit(eventName: "sacItem", data: { id: number, i: number })

    emit(eventName: "saveCode", data: { code: string })

    emit(eventName: "sendPartyInvite", data: { name: string })

    /**
     * Set the new character spawn location to current location rounded down
     * @param eventName
     * @param data
     */
    emit(eventName: "setSpawn", data: { x: number, y: number })

    /**
     * Set the new character respawn location inside the spawn area
     * @param eventName
     * @param data
     */
    emit(eventName: "setRespawn", data: { x: number, y: number })

    emit(eventName: "skill", data: {
      md?: string,
      i: number,
      id?: number,
      x?: number,
      y?: number,
      ax?: number,
      ay?: number,
    })

    /**
     * Sorts your inventory aka the bag
     * @param eventName
     */
    emit(eventName: "sortInv")

    emit(eventName: "stopCode")

    emit(eventName: "startCode")

    /**
     * Returns you to your spawn
     * @param eventName
     */
    emit(eventName: "unstuck")

    /**
     * Emits a currently undocumented event
     * @param eventName
     * @param data
     */
    emit(eventName: string, data: unknown)

    /**
     * Enters the accepted mission
     */
    enterMission(): void

    /** Your surroundings: monsters, characters, trees, etc */
    entities: Entity[]

    findClosestMonster(filter?: (entity: Monster) => boolean): Monster | undefined

    findEntities(filter?: (entity: Entity) => boolean): Entity[]

    get(key: string): any | null

    /**
     * Returns the terrain at the given position
     * 0 = Walkable
     * 1 = There is a voxel here, limiting movement
     * @param pos
     */
    getTerrainAt(pos: Position): number

    getTerrainOver(pos: Position): number

    getTerrainUnder(pos: Position): number

    getZoneLevel(l?: number, x?: number, y?: number): number

    isSkillReady(name: string): boolean

    log(message: any): void

    md: {
      items: Record<string, {
        collision?: number
        hitbox: { w: number, h: number }
      }>
    }

    /**
     * Moves towards x,y in a straight line
     * @param x
     * @param y
     */
    move(x: number, y: number): void

    /**
     * Your character bag names are: 'bag', 'craftIn', 'abilities', 'abilityBag'.
     * Other objects bag names are: 'storage'.
     * @param bagFrom
     * @param indexFrom
     * @param bagTo
     * @param indexTo
     * @param idFrom can be omitted if transferring from your character
     * @param idTo can be omitted if transferring to your character
     */
    moveItem(bagFrom: string, indexFrom: number, bagTo: string, indexTo: number, idFrom?: number, idTo?: number): void

    /**
     * This is not a socket event, but a client event to draw stuff on canvas.
     * @param eventName
     * @param listener
     */
    on(eventName: 'drawEnd', listener: (ctx: CanvasRenderingContext2D, cx: number, cy: number) => void): void

    on(eventName: 'afx', listener: (data: {
      id: umber,
      md: string,
      v?: number,
      d: number,
      s?: number
    }) => void): void

    on(eventName: 'attack', listener: (data: {
      error: string,
    }) => void): void

    on(eventName: 'auth', listener: (data: number) => void): void

    on(eventName: 'combat', listener: (data: number) => void): void

    on(eventName: 'cd', listener: (data: string) => void): void

    on(eventName: 'diff', listener: (data: Array<{
      id: number
      l?: number
      x?: number
      y?: number
      md?: string
      rarity?: number
      level?: number
      hp?: number
      hpMax?: number
      hps?: number
      hpRegen?: number
      mp?: number
      mpMax?: number
      mpRegen?: number
      xp?: number
      targetId?: number
      moveSpeed?: number
      armor?: number
      force?: number
      died?: number
      defaultSkills?: {
        woodcutting: DefaultSkill,
        mining: DefaultSkill,
      },
      pname?: string,
      pxp?: number,
      xpGain?: number,
      powers?: {},
      skills?: Array<0 | Skill>,
      i?: number,
      bagItem?: null | Item,
      bagItems?: Array<null | Item>,
      craftInItems?: Array<null | Item>,
      gcd?: number,
    }>) => void): void

    on(eventName: 'equip', listener: (data: { error: string } | {
      id: number,
      slot: string,
      i: number,
      bag: string,
    }) => void): void

    on(eventName: 'frenzy', listener: (data: { error: string }) => void): void

    on(eventName: 'gcd', listener: (data: {}) => void): void

    on(eventName: 'hit', listener: (data: Array<{
      projId?: number
      md?: number
      actor: number
      target: number
      heal?: number
      amount?: number
      val?: number
      rip?: number
    }>) => void): void

    on(eventName: 'levelUp', listener: (data: { id: number }) => void): void

    on(eventName: 'loot', listener: (data: {
      i: number,
      item: Item,
      log: number,
    }) => void): void

    on(eventName: 'magicShrub', listener: (data: { error: string }) => void): void

    on(eventName: 'market', listener: (data: Record<string, number>) => void): void

    on(eventName: 'missionBonus', listener: (data: Record<string, number>) => void): void

    on(eventName: 'move', listener: (data: { error: string }) => void): void

    on(eventName: 'moveItem', listener: (data: { error: string } | {
      name: string,
      id?: number
      i: number
      item?: null | Item
    }) => void): void

    on(eventName: 'proj', listener: (data: {
      md: string,
      mwd: string,
      id: number,
      aid: number,
      tid: number,
    }) => void): void

    on(eventName: 'partyDiff', listener: (data: {
      dbId: number,
      name?: string,
      level?: number,
      id?: number,
      leader?: number
    }) => void): void

    on(eventName: 'partyInvite', listener: (data: {
      from: string
      id: number
    }) => void): void

    on(eventName: 'partyKick', listener: (data: {
      dbId: number
    }) => void): void

    on(eventName: 'rfx', listener: (data: {
      id: number
      md: string
    }) => void): void

    on(eventName: 'sendPartyInvite', listener: (data: {
      error: string
    }) => void): void

    on(eventName: 'seenChunks', listener: (data: Record<string, {
      terrain: Array<Array<Array<number>>>
    }>) => void): void

    on(eventName: 'seenObjects', listener: (data: any) => void): void

    on(eventName: 'setRespawn', listener: (data: {
      l: number
      x: number
      y: number
    }) => void): void

    on(eventName: 'setSpawn', listener: (data: {
      l: number
      x: number
      y: number
      w: number
    }) => void): void

    on(eventName: 'share', listener: (data: number) => void): void

    on(eventName: 'talk', listener: (data: {
      name: string
      text: string
    }) => void): void

    on(eventName: 'unseenChunks', listener: (data: string) => void): void

    on(eventName: 'unseenObjects', listener: (data: Array<number>) => void): void

    on(eventName: string, listener: (data: any) => void): void

    sendItem(receiver: number | string, itemIndex: number): void

    set(key: string, value: any): void

    /**
     * Set the UI to show this target
     * @param target
     */
    setTarget(target: Target): void

    targetId: number | null

    useSkill(skill: string | number, target: { id: number }): void
  }
}

export interface Coordinates {
  /** World x pos */
  x: number
  /** World y pos */
  y: number
}

export interface Position extends Coordinates {
  /** World layer pos */
  l: number
}

export interface Target {
  id: number
}

interface BaseEntity extends Position {
  id: number
  /** Metadata ID */
  md: string
}

interface LivingBaseEntity extends BaseEntity {
  level: number
  /** Life */
  hp: number
  hpMax: number
  /** Mana */
  mp: number
  mpMax: number
  /** Movement speed. World units per second. Multiply by 96 to get pixels per second. */
  moveSpeed: number
  /** Current, if any*/
  targetId?: number
}

export interface Character extends LivingBaseEntity {
  /** Means that this is a player. Value is always 1. */
  player: 1
  /** Character's name */
  name: string
  /** Equipped items */
  gear: Record<string, unknown>
  /** Character's appearance */
  mtx: Record<string, unknown>
}

export interface YourCharacter extends Character {
  /** Item inventory */
  bag: Array<Item | null>

  /** Skill specific timestamps of their cooldowns */
  cds: Record<string, number>,

  /** Indicator whether the character is currently in combat */
  combat?: number,

  /** Crafting inventory */
  craftIn: Array<unknown>

  defaultSkills: {
    woodcutting: DefaultSkill
    mining: DefaultSkill
  }

  /**
   * Active effects on your character
   */
  fx: Record<string, unknown>

  /** Timestamp of the global cooldown */
  gcd?: number,

  mission: {
    item: {
      md: string
      r: number
      qual: number
      level: number
      ownerDbId: number
      runners: Array<string>
      missionId: number
    }

    /**
     * Percentage progress e.g. 6.0990909%
     */
    progress: number;

    /**
     * When the timeout happens
     */
    timeoutAt: number;
  }

  professions: {
    axesmith: Profession
    bowsmith: Profession
    daggersmith: Profession
    gemcutting: Profession
    macesmith: Profession
    metalworking: Profession
    mining: Profession
    pickaxesmith: Profession
    platesmith: Profession
    spearsmith: Profession
    staffsmith: Profession
    stoneworking: Profession
    swordsmith: Profession
    wandsmith: Profession
    woodcutting: Profession
    woodworking: Profession
  }

  /** Skills in skill bar */
  skillBag: Array<Item | null>

  /** Skill info for skills in skill bar */
  skills: Array<{
    cost: number
    md: string
    range: number
    val?: number
    physDmg?: number;
    coldDmg?: number;
    elecDmg?: number;
    fireDmg?: number;
    acidDmg?: number;
    crit?: number;
    critMult?: number;
    speed?: number;
  } | 0>

  spawn: Position & { w: number }
  respawn: Position
}

export interface Monster extends LivingBaseEntity {
  /** Means that this is a monster. Value is always 1. */
  ai: 1
  /** Indicated whether the monster will attack you on sight */
  hostile?: number
  /** 1 is a normal monster. 2+ are bosses. */
  r: number
}

export interface Tree extends BaseEntity {
  /** Means that this is a tree. Value is always 1. */
  tree: 1
  /** Quality */
  qual: number
}

export interface Ore extends BaseEntity {
  /** Means that this is an ore. Value is always 1. */
  ore: 1
  /** Quality */
  qual: number
}

export interface Station extends BaseEntity {
  /** Means that this is a station. Value is always 1. */
  station: 1
  /** Indicating whether you are the owner. */
  owner: number
  /** Owner Database Id */
  ownerDbId: number
  /** Storage of items and possible other stuff */
  storage: Array<Item | unknown | null>
}

export type Entity = YourCharacter | Character | Monster | Tree | Ore | Station

export type Chunk = Array<unknown>

/**
 * Each property is a chunk of 1x16x16 voxels containing data about the terrain.
 *
 * - Keys are the chunks world positions in the format "layer.row.col". Example: "0.0.0", "5.1.0", "-1.3.-2".
 * - Values are 3D arrays of integers.
 *
 * Example: dw.chunks['0.0.0'][0][10][15] would return the terrain in chunk "0.0.0" at row 10 and col 15.
 */
export type Chunks = Record<string, Chunk>

export type DefaultSkill = {
  physDmg: number;
  coldDmg: number;
  elecDmg: number;
  fireDmg: number;
  acidDmg: number;
  crit: number;
  critMult: number;
  range: number;
  cost: null;
}

export type Skill = {
  md: string
  physDmg?: number
  coldDmg?: number
  elecDmg?: number
  fireDmg?: number
  acidDmg?: number
  crit?: number
  critMult?: number
  range: number
  cost: number
  val?: number
  stack?: number
  duration?: number
  speed?: number
}

export interface Profession {
  md: string
  xp: number
  level: number
}

export type Item = {
  /** Metadata ID */
  md: string;

  /** Count, or 1 if undefined */
  n?: number;

  /**
   * The rarity
   * 0 = white
   * 1 = green
   * 2 = blue
   * 3 = purple
   */
  r: number;

  /** The item level / quality*/
  qual: number

  /** The modifiers on the item */
  mods: Record<string, number>
}
