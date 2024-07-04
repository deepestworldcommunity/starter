namespace JSX {
  export type ElementType = (props?: Record<string, unknown>, children?: ElementType[]) => Promise<boolean>
}

function jsx(tag: JSX.ElementType, props: Record<string, unknown>, ...children: JSX.ElementType[]) {
  return () => tag(props, children)
}

const blackboard: {
  target?: DeepestWorld.Entity,
  skillIndex?: number,
} = {}

async function Sequence(_: unknown, children?: JSX.ElementType[]) {
  for (const child of children ?? []) {
    if (!(await child())) {
      return false
    }
  }

  return true
}

async function FindTarget() {
  blackboard.target = dw.findClosestMonster()

  if (!blackboard.target) {
    // No target found
    return false
  }

  // Show target in game UI
  dw.setTarget(blackboard.target.id)
  return true
}

async function ChooseRune() {
  let runeMd = 'attackRune'
  if (dw.c.gear.mainHand) {
    const weaponTags = dw.md.items[dw.c.gear.mainHand?.md]?.tags
    if (weaponTags?.has(dw.enums.Tag.RANGED)) {
      runeMd = 'rangedRune'
    }

    if (weaponTags?.has(dw.enums.Tag.CASTER)) {
      runeMd = 'physbolt1'
    }
  }

  blackboard.skillIndex = dw.character.skills.findIndex(
    (skill) => skill && skill.md === runeMd
  )
  if (blackboard.skillIndex === -1) {
    // No attackRune found
    return false
  }

  return true
}

async function TargetInRangeForRune() {
  if (blackboard.skillIndex === undefined || blackboard.target === undefined) {
    return false
  }

  if (dw.isInRange(blackboard.skillIndex, blackboard.target.x, blackboard.target.y)) {
    return true
  }

  dw.move(blackboard.target.x, blackboard.target.y)
  return false
}

async function UseRune() {
  if (blackboard.skillIndex === undefined || blackboard.target === undefined) {
    return false
  }

  if (!dw.isOnCd(blackboard.skillIndex) || !dw.canPayCost(blackboard.skillIndex)) {
    // Skill is either on cooldown or not enough resources
    return false
  }

  dw.stop()
  dw.useSkill(blackboard.skillIndex, blackboard.target.id)
  return true
}

function BehaviorTree() {
  return (
    <Sequence>
      <FindTarget/>
      <ChooseRune/>
      <TargetInRangeForRune/>
      <UseRune/>
    </Sequence>
  );
}

const behaviorTree = BehaviorTree()

setInterval(async () => {
  await behaviorTree()
}, 250)
