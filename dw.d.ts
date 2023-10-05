declare global {
  const dw: DeepestWorld.API

  namespace DeepestWorld {
    interface API {
      /** Abandons the current mission */
      abandonMission(): void

      /** Accept the first mission in the mission table storage */
      acceptMission(missionTableId: number): void

      /** Reference to your character */
      c: YourCharacter

      /** Another reference to your character */
      char: YourCharacter

      /** Another reference to your character **/
      character: YourCharacter

      /**
       * Chop a tree.
       * @param targetId tree entity id
       */
      chop(targetId: number): void

      chunks: Record<string, Chunk>

      /**
       * x and y are the top left tile coords of your land plot
       * @param x
       * @param y
       */
      claimLand(x: number, y: number): void

      connected: boolean

      /**
       * Combines all stackable items in the combine section of your inventory.
       */
      combine(): void

      craft(benchId: number, itemMd: string, max?: number): void

      /**
       * Indicates that debug information will appear in console
       */
      debug?: boolean

      /**
       * @param itemIndex index of the item in dw.character.bag
       */
      deleteItem(itemIndex: number): void

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
      distance(from: { x: number, y: number }, to: { x: number, y: number }): number

      /**
       * Returns the distance between two points
       * @param x1
       * @param y1
       * @param x2
       * @param y2
       */
      distance(x1: number, y1: number, x2: number, y2: number): number

      /** Your surroundings: monsters, characters, trees, etc */
      e: Array<Entity>

      emit(eventName: 'auth', data: { token: string, name: string }): void

      /**
       * Chops down a tree
       * @param eventName
       * @param data
       */
      emit(eventName: 'chop', data: { id: number }): void

      /**
       * Combines stackable crafting items together
       * @param eventName
       */
      emit(eventName: 'combine'): void

      emit(eventName: 'declinePartyInvite', data: { id: number }): void

      emit(eventName: 'deleteItem', data: { i: number, name: string }): void

      emit(eventName: 'equip', data: {
        i: number,
        slot?: string
        bag?: string
      }): void

      emit(eventName: 'magicShrub', data: { id: number }): void

      emit(eventName: 'marketSell', data: { id: number, md: string }): void

      /**
       * Mines ores, like rock, iron, gems...
       * @param eventName
       * @param data
       */
      emit(eventName: 'mine', data: { id: number }): void

      emit(eventName: 'move', data: { x: number, y: number }): void

      emit(eventName: 'moveItem', data: {
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
      }): void

      emit(eventName: 'partyKick', data: { dbId: number }): void

      emit(eventName: 'partyPromote', data: { dbId: number }): void

      /**
       * Places a station into the world (can only be done at your spawn area)
       * @param eventName
       * @param data
       */
      emit(eventName: 'placeItem', data: {
        bagIndex: number
        x: number
        y: number
      }): void

      emit(eventName: 'sacItem', data: { id: number, i: number }): void

      emit(eventName: 'saveCode', data: { code: string }): void

      emit(eventName: 'sendPartyInvite', data: { name: string }): void

      /**
       * Set the new character spawn location to current location rounded down
       * @param eventName
       * @param data
       */
      emit(eventName: 'setSpawn', data: undefined): void

      /**
       * Set the new character respawn location inside the spawn area
       * @param eventName
       * @param data
       */
      emit(eventName: 'setRespawn', data: { x: number, y: number }): void

      emit(eventName: 'skill', data: {
        md?: string,
        i: number,
        id?: number,
        x?: number,
        y?: number,
        ax?: number,
        ay?: number,
      }): void

      /**
       * Sorts your inventory aka the bag
       * @param eventName
       */
      emit(eventName: 'sortInv'): void

      emit(eventName: 'stopCode'): void

      emit(eventName: 'startCode'): void

      emit(eventName: 'talkParty', { m: string }): void

      /**
       * Returns you to your spawn
       * @param eventName
       */
      emit(eventName: 'unstuck'): void

      enchant(enchantingDeviceId: number, enchantMd: string): void

      /**
       * @param portalId
       */
      enterPortal(portalId: number): void

      /**
       * @param magicShrubId
       */
      enterMagicShrub(magicShrubId: number): void

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
      }

      findClosestMonster(filter?: (entity: Monster) => boolean): Monster | undefined

      findEntities(filter?: (entity: Entity) => boolean): Entity[]

      get(key: string): any | null

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
       * Returns the terrain at the given position
       * 0 = Walkable
       * any other value = There is a voxel here, limiting movement
       * @param pos
       * @deprecated use dw.getTerrain instead
       */
      getTerrainAt(pos: WorldPosition): number

      /**
       * Returns the terrain at the given position
       * 0 = Walkable
       * any other value = There is a voxel here, limiting movement
       * @param pos
       * @deprecated use dw.getTerrain instead
       */
      getTerrainOver(pos: WorldPosition): number

      /**
       * Returns the terrain at the given position.
       * 0 = Walkable
       * any other value = There is a voxel here, limiting movement
       * @param pos
       * @deprecated use dw.getTerrain instead
       */
      getTerrainUnder(pos: WorldPosition): number

      /**
       * Get either the zone level of location or of player location
       * when no other parameters were specified.
       * @param x
       * @param y
       * @param z
       */
      getZoneLevel(x?: number, y?: number, z?: number): number

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
      isSkillReady(skillIndex?: number): boolean

      lastLog: number

      log(message: any)

      marketSell(tradingPostId: number, itemMd: string)

      /**
       * Mine an ore.
       * @param targetId the id of the ore
       */
      mine(targetId: number): void

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
       * @param bagNameFrom Name of the bag
       * @param bagIndexFrom Index of the item in the bag
       * @param bagNameTo
       * @param bagIndexTo
       * @param itemIdFrom can be omitted if transferring from your character
       * @param itemIdTo can be omitted if transferring to your character
       * @param finderId
       */
      moveItem(bagNameFrom: string, bagIndexFrom: number, bagNameTo: string | undefined, bagIndexTo: number, itemIdFrom?: number, itemIdTo?: number, finderId?: number): void

      on<E extends keyof Events>(eventName: E, listener: Events[E], timeout?: number): void
      // on(eventName: string, listener: (...data: Array<any>) => void, timeout?: number): void

      once<E extends keyof Events>(eventName: E, listener: Events[E], timeout?: number): void
      // once(eventName: string, listener: (...data: Array<any>) => void, timeout?: number): void

      openItem(bagIndex: number): void

      /**
       * Opens a portal to your respawn location ot a player with `targetName`.
       * @param portalScrollIndex
       * @param targetName
       */
      openPortal(portalScrollIndex: number, targetName?: string): void

      partyAccept(partyInviteId: number): void

      partyDecline(partyInviteId: number): void

      partyInvite(targetName: string): void

      partyKick(targetName: string): void

      partyLeave(): void

      partyPromote(targetName: string): void

      /**
       * @param itemIndex index of the item in dw.character.bag
       * @param x
       * @param y
       */
      placeItem(itemIndex: number, x: number, y: number): void

      removeAllListeners(): void

      removeListener<E extends keyof Events>(eventName: E, listener: Events[E]): void
      // removeListener(eventName: string, listener: (...data: Array<any>) => void): void

      /**
       *
       * @param receiver Either the ID or the name of the receiving player
       * @param itemIndex index of the item in your dw.character.bag
       */
      sendItem(receiver: number | string, itemIndex: number): void

      sendMail(mailboxId: number, recipientName: string, itemsBagIndexes: Array<number>, portalScrollsBagIndexes: Array<number>): void

      set(key: string, value: any): void

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

      talk(message: string): void

      takeItem(itemId): void

      targetId: number | null

      /**
       * Uneqip an item and put it in bag slow with index `itemIndex`
       * @param slotName which slot to unequip the item from. Possible values can be found in dw.c.gear
       * @param itemIndex index in dw.character.bag to unequip the item to
       */
      unequip(slotName: string, itemIndex?: number): void

      /**
       * In case your character is stuck, and you have no way of unstucking yourself,
       * you can use this to return to "1.0.0". This will reset your spawn to "1.0.0".
       */
      unstuck(): void

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
       */
      useSkill(skillIndex: number, x: number, y: number): void
    }

    interface BaseEntity {
      id: number
      /** Metadata ID */
      md: string

      // Portals or stations hav an owner
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

    export type Entity = YourCharacter | Character | Monster | Tree | Ore | Station

    type Events = {
      /**
       * This is not a socket event, but a client event to draw stuff on canvas.
       * @param eventName
       * @param listener
       */
      drawEnd: (ctx: CanvasRenderingContext2D, cx: number, cy: number) => void

      // Socket Events

      afx: (data: {
        id: number,
        md: string,
        v?: number,
        d: number,
        s?: number
      }) => void

      attack: (data: {
        error: string,
      }) => void

      auth: (data: number) => void

      combat: (data: number) => void

      cd: (data: string) => void

      diff: (data: Array<{
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
      }>) => void

      equip: (data: { error: string } | {
        id: number,
        slot: string,
        i: number,
        bag: string,
      }) => void

      events: (data: Record<string, {
        ilvl: number
        l: number
        md: string
        terrain: number
        x: number
        y: number
      }>) => void

      frenzy: (data: { error: string }) => void

      gcd: (data: {}) => void

      hit: (data: Array<{
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
      }>) => void

      levelUp: (data: { id: number }) => void

      loot: (data: Array<{
        i: number,
        item: Item,
        log: number,
      }>) => void

      magicShrub: (data: { error: string }) => void

      market: (data: Record<string, number>) => void

      missionBonus: (data: Record<string, number>) => void

      move: (data: { error: string }) => void

      moveItem: (data: { error: string } | {
        name: string,
        id?: number
        i: number
        item?: null | Item
      }) => void

      proj: (data: {
        md: string,
        mwd: string,
        id: number,
        aid: number,
        tid: number,
      }) => void

      partyDiff: (data: {
        dbId: number,
        name?: string,
        level?: number,
        id?: number,
        leader?: number
      }) => void

      partyInvite: (data: {
        from: string
        id: number
      }) => void

      partyKick: (data: {
        dbId: number
      }) => void

      rfx: (data: {
        id: number
        md: string
      }) => void

      sendPartyInvite: (data: {
        error: string
      }) => void

      seenChunks: (data: Record<string, {
        terrain: Array<Array<Array<number>>>
      }>) => void

      seenObjects: (data: any) => void

      setRespawn: (data: {
        l: number
        x: number
        y: number
      }) => void

      setSpawn: (data: {
        l: number
        x: number
        y: number
      }) => void

      share: (data: number) => void

      talk: (data: {
        name: string
        text: string
      }) => void

      unseenChunks: (data: string) => void

      unseenObjects: (data: Array<number>) => void
    }

    export interface Item {
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
       * 4 = orange
       */
      r?: number;

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
      /** Item inventory */
      bag: Array<Item | null>

      /** Gem pyramid in skill bar */
      cardBag: Array<Item | null>

      /** Skill specific timestamps of their cooldowns */
      cds: Record<string, number>,

      /** Indicator whether the character is currently in combat */
      combat?: number,

      /** Crafting inventory */
      craftIn: Array<unknown>

      /**
       * Active effects on your character
       */
      fx: Record<string, unknown>

      /** Timestamp of the global cooldown */
      gcd?: number,

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
        progress: number;

        /**
         * When the timeout happens
         */
        timeoutAt: number;
      }

      /** the amount of mana points you restore every 1.5s */
      mpRegen: number;

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
        | "axesmith"
        | "boomerangsmith"
        | "bowsmith"
        | "crossbowsmith"
        | "daggersmith"
        | "gemcutting"
        | "macesmith"
        | "metalworking"
        | "mining"
        | "pickaxesmith"
        | "platesmith"
        | "sceptersmith"
        | "spearsmith"
        | "staffsmith"
        | "stoneworking"
        | "swordsmith"
        | "wandsmith"
        | "woodcutting"
        | "woodworking", {
        md: string
        level: number
        xp: number
      }>

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
  }
}
