declare global {
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
    distance(from: Position, to: Position): number

    // TODO: add more types to events
    emit(eventName: "chop", data: Target)
    emit(eventName: "placeItem", data: {
      bagIndex: number
      x: number
      y: number
    })
    emit(eventName: "setSpawn", data: {})
    emit(eventName: string, data: unknown)

    /**
     * Enters the accepted mission
     */
    enterMission(): void

    /** Your surroundings: monsters, characters, trees, etc */
    entities: Entity[]

    findEntities(filter?: (entity: Entity) => boolean): Entity[]

    findClosestMonster(filter?: (entity: Monster) => boolean): Monster | undefined

    /**
     * Returns the terrain at the given position
     * 0 = Air / Walkable
     * 1 = Wall?
     * @param pos
     */
    getTerrainAt(pos: Position): number

    getTerrainUnder(pos: Position): number

    getTerrainOver(pos: Position): number

    getZoneLevel(l?: number, x?: number, y?: number): number

    get(key: string): any

    isSkillReady(name: string): boolean

    log(message: any): void

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

    // TODO: type more events
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

type Position = {
  /** World layer pos */
  l: number
  /** World x pos */
  x: number
  /** World y pos */
  y: number
}

type Target = {
  id: number
}

type BaseEntity = Position & Target & {
  /** Metadata ID */
  md: string
}

type LivingBaseEntity = BaseEntity & {
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

type Character = LivingBaseEntity & {
  /** Means that this is a player. Value is always 1. */
  player: 1
  /** Character's name */
  name: string
  /** Equipped items */
  gear: Record<string, unknown>
  /** Character's appearance */
  mtx: Record<string, unknown>
}

type YourCharacter = Character & {
  /** Item inventory */
  bag: Array<Item>

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

  /** Skills in skill bar */
  skillBag: Array<{
    md: string
  } | null>

  /** Skill info for skills in skill bar */
  skills: Array<{
    md: string
    range: number
  } | 0>

  spawn: Position
}

type Monster = LivingBaseEntity & {
  /** Means that this is a monster. Value is always 1. */
  ai: 1
  r: number // 1 is a normal monster. 2+ are bosses.
}

type Tree = BaseEntity & {
  /** Means that this is a tree. Value is always 1. */
  tree: 1
  /** Quality */
  qual: number
}

type Ore = BaseEntity & {
  /** Means that this is an ore. Value is always 1. */
  ore: 1
  /** Quality */
  qual: number
}

type Station = BaseEntity & {
  /** Means that this is a station. Value is always 1. */
  station: 1
  /** Indicating whether you are the owner. */
  owner: number
  /** Owner Database Id */
  ownerDbId: number
  /** Storage of items and possible other stuff */
  storage: Array<Item | unknown | null>
}

type Entity = YourCharacter | Character | Monster | Tree | Ore | Station

type Chunk = Array<unknown>

/**
 * Each property is a chunk of 1x16x16 voxels containing data about the terrain.
 *
 * - Keys are the chunks world positions in the format "layer.row.col". Example: "0.0.0", "5.1.0", "-1.3.-2".
 * - Values are 3D arrays of integers.
 *
 * Example: dw.chunks['0.0.0'][0][10][15] would return the terrain in chunk "0.0.0" at row 10 and col 15.
 */
type Chunks = Record<string, Chunk>

type DefaultSkill = {
  physDmg: number;
  coldDmg: number;
  elecDmg: number;
  fireDmg: number;
  acidDmg: number;
  crit: number;
  critMult: number;
  range: number;
  cost: null;
};

type Item = {
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
