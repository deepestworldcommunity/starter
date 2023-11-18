declare namespace DeepestWorld {
  interface Account {
    coins: number
    id: number
    plots: Array<{
      dim: [number, number, number],
      id: number
      pos: [number, number, number],
      sellCd: number
    }>
  }

  interface API {
    a: Account

    /** Abandons the current mission */
    abandonMission(): void

    /** Accept the first mission in the mission table storage */
    acceptMission(missionTableId: number): void

    account: Account

    addMog(stationId: number, bagIndex: number): void

    buyPlot(
      realEstateTableId: number,
      location: [number, number, number],
      size: [number, number, number],
    ): void

    /** Reference to your character */
    c: YourCharacter

    /** Another reference to your character */
    char: YourCharacter

    /** Another reference to your character **/
    character: YourCharacter

    /**
     * Chop a tree.
     * @param toolBagIndex id of the tool in toolBag
     * @param targetId tree entity id
     */
    chop(toolBagIndex: number, targetId: number): void

    chunks: Record<string, Chunk>

    /**
     * Combines all stackable items in the combine section of your inventory.
     */
    combine(): void

    connected: boolean

    constants: {
      CHARACTER_SPEED: number
      CHUNK_DIM: [number, number, number]
      INTERACT_RANGE: number
      MELEE_RANGE: number
      ZONE_LEVEL_RADIUS: number
      ZONE_TIER_ZONE_LEVEL_RADIUS: number
    }

    craft(benchId: number, itemMd: string, max?: number): void

    /**
     * Indicates that debug information will appear in console
     */
    debug?: boolean

    /**
     * @param itemIndex index of the item in dw.character.bag
     */
    deleteItem(itemIndex: number): void

    destroyBuilding(buildingId: number): void

    /**
     * Disenchants item in bag with index `indexItem,
     * uses an enchanting device provided by `enchantingDeviceId`.
     * @param enchantingDeviceId
     * @param itemIndex
     */
    disenchant(enchantingDeviceId: number, itemIndex: number): void

    /**
     * Returns the distance between from and to
     * @param from
     * @param to
     * @deprecated use the same function, but with 4 parameters now
     */
    distance(
      from: { x: number; y: number },
      to: { x: number; y: number },
    ): number

    /**
     * Returns the distance between two points
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    distance(x1: number, y1: number, x2: number, y2: number): number

    draw: boolean

    /** Your surroundings: monsters, characters, trees, etc */
    e: Array<Entity>

    emit(eventName: 'abandonMission'): void

    emit(eventName: 'acceptMission', data: { id: number }): void

    emit(eventName: 'acceptPartyInvite', data: { id: number }): void

    emit(eventName: 'addMog', data: { i: number, id: number }): void

    emit(eventName: 'auth', data: { token: string; name: string }): void

    emit(
      eventName: 'buyLand',
      data: {
        benchId: number
        pos: [number, number, number]
        dim: [number, number, number]
      },
    )

    /**
     * Chops down a tree
     * @param eventName
     * @param data
     */
    emit(eventName: 'chop', data: { id: number , i: number}): void

    emit(eventName: 'claimLand', data: { x: number; y: number }): void

    /**
     * Combines stackable crafting items together
     * @param eventName
     */
    emit(eventName: 'combine'): void

    emit(
      eventName: 'craft',
      data: {
        id: number
        md: string
        r: number
        max?: number
      },
    ): void

    emit(eventName: 'declinePartyInvite', data: { id: number }): void

    emit(eventName: 'deleteItem', data: { i: number }): void

    emit(eventName: 'destroyBuilding', data: { id: number }): void

    emit(eventName: 'dungeonBoard', data: { id: number }): void

    emit(
      eventName: 'elevator',
      data: {
        id: number
        z: number
      },
    ): void

    emit(
      eventName: 'enchant',
      data: {
        id: number
        md: string
      },
    ): void

    emit(eventName: 'enterCar', data: { id: number }): void

    emit(eventName: 'enterPortal', data: { id: number }): void

    emit(
      eventName: 'equip',
      data: {
        i: number
        slot?: string
        bag?: string
      },
    ): void

    emit(eventName: 'eventBoard', data: { id: number }): void

    emit(eventName: 'exitCar'): void

    emit(
      eventName: 'fill',
      data: { i: number; x: number; y: number; z: number },
    ): void

    emit(eventName: 'loadout', data: { id: number }): void

    emit(eventName: 'lockItems', data: { id: number }): void

    emit(eventName: 'magicShrub', data: { id: number }): void

    emit(eventName: 'marketSell', data: { id: number; md: string }): void

    /**
     * Mines ores, like rock, iron, gems...
     * @param eventName
     * @param data
     */
    emit(eventName: 'mine', data: { i: number, id: number }): void

    emit(eventName: 'missionTable', data: { id: number }): void

    emit(eventName: 'move', data: { x: number; y: number }): void

    emit(
      eventName: 'moveCar',
      data: {
        id: number
        dx: number
        dy: number
      },
    )

    emit(
      eventName: 'moveItem',
      data: {
        a: {
          i: number
          id?: number
          name: string
        }
        b: {
          i: number
          id?: number
          name?: string
        }
        fId?: number
      },
    ): void

    emit(eventName: 'openItem', data: { i: number }): void

    emit(
      eventName: 'openPortal',
      data: {
        i: number
        name?: string
      },
    ): void

    emit(eventName: 'partyKick', data: { name: string }): void

    emit(eventName: 'partyPromote', data: { name: string }): void

    emit(
      eventName: 'placeBlock',
      data: { i: number; x: number; y: number; z: number },
    )

    /**
     * Places a station into the world (can only be done at your spawn area)
     * @param eventName
     * @param data
     */
    emit(
      eventName: 'placeItem',
      data: {
        i: number
        x: number
        y: number
      },
    ): void

    emit(
      eventName: 'portal2event',
      data: {
        id: number
        eventId: number
        i: number
      },
    ): void

    emit(eventName: 'pour', data: { i: number; id: number })

    emit(eventName: 'realEstateTable', data: { id: number }): void

    emit(eventName: 'removeMog', data: { id: number }): void

    emit(eventName: 'repair', data: { i: number, id: number }): void

    emit(eventName: 'repair', data: { i: number, id: number }): void

    emit(eventName: 'sacItem', data: { id: number; i: number }): void

    emit(eventName: 'saveCode', data: { code: string }): void

    emit(eventName: 'sellLand', data: { benchId: number; id: number })

    emit(eventName: 'sendPartyInvite', data: { name: string }): void

    emit(
      eventName: 'sendItem',
      data: {
        id: string | number
        i: number
      },
    ): void

    emit(
      eventName: 'sendMail',
      data: {
        id: number
        name: string
        i: Array<number>
        fee: Array<number>
      },
    ): void

    /**
     * Set the new character spawn location to current location rounded down
     * @param eventName
     */
    emit(eventName: 'setRespawn'): void

    emit(
      eventName: 'skill',
      data: {
        i: number
        id?: number
        x?: number
        y?: number
        z?: number
        ax?: number
        ay?: number
      },
    ): void

    /**
     * Sorts your inventory aka the bag
     * @param eventName
     */
    emit(eventName: 'sortInv'): void

    emit(eventName: 'stopCode'): void

    emit(eventName: 'stopCraft'): void

    emit(eventName: 'startCode'): void

    emit(eventName: 'takeBlock', data: { i: number, x: number; y: number; z: number })

    emit(eventName: 'takeItem', data: { i: number, id: number })

    emit(eventName: 'talkGlobal', data: { m: string }): void

    emit(eventName: 'talkLocal', data: { m: string }): void

    emit(eventName: 'talkParty', data: { m: string }): void

    emit(eventName: 'talkTrade', data: { m: string }): void

    emit(eventName: 'talkWhisper', data: { name: string; m: string }): void

    emit(eventName: 'toggleMog', data: { id: number, md: string }): void

    emit(eventName: 'tradingPost', data: { id: number }): void

    emit(
      eventName: 'unequip',
      data: {
        i?: number
        slot: string
      },
    ): void

    emit(eventName: 'unlockItems', data: { id: number }): void

    /**
     * Returns you to your spawn
     * @param eventName
     */
    emit(eventName: 'unstuck'): void

    enchant(enchantingDeviceId: number, enchantMd: string): void

    enterCar(carId: number): void

    /**
     * @param magicShrubId
     */
    enterMagicShrub(magicShrubId: number): void

    /**
     * @param portalId
     */
    enterPortal(portalId: number): void

    /** Your surroundings: monsters, characters, trees, etc */
    entities: Array<Entity>

    /**
     * Equip an item.
     * @param itemIndex
     * @param slotName
     */
    equip(itemIndex: number, slotName: string): void

    eventDispatcher: {
      listeners: Record<string, Array<(...args: unknown[]) => void>>
      onceListeners: Record<string, Array<(...args: unknown[]) => void>>
      on<E extends keyof Events>(
        eventName: E,
        listener: Events[E],
        timeout?: number,
      )
      once<E extends keyof Events>(
        eventName: E,
        listener: Events[E],
        timeout?: number,
      )
      remove<E extends keyof Events>(eventName: E, listener: Events[E])
      clear(): void
    }

    exitCar(): void

    fetchDungeons(
      dungeonBoardId: number,
      callback: (data?: DungeonBoard, error?: string) => void,
    ): void

    fetchEvents(
      eventBoardId: number,
      callback: (data?: EventBoard, error?: string) => void,
    ): void

    fetchMarket(
      tradingPostId: number,
      callback: (data?: TradingPost, error?: string) => void,
    ): void

    fetchMissions(
      missionTableId: number,
      callback: (data?: MissionTable, error?: string) => void,
    ): void

    fetchPlots(
      realEstateTableId: number,
      callback: (data?: RealEstateTable, error?: string) => void,
    ): void

    fillItem(toolBagIndex: number, x: number, y: number, z: number): void

    findClosestMonster(
      filter?: (entity: Monster) => boolean,
    ): Monster | undefined

    findEntities(filter?: (entity: Entity) => boolean): Entity[]

    get(key: string): unknown | null

    getItemBaseValue(item: DeepestWorld.Item): number | undefined

    getItemModValue(item: DeepestWorld.Item, s: string): number | undefined

    /**
     * Returns the terrain at the given position
     * 0 = Walkable
     * any other value = There is a voxel here, limiting movement
     * @param x
     * @param y
     * @param z
     * @param zo Layer offset. 1 to check the terrain above, -1 to check the terrain under.
     */
    getTerrain(x: number, y: number, z: number, zo?: number): number

    /**
     * Get either the zone level of location or of player location
     * when no other parameters were specified.
     * @param x
     * @param y
     * @param z
     */
    getZoneLevel(x?: number, y?: number, z?: number): number

    getZoneTier(x: number, y: number, z: number)

    /**
     * Checks whether the target would be in range for spell.
     * @param skillIndex
     * @param x
     * @param y
     * @deprecated use dw.isSkillInRange instead
     */
    inSkillRange(skillIndex, x: number, y: number)

    /**
     * Checks whether the target would be in range for spell.
     * @param skillIndex
     * @param x
     * @param y
     */
    isSkillInRange(skillIndex, x: number, y: number)

    /**
     * Checks whether the skill is on cooldown,
     * can be used without `skillIndex` to check for GCD.
     * @param skillIndex
     */
    isSkillReady(skillIndex?: number): undefined | true

    lastLog: number

    loadout(stationId: number): void

    lockItems(stationId: number): void

    log(message: unknown)

    marketSell(tradingPostId: number, itemMd: string): void

    md: {
      items: Record<
        string,
        {
          collision?: number
          hitbox: { w: number; h: number }
        }
      >
      skills: Record<
        string,
        {
          cd: number
          movement?: boolean
        }
      >
      chunkSizeX: number
      chunkSizeY: number
      chunkSizeZ: number
    }


    /**
     * Mine an ore.
     * @param toolBagIndex the id of the ore
     * @param targetId the id of the ore
     */
    mine(toolBagIndex: number, targetId: number): void

    /**
     * Moves towards x,y in a straight line
     * @param x
     * @param y
     */
    move(x: number, y: number): void

    moveCar(cardId: number, dx: number, dy: number)

    /**
     * Your character bag names are: 'bag', 'craftIn', 'abilities', 'abilityBag'.
     * Other objects bag names are: 'storage'.
     * @param bagNameFrom Name of the bag
     * @param bagIndexFrom Index of the item in the bag
     * @param bagNameTo
     * @param bagIndexTo
     * @param itemIdFrom can be omitted if transferring from your character
     * @param itemIdTo can be omitted if transferring to your character
     * @param finderId
     */
    moveItem(
      bagNameFrom: string,
      bagIndexFrom: number,
      bagNameTo: string | undefined,
      bagIndexTo: number,
      itemIdFrom?: number,
      itemIdTo?: number,
      finderId?: number,
    ): void

    off<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
    )

    on<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
      timeout?: number,
    ): void

    once<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
      timeout?: number,
    ): void

    openItem(bagIndex: number): void

    /**
     * Opens a portal to your respawn location ot a player with `targetName`.
     * @param portalScrollIndex
     * @param targetName
     */
    openPortal(portalScrollIndex: number, targetName?: string): void

    openPortalToEvent(
      eventBoardId: number,
      eventId: number,
      portalScrollBagIndex: number,
    ): void

    partyAccept(partyInviteId: number): void

    partyDecline(partyInviteId: number): void

    partyInvite(targetName: string): void

    partyKick(targetName: string): void

    partyLeave(): void

    partyPromote(targetName: string): void

    placeBlock(bagIndex: number, x: number, y: number, z: number): void

    /**
     * @param itemIndex index of the item in dw.character.bag
     * @param x
     * @param y
     */
    placeItem(itemIndex: number, x: number, y: number): void

    pourItem(toolBagIndex: number, targetId: number): void

    removeAllListeners(): void

    removeListener<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
    ): void

    removeMog(stationId: number, itemMd: string, bagIndex: number): void

    repair(toolBagIndex: number, objectId: number): void

    sellPlot(realEstateTableId: number, plotId: number): void

    /**
     *
     * @param receiver Either the ID or the name of the receiving player
     * @param itemIndex index of the item in your dw.character.bag
     */
    sendItem(receiver: number | string, itemIndex: number): void

    sendMail(
      mailboxId: number,
      recipientName: string,
      itemsBagIndexes: Array<number>,
      portalScrollsBagIndexes: Array<number>,
    ): void

    set(key: string, value: unknown): void

    setSpawn(): void

    /**
     * Set the UI to show this target
     * @param id
     */
    setTarget(id: number): void

    sortInv(): void

    /**
     * Cancels the craft in progress.
     */
    stopCraft(): void

    takeBlock(toolBagIndex: number, x: number, y: number, z: number): void

    takeItem(toolBagIndex: number, itemId): void

    takeItemAsync(toolBagIndex: number, itemId): Promise<number>

    talkWhisper(name: string, message: string, isJson: false | undefined): void

    talkWhisper(name: string, message: unknown, isJson: true): void

    targetId: number | null

    toggleMog(stationId: number, itemMd: string): void

    /**
     * Uneqip an item and put it in bag slow with index `itemIndex`
     * @param slotName which slot to unequip the item from. Possible values can be found in dw.c.gear
     * @param itemIndex index in dw.character.bag to unequip the item to
     */
    unequip(slotName: string, itemIndex?: number): void

    unlockItems(stationId: number): void

    /**
     * In case your character is stuck, and you have no way of unstucking yourself,
     * you can use this to return to "1.0.0". This will reset your spawn to "1.0.0".
     */
    unstuck(): void

    useElevator(elevatorId: number, z: number): void

    /**
     * Use skill on a target.
     * @param skillIndex
     * @param targetId
     */
    useSkill(skillIndex: number, targetId: number): void

    /**
     * Use a movement skill on a position.
     * @param skillIndex
     * @param x
     * @param y
     * @param z
     */
    useSkill(skillIndex: number, x: number, y: number, z?: number): void
  }

  interface BaseEntity {
    id: number
    /** Metadata ID */
    md: string

    // Portals or stations have an owner
    charDbId?: number

    /** @deprecated */
    l: number
    x: number
    y: number
    z: number
  }

  export interface Character extends LivingEntity {
    /** Means that this is a player. Value is always 1. */
    player: 1
    /** Character's name */
    name: string
    /** Equipped items */
    gear: Record<string, Item | null>
    /** threat modifier */
    threatMod: number
    /** Character's appearance */
    mtx: Record<string, number>

    charDbId: number
  }

  export type Chunk = Array<Array<Array<number>>>

  export type Entity =
    | YourCharacter
    | Character
    | Monster
    | Tree
    | Ore
    | Station

  type Events = {
    /**
     * This is not a socket event, but a client event to draw stuff on canvas.
     * @param eventName
     * @param listener
     */
    drawEnd: (ctx: CanvasRenderingContext2D, cx: number, cy: number) => void

    // Socket Events

    afx: (data: {
      id: number
      md: string
      v?: number
      d: number
      s?: number
    }) => void

    attack: (data: { error: string }) => void

    auth: (data: number) => void

    combat: (data: number) => void

    cd: (data: string) => void

    diff: (
      data: Array<{
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
        pname?: string
        pxp?: number
        xpGain?: number
        powers?: object
        skills?: Array<0 | Skill>
        i?: number
        bagItem?: null | Item
        bagItems?: Array<null | Item>
        craftInItems?: Array<null | Item>
        gcd?: number
      }>,
    ) => void

    dungeonBoard: (
      data: ['dungeonBoard', DungeonBoard] | { error: string },
    ) => void

    equip: (
      data:
        | { error: string }
        | {
        id: number
        slot: string
        i: number
        bag: string
      },
    ) => void

    eventBoard: (data: ['eventBoard', EventBoard] | { error: string }) => void

    frenzy: (data: { error: string }) => void

    gcd: (data: number) => void

    hit: (
      data: Array<{
        projId?: number
        md?: string
        actor: number
        target: number
        heal?: number
        /** @deprecated */
        amount?: number
        phys?: number
        fire?: number
        cold?: number
        elec?: number
        acid?: number
        val?: number
        rip?: number
      }>,
    ) => void

    levelUp: (data: { id: number }) => void

    loot: (
      data: Array<{
        i: number
        item: Item
        log: number
      }>,
    ) => void

    magicShrub: (data: { error: string }) => void

    missionTable: (
      data: ['missionTable', MissionTable] | { error: string },
    ) => void

    move: (data: { error: string }) => void

    moveItem: (
      data:
        | { error: string }
        | {
        name: string
        id?: number
        i: number
        item?: null | Item
      },
    ) => void

    proj: (data: {
      md: string
      mwd: string
      id: number
      aid: number
      tid: number
    }) => void

    partyDiff: (data: {
      dbId: number
      name?: string
      level?: number
      id?: number
      leader?: number
    }) => void

    partyInvite: (data: { from: string; id: number }) => void

    partyKick: (data: { dbId: number }) => void

    realEstateTable: (
      data: ['realEstateTable', RealEstateTable] | { error: string },
    ) => void

    rfx: (data: { id: number; md: string }) => void

    sendPartyInvite: (data: { error: string }) => void

    seenChunks: (
      data: Record<
        string,
        {
          terrain: Array<Array<Array<number>>>
        }
      >,
    ) => void

    seenObjects: (data: unknown) => void

    setRespawn: (data: { l: number; x: number; y: number }) => void

    setSpawn: (data: { l: number; x: number; y: number }) => void

    share: (data: number) => void

    takeItem: (data: { error: string }) => void

    talk: (data: { name: string; text: string }) => void

    tradingPost: (
      data: ['tradingPost', TradingPost] | { error: string },
    ) => void

    unseenChunks: (data: string) => void

    unseenObjects: (data: Array<number>) => void
  }

  export interface Item {
    /** Metadata ID */
    md: string

    /** Count, or 1 if undefined */
    n?: number

    /**
     * The rarity
     * 0 = white
     * 1 = green
     * 2 = blue
     * 3 = purple
     * 4 = orange
     */
    r?: number

    /** The item level / quality*/
    qual: number

    /** The modifiers on the item */
    mods?: Record<string, number>

    /** The components on the item (currently runes only) */
    cmps?: Record<string, number>

    /** Number of skulls (missions only) */
    s?: number
  }

  export interface LivingEntity extends BaseEntity {
    level: number
    /** Life */
    hp: number
    hpMax: number
    /** Mana */
    mp: number
    mpMax: number
    /** Movement speed. World units per second. Multiply by 96 to get pixels per second. */
    moveSpeed: number
    /**
     * Buffs & debuffs will be accessible here.
     */
    fx: Record<string, unknown>
    dx?: number
    dy?: number
    /** Current, if any*/
    targetId?: number
  }

  export interface Monster extends LivingEntity {
    /** Means that this is a monster. Value is always 1. */
    ai: 1
    /** Indicated whether the monster will attack you on sight */
    bad?: number
    /** time of activation */
    badCd?: number
    /** 1 is a normal monster. 2+ are bosses. */
    r: number
    /** Coop shield. */
    hps: number
    /** Terrain type on which the monster spawned */
    terrain: number
  }

  export interface Ore extends BaseEntity {
    /** Means that this is an ore. Value is always 1. */
    ore: 1
    /** Quality */
    qual: number

    hp: number
    hpMax: number
    hps: number
  }

  export interface Tree extends BaseEntity {
    /** Means that this is a tree. Value is always 1. */
    tree: 1
    /** Quality */
    qual: number

    hp: number
    hpMax: number
    hps: number
  }

  export interface Skill {
    cost: number
    md: string
    range: number
    val?: number
    phys?: number
    cold?: number
    elec?: number
    fire?: number
    acid?: number
    crit?: number
    critMult?: number
    speed?: number
  }

  export interface Station extends BaseEntity {
    /** Means that this is a station. Value is always 1. */
    station: 1
    /** Indicating whether you are the owner. */
    owner: number
    /** Owner Database ID */
    ownerDbId: number
    /** Storage of items */
    storage: Array<Item | null>
  }

  export interface YourCharacter extends Character {
    acidArmor: number

    armor: number

    /** Item inventory */
    bag: Array<Item | null>

    /** Gem pyramid in skill bar */
    cardBag: Array<Item | null>

    /** Skill specific timestamps of their cooldowns */
    cds: Record<string, number>

    coldArmor: number

    /** Indicator whether the character is currently in combat */
    combat?: number

    elecArmor: number

    fireArmor: number

    /** Timestamp of the global cooldown */
    gcd?: number

    /** the amount of mana points you restore every 1.5s */
    hpRegen: number

    mission?: {
      l: number
      x: number
      y: number

      item: Item

      /**
       * Percentage progress e.g. 6.0990909%
       */
      progress: number

      /**
       * When the timeout happens
       */
      timeoutAt: number
    }

    /** the amount of mana points you restore every 1.5s */
    mpRegen: number

    /**
     * Party information
     */
    party: Array<{
      dbId: number
      name: string
      level: number
      id: number
      leader?: number
    }>

    professions: Record<
      | 'axesmith'
      | 'armorsmith'
      | 'boomerangsmith'
      | 'bowsmith'
      | 'crossbowsmith'
      | 'daggersmith'
      | 'gemcutting'
      | 'macesmith'
      | 'metalworking'
      | 'mining'
      | 'platesmith'
      | 'sceptersmith'
      | 'spearsmith'
      | 'staffsmith'
      | 'stoneworking'
      | 'swordsmith'
      | 'wandsmith'
      | 'woodcutting'
      | 'woodworking',
      {
        md: string
        level: number
        xp: number
      }
    >

    physArmor: number

    /** Skills in skill bar */
    skillBag: Array<Item | null>

    /** Skill info for skills in skill bar */
    skills: Array<Skill | 0>

    /**
     * In-game called claimed land.
     * The top-left location of your main base.
     * The size is based on your level and caps at 7x7.
     */
    spawn: WorldPosition

    toolBag: Array<Item | null>

    /**
     * In-game called just spawn
     * The location where you respawn after death.
     * The location where your portals lead to by default.
     */
    respawn: WorldPosition

    xp: number
  }

  export interface WorldPosition {
    l: number
    x: number
    y: number
  }

  type DungeonBoard = Array<{
    md: string
    pos: [number, number, number]
  }>

  type EventBoard = Record<
    string,
    {
      ilvl: number
      l: number
      md: string
      terrain: number
      x: number
      y: number
    }
  >

  type RealEstateTable = Array<{
    dim: [number, number, number]
    id: number
    owner: string
    pos: [number, number, number]
  }>

  type MissionTable = Record<string, number>

  type TradingPost = Record<string, Record<number, number>>
}

declare const dw: DeepestWorld.API
