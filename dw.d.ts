declare module 'dw' {
  declare global {
    const dw: DeepestWorld.API

    namespace DeepestWorld {
      interface API {
        abandonMission(): void

        acceptMission(missionTableId: number): void

        /** Reference to your character */
        c: DeepestWorld.YourCharacter

        /** Another reference to your character */
        char: DeepestWorld.YourCharacter

        /** Another reference to your character **/
        character: DeepestWorld.YourCharacter

        /**
         * Chop a tree.
         * @param targetId tree entity id
         */
        chop(targetId: number)

        chunks: Record<string, DeepestWorld.Chunk>

        /**
         * x and y are the top left tile coords of your land plot
         * @param x
         * @param y
         */
        claimLand(x: number, y: number)

        connected: boolean

        /**
         * Combines all stackable items in the combine section of your inventory.
         */
        combine()

        /**
         * Indicates that debug information will appear in console
         */
        debug?: boolean

        /**
         * @param itemIndex index of the item in dw.character.bag
         */
        deleteItem(itemIndex: number)

        /**
         * Disenchants item in bag with index `indexItem,
         * uses an enchanting device provided by `enchantingDeviceId`.
         * @param enchantingDeviceId
         * @param itemIndex
         */
        disenchant(enchantingDeviceId: number, itemIndex: number)

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
        e: Array<DeepestWorld.Entity>

        emit(eventName: "auth", data: { token: string, name: string })

        /**
         * Chops down a tree
         * @param eventName
         * @param data
         */
        emit(eventName: "chop", data: { id: number })

        /**
         * Combines stackable crafting items together
         * @param eventName
         */
        emit(eventName: "combine")

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
        emit(eventName: "setSpawn", data: undefined)

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
         * @param portalId
         */
        enterPortal(portalId: number)

        /**
         * @param magicShrubId
         */
        enterMagicShrub(magicShrubId: number)

        /** Your surroundings: monsters, characters, trees, etc */
        entities: Array<DeepestWorld.Entity>

        /**
         * Equip an item.
         * @param itemIndex
         * @param slotName
         */
        equip(itemIndex: number, slotName: string)

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

        log(message: any): void

        marketSell(tradingPostId: number, itemMd: string)

        /**
         * Mine an ore.
         * @param targetId the id of the ore
         */
        mine(targetId: number)

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
        moveItem(bagNameFrom: string, bagIndexFrom: number, bagNameTo?: string, bagIndexTo: number, itemIdFrom?: number, itemIdTo?: number, finderId?: number): void

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

        on(eventName: 'events', listener: (data: Record<string, {
          ilvl: number
          l: number
          md: string
          terrain: number
          x: number
          y: number
        }>) => void): void

        on(eventName: 'frenzy', listener: (data: { error: string }) => void): void

        on(eventName: 'gcd', listener: (data: {}) => void): void

        on(eventName: 'hit', listener: (data: Array<{
          projId?: number
          md?: string
          actor: number
          target: number
          heal?: number
          amount?: number
          val?: number
          rip?: number
        }>) => void): void

        on(eventName: 'levelUp', listener: (data: { id: number }) => void): void

        on(eventName: 'loot', listener: (data: Array<{
          i: number,
          item: Item,
          log: number,
        }>) => void): void

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
        }) => void): void

        on(eventName: 'share', listener: (data: number) => void): void

        on(eventName: 'talk', listener: (data: {
          name: string
          text: string
        }) => void): void

        on(eventName: 'unseenChunks', listener: (data: string) => void): void

        on(eventName: 'unseenObjects', listener: (data: Array<number>) => void): void

        on(eventName: string, listener: (data: any) => void): void

        /**
         * Opens a portal to your respawn location ot a player with `targetName`.
         * @param portalScrollIndex
         * @param targetName
         */
        openPortal(portalScrollIndex: number, targetName?: string)

        partyInvite(targetName: string)

        partyKick(targetName: string)

        partyPromote(targetName: string)

        /**
         * @param itemIndex index of the item in dw.character.bag
         * @param x
         * @param y
         */
        placeItem(itemIndex, x, y)

        /**
         *
         * @param receiver Either the ID or the name of the receiving player
         * @param itemIndex index of the item in your dw.character.bag
         */
        sendItem(receiver: number | string, itemIndex: number): void

        set(key: string, value: any): void

        setSpawn()

        /**
         * Set the UI to show this target
         * @param id
         */
        setTarget(id: number): void

        sortInv()

        /**
         * Cancels the craft in progress.
         */
        stopCraft()

        talk(message: string): void

        takeItem(itemId)

        targetId: number | null

        /**
         * Uneqip an item and put it in bag slow with index `itemIndex`
         * @param slotName which slot to unequip the item from. Possible values can be found in dw.c.gear
         * @param itemIndex index in dw.character.bag to unequip the item to
         */
        unequip(slotName: string, itemIndex?: number)

        /**
         * In case your character is stuck, and you have no way of unstucking yourself,
         * you can use this to return to "1.0.0". This will reset your spawn to "1.0.0".
         */
        unstuck()

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

        l: number
        x: number
        y: number
      }

      export interface Character extends LivingEntity {
        /** Means that this is a player. Value is always 1. */
        player: 1
        /** Character's name */
        name: string
        /** Equipped items */
        gear: Record<string, unknown>
        /** Character's appearance */
        mtx: Record<string, unknown>

        charDbId: number
      }

      export type Chunk = Array<Array<Array<number>>>

      export type Entity = YourCharacter | Character | Monster | Tree | Ore | Station

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
         */
        r: number;

        /** The item level / quality*/
        qual: number

        /** The modifiers on the item */
        mods: Record<string, number>
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
        fx: object
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
      }

      export interface Station extends BaseEntity {
        /** Means that this is a station. Value is always 1. */
        station: 1
        /** Indicating whether you are the owner. */
        owner: number
        /** Owner Database ID */
        ownerDbId: number
        /** Storage of items and possible other stuff */
        storage: Array<Item | unknown | null>
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

        /**
         * Active effects on your character
         */
        fx: Record<string, unknown>

        /** Timestamp of the global cooldown */
        gcd?: number,

        mission: {
          l: number
          x: number
          y: number

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
           * Party information
           */
          party: Array<{
            dbId: number
            name: string
            level: number
            id: number
            leader?: number
          }>

          /**
           * Percentage progress e.g. 6.0990909%
           */
          progress: number;

          /**
           * When the timeout happens
           */
          timeoutAt: number;
        }

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

        spawn: Position & { w: number }

        respawn: Position

        xp: number
      }

      export interface WorldPosition {
        l: number
        x: number
        y: number
      }
    }
  }

  export = dw
}
