type ToCamelCase<S extends string> =
  S extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}${Capitalize<ToCamelCase<Rest>>}`
    : Lowercase<S>;

declare namespace DeepestWorld {
  interface API {
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
     * @deprecated use dw.addTransmog
     * @see addTransmog
     */
    addMog(inventoryIndex: number): Promise<void>

    /**
     * Links a Passive to a Skill.
     *
     * @param skillIndex
     * @param passiveIndex
     * @param skillMdid
     *
     * @group Other
     */
    addPassive(skillIndex: number, passiveIndex: number, skillMdid: string): Promise<void>

    /**
     * Adds a Skill to the action bar.
     *
     * @group Other
     */
    addSkill(skillIndex: number, skillMdid: string): Promise<void>

    /**
     * Add a skill point
     *
     * @group Skill
     *
     * @example
     * dw.addSkillPoint()
     */
    addSkillPoint(statMdid: string, numPoints: number): Promise<void>

    /**
     * Add a transmog from the specified inventory slot.
     * Requires a nearby transmog station.
     *
     * @param inventoryIndex
     *
     * @group Other
     */
    addTransmog(inventoryIndex: number): Promise<void>

    /**
     * Buy a plot of land
     *
     * @param realEstateTableId
     * @param x World x-coordinate
     * @param y World y-coordinate
     * @param z World z-coordinate
     * @param w Width (i.e., the length on x)
     * @param h Height (i.e., the length on y)
     * @param d Depth (i.e., the length on z)
     *
     * @group Other
     */
    buyPlot(
      realEstateTableId: number,
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number,
    ): Promise<void>

    /**
     * Reference to your character
     *
     * @see character
     */
    c: Character

    /**
     * The camera position for the main canvas
     */
    camera: {
      x: number
      y: number
    }

    /**
     * @deprecated use dw.isGatherable instead
     * @see isGatherable
     */
    canGather(target: Entity): Boolean

    /**
     * Returns `true` if the character has enough resources to use the skill; otherwise returns `false`.
     *
     * @param skillIndex Index of the Skill object in dw.character.skills
     *
     * @group Skill
     */
    canPayCost(skillIndex: number): boolean

    /**
     * Checks if the consumable is not on cooldown.
     *
     * @param inventoryIndex
     *
     * @group Character
     */
    canUseConsumable(inventoryIndex: number): boolean

    /**
     * @deprecated use dw.canUseSkill instead
     * @see canUseSkill
     */
    canUseRune(
      runeIndex: number,
      ...args: [Entity] | [number] | [number, number]
    ): boolean

    /**
     * Combined check for `isReady`, `canPayCost` and `isInRange`.\
     *
     * @param skillIndex Index of the Skill object in dw.character.skills
     * @param args Target entity or target entity id or target coordinates
     *
     * @group Skill
     *
     * @example
     * dw.canUseSkill(0, target)
     * dw.canUseSkill(0, target.id)
     * dw.canUseSkill(0, x, y)
     */
    canUseSkill(
      skillIndex: number,
      ...args: [Entity] | [number] | [number, number]
    ): boolean

    /**
     * @deprecated use `dw.isOnCd` instead
     * @see isOnCd
     */
    canUseSkillCd(skillIndex?: number): boolean

    /**
     * @deprecated use dw.canPayCost instead
     * @see canPayCost
     */
    canUseSkillCost(skillIndex?: number): boolean

    /**
     * @deprecated use dw.isInRange instead
     */
    canUseSkillRange(
      skillIndex: number,
      ...args: [number] | [number, number] | [{ x: number; y: number }]
    ): boolean

    /**
     * Requires a nearby market station.
     *
     * @param orderId
     *
     * @group Market
     */
    cancelOrder(orderId: number): Promise<void>

    /**
     * Reference to your character
     *
     * @see character
     */
    char: Character

    /** Reference to your character */
    character: Character

    /**
     * @deprecated use `dw.gather` instead
     * @see gather
     */
    chop(toolBagIndex: number, target: Entity | number): void

    /**
     * This contains the chunks of the world.
     *
     * @deprecated use `dw.terrain` instead
     * @see terrain
     */
    chunks: Record<string, Chunk>

    /**
     * Climb a wall
     *
     * @param x
     * @param y
     * @param z
     *
     * @group Undocumented
     */
    climb(x: number, y: number, z: number): Promise<void>

    /**
     * @deprecated use `dw.combineItems` instead
     * @see combineItems
     */
    combine(): Promise<unknown>

    /**
     * Combines all stackable items present in the recycler input.
     *
     * @alias combine
     * @see combine
     */
    combineItems(): Promise<unknown>

    constants: {
      AGGRO_RANGE: number
      /** Max bytes per BYTE_LIMIT_TIMESPAN */
      BYTE_LIMIT: number
      /** Time in milliseconds */
      BYTE_LIMIT_TIMESPAN: number
      /** Max calls per CALL_LIMIT_TIMESPAN */
      CALL_LIMIT: number
      /** Time in milliseconds */
      CALL_LIMIT_TIMESPAN: number
      /** @deprecated */
      CHUNK_DIM: [number, number, number]
      /** @deprecated */
      CHUNK_DIMENSION: [number, number, number]
      CHUNK_SIZE: {
        w: number
        h: number
        d: number
      }
      CRIT: number
      CRIT_MULT: number
      DMG_TYPE_FX_CHANCE_BASE: number
      DMG_TYPE_FX_MAX: number
      /** Base global cooldown */
      GCD: number
      /** @deprecated */
      GCD_BASE: number
      /**
       * All tools have this range, except gathering tools use MELEE_RANGE
       *
       * @see MELEE_RANGE
       */
      INTERACT_RANGE: number
      LEVEL_BUFFER: number
      MAX_DMG_TYPE_EFFECT: number
      MAX_DODGE: number
      MAX_MOD_TIER: number
      MAX_REP: number
      MAX_RES: number
      MELEE_RANGE: number
      MAX_STACK_SIZE: number
      MIN_REP: number
      /** @deprecated */
      MISSION_RANGE: number
      /** @deprecated */
      MOVEMENT_SPEED_BASE: number
      /** @deprecated */
      PIXELS_PER_UNIT: number
      PX_PER_UNIT: number
      /** PX_PER_UNIT * zoom */
      PX_PER_UNIT_ZOOMED: number
      RANGED_RANGE: number
      /** @deprecated */
      RANGE_MELEE_BASE: number
      TIER_SIZE: number
      /** Two-handed weapon power multiplier */
      TWO_HANDED_MULT: number
      VERSION: number
      XP_DEATH_PENALTY: number
      ZONE_LEVELS_PER_ZONE_TIER: number
      ZONE_LEVEL_RADIUS: number
    }

    /**
     * Requires a nearby crafting station.
     *
     * @param {Object} opts Number of items to craft. If you pass 0, your character will craft until they run out of mats or space. Default is 0
     * @param {Type} opts.stationType The crafting station to use
     * @param {Type} opts.type The item to craft
     * @param {number} opts.lvl `-1` will craft max possible. Default `-1`
     * @param {number} opts.num `-1` will craft max possible. Default `-1`
     * @param {Rarity} opts.r
     * @param {DmgType} opts.dmgType
     * @param {MatType} opts.matType
     * @param {Tier} opts.tier
     *
     * @group Item
     */
    craft(opts: {
      stationType: Type,
      tyoe: Type,
      lvl?: number,
      num?: number,
      r?: Rarity,
      dmgType?: DmgType,
      matType?: MatType,
      tier?: Tier,
    }): Promise<void>

    /**
     * Indicates that debug mode is enabled.
     * Entity ids will show up on the target frame.
     * Some debug information will appear in console
     */
    debug?: boolean

    /**
     * Possible bag values: `dw.c.inventory`, `dw.c.mailbox`, `dw.c.recycler.input`, `dw.c.bankTabs[i].items`.
     * @param bag item container,
     * @param index index of the item
     *
     * @group Item
     *
     * @example
     * dw.deleteItem("deleteBagItem", bagIndex)
     */
    deleteItem(bag: object, index: number): Promise<void>

    /**
     * purely internally used map to keep track of items possible to delete
     */
    deleteItemMap: Map<object, [string, { i?: number }]>

    /**
     * @deprecated use `dw.destroyStation` instead
     * @see destroyStation
     */
    destroyBuilding(stationId: number): void

    /**
     * Destroys a station
     * @param stationId
     *
     * @group Building
     *
     * @example
     * dw.destroyStation(station.id)
     */
    destroyStation(stationId: number): void

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
     *
     * @group Utility
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
     * @group Utility
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
    ): void

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
    ): void

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
    ): void

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

    emit(eventName: 'pour', data: { i: number; id: number }): void

    emit(eventName: 'realEstateTable', data: { id: number }): void

    emit(eventName: 'removeXmog', data: { id: number }): void

    emit(eventName: 'repair', data: { i: number; id: number }): void

    emit(eventName: 'sacItem', data: { id: number; i: number }): void

    emit(eventName: 'saveCode', data: { code: string }): void

    emit(eventName: 'sellLand', data: { benchId: number; id: number }): void

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
    ): void

    emit(
      eventName: 'takeBlock',
      data: { i: number; x: number; y: number; z: number },
    ): void

    emit(eventName: 'takeItem', data: { i: number; id: number }): void

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
     * Enchant an item. Requires a nearby enchanting station.
     * @param opts
     * @param opts.enchantType The enchant to put on the item
     * @param opts.bag 'inventory' or 'gear'. Default 'inventory'
     * @param opts.index If bagName is 'gear', this is the slot name, otherwise it is the inventory index
     * @param opts.modType
     * @param opts.luckyQual Default: `false`
     * @param opts.luckyMods Default: `false`
     *
     * @group Item
     */
    enchant(
      opts: {
        enchantType: EnchantType
        bag?: string
        index: number | string
        modType?: ModType
        luckyQual?: boolean
        luckyMods?: boolean
      }
    ): Promise<void>

    /**
     * @deprecated use `dw.enchant` instead
     */
    enchantItem(
      opts: {
        enchantType: EnchantType
        bag?: string
        index: number | string
        modType?: ModType
        luckyQual?: boolean
        luckyMods?: boolean
      }
    ): Promise<void>

    /**
     * Enter a car
     * @param carId
     *
     * @example
     * dw.enterCar(car.id)
     */
    enterCar(carId: number): void

    /**
     * Use a magic shrub to teleport to a new location
     * @param magicShrubId
     *
     * @group Character
     *
     * @example
     * dw.enterMagicShrub(magicShrub.id)
     */
    enterMagicShrub(magicShrubId: number): Promise<void>

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
      Class: Record<ClassMd, Class>
      DmgType: Record<DmgTypeMd, DmgType>
      EnchantType: Record<EnchantTypeMd, EnchantType>
      MatType: Record<MatTypeMd, MatType>
      ModType: Record<ModTypeMd, ModType>
      Profession: Record<ProfessionMd, Profession>
      Rarity: Record<RarityMd, Rarity>
      Stage: Record<StageMd, Stage>
      Terrain: Record<TerrainMd, Terrain>
      Tier: Record<TierMd, Tier>
      Type: Record<TypeMd, Type>
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
     * This should not be used directly, use `dw.on`, `dw.once`, `dw.off` instead.
     */
    eventDispatcher: {
      listeners: Record<keyof Events, Map<unknown, unknown>>
    }

    /**
     * Exists the car
     *
     * @example
     * dw.exitCar()
     */
    exitCar(): void

    /**
     * Retrieve missions. Requires a nearby mission station.
     *
     * @param missionType
     *
     * @group Mission
     */
    fetchMissions(missionType: string): Promise<void>

    /**
     * Fill a bucket in toolBag with water from a water source at x, y, z
     * Possibly no longer works, since there are no more buckets.
     *
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
     *
     * @param filter
     *
     * @group Entity
     */
    findClosestEntity(filter?: (entity: Entity) => boolean): Entity | undefined

    /**
     * Find the closest monster matching a filter criteria.
     *
     * @param filter
     *
     * @group Entity
     */
    findClosestMonster(filter?: (entity: Entity) => boolean): Entity | undefined

    /**
     * Find the closest tree matching a filter criteria.
     *
     * @param filter
     *
     * @group Entity
     */
    findClosestTree(filter?: (entity: Entity) => boolean): Entity | undefined

    /**
     * @deprecated use `dw.findAllEntities` instead
     * @see findAllEntities
     */
    findEntities(filter: (entity: Entity) => boolean): Entity[]

    /**
     * @deprecated use `dw.findOneEntity` instead
     * @see findOneEntity
     */
    findEntity(filter: (entity: Entity) => boolean): Entity | undefined

    /**
     * Find a single entity matching a filter criteria.
     *
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
     * Gather a resource.
     *
     * @param targetId
     */
    gather(targetId: Entity | number): void

    /**
     * Retrieve something from `localStorage`, it will have been `JSON.parse`d already.
     * @param key
     *
     * @group Other
     */
    get<T = unknown>(key: string): T | null

    /**
     * @deprecated will be removed sooner or later
     */
    getChunkHash(x: number, y: number, z: number): string

    /**
     * @deprecated will be removed sooner or later
     */
    getChunkKey(x: number, y: number, z: number): string

    /**
     * @deprecated will be removed sooner or later
     */
    getChunkName(x: number, y: number, z: number): string

    /**
     * Requires a nearby crafting station.
     *
     * @param {Object} opts Number of items to craft. If you pass 0, your character will craft until they run out of mats or space. Default is 0
     * @param {Type} opts.stationType The crafting station to use
     * @param {Type} opts.type The item to craft
     * @param {number} opts.lvl `-1` will craft max possible. Default `-1`
     * @param {number} opts.num `-1` will craft max possible. Default `-1`
     * @param {Rarity} opts.r
     * @param {DmgType} opts.dmgType
     * @param {MatType} opts.matType
     * @param {Tier} opts.tier
     *
     * @group Item
     */
    getCraftingRecipe(opts: {
      stationType: Type,
      tyoe: Type,
      lvl?: number,
      num?: number,
      r?: Rarity,
      dmgType?: DmgType,
      matType?: MatType,
      tier?: Tier,
    }): Promise<void>

    /**
     * @deprecated use `dw.itemModValue` instead
     * @see itemModValue
     */
    getItemModValue(item: Item, modName: string): number | undefined

    /**
     * Get party member info for a party member or throws otherwise.
     *
     * @param characterName
     */
    getPartyMemberInfo(characterName: string): Promise<{
      x: number
      y: number
      z: number
    }>

    /**
     * @deprecated use `dw.getTerrainAt` instead
     * @see getTerrainAt
     */
    getTerrain(x: number, y: number, z: number): number | undefined

    /**
     * Returns the terrain type at this world position.
     * Greater than 0 is unpassable terrain,
     * 0 is empty and lower than 0 is passable terrain such as water.
     *
     * @param x
     * @param y
     * @param z
     *
     * @group Utility
     */
    getTerrainAt(x: number, y: number, z: number): number | undefined

    /**
     * If you pass nothing to the function, it will use your character position.
     * @param x
     * @param y
     * @param z
     *
     * @group Utility
     */
    getZoneLevel(x?: number, y?: number, z?: number): number

    /**
     * If you pass nothing to the function, it will use your character position.
     * @param x
     * @param y
     * @param z
     *
     * @group Utility
     */
    getZoneTier(x?: number, y?: number, z?: number): number

    /**
     * @deprecated use `dw.canPayCost` instead
     * @see canPayCost
     */
    hasMp(runeIndex: number): boolean

    /**
     * @deprecated use `entity.tags.has` instead
     * @see Entity
     */
    hasTag(tagName: string, itemMd: string): boolean

    /**
     * @deprecated use `dw.isInRange` instead
     */
    inSkillRange(
      skillIndex: number,
      ...args: [Entity] | [number] | [number, number]
    ): boolean

    /**
     * @deprecated use `dw.isReady` instead
     * @see isReady
     */
    isCdReady(): boolean

    /**
     * Returns `true` if the target entity is gatherable,
     * if the character meets the required profession level to gather it,
     * and if the entity is not owned by another player;
     * otherwise returns `false`.
     *
     * @param target
     *
     * @group Skill
     */
    isGatherable(target: Entity): boolean

    /**
     * @deprecated use `dw.isReady` instead
     * @see isReady
     */
    isGcdReady(): boolean

    /**
     * @deprecated use `dw.isInRange` instead
     * @see isInRange
     */
    isInGatherRange(): boolean

    /**
     * Returns `true` if the skill is within range of the target; otherwise returns `false`
     * @param skillIndex Index of the Skill object in dw.character.skills. Pass null to check for gathering range
     * @param args Target entity or target entity id or target coordinates
     *
     * @group Skill
     *
     * @example
     * dw.isInRange(0, target);
     * dw.isInRange(0, target.id);
     * dw.isInRange(0, x, y);
     */
    isInRange(skillIndex: number, ...args: [Entity] | [number] | [number, number]): boolean

    /**
     * @deprecated use `dw.isReady` instead
     * @see isReady
     */
    isOnCd(skillIndex: number): boolean

    /**
     * @deprecated use `dw.isReady` instead
     * @see isReady
     */
    isOnGcd(): boolean

    /**
     * Returns `true` if the skill is ready to be used; otherwise returns `false`.
     * If `skillIndex` is omitted, it only checks whether the character is off global cooldown or not.
     */
    isReady(skillIndex?: number): boolean

    /**
     * @deprecated use dw.canUseSkillRange instead
     * @see canUseSkillRange
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
     * @deprecated use entity.class instead
     * @see Entity
     */
    isType(): boolean

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
    itemBaseValue(item: Item): number | undefined

    /**
     * @param item item to evaluate
     * @param s md of the mod to evaluate
     * @returns <number> or if the item or `modName` is invalid <undefined>
     *
     * @group Item
     */
    itemModValue(item: Item, s: string): number | undefined

    /**
     * Requires a nearby Mission station.
     *
     * @param missionId
     *
     * @group Mission
     */
    joinMission(missionId: number): Promise<void>

    /**
     * Learns a Skillbook.
     *
     * @param inventoryIndex
     *
     * @group Other
     */
    learn(inventoryIndex: number): Promise<void>

    /**
     * Loads a script
     *
     * @param script
     * @param opts
     */
    loadScript(script: string, opts?: { attrs: Record<string, string> }): Promise<void>

    /**
     * Switches to the loadout of the station.
     *
     * @param stationId
     *
     * @group Other
     */
    loadout(stationId: number): Promise<void>

    /**
     * Locking an item prevents the following calls on that item: deleteItem, recycling, sendItem, sendMail, enchant.
     *
     * @param stationId
     *
     * @group Other
     */
    lockItem(stationId: number): Promise<void>

    /**
     * Outputs a message in the chat window that only you can see.
     * @param message
     *
     * @group Other
     */
    log(message: unknown): void

    /**
     * @group Mission
     */
    makeMissionPrivate(): Promise<void>

    /**
     * @group Mission
     */
    makeMissionPublic(): Promise<void>

    /**
     * @deprecated use `dw.mdInfo` instead
     * @see mdInfo
     */
    md: {
      e: Record<string, OldMetaDataEntity>
      entities: Record<string, OldMetaDataEntity>
      i: Record<string, OldMetaDataItem>
      items: Record<string, OldMetaDataItem>
    }

    mdInfo: Record<string, MetaData>

    /**
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
     * purely internally used map to keep track of items possible to move
     */
    moveItemMap: Map<object, [string, { i?: number }]>

    /**
     * Moves a Skill on the action bar.
     *
     * @param fromIndex
     * @param toIndex
     *
     * @group Other
     */
    moveSkill(fromIndex: number, toIndex: number): Promise<void>

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
     * Removes all event listeners previously registered with `dw.on` or `dw.once`.
     *
     * @param eventName
     */
    offAll<E extends keyof Events>(eventName: E): void

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
    openItem(bagIndex: number): Promise<void>

    /**
     * To open a portal to your spawn.
     * @param characterName To instead open a portal to a character.
     * They have to be in your party
     * @returns the portal server ID
     */
    openPortal(characterName?: string): Promise<number>

    /**
     * To open a portal to your spawn or a character in your party.
     *
     * @param characterName
     *
     * @returns the portal server ID
     */
    openPortal(characterName?: string): Promise<number>

    openPortalToEvent: undefined

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
     * @param characterName
     *
     * @group Party
     */
    partyInvite(characterName: string): Promise<void>

    /**
     * Kick a player from your party.
     * @param characterName
     *
     * @group Party
     */
    partyKick(characterName: string): Promise<void>

    /**
     * Leave your current party.
     *
     * @group Party
     */
    partyLeave(): Promise<void>

    /**
     * Promote a player to party leader.
     * @param characterName
     *
     * @group Party
     */
    partyPromote(characterName: string): Promise<void>

    /**
     * Place a block in the world.
     *
     * @param x
     * @param y
     * @param z
     *
     * @group Building
     */
    placeBlock(x: number, y: number, z: number): Promise<void>

    /**
     * @deprecated use `dw.placeStation` instead
     * @see placeStation
     */
    placeItem(
      inventoryIndex: number,
      x: number,
      y: number,
      variation?: number,
    ): Promise<void>

    /**
     * Place a buy order on the market.
     * Requires a nearby market station.
     *
     * @param sellOpts
     * @param buyOpts
     */
    placeOrder(sellOpts: {
      type: Type
      lvl: number
      num: number
      r?: Rarity
      dmgType?: DmgType
      matType?: MatType
      stage?: Stage
      ratio: number
    }, buyOpts: {
      type: Type
      minLvl: number
      maxLvl: number
      r?: Rarity
      dmgType?: DmgType
      matType?: MatType
      stage?: Stage
      ratio: number
    }): Promise<void>

    /**
     * Place a station into the world.
     *
     * @param inventoryIndex
     * @param x
     * @param y
     * @param variation
     *
     * @group Building
     */
    placeStation(
      inventoryIndex: number,
      x: number,
      y: number,
      variation?: number,
    ): Promise<void>

    /**
     * Pour an item onto a station.
     *
     * @param targetId
     */
    pourItem(targetId: number): void

    /**
     * Projectiles flying through the air.
     */
    projectiles: Projectile[]

    /**
     * Recycles all valid items present in the recycler input.
     */
    recycle(): Promise<void>

    /**
     * @deprecated see `dw.offAll` instead
     * @see offAll
     */
    removeAllListeners<E extends keyof Events>(eventName: E): void

    /**
     * @deprecated see `dw.offAll` instead
     * @see offAll
     */
    removeListener<E extends keyof Events>(
      eventName: E,
      listener: Events[E],
    ): void

    /**
     * @deprecated use `dw.toggleTransmog` instead
     * @see toggleTransmog
     */
    removeMog(stationId: number, itemMd: string, bagIndex: number): void

    /**
     * Unlinks a Passive from a Skill.
     *
     * @param skillIndex
     * @param passiveIndex
     *
     * @group Other
     */
    removePassive(skillIndex: number, passiveIndex: number): Promise<void>

    /**
     * Removes a Skill from the action bar.
     *
     * @param skillIndex
     *
     * @group Other
     */
    removeSkill(skillIndex: number): Promise<void>

    /**
     * Requires a nearby transmog station.
     *
     * @param itemMd
     * @param inventoryIndex
     *
     * @group Other
     */
    removeTransmog(itemMd: string, inventoryIndex?: number): Promise<void>

    /**
     * Repair a station.
     *
     * @param stationId
     *
     * @group Building
     */
    repair(stationId: number): Promise<void>

    /**
     * @deprecated use `dw.suicide` instead
     * @see suicide
     */
    rip(): Promise<void>

    /**
     * @deprecated use `dw.suicide` instead
     * @see suicide
     */
    selfDestruct(): Promise<void>

    /**
     * @param plotId
     *
     * @group Building
     */
    sellPlot(plotId: number): Promise<void>

    /**
     * Send an item to another player. The receiver has to be in your party.
     * @param recipientName Either the ID or the name of the receiving player
     * @param inventoryIndex index of the item in your dw.character.bag
     *
     * @group Item
     */
    sendItem(recipientName: number | string, inventoryIndex: number): void

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
    setSpawn(): Promise<void>

    /**
     * To show the target unit frame top left of the screen.
     *
     * @param target
     */
    setTarget(target: Entity | number): void

    /**
     * @deprecated use `dw.sortInventory` instead
     * @see sortInventory
     */
    sortInv(): Promise<void>

    /**
     * Sorts your inventory
     */
    sortInventory(): Promise<void>

    /**
     * Requires a nearby Mission station.
     *
     * @param missionType
     * @param missionLvl
     *
     * @group Mission
     */
    startMission(missionType: string, missionLvl: number): Promise<void>

    /**
     * Stops your character from moving.
     *
     * @group Character
     */
    stop(): void

    /**
     * If you're unable to get out of somewhere, this will kill your character.
     * Counts as a regular death.
     */
    suicide(): Promise<void>

    /**
     * Possible bag values: `dw.c.mailbox`, `dw.c.recycler.output`.
     *
     * @group Item
     */
    takeAllItems(bag: unknown): Promise<void>

    /**
     * purely internally used map to keep track of items possible to take
     */
    takeAllItemsMap: Map<object, string>

    /**
     * @param x
     * @param y
     * @param z
     *
     * @group Other
     */
    takeBlock(x: number, y: number, z: number): void

    /**
     * @deprecated use `dw.takeStation` instead
     * @see takeStation
     */
    takeItem(itemId: number): Promise<void>

    /**
     * @param orderId
     *
     * @group Market
     */
    takeOrder(orderId: number): Promise<void>

    /**
     * @param itemId
     *
     * @group Building
     */
    takeStation(itemId: number): Promise<void>

    /**
     * @deprecated use `dw.whisper` instead
     * @see whisper
     */
    talkWhisper(characterName: string, message: string | unknown): Promise<void>

    /**
     * The current target id.
     */
    targetId: number | null

    /**
     * Terrain data, accessed via `dw.getTerrainAt()`
     */
    terrain: Map<string, number[][][]>

    time: number

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
     * @deprecated use `dw.toggleTransmog` instead
     * @see toggleTransmog
     */
    toggleMog(itemMd: string): Promise<void>

    /**
     * @param itemMd
     *
     * @group Other
     */
    toggleTransmog(itemMd: string): Promise<void>

    /**
     * Uneqip an item and put it in bag slow with index `itemIndex`
     *
     * @param slotName which slot to unequip the item from. Possible values can be found in dw.c.gear
     * @param inventoryIndex index in `dw.character.bag` to unequip the item to
     *
     * @group Item
     */
    unequip(slotName: string, inventoryIndex?: number): Promise<void>

    /**
     * Unlocks all items on the station.
     *
     * @param stationId
     *
     * @group Other
     */
    unlockItems(stationId: number): Promise<void>

    /**
     * If you're stuck inside a wall or an object, this will teleport you to your spawn.
     *
     * @group Other
     */
    unstuck(): Promise<void>

    /**
     * Use a consumable item.
     *
     * @param inventoryIndex
     *
     * @group Item
     */
    useConsumable(inventoryIndex: number): Promise<void>

    /**
     * @param elevatorId
     * @param z
     *
     * @group Travel
     */
    useElevator(elevatorId: number, z: number): void

    /**
     * @deprecated use `dw.useSkill` instead
     * @see useSkill
     */
    useRune(
      skillIndex: number,
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
     * @param characterName
     * @param message
     */
    whisper(characterName: string, message: string | unknown): Promise<void>

    ws: WebSocket
  }

  interface Entity {
    ai?: number
    aid?: number
    bad?: number
    badCd?: number
    bag?: (Item | null)[]
    bankTabs?: {
      name: string
      items: (Item | null)[]
    }[]
    c?: Record<string, Condition>
    carId?: number
    casting?: number
    cds?: Record<string, number>
    cid?: number
    class: number
    classMd: ToCamelCase<ClassMd>
    combat?: number
    conditions?: Record<string, Condition>
    crafting?: number
    dx?: number
    dy?: number
    effects?: Record<string, OldCondition>
    elvl?: number
    favor?: number
    fx?: Record<string, OldCondition>
    gcd?: number
    gcdValue?: number
    gear?: Record<Slot, Item | null>
    gold?: number
    h: number
    hp?: number
    hps?: number
    i?: (Item | null)[]
    id: number
    inventory?: (Item | null)[]
    isCollidable?: true
    isOpaque?: true
    isSafe?: number
    learnedPassives?: Record<string, {
      lvl: number
      tier: number
    }>
    learnedSkills?: Record<string, {
      lvl: number
      pts?: number
      tier: number
    }>
    learnedStats?: Record<string, {
      lvl: number
      pts: number
      tier: number
    }>
    level?: number
    loadout?: {
      name: string
      gear: Record<Slot, Item | null>
      skills: {}[]
    }[]
    lvl?: number
    mailbox?: (Item & {
      mailId: number
    } | null)[]
    matType?: number
    matTypeMd?: ToCamelCase<MatTypeMd>
    maxGold?: number
    maxHp?: number
    maxMp?: number
    maxShopGold?: number
    md: ToCamelCase<TypeMd>
    mission?: {}
    mods?: Record<string, number>
    mogs?: Record<string, string>
    moveSpeed?: number
    mp?: number
    mtx?: {
      face: number
      skin: number
      showHelmer: number
      helmet?: unknown
      chest?: unknown
    }
    name?: string
    output?: (Item | null)[]
    owner?: number
    party?: {
      dbId: number
      name: string
      level: number
      id: number
      uid: number
      lvl: number
      isLeader?: number
      leader?: number
    }[]
    player?: number
    plots?: {
      id: number
      pos: [number, number, number]
      dim: [number, number, number]
      x: number
      y: number
      z: number
      w: number
      h: number
      d: number
    }[]
    powerOn?: number
    profession?: number
    professionMd?: ToCamelCase<ProfessionMd>
    professions?: Record<ToCamelCase<ProfessionMd>, {
      level: number
      lvl: number
      profession: number
      xp: number
    }>
    qual?: number
    r?: number
    recycler?: {
      input: (Item | null)[]
      output: (Item | null)[]
    }
    rep?: number
    safe?: number
    share?: number
    silver?: number
    skills?: (Skill | null)[]
    skin?: number
    skinMd?: string
    spawn?: {
      x: number
      y: number
      z: number
    }
    stage?: number
    stageMd?: ToCamelCase<StageMd>
    station?: number
    stats?: {
      block: number
      climbSpeed: number
      critRes: number
      dagger: number
      dexDef: number
      doubleHit: number
      eleChance: Record<Lowercase<DmgTypeMd>, number>
      hp: number
      hpRegen: number
      intDef: number
      moveSpeed: number
      mp: number
      mpRegen: number
      parry: number
      pen: Record<Lowercase<DmgTypeMd>, number>
      res: Record<Lowercase<DmgTypeMd>, number>
      strDef: number
      threatMult: number
    }
    storage?: (Item | null)[] | Record<string, Item>
    tags?: {}
    targetId?: number
    terrain?: number
    threat?: number
    tree?: number
    type: number
    typeMd: ToCamelCase<TypeMd>
    uid?: number
    v?: number
    w: number
    wild?: number
    x: number
    xmogs?: any
    xp?: number
    y: number
    z: number
  }

  type RequiredCharacterProps =
    | "aid"
    | "bag"
    | "carId"
    | "casting"
    | "cds"
    | "cid"
    | "combat"
    | "crafting"
    | "dx"
    | "dy"
    | "effects"
    | "fx"
    | "gcd"
    | "gear"
    | "gold"
    | "hp"
    | "i"
    | "inventory"
    | "learnedPassives"
    | "learnedSkills"
    | "learnedStats"
    | "level"
    | "loadout"
    | "lvl"
    | "mailbox"
    | "maxGold"
    | "maxHp"
    | "maxMp"
    | "maxShopGold"
    | "mods"
    | "mogs"
    | "moveSpeed"
    | "mp"
    | "mtx"
    | "name"
    | "party"
    | "plots"
    | "professions"
    | "recycler"
    | "rep"
    | "silver"
    | "skills"
    | "spawn"
    | "stats"
    | "tags"
    | "uid"
    | "xp"

  interface Character extends Omit<Entity, RequiredCharacterProps>, Pick<Required<Entity>, RequiredCharacterProps> {}

  export type Chunk = Array<Array<Array<number>>>

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
    class?: number
    classMd?: ToCamelCase<ClassMd>
    crafted?: 1
    dmgType?: DmgType
    dmgTypeMd?: ToCamelCase<DmgTypeMd>
    ele?: number
    from?: string
    h?: number
    items?: unknown[]
    lbl: number
    matTier?: Tier
    matType?: MatType
    matTypeMd?: ToCamelCase<MatTypeMd>
    md: ToCamelCase<TypeMd>
    mods?: Record<string, unknown>
    n?: number
    name?: string
    qual: number
    r?: number
    rarityMd?: ToCamelCase<RarityMd>
    s?: number
    skin?: number
    stage?: number
    stageMd?: ToCamelCase<StageMd>
    terrain?: Terrain
    tier?: Tier
    type?: Type
    typeMd?: ToCamelCase<TypeMd>
    w?: number
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

  type Projectile = {
    id: number
    x: number
    y: number
    z: number
    dx: number
    dy: number
    speed: number
    elapsed: number
  }

  type RealEstateTable = Array<{
    dim: [number, number, number]
    id: number
    owner: string
    pos: [number, number, number]
  }>

  type OldMetaDataEntity = {
    slots?: Slot[]
  }

  type OldMetaDataItem = {
    slots?: Slot[]
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
      minLvl?: number
      minLevel?: number
      professions?: ToCamelCase<ProfessionMd>[]
    }
  >

  type MetaData = {
    slots?: Slot[]
  }

  type OldCondition = {
    od?: number
    d?: number
    s?: number | null
    v?: number | null
    timerElements?: unknown[]
    conditionElements?: unknown[]
  }

  type Condition = {
    duration: number
    expireAt: number
    numStacks: number | null
    value: number | null
  }

  type MissionTable = Record<string, number>

  type Slot =
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

  type Tag = symbol

  type Class = number

  type ClassMd =
    | "GENERAL"
    | "WEAPON"
    | "ARMOR"
    | "ACCESSORY"
    | "STATION"
    | "SPRITE"
    | "DECO"
    | "PLAYER"
    | "MONSTER"

  type DmgType = number

  type DmgTypeMd =
    | "PHYS"
    | "FIRE"
    | "COLD"
    | "ELEC"
    | "ACID"

  type EnchantType = number

  type EnchantTypeMd =
    | "REROLL_MOD"
    | "ADD_MOD"
    | "REMOVE_MOD"
    | "REROLL_QUALITY"

  type MatType = number

  type MatTypeMd =
    | "WOOD"
    | "ROCK"
    | "METAL"
    | "LEATHER"
    | "CLOTH"
    | "UNARMED"

  type ModType = number

  type ModTypeMd =
    | "PHYS"
    | "FIRE"
    | "COLD"
    | "ELEC"
    | "ACID"
    | "HP"
    | "MP"
    | "CRIT"
    | "DEF"

  type Profession = number

  type ProfessionMd =
    | "PLANT_FARMING"
    | "WOODCUTTING"
    | "QUARRYING"
    | "MINING"
    | "HUNTING"
    | "HERBALISM"
    | "WOODWORKING"
    | "STONEWORKING"
    | "METALWORKING"
    | "LEATHERWORKING"
    | "TAILORING"
    | "ALCHEMY"

  type Rarity = number

  type RarityMd =
    | "WHITE"
    | "GREEN"
    | "BLUE"
    | "PURPLE"
    | "ORANGE"

  type Stage = number

  type StageMd =
    | "STAGE0"
    | "STAGE1"
    | "STAGE2"
    | "STAGE3"
    | "STAGE4"
    | "SEED"
    | "SEEDLING"
    | "YOUNG"
    | "ADULT"
    | "ELDER"

  type Terrain = number

  type TerrainMd =
    | "WATER"
    | "EMPTY"
    | "GRASS"
    | "DIRT"
    | "DESERT"
    | "UNDERWATER"
    | "UNDERGROUND"
    | "WINTER"
    | "COAL"
    | "WOODWALL1"
    | "STONEROOF1"
    | "UGFOREST"
    | "CLOUD"
    | "TREE"
    | "WINTER_CAVE"
    | "DESERT_CAVE"
    | "STONE"
    | "VOID"

  type Tier = number

  type TierMd =
    | "T0"
    | "T1"
    | "T2"
    | "T3"
    | "T4"

  type Type = number

  type TypeMd =
    | "GENERAL"
    | "SWORD"
    | "AXE"
    | "DAGGER"
    | "CROSSBOW"
    | "BOW"
    | "SCEPTER"
    | "WAND"
    | "SPEAR"
    | "BOOMERANG"
    | "STAFF"
    | "MACE"
    | "CHEST"
    | "HELMET"
    | "GLOVES"
    | "BOOTS"
    | "SHIELD"
    | "BELT"
    | "ANVIL"
    | "FURNACE"
    | "WORKBENCH"
    | "TORCH"
    | "LOADOUT"
    | "MAGIC_FENCE_X"
    | "MAGIC_FENCE_Y"
    | "FENCE_X"
    | "FENCE_Y"
    | "BANK"
    | "RECYCLER"
    | "ENCHANTER"
    | "LOOM"
    | "SEWING_TABLE"
    | "TANNING_RACK"
    | "ELEVATOR"
    | "GC_TABLE"
    | "MAILBOX"
    | "MISSION_TABLE"
    | "MAGIC_SHRUB"
    | "XMOG"
    | "MARKET"
    | "PORTAL"
    | "ESSENCE"
    | "MYSTIC_ESSENCE"
    | "RING"
    | "AMULET"
    | "PORTAL_SCROLL"
    | "HUMAN"
    | "BIRD"
    | "CAT"
    | "LIZARD"
    | "WOLF"
    | "CHARCOAL"
    | "SOURCE"
    | "RESOURCE"
    | "MATERIAL"
    | "SKILLBOOK"
    | "VIAL"
    | "HP_POTION"
    | "MP_POTION"
    | "UNARMED"
    | "PACKAGE"
    | "HAMMER"
    | "WRENCH"
    | "SHOVEL"
    | "SLEDGEHAMMER"
    | "CLAW"
    | "ELE_ESSENCE"
    | "BED"
    | "BLOCK"
    | "TIME_TOKEN"
    | "HEART"
    | "RARE"
    | "GLITCHED"
    | "BLINK"
    | "SHIELDING"
    | "TRAMPLE"
    | "BOUNCY"
    | "KITE"
    | "CHARGE"
    | "AI_POWER"
    | "AI_SPEED"
    | "AI_REACH"
    | "AI_STR_DEF"
    | "AI_DEX_DEF"
    | "AI_INT_DEF"
    | "AI_DEF"
    | "AI_CRIT"
    | "AI_BLOCK"
    | "AI_REGEN"
    | "PROJ_NOVA"
    | "PAPER"
    | "PICKAXE"
    | "DEFAULT1"
    | "WATER_DEFAULT1"
    | "FOREST_DEFAULT1"
    | "DEFAULT2"
    | "BOSS_DEFAULT1"
    | "DEFAULT3"
    | "DEFAULT4"
    | "DEFAULT5"
    | "GOO1"
    | "GOO2"
    | "BOSS_GOO1"
    | "GOO3"
    | "GOO4"
    | "BOSS_GOO2"
    | "MYCONID1"
    | "MYCONID2"
    | "ELEMENTAL1"
}

declare const dw: DeepestWorld.API
