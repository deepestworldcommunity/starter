import { BOSSES } from './consts'

export function getCharacterBattleScore() {
  let maxDmg = 0
  dw.character.skills.forEach((skill) => {
    if (!skill || /heal|shield/.test(skill.md)) {
      return
    }

    let dmg = (skill.phys ?? 0)
      + (skill.fire ?? 0)
      + (skill.acid ?? 0)
      + (skill.cold ?? 0)
      + (skill.elec ?? 0)

    dmg *= 1 + (skill.crit ?? 0) * ((skill.critMult ?? 1) - 1)

    if (dmg > maxDmg) {
      maxDmg = dmg
    }
  })

  return Math.sqrt(maxDmg * dw.character.maxHp)
}

export function getMonsterBattleScore(monster: DeepestWorld.Monster) {
  let dmg = 19 * Math.pow(1.1, monster.level)

  // Factor in critical hits
  dmg += 1 + 0.05 * 0.5

  const skullData = monster.fx.skulls
  let skullCount = 0
  if (
    skullData &&
    typeof skullData === 'object' &&
    's' in skullData &&
    typeof skullData.s === 'number'
  ) {
    skullCount = skullData.s
  }

  // Scale based on skulls on mob, extra 25% for bosses
  dmg *= 1
    + skullCount * 0.5
    + (BOSSES.includes(monster.md) ? 0.25 : 0)

  // Powerful mobs deal 25% more dmg
  if (monster.fx.dmgMore) {
    dmg *= 1.25
  }

  // Quick mobs attack 20% more often, thus deal more dmg
  if (monster.fx.quick) {
    dmg *= 1.2
  }

  return Math.sqrt(dmg * monster.maxHp)
}
