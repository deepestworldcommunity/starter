import { z, ZodError } from 'zod'

const accountSchema = z.strictObject({
  gold: z.number(),
  id: z.number(),
  maxGold: z.number(),
  plots: z.array(z.strictObject({
    d: z.number(),
    dim: z.tuple([z.number(), z.number(), z.number()]),
    h: z.number(),
    id: z.number(),
    pos: z.tuple([z.number(), z.number(), z.number()]),
    sellCd: z.number(),
    w: z.number(),
    x: z.number(),
    y: z.number(),
    z: z.number(),
  })),
})

const entitiesSchema = z.array(z.strictObject({
  id: z.number(),
  md: z.number(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  mp: z.number(),
  maxMp: z.number(),
  moveSpeed: z.number(),
  level: z.number(),
  fx: z.number(),
  dx: z.number(),
  dy: z.number(),
  maxHp: z.number(),
  hp: z.number(),
  name: z.number(),
  player: z.number(),
  gear: z.number(),
  mogs: z.number(),
  mtx: z.number(),
  cid: z.number(),
  carId: z.number(),
  rep: z.number(),
  aid: z.number(),
  gcdValue: z.number(),
  elvl: z.number(),
  bag: z.number(),
  skillBag: z.number(),
  toolBag: z.number(),
  cardBag: z.number(),
  xmogs: z.number(),
  spawn: z.number(),
  cds: z.number(),
  skills: z.number(),
  xp: z.number(),
  professions: z.number(),
  missionLvls: z.number(),
  mods: z.number(),
  stats: z.number(),
  party: z.number(),
  uid: z.number(),
  favor: z.number(),
  lvl: z.number(),
  effects: z.number(),
  gcd: z.number(),
  casting: z.number(),
  combat: z.number(),
  crafting: z.number(),
}))

const characterSchema = z.strictObject({

})

const apiSchema = z.strictObject({
  isReady: z.boolean(),
  draw: z.boolean(),
  errors: z.boolean(),
  debug: z.boolean(),
  fps: z.number(),
  chatHideDelay: z.number(),
  account: accountSchema,
  a: accountSchema,
  entities: entitiesSchema,
  e: entitiesSchema,
  chunks: z.boolean(),
  terrain: z.boolean(),
  nextChatHideAt: z.function(),
  eventDispatcher: z.function(),
  editor: z.function(),
  camera: z.function(),
  md: z.function(),
  emit: z.function(),
  climb: z.function(),
  readSign: z.function(),
  setTarget: z.function(),
  on: z.function(),
  once: z.function(),
  off: z.function(),
  removeAllListeners: z.function(),
  get: z.function(),
  set: z.function(),
  move: z.function(),
  stop: z.function(),
  useSkill: z.function(),
  isOnGcd: z.function(),
  isOnCd: z.function(),
  canPayCost: z.function(),
  isInRange: z.function(),
  canUseSkill: z.function(),
  hasTag: z.function(),
  sendMail: z.function(),
  enchant: z.function(),
  equip: z.function(),
  unequip: z.function(),
  enterMagicShrub: z.function(),
  getZoneLevel: z.function(),
  getZoneTier: z.function(),
  unstuck: z.function(),
  suicide: z.function(),
  placeItem: z.function(),
  findClosestEntity: z.function(),
  findClosestMonster: z.function(),
  findClosestTree: z.function(),
  findOneEntity: z.function(),
  findAllEntities: z.function(),
  distance: z.function(),
  getTerrainAt: z.function(),
  log: z.function(),
  sendItem: z.function(),
  moveItem: z.function(),
  deleteItem: z.function(),
  partyInvite: z.function(),
  partyKick: z.function(),
  partyPromote: z.function(),
  partyAccept: z.function(),
  partyDecline: z.function(),
  partyLeave: z.function(),
  setSpawn: z.function(),
  stopCraft: z.function(),
  craft: z.function(),
  combine: z.function(),
  sortInv: z.function(),
  useElevator: z.function(),
  enterCar: z.function(),
  exitCar: z.function(),
  moveCar: z.function(),
  destroyBuilding: z.function(),
  buyPlot: z.function(),
  sellPlot: z.function(),
  talkWhisper: z.function(),
  takeItem: z.function(),
  disenchant: z.function(),
  openItem: z.function(),
  fetchMissions: z.function(),
  startMission: z.function(),
  joinMission: z.function(),
  abandonMission: z.function(),
  changeMissionReward: z.function(),
  toggleMissionVisibility: z.function(),
  addSkillPoint: z.function(),
  socket: z.function(),
  unsocket: z.function(),
  openPortal: z.function(),
  enterPortal: z.function(),
  fetchPlots: z.function(),
  gather: z.function(),
  fillItem: z.function(),
  pourItem: z.function(),
  placeBlock: z.function(),
  takeBlock: z.function(),
  repair: z.function(),
  addMog: z.function(),
  removeMog: z.function(),
  toggleMog: z.function(),
  toggleStation: z.function(),
  loadout: z.function(),
  lockItems: z.function(),
  unlockItems: z.function(),
  stationInfo: z.function(),
  donate: z.function(),
  toCanvasX: z.function(),
  toCanvasY: z.function(),
  removeListener: z.function(),
  sortInventory: z.function(),
  canUseSkillCd: z.function(),
  chop: z.function(),
  mine: z.function(),
  getTerrain: z.function(),
  getChunkHash: z.function(),
  isSkillReady: z.function(),
  isSkillInRange: z.function(),
  canUseSkillRange: z.function(),
  inSkillRange: z.function(),
  useRune: z.function(),
  canUseRune: z.function(),
  hasMp: z.function(),
  canUseSkillCost: z.function(),
  getChunkName: z.function(),
  getChunkKey: z.function(),
  findEntities: z.function(),
  findEntity: z.function(),
  enchantItem: z.function(),
  rip: z.function(),
  selfDestruct: z.function(),
  openPortalToEvent: z.function(),
  c: characterSchema,
  char: characterSchema,
  character: characterSchema,
  itemModValue: z.boolean(),
  itemBaseValue: z.boolean(),
  getCollisionRectRef: z.function(),
  getCollisionRect: z.function(),
  getHitbox: z.function(),
  getPlacebox: z.function(),
  getEntityName: z.function(),
  getItemModValue: z.function(),
  getItemBaseValue: z.function(),
  constants: z.boolean(),
  enums: z.strictObject({
    Tag: z.number(),
    Terrain: z.number(),
    Rarity: z.number(),
  }),
  mdInfo: z.record(z.string(), z.strictObject({
    tags: z.number(),
  })),
  targetId: z.number(),
  loadScript: z.function(),
  isType: z.function(),
  placeStation: z.function(),
  destroyStation: z.function(),
  takeStation: z.function(),
})

function validateApi() {
  try {
    apiSchema.parse(dw)
    console.log('API is valid')
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.map((e) => console.error(JSON.stringify(e, null, 2)))
      return
    }

    console.error('API validation failed', error)
  }
}

setInterval(validateApi, 10000)
validateApi()
