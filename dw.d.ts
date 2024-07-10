declare namespace DeepestWorld {
  interface Account {
    /** Currency to buy plots */
    gold: number
    /** Account ID */
    id: number
    /** Plots that you own */
    plots: Array<Plot>
  }

  type Ai = symbol

  interface API {
    a: Account

    /**
     * Abandon the current mission
     *
     * @group Mission
     *
     * @example
     * dw.abandonMission()
     */
    abandonMission(): Promise<void>

    /**
     * Abandon a quest
     * @param questId
     * @returns the quest ID
     *
     * @group Quest
     *
     * @example
     * await dw.abandonQuest(questId)
     */
    abandonQuest(questId: number): Promise<number>

    /**
     * Accept the first mission in the mission table storage
     *
     * @group Mission
     *
     * @example
     * const missionTable = dw.findClosestEntity(
     *   (e) => e.md === 'missionTable' && !!e.owner
     * )
     *
     * dw.acceptMission(missionTable.id)
     */
    acceptMission(missionTableId: number): void

    /**
     * Accept a quest
     * @param questId
     * @returns the quest ID
     *
     * @group Quest
     *
     * @example
     * await dw.acceptQuest(questId)
     */
    acceptQuest(questId: number): Promise<number>

    account: Account

    /**
     * Add a transmog
     * @param stationId
     * @param bagIndex
     *
     * @group Other
     */
    addMog(stationId: number, bagIndex: number): void

    /**
     * Buy a plot of land
     * @param realEstateTableId
     * @param x
     * @param y
     * @param z
     * @param w
     * @param h
     * @param d
     *
     * @group Building
     */
    buyPlot(
      realEstateTableId: number,
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
    ): void

    /**
     * Buy a teleport to an event via an event board
     * @param eventBoardId
     * @param eventId
     *
     * @group Travel
     */
    buyTeleport(eventBoardId: number, eventId: number): Promise<void>

    /** Reference to your character */
    c: YourCharacter

    /**
     * The camera position for the main canvas
     */
    camera: {
      x: number
      y: number
    }

    /**
     * Rune mana costs check.
     * @param skillIndex
     *
     * @group Skill
     */
    canPayCost(skillIndex: number): boolean

    /**
     * Checks whether the rune can be used - mana, range, global cooldown and rune cooldown checks.
     * @param runeIndex
     * @param args
     * @deprecated use dw.canUseSkill instead
     */
    canUseRune(
      runeIndex: number,
      ...args: [number] | [number, number] | [{ x: number; y: number }]
    ): boolean

    /**
     * Checks whether the rune can be used - mana, range, global cooldown and rune cooldown checks.
     * @param skillIndex
     * @param args
     *
     * @group Skill
     *
     * @example
     * dw.canUseSkill(0, target.id)
     * dw.canUseSkill(0, x, y, z)
     */
    canUseSkill(
      skillIndex: number,
      ...args: [number] | [number, number] | [{ x: number; y: number }]
    ): boolean

    /**
     * Checks whether the skill is on cooldown,
     * can be used without `skillIndex` to check for GCD.
     * @param skillIndex
     * @deprecated use dw.isOnCd instead
     */
    canUseSkillCd(skillIndex?: number): boolean

    /**
     * Checks whether the skill can be used with the current resources.
     * @param skillIndex
     * @deprecated use dw.canPayCost instead
     */
    canUseSkillCost(skillIndex?: number): boolean

    /**
     * Checks whether the target would be in range for spell.
     * @param skillIndex
     * @param args
     * @deprecated use dw.isInRange instead
     */
    canUseSkillRange(
      skillIndex,
      ...args: [number] | [number, number] | [{ x: number; y: number }]
    ): boolean

    /** Another reference to your character */
    char: YourCharacter

    /** Another reference to your character **/
    character: YourCharacter

    /**
     * Determines how long the chat will be visible after adding a new message.
     */
    chatHideDelay: number

    /**
     * Chop a tree.
     * @param toolBagIndex id of the tool in toolBag
     * @param target tree entity id or entity
     * @deprecated use `dw.gather` instead
     */
    chop(toolBagIndex: number, target: number | { id: number }): void

    /**
     * This contains the chunks of the world.
     *
     * @deprecated use `dw.getTerrainAt` instead
     */
    chunks: Record<string, Chunk>

    /**
     * Combines all stackable items in the combine section of your inventory.
     *
     * @group Item
     *
     * @example
     * await dw.combine()
     */
    combine(): Promise<unknown>

    /**
     * Complete a quest
     * @param questId
     * @returns the quest ID
     *
     * @group Quest
     *
     * @example
     * await dw.completeQuest(questId)
     */
    completeQuest(questId: number): Promise<number>

    constants: {
      ATTR_TYPES: Array<string>
      BYTE_LIMIT: number
      BYTE_LIMIT_TIMESPAN: number
      CALL_LIMIT: number
      CALL_LIMIT_TIMESPAN: number
      CHARACTER_DMG_BASE: number
      CHARACTER_HP_BASE: number
      /** @deprecated */
      CHARACTER_SPEED: number
      /** @deprecated */
      CHUNK_DIM: [number, number, number]
      /** @deprecated */
      CHUNK_DIMENSION: [number, number, number]
      CHUNK_SIZE: {
        w: number
        h: number
        d: number
      }
      CRIT_BASE: number
      CRIT_MULT_BASE: number
      DMG_TYPES: Array<string>
      DMG_TYPE_FX_CHANCE_BASE: number
      DMG_TYPE_FX_MAX: number
      /** @deprecated */
      GCD: number
      GCD_BASE: number
      GCD_MIN: number
      INTERACT_RANGE: number
      LEVEL_BUFFER: number
      MAX_BASE_MOD_TIER: number
      MAX_DMG_TYPE_EFFECT: number
      MAX_DODGE: number
      MAX_MOD_TIER: number
      MAX_REP: number
      MAX_RES: number
      /** @deprecated */
      MELEE_RANGE: number
      MIN_REP: number
      MISSION_RANGE: number
      MONSTER_HP_BASE: number
      MOVEMENT_SPEED_BASE: number
      PIXELS_PER_UNIT: number
      PX_PER_UNIT: number
      PX_PER_UNIT_ZOOMED: number
      RANGE_MELEE_BASE: number
      RANGE_RANGED_BASE: number
      RARITY_BLUE: number
      RARITY_GREEN: number
      RARITY_ORANGE: number
      RARITY_PURPLE: number
      RARITY_WHITE: number
      TERRAIN_CLOUD: number
      TERRAIN_DESERT: number
      TERRAIN_DESERT_CAVE: number
      TERRAIN_DIRT: number
      TERRAIN_EMPTY: number
      TERRAIN_GRASS: number
      TERRAIN_STONE: number
      TERRAIN_STONEROOF1: number
      TERRAIN_TREE: number
      TERRAIN_UNDERWATER: number
      TERRAIN_WATER: number
      TERRAIN_WINTER: number
      TERRAIN_WINTER_CAVE: number
      TERRAIN_WOODWALL1: number
      VERSION: number
      XP_DEATH_PENALTY: number
      ZONE_LEVELS_PER_ZONE_TIER: number
      ZONE_LEVEL_RADIUS: number
      /** @deprecated */
      ZONE_TIER_ZONE_LEVEL_RADIUS: number
    }

    /**
     * @param benchId
     * @param recipeMd
     * @param limit Number of items to craft. If you pass 0, your character will craft until they run out of mats or space. Default is 0
     *
     * @group Item
     *
     * @example
     * await dw.craft(undefined, 'stoneColumn')
     */
    craft(
      benchId: number | undefined,
      recipeMd: string,
      limit?: number,
    ): Promise<void>

    /**
     * Indicates that debug information will appear in console
     */
    debug?: boolean

    /**
     * @param bagIndex index of the item in dw.character.bag
     *
     * @group Item
     *
     * @example
     * dw.deleteItem(bagIndex)
     */
    deleteItem(bagIndex: number): Promise<void>

    /**
     * Destroys a station
     * @param buildingId
     *
     * @group Building
     *
     * @example
     * dw.destroyBuilding(furnace.id)
     */
    destroyBuilding(buildingId: number): void

    /**
     * Disenchants item in bag with index `indexItem,
     * uses an enchanting device provided by `enchantingDeviceId`.
     * @param altarOfSacrificeId
     * @param bagIndex
     *
     * @group Item
     *
     * @example
     * dw.disenchant(altarOfSacrifice.id, 0)
     */
    disenchant(altarOfSacrificeId: number, bagIndex: number): Promise<void>

    /**
     * Calculates the Euclidean distance between two points
     * @param from
     * @param to
     * @deprecated use the same function, but with 4 parameters now
     *
     * @example
     * dw.distance(dw.character, target)
     */
    distance(
      from: { x: number; y: number },
      to: { x: number; y: number },
    ): number

    /**
     * Calculates the Euclidean distance between two points
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     *
     * @group Basic
     *
     * @example
     * dw.distance(dw.character.x, dw.character.y, target.x, target.y)
     */
    distance(x1: number, y1: number, x2: number, y2: number): number

    /**
     * Donates to an altar
     * @param altarId
     * @param amount
     *
     * @group Other
     *
     * @example
     * dw.donate(altar.id, 30)
     */
    donate(altarId: number, amount: number): Promise<void>

    /**
     * Indicates that the game will draw the world
     */
    draw: boolean

    /** Your surroundings: monsters, characters, trees, etc */
    e: Array<Entity>

    /** Monaco Editor */
    editor: unknown

    emit(eventName: 'abandonMission'): void

    emit(eventName: 'abandonQuest', data: { id: number }): void

    emit(eventName: 'acceptMission', data: { id: number }): void

    emit(eventName: 'acceptPartyInvite', data: { id: number }): void

    emit(eventName: 'acceptQuest', data: { id: number }): void

    emit(eventName: 'addXmog', data: { i: number; id: number }): void

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
    emit(eventName: 'chop', data: { id: number; i: number }): void

    emit(eventName: 'claimLand', data: { x: number; y: number }): void

    /**
     * Combines stackable crafting items together
     * @param eventName
     */
    emit(eventName: 'combine'): void

    emit(eventName: 'completeQuest', data: { id: number }): void

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

    emit(eventName: 'donate', data: { id: number; n: number }): void

    emit(eventName: 'dungeonBoard', data: { id: number }): void

    emit(
      eventName: 'elevator',
      data: {
        id: number
        z: number
      },
    ): void

    emit(
      eventName: 'enchantItem',
      data: {
        id: number
        md: string
        i: number
      },
    ): void

    emit(eventName: 'enterCar', data: { id: number }): void

    emit(eventName: 'enterPortal', data: { id: number }): void

    emit(eventName: 'enterMission', data: { id: number; i: number }): void

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

    emit(eventName: 'forceKillChar'): void

    emit(eventName: 'gather', data: { i: number; id: number }): void

    emit(eventName: 'listQuest', data: { id: number }): void

    emit(eventName: 'loadout', data: { id: number }): void

    emit(eventName: 'lockItems', data: { id: number }): void

    emit(eventName: 'magicShrub', data: { id: number }): void

    emit(eventName: 'marketSell', data: { id: number; md: string }): void

    /**
     * Mines ores, like rock, iron, gems...
     * @param eventName
     * @param data
     */
    emit(eventName: 'mine', data: { i: number; id: number }): void

    emit(eventName: 'missionTable', data: { id: number }): void

    emit(eventName: 'move'): void

    emit(eventName: 'move', data: { x?: number; y?: number }): void

    emit(
      eventName: 'moveItem',
      data: {
        a: {
          i: number
          id?: number
          name: string
        }
        b: {
          i?: number
          id?: number
          name?: string
        }
        fId?: number
      },
    ): void

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

    emit(eventName: 'newQuest', data: { id: number }): void

    emit(eventName: 'openItem', data: { i: number }): void

    emit(
      eventName: 'openPortal',
      data: {
        i: number
        name?: string
      },
    ): void

    emit(eventName: 'readSign', data: { id: number }): void

    emit(eventName: 'renameStation', data: { id: number; name: string }): void

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

    emit(eventName: 'removeXmog', data: { id: number }): void

    emit(eventName: 'repair', data: { i: number; id: number }): void

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

    emit(
      eventName: 'stationInfo',
      data: { id: number; info?: string | Record<string, unknown> },
    )

    emit(
      eventName: 'takeBlock',
      data: { i: number; x: number; y: number; z: number },
    )

    emit(eventName: 'takeItem', data: { i: number; id: number })

    emit(eventName: 'talkGlobal', data: { m: string }): void

    emit(eventName: 'talkLocal', data: { m: string }): void

    emit(eventName: 'talkParty', data: { m: string }): void

    emit(eventName: 'talkTrade', data: { m: string }): void

    emit(eventName: 'talkWhisper', data: { name: string; m: string }): void

    emit(eventName: 'toggleXmog', data: { id: number; md: string }): void

    emit(eventName: 'toggleStation', data: { id: number }): void

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

    /**
     * Emits an unknown event
     * @param eventName
     * @param data
     */
    emit(eventName: string, data: unknown): void

    /**
     * Enchant an item
     * @param stationId
     * @param recipeMd
     * @param baxIndex
     *
     * @group Item
     *
     * @example
     * dw.enchant(station.id, 'randAllMods', 0)
     */
    enchant(
      stationId: number,
      recipeMd: string,
      baxIndex: number,
    ): Promise<void>

    /**
     * Enchant an item
     * @param enchantingDeviceId
     * @param enchantMd
     * @param baxIndex
     *
     * @deprecated use `dw.enchant` instead
     */
    enchantItem(
      enchantingDeviceId: number,
      enchantMd: string,
      baxIndex: number,
    ): Promise<void>

    /**
     * Enter a car
     * @param carId
     *
     * @group Travel
     *
     * @example
     * dw.enterCar(car.id)
     */
    enterCar(carId: number): void

    /**
     * Use a magic shrub to teleport to a new location
     * @param magicShrubId
     *
     * @group Travel
     *
     * @example
     * dw.enterMagicShrub(magicShrub.id)
     */
    enterMagicShrub(magicShrubId: number): Promise<void>

    /**
     * Enter a mission
     * @param missionTableId
     *
     * @group Mission
     *
     * @example
     * dw.enterMission(missionTable.id)
     */
    enterMission(missionTableId: number): Promise<void>

    /**
     * Use the portal to get to the linked portal
     * @param portalId
     *
     * @group Travel
     *
     * @example
     * dw.enterPortal(portal.id)
     */
    enterPortal(portalId: number): Promise<void>

    /** Your surroundings: monsters, characters, trees, etc */
    entities: Array<Entity>

    enums: {
      Ai: Record<string, Ai>
      Rarity: Record<string, Rarity>
      Tag: Record<string, Tag>
      Terrain: Record<string, Terrain>
    }

    /**
     * Equip an item.
     * @param itemIndex
     * @param slotName
     *
     * @group Item
     *
     * @example
     * dw.equip(0)
     * dw.equip(1, 'ring1')
     */
    equip(itemIndex: number, slotName?: string): Promise<void>

    /**
     * Indicator to show errors
     */
    errors: boolean

    /**
     * This should not be used directly, use `dw.on`, `dw.once`, `dw.off` instead.
     */
    eventDispatcher: {
      listeners: Record<keyof Events, Map<unknown, unknown>>
    }

    /**
     * Exists the car
     *
     * @group Travel
     *
     * @example
     * dw.exitCar()
     */
    exitCar(): void

    /**
     * Retrieve discovered dungeons from the dungeon board     *
     * @param dungeonBoardId
     * @param callback
     *
     * @group Other
     *
     * @example
     * dw.fetchDungeons(dungeonBoard.id, console.table)
     */
    fetchDungeons(
      dungeonBoardId: number,
      callback: (data?: DungeonBoard, error?: string) => void,
    ): void

    /**
     * Retrieve active events from the event board
     * @param eventBoardId
     * @param callback
     *
     * @group Other
     *
     * @example
     * dw.fetchEvents(eventBoard.id, console.table)
     */
    fetchEvents(
      eventBoardId: number,
      callback: (data?: EventBoard, error?: string) => void,
    ): void

    /**
     * @param realEstateTableId
     * @param callback
     *
     * @group Other
     *
     * @example
     * dw.fetchPlots(realEstateTable.id, console.table)
     */
    fetchPlots(
      realEstateTableId: number,
      callback: (data?: RealEstateTable, error?: string) => void,
    ): void

    /**
     * @param npcId
     *
     * @group Quest
     *
     * @example
     * await dw.fetchQuests(npc.id)
     */
    fetchQuests(npcId: number): Promise<Quest[]>

    /**
     * Fill a bucket in toolBag with water from a water source at x, y, z
     * @param toolBagIndex
     * @param x
     * @param y
     * @param z
     */
    fillItem(toolBagIndex: number, x: number, y: number, z: number): void

    /**
     * Find all entities matching a filter criteria.
     *
     * @param filter
     *
     * @group Entity
     */
    findAllEntities(filter: (entity: Entity) => boolean): Entity[]

    /**
     * Find the closest entity matching a filter criteria.
     * @param filter
     *
     * @group Entity
     */
    findClosestEntity(filter?: (entity: Entity) => boolean): Entity | undefined

    /**
     * Find the closest monster matching a filter criteria.
     * @param filter
     *
     * @group Entity
     */
    findClosestMonster(
      filter?: (entity: Monster) => boolean,
    ): Monster | undefined

    /**
     * Find the closest tree matching a filter criteria.
     * @param filter
     *
     * @group Entity
     */
    findClosestTree(filter?: (entity: Tree) => boolean): Tree | undefined

    /**
     * Find all entities matching a filter criteria.
     * @param filter
     *
     * @deprecated use `dw.findAllEntities` instead
     */
    findEntities(filter: (entity: Entity) => boolean): Entity[]

    /**
     * Find a single entity matching a filter criteria.
     * @param filter
     *
     * @deprecated use `dw.findOneEntity` instead
     */
    findEntity(filter: (entity: Entity) => boolean): Entity | undefined

    /**
     * Find a single entity matching a filter criteria.
     * @param filter
     * @alias findEntity
     *
     * @group Entity
     */
    findOneEntity(filter: (entity: Entity) => boolean): Entity | undefined

    /**
     * Current framerate = frames per second
     */
    fps: number

    /**
     * Gather a resource, requires specific tool for each resource.
     * `axe` for trees, `pickaxe` for rocks and `ores`, `sickle` for plants.
     * @param toolBagIndex
     * @param target
     */
    gather(toolBagIndex: number, target: number | { id: number }): void

    /**
     * Retrieve something from `localStorage`, it will have been `JSON.parse`d already.
     * @param key
     *
     * @group Other
     */
    get<T = unknown>(key: string): T | null

    /**
     * @param x
     * @param y
     * @param z
     *
     * @deprecated will be removed soon
     */
    getChunkHash(x: number, y: number, z: number): string

    /**
     * Returns the key of the chunk at this world position.
     * @param x
     * @param y
     * @param z
     *
     * @deprecated will be removed soon
     */
    getChunkKey(x: number, y: number, z: number): string

    /**
     * Returns the key of the chunk at this world position.
     * @param x
     * @param y
     * @param z
     *
     * @deprecated will be removed soon
     */
    getChunkName(x: number, y: number, z: number): string

    /**
     * Get name for an entity by their metadata ID.
     * @param md
     *
     * @deprecated use `dw.mdInfo[md]?.name` instead
     */
    getEntityName(md: string): string | undefined

    /**
     * Collider when moving with your character.
     * @param md Metadata ID
     * @param variation default is 0
     */
    getHitbox(md: string, variation?: number): Dimension2

    /**
     * @deprecated use `dw.itemBaseValue` instead
     * @see itemBaseValue
     */
    getItemBaseValue(item: DeepestWorld.Item): number | undefined

    /**
     * @deprecated use `dw.itemModValue` instead
     * @see itemModValue
     */
    getItemModValue(item: DeepestWorld.Item, s: string): number | undefined

    /**
     * Collider when placing objects on the ground.
     * @param md Metadata ID
     * @param variation Variation. Default is 0
     */
    getPlacebox(md: string, variation?: number): Dimension2

    /**
     * Returns the terrain type at this world position.
     *
     * @deprecated use `dw.getTerrainAt` instead
     * @see getTerrainAt
     */
    getTerrain(x: number, y: number, z: number): Terrain | undefined

    /**
     * Returns the terrain type at this world position.
     * Greater than 0 is unpassable terrain,
     * 0 is empty and lower than 0 is passable terrain such as water.
     * @param x
     * @param y
     * @param z
     */
    getTerrainAt(x: number, y: number, z: number): Terrain | undefined

    /**
     * If you pass nothing to the function, it will use your character position.
     * @param x
     * @param y
     * @param z
     *
     * @group Basic
     */
    getZoneLevel(x?: number, y?: number, z?: number): number

    /**
     * If you pass nothing to the function, it will use your character position.
     * @param x
     * @param y
     * @param z
     *
     * @group Basic
     */
    getZoneTier(x?: number, y?: number, z?: number)

    /**
     * @param runeIndex
     *
     * @deprecated use `dw.canPayCost` instead
     * @see canPayCost
     */
    hasMp(runeIndex: number): boolean

    /**
     * @param tagName
     * @param itemMd Metadata ID
     *
     * @group Other
     */
    hasTag(tagName: string, itemMd: string): boolean

    /**
     * Checks whether the target would be in range for spell.
     * @param skillIndex
     * @param args
     * @deprecated use `dw.isInRange` instead
     * @see isInRange
     */
    inSkillRange(
      skillIndex: number,
      ...args: [number] | [number, number] | [{ x: number; y: number }]
    ): boolean

    /**
     * @param aiName
     * @param entityMd Metadata ID
     *
     * @group Other
     */
    isAi(aiName: string, entityMd: string): boolean | undefined

    /**
     * Rune range check.
     * @param runeIndex
     * @param args
     *
     * @group Skill
     *
     * @example
     * dw.isInRange(0, target.id);
     * dw.isInRange(0, x, y);
     */
    isInRange(runeIndex: number, ...args: [number] | [number, number]): boolean

    /**
     * Rune cooldown check
     *
     * @group Skill
     */
    isOnCd(runeIndex: number): boolean

    /**
     * Global cooldown check.
     *
     * @group Skill
     */
    isOnGcd(): boolean

    /**
     * Indicate the game is in a ready state.
     */
    isReady: boolean

    /**
     * Checks whether the target would be in range for spell.
     * @param skillIndex
     * @param args
     * @deprecated use dw.canUseSkillRange instead
     */
    isSkillInRange(
      skillIndex: number,
      ...args: [number] | [number, number] | [{ x: number; y: number }]
    ): boolean

    /**
     * Checks whether the skill is on cooldown,
     * can be used without `skillIndex` to check for GCD.
     * @param skillIndex
     * @deprecated use `dw.canUseSkillCd` instead
     * @see canUseSkillCd
     */
    isSkillReady(skillIndex?: number): boolean

    /**
     * Calculates the base damage/healing/armor of an item.
     * Includes the added damage/healing/armor from local mods.
     *
     * `physDmgLocal` would be included.
     *
     * `physDmg` would not be included.
     *
     * `physDmgIncLocal` would not be included.
     *
     * `physDmgInc` would not be included.
     * @param item item to evaluate
     * @returns <number> or if the item is invalid <undefined>
     *
     * @group Item
     */
    itemBaseValue(item: DeepestWorld.Item): number | undefined

    /**
     * @param item item to evaluate
     * @param s md of the mod to evaluate
     * @returns <number> or if the item or `modName` is invalid <undefined>
     *
     * @group Item
     */
    itemModValue(item: DeepestWorld.Item, s: string): number | undefined

    /**
     * Loads a script
     * @param script
     */
    loadScript(script: string): Promise<void>

    /**
     * Switches to the loadout of the station.
     * @param stationId
     *
     * @group Other
     */
    loadout(stationId: number): void

    /**
     * Locks all items on the station.
     * @param stationId
     *
     * @group Other
     */
    lockItems(stationId: number): void

    /**
     * Outputs a message in the chat window that only you can see.
     * @param message
     */
    log(message: unknown): void

    /**
     * @deprecated use `dw.mdInfo` instead
     * @see mdInfo
     */
    md: {
      chunkSize: number
      chunkSizeX: number
      chunkSizeY: number
      chunkSizeZ: number
      e: Record<string, OldMetaDataEntity>
      entities: Record<string, OldMetaDataEntity>
      i: Record<string, OldMetaDataItem>
      items: Record<string, OldMetaDataItem>
      recipes: Record<string, OldMetaDataRecipe>
      skills: Record<string, OldMetaDataSkill>
    }

    mdInfo: Record<string, MetaData>

    /**
     * Mine an ore.
     * @param toolBagIndex the id of the ore
     * @param target the id of the ore
     *
     * @deprecated use `dw.gather` instead
     * @see gather
     */
    mine(toolBagIndex: number, target: number | { id: number }): void

    /**
     * Moves your character.
     *
     * @group Basic
     */
    move(x: number, y: number): void

    /**
     * Move the car
     * @param cardId
     * @param dx
     * @param dy
     *
     * @group Travel
     */
    moveCar(cardId: number, dx: number, dy: number): void

    /**
     * Your character bag names are: 'bag', 'craftIn', 'abilities', 'abilityBag'.
     * Other objects bag names are: 'storage'.
     * @param bagNameFrom Name of the bag
     * @param bagIndexFrom Index of the item in the bag
     * @param bagNameTo
     * @param bagIndexTo
     * @param storageIdFrom When interacting with a station
     * @param storageIdTo When interacting with a station
     * @param finderId When interacting with a book or essence finder
     *
     * @group Item
     */
    moveItem(
      bagNameFrom: string,
      bagIndexFrom: number,
      bagNameTo: string,
      bagIndexTo?: number,
      storageIdFrom?: number,
      storageIdTo?: number,
      finderId?: number,
    ): Promise<void>

    /**
     * @param npcId
     *
     * @group Quest
     */
    newQuest(npcId: number): Promise<void>

    /**
     * A timestamp for when the chat message will next be hidden.
     */
    nextChatHideAt: number

    /**
     * Removes an event listener previously registered with `dw.on()` or `dw.once()`.
     * @param eventName
     * @param listener
     *
     * @group Other
     */
    off<E extends keyof Events>(eventName: E, listener: Events[E]): void

    /**
     * Adds an event listener that will be called every time when the specified event is triggered.
     * @param eventName
     * @param listener
     * @param timeout
     *
     * @group Other
     */
    on<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
      timeout?: number,
    ): void

    /**
     * Adds an event listener that will be called one time when the specified event is triggered.
     * @param eventName
     * @param listener
     * @param timeout
     *
     * @group Other
     */
    once<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
      timeout?: number,
    ): void

    /**
     * To open items such as mission bags, packages, etc.
     * @param bagIndex
     *
     * @group Item
     */
    openItem(bagIndex: number): Promise<unknown>

    /**
     * @param missionTableId
     *
     * @deprecated use `dw.acceptMission` instead
     * @see acceptMission
     */
    openMission(missionTableId: number): Promise<number>

    /**
     * To open a portal to your spawn.
     * @param characterName To instead open a portal to a character.
     * They have to be in your party
     * @returns the portal server ID
     */
    openPortal(characterName?: string): Promise<number>

    /**
     * To open a portal to your spawn.
     * @param portalBagIndex
     * @param characterNameOld To instead open a portal to a character.
     * They have to be in your party
     * @returns the portal server ID
     * @deprecated use `dw.openPortal` without the `portalBagIndex` parameter
     */
    openPortal(
      portalBagIndex: unknown,
      characterNameOld?: string,
    ): Promise<number>

    /**
     * @param eventBoardId
     * @param eventId
     * @param portalScrollBagIndex
     *
     * @deprecated use `dw.buyTeleport` instead
     * @see buyTeleport
     */
    openPortalToEvent(
      eventBoardId: number,
      eventId: number,
      portalScrollBagIndex: number,
    ): Promise<void>

    /**
     * Accept a party invitation.
     * @param partyInviteId
     *
     * @group Party
     *
     * @example
     * dw.on('partyInvite', data => {
     *     dw.partyAccept(data.id)
     * })
     */
    partyAccept(partyInviteId: number): Promise<void>

    /**
     * Decline a party invitation.
     * @param partyInviteId
     *
     * @group Party
     *
     * @example
     * dw.on('partyInvite', data => {
     *     dw.partyDecline(data.id)
     * })
     */
    partyDecline(partyInviteId: number): Promise<void>

    /**
     * Invite a player to your party.
     * @param targetName
     *
     * @group Party
     */
    partyInvite(targetName: string): Promise<void>

    /**
     * Kick a player from your party.
     * @param targetName
     *
     * @group Party
     */
    partyKick(targetName: string): Promise<void>

    /**
     * Leave your current party.
     *
     * @group Party
     */
    partyLeave(): Promise<void>

    /**
     * Promote a player to party leader.
     * @param targetName
     *
     * @group Party
     */
    partyPromote(targetName: string): Promise<void>

    /**
     * Place a block in the world.
     * @param toolBagIndex
     * @param x
     * @param y
     * @param z
     *
     * @group Building
     */
    placeBlock(toolBagIndex: number, x: number, y: number, z: number): void

    /**
     * Place an item in the world.
     * @param bagIndex index of the item in dw.character.bag
     * @param x
     * @param y
     * @param variation
     *
     * @group Building
     */
    placeItem(
      bagIndex: number,
      x: number,
      y: number,
      variation?: number,
    ): Promise<void>

    /**
     * Pour an item onto a station.
     * @param toolBagIndex
     * @param targetId
     */
    pourItem(toolBagIndex: number, targetId: number): void

    /**
     * Read a sign.
     * @param signId
     *
     * @group Other
     */
    readSign(signId: number): Promise<unknown>

    /**
     * Removes all event listeners previously registered with `dw.on()` or `dw.once()`.
     * @param eventName
     *
     * @group Other
     */
    removeAllListeners<E extends keyof Events>(eventName: E): void

    /**
     * @param eventName
     * @param listener
     *
     * @deprecated use `dw.off` instead
     * @see off
     */
    removeListener<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
    ): void

    /**
     * @param stationId
     * @param itemMd
     * @param bagIndex
     *
     * @group Other
     */
    removeMog(stationId: number, itemMd: string, bagIndex: number): void

    /**
     * @param missionTableId
     * @param portalBagIndex
     *
     * @deprecated use `dw.enterMission` instead
     * @see enterMission
     */
    reopenMission(
      missionTableId: number,
      portalBagIndex: number,
    ): Promise<number>

    /**
     * Repair a station.
     * @param toolBagIndex
     * @param objectId
     *
     * @group Building
     */
    repair(toolBagIndex: number, objectId: number): void

    /**
     * @deprecated use `dw.suicide` instead
     * @see suicide
     */
    rip(): void

    /**
     * @deprecated use `suicide` instead
     * @see suicide
     */
    selfDestruct(): void

    /**
     * @param realEstateTableId
     * @param plotId
     *
     * @group Building
     */
    sellPlot(realEstateTableId: number, plotId: number): void

    /**
     * Send an item to another player. The receiver has to be in your party.
     * @param receiver Either the ID or the name of the receiving player
     * @param itemIndex index of the item in your dw.character.bag
     *
     * @group Item
     */
    sendItem(receiver: number | string, itemIndex: number): void

    /**
     * Send items to another player via mailbox
     * @param mailboxId
     * @param recipientName If the character doesn't exist, mail will be sent back to you, but the shipping cost won't be refunded
     * @param itemsBagIndexes Items to package and send. Max 8 items
     * @param portalScrollsBagIndexes Used to pay shipping cost
     *
     * @group Item
     *
     * @example
     * // Sends to "Gnal" the items at indexes 0, 1, 2.
     * // Uses a portal scroll at index 3 to pay item at index 0 shipping cost.
     * // Uses a portal scroll at index 4 to pay item at index 1 shipping cost.
     * // Uses a portal scroll at index 5 to pay item at index 2 shipping cost.
     *
     * dw.sendMail(mailbox.id, 'Gnal', [0, 1, 2], [3, 4, 5])
     */
    sendMail(
      mailboxId: number,
      recipientName: string,
      itemsBagIndexes: Array<number>,
      portalScrollsBagIndexes: Array<number>,
    ): void

    /**
     * Adds a value to `localStorage`, it will have been `JSON.stringify`d already.
     * @param key
     * @param value
     */
    set(key: string, value: unknown): void

    /**
     * Sets the location where you respawn when you die and where portals you open lead to.
     */
    setSpawn(): void

    /**
     * To show the target unit frame top left of the screen.
     * @param targetId
     */
    setTarget(targetId: number): void

    /**
     * Sorts your inventory aka the bag
     *
     * @deprecated use `dw.sortInventory` instead
     * @see sortInventory
     */
    sortInv(): Promise<void>

    /**
     * Sorts your inventory aka the bag
     */
    sortInventory(): Promise<void>

    /**
     * Adds data to a station. It can be string or object.
     * @param stationId
     * @param info
     */
    stationInfo(stationId: number, info: string | Record<string, unknown>): void

    /**
     * Stops your character from moving.
     *
     * @group Basic
     */
    stop(): void

    /**
     * Cancels the craft in progress.
     *
     * @group Item
     */
    stopCraft(): void

    /**
     * If you're unable to get out of somewhere, this will kill your character.
     * Counts as a regular death.
     */
    suicide(): void

    /**
     * @param toolBagIndex
     * @param x
     * @param y
     * @param z
     *
     * @group Building
     */
    takeBlock(toolBagIndex: number, x: number, y: number, z: number): void

    /**
     * @param toolBagIndex
     * @param itemId
     *
     * @group Building
     */
    takeItem(toolBagIndex: number, itemId): Promise<void>

    /**
     * @param name
     * @param message
     * @param isJson If true, the message will be JSON.stringify()
     */
    talkWhisper(name: string, message: string, isJson: false | undefined): void

    /**
     * @param name
     * @param message
     * @param isJson If true, the message will be JSON.stringify()
     */
    talkWhisper(name: string, message: unknown, isJson: true): void

    /**
     * The current target id.
     */
    targetId: number | null

    /**
     * Terrain data, accessed via `dw.getTerrainAt()`
     */
    terrain: Map<number, Terrain[][]>

    /**
     * Converts world position to canvas position
     * @param x
     */
    toCanvasX(x: number): number

    /**
     * Converts world position to canvas position
     * @param y
     */
    toCanvasY(y: number): number

    /**
     * @param stationId
     * @param itemMd
     *
     * @group Other
     */
    toggleMog(stationId: number, itemMd: string): void

    /**
     * @param stationId
     */
    toggleStation(stationId: number): void

    /**
     * Uneqip an item and put it in bag slow with index `itemIndex`
     * @param slotName which slot to unequip the item from. Possible values can be found in dw.c.gear
     * @param bagIndex index in `dw.character.bag` to unequip the item to
     */
    unequip(slotName: string, bagIndex?: number): void

    /**
     * Unlocks all items on the station.
     * @param stationId
     *
     * @group Other
     */
    unlockItems(stationId: number): void

    /**
     * If you're stuck inside a wall or an object, this will teleport you to your spawn.
     *
     * @group Other
     */
    unstuck(): void

    /**
     * @param elevatorId
     * @param z
     *
     * @group Travel
     */
    useElevator(elevatorId: number, z: number): void

    /**
     * @param runeIndex
     * @param args
     *
     * @deprecated use `dw.useSkill` instead
     * @see useSkill
     */
    useRune(
      runeIndex: number,
      ...args:
        | [number]
        | [number, number]
        | [number, number, number]
        | [{ id: number }]
        | [
        {
          x: number
          y: number
          z?: number
        },
      ]
    ): Promise<void>

    /**
     * @param skillIndex
     * @param args
     *
     * @group Skill
     *
     * @example
     * dw.useSkill(0, target.id);
     * dw.useSkill(0, x, y, z);
     */
    useSkill(
      skillIndex: number,
      ...args:
        | [number]
        | [number, number]
        | [number, number, number]
        | [
        {
          x: number
          y: number
          z?: number
        },
      ]
    ): Promise<void>
  }

  interface BaseEntity {
    id: number
    /** Metadata ID */
    md: string

    // Portals or stations have an owner
    cid?: number

    hp: number
    maxHp: number
    hps: number

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

    /** Account id */
    aid: number
    /** Character id */
    cid: number
  }

  export type Chunk = Array<Array<Array<number>>>

  export type Dimension2 = {
    /**
     * Length on x
     */
    w: number
    /**
     * Length on y
     */
    h: number
  }

  export type Entity =
    | YourCharacter
    | Character
    | Monster
    | NPC
    | Tree
    | Ore
    | Station

  type Events = {
    /**
     * This is not a socket event, but a client event to draw stuff on canvas.
     * It will be called last.
     *
     * @param eventName
     * @param listener
     */
    drawEnd: (ctx: CanvasRenderingContext2D, cx: number, cy: number) => void

    /**
     * This is not a socket event, but a client event to draw stuff on canvas.
     * It will be called
     *
     * @param eventName
     * @param listener
     */
    drawUnder: (ctx: CanvasRenderingContext2D, cx: number, cy: number) => void

    /**
     * This is a "catch all" event for generic data handling.
     *
     * @param data
     */
    '*': (msg: string, data: unknown) => void

    // Socket Events
    abandonQuest: (data: { error: string } | unknown) => void

    acceptMission: (data: { error: string }) => void

    acceptQuest: (data: { error: string } | unknown) => void

    afx: (data: {
      id: number
      md: string
      v?: number
      d: number
      s?: number
    }) => void

    attack: (data: { error: string }) => void

    auth: (data: number) => void

    /**
     * This event is called when you make too many calls to the server.
     * @param data
     *
     * @example
     * dw.on('callLimitDc', () => alert('got disconnected due to call limit'))
     */
    callLimitDc: (data: Record<string, never>) => void

    /**
     * This event is triggered when a chunk can no longer be seen.
     * @param data
     */
    chunks0: (data: number) => void

    /**
     * This event is triggered when new chunks become visible to the user
     * @param data
     */
    chunks1: (data: (number | number[][])[]) => void

    combat: (data: number) => void

    completeQuest: (data: { error: string } | unknown) => void

    cd: (data: string) => void

    diff: (
      data: Array<{
        id: number
        x?: number
        y?: number
        z?: number
        md?: string
        rarity?: number
        level?: number
        hp?: number
        maxHp?: number
        hps?: number
        hpRegen?: number
        mp?: number
        maxMp?: number
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

    enterPortal: (data: { error: string }) => void

    enterMission: (data: { error: string }) => void

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

    l: (
      data: Array<
        | [number, number, number, number]
        | [number, number, number, number, number]
      >,
    ) => void

    levelUp: (data: { id: number }) => void

    listQuest: (data: { error?: string }) => void

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

    newQuest: (data: { error?: string }) => void

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

    openItem: (data: { error?: string }) => void

    openPortal: (data: { error: string }) => void

    readSign: (data: { error: string }) => void

    realEstateTable: (
      data: ['realEstateTable', RealEstateTable] | { error: string },
    ) => void

    rfx: (data: { id: number; md: string }) => void

    sacItem: (data: { error: string }) => void

    sendPartyInvite: (data: { error: string }) => void

    /**
     * @param data
     * @deprecated use `dw.on('chunk1', ...)` instead
     */
    seenChunks: (data: Record<string, number[][][]>) => void

    seenObjects: (data: unknown) => void

    setRespawn: (data: { l: number; x: number; y: number }) => void

    setSpawn: (data: { l: number; x: number; y: number }) => void

    share: (data: number) => void

    takeItem: (data: { error: string }) => void

    talk: (data: { name: string; text: string }) => void

    /**
     * @param data
     * @deprecated use `dw.on('chunk0', ...)` instead
     */
    unseenChunks: (data: string) => void

    unseenObjects: (data: Array<number>) => void
  }

  export interface Item {
    /** Indicated the item is locked, preventing deleteItem, disenchant, sendItem, sendMail, enchant */
    l?: number

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

    /** The base multipliers for the specific item */
    base?: Record<string, number>

    /** The modifiers on the item */
    mods?: Record<string, number>

    /** The components on the item (currently runes only) */
    cmps?: Record<string, number>

    /** Number of skulls (missions only) */
    s?: number
  }

  export interface LivingEntity extends BaseEntity {
    level: number
    /** Mana */
    mp: number
    maxMp: number
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

  export interface NPC extends Monster {
    race: string
    skin: number
    questIds: Array<number>
  }

  export interface Ore extends BaseEntity {
    /** Means that this is an ore. Value is always 1. */
    ore: 1
    /** Quality */
    qual: number
  }

  export interface Tree extends BaseEntity {
    /** Means that this is a tree. Value is always 1. */
    tree: 1
    /** Quality */
    qual: number
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
    cd?: number
  }

  export interface Station extends BaseEntity {
    /** Means that this is a station. Value is always 1. */
    station: 1
    /** Indicating whether you are the owner. */
    owner: number
    /** Owner Database ID */
    aid: number
    level: number
    lvl: number
    qual: number
    safe: number
    wild: number
    /** Storage of items */
    storage: Array<Item | null> | Record<string, Item>
    /** Storage of items */
    output?: Array<Item | null> | Record<string, Item>
    powerOn?: boolean
    v?: number
  }

  export interface YourCharacter extends Character {
    acidArmor: number

    armor: number

    /** Item inventory */
    bag: Array<Item | null>

    crafting?: number

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

    gcdValue: number

    /** the amount of mana points you restore every 1.5s */
    hpRegen: number

    mission?: {
      x: number
      y: number
      z: number

      item: Item

      /**
       * Percentage progress e.g. 6.0990909%
       */
      progress: number

      reward: number

      deaths: number
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
      Profession,
      {
        md: string
        level: number
        xp: number
      }
    >

    physArmor: number

    silver: number

    /** Skills in skill bar */
    skillBag: Array<Item | null>

    /** Skill info for skills in skill bar */
    skills: Array<Skill | 0>

    spawn: {
      x: number
      y: number
      z: number
    }

    toolBag: Array<Item | null>

    quests: Array<{
      data: {
        name: string
      } & Record<string, unknown>
      id: number
      items: Array<Item>
      maxProgress: number
      md: string
      progress: number
      silver: number
    }>

    recipes: Record<string, number>

    rep: number

    /**
     * @deprecated use spawn instead
     */
    respawn: {
      l: number
      x: number
      y: number
    }

    xmogs: Record<string, Item>

    xp: number
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

  interface Hitbox extends Float32Array {
    length: 2
  }

  type Plot = {
    /** Server ID */
    id: number
    x: number
    y: number
    z: number
    /** length on x-axis */
    w: number
    /** length on y-axis */
    h: number
    /** length on z-axis */
    d: number
    /** Timestamp when you can sell the plot */
    sellCd: number
    /** @deprecated use `w`, `h`, `l` instead */
    dim: [number, number, number]
    /** @deprecated use `x`, `y`, `z` instead */
    pos: [number, number, number]
  }

  type RealEstateTable = Array<{
    dim: [number, number, number]
    id: number
    owner: string
    pos: [number, number, number]
  }>

  type OldMetaDataEntity = {
    canChop?: true
    canGather?: true
    canHunt?: true
    canMine?: true
    canCollide?: true
    /** @deprecated use canCollide instead */
    collidable?: true
    hitbox?: [number, number]
    isBox?: true
    isMonster?: true
    isNpc?: true
    isPlayer?: true
    isPortal?: true
    isResource?: true
    isStation?: true
    isVessel?: true
    /** @deprecated use isMonster instead */
    monster?: true
    /** @deprecated use canMine instead */
    ore?: true
    /** @deprecated use isPlayer instead */
    player?: true
    /** @deprecated use isPortal instead */
    portal?: true
    /** @deprecated use isResource instead */
    resource?: true
    /** @deprecated use canChop instead */
    tree?: true
  }

  type OldMetaDataItem = {
    /** @deprecated use isArmor instead */
    armor?: true
    box?: true
    cd?: number
    dmgTypes?: string[]
    essence?: true
    gearSlots?: string[]
    gem?: true
    isAccessory?: true
    isArmor?: true
    isBox?: true
    isEssence?: true
    isGem?: true
    isMat?: true
    isRune?: true
    isSkill?: true
    isStation?: true
    isTool?: true
    isVessel?: true
    isWeapon?: true
    /** @deprecated use isAccessory instead */
    jewelry?: true
    /** @deprecated use isMat instead */
    mat?: true
    movement?: true
    /** @deprecated use isStation instead */
    placeable?: true
    recipe?: {
      professions?: Record<Profession, null | number>
      stationType: string
    }
    s?: number
    /** @alias gearSlots */
    slots?: string[]
    /** @deprecated use isSkill/isRune instead */
    skill?: true
    tags?: Set<symbol>
    /** @deprecated use isTool instead */
    tool?: true
    vessel?: true
    /** @deprecated use isWeapon instead */
    weapon?: true
  }

  type OldMetaDataRecipe = Record<
    string,
    {
      mats: Record<
        string,
        {
          n?: number
          r?: number
        }
      >
      minLevel?: number
      professions?: Profession[]
    }
  >

  type OldMetaDataSkill = {
    cd?: number
    movement?: boolean
  }

  type MetaData = {
    ai?: symbol
    armor?: true
    box?: true
    canChop?: true
    canCollide?: true
    canGather?: true
    canHunt?: true
    canMine?: true
    canOpen?: true
    cd?: number
    collidable?: true
    dmgTypes?: ('acid' | 'cold' | 'elec' | 'fire' | 'phys')[]
    essence?: true
    gearSlots?: (
      | 'amulet'
      | 'ring1'
      | 'ring2'
      | 'chest'
      | 'helmet'
      | 'gloves'
      | 'boots'
      | 'belt'
      | 'shield'
      | 'mainHand'
      )[]
    gem?: true
    hitbox?: Hitbox
    isAccessory?: true
    isArmor?: true
    isBox?: true
    isEssence?: true
    isGem?: true
    isMat?: true
    isMission?: true
    isMonster?: true
    isNpc?: true
    isPlant?: true
    isPlayer?: true
    isPortal?: true
    isResource?: true
    isRune?: true
    isSkill?: true
    isStation?: true
    isTool?: true
    isVessel?: true
    isWeapon?: true
    jewelry?: true
    mat?: true
    monster?: true
    movement?: true
    name?: string
    ore?: true
    placeable?: true
    player?: true
    portal?: true
    recipe?: {
      mats: Record<
        string,
        {
          n: number
          r?: number
        }
      >
      minLevel?: number
      minLvl?: number
      professions?: Profession[]
      stationType: string
    }
    resource?: true
    s?: number
    skill?: true
    slots?: (
      | 'amulet'
      | 'ring1'
      | 'ring2'
      | 'chest'
      | 'helmet'
      | 'gloves'
      | 'boots'
      | 'belt'
      | 'shield'
      | 'mainHand'
      )[]
    tags?: Set<symbol> | symbol[]
    tool?: true
    tree?: true
    type?: string
    vessel?: true
  }

  type MissionTable = Record<string, number>

  type Profession =
    | 'armorsmith'
    | 'axesmith'
    | 'boomerangsmith'
    | 'bowsmith'
    | 'crossbowsmith'
    | 'daggersmith'
    | 'gemcutting'
    | 'herbalism'
    | 'hunting'
    | 'leatherworking'
    | 'macesmith'
    | 'metalworking'
    | 'mining'
    | 'plantFarming'
    | 'runecrafting'
    | 'sceptersmith'
    | 'shieldsmith'
    | 'spearsmith'
    | 'staffsmith'
    | 'stoneworking'
    | 'swordsmith'
    | 'tailoring'
    | 'wandsmith'
    | 'woodcutting'
    | 'woodworking'

  type Quest = {
    /**
     * Server ID
     */
    id: number
    /**
     * Metadata ID
     */
    md: number
    /**
     * NPC x
     */
    x: number
    /**
     * NPC y
     */
    y: number
    /**
     * NPC z
     */
    z: number
    maxProgress: number
    /**
     * Server ID
     */
    npcId: number
    progress: number
    reward: QuestReward
    /**
     * Objective
     */
    target: QuestTarget
  }

  type QuestReward = {
    items: Item[]
    professionXp: Record<string, number>
    xp: number
  }

  type QuestTarget = {
    /**
     * Metadata ID
     */
    md: string
    minLvl: number
    r: Rarity
  }

  type Rarity = number

  type Tag = symbol

  type Terrain = number
}

declare const dw: DeepestWorld.API
