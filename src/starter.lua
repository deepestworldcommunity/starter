local js = require("js")
local dw = js.global.dw

local attackMode = true

function BasicAttack()
  if not attackMode then
    dw.log(dw, "Attack mode is off, edit src/starter.lua to enable")
    return
  end

  local target = dw.findClosestMonster()
  if not target then
    dw.log(dw, '<span style="color: yellow">No target found</span>')
    return
  end

  if dw.targetId ~= target.id then
    dw.log(dw, string.format("Switching target to %s#%s", target.md, target.id))
    dw.setTarget(dw, target.id)
  end

  local skillMd = "dmg1"
  if dw.character.gear.mainHand then
    local weaponType = dw.character.gear.mainHand.type

    if weaponType == dw.enums.Type.BOW then
      skillMd = "dmg2"
    elseif weaponType == dw.enums.Type.BOOMERANG then
      skillMd = "dmg2"
    elseif weaponType == dw.enums.Type.CROSSBOW then
      skillMd = "dmg2"
    elseif weaponType == dw.enums.Type.SCEPTER then
      skillMd = "dmg3"
    elseif weaponType == dw.enums.Type.STAFF then
      skillMd = "dmg3"
    elseif weaponType == dw.enums.Type.WAND then
      skillMd = "dmg3"
    end
  end

  local skillIndex = nil
  for i, skill in ipairs(dw.character.skills) do
    if skill and skill.md == skillMd then
      skillIndex = i
      break
    end
  end

  if not skillIndex then
    dw.log(dw, string.format('<span style="color: red">Could not find %s</span>', skillMd))
    return
  end

  if not dw.isInRange(dw, skillIndex, target.x, target.y) then
    dw.log(dw, "Too far away from target, moving closer")
    dw.move(dw, target.x, target.y)
    return
  end

  if dw.isOnCd(dw, skillIndex) then
    dw.log(dw, string.format('<span style="color: yellow">Skill %s#%s is on cooldown</span>', skillMd, skillIndex))
    return
  end

  if not dw.canPayCost(dw, skillIndex) then
    dw.log(dw, string.format('<span style="color: yellow">Not enough resources for %s#%s</span>', skillMd, skillIndex))
    return
  end

  if dw.character.casting / 1000 > os.time() then
    dw.log(dw, '<span style="color: yellow">Already casting</span>')
    return
  end

  dw.stop(dw)
  dw.useSkill(dw, skillIndex, target.id)
end

js.global.setInterval(js.global, BasicAttack, 250)
