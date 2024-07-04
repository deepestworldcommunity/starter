function addMissionData() {
  if (!window.top) {
    return
  }

  const missionTitle = window.top.document.querySelector('#mission div.mission-title')
  if (!missionTitle || !missionTitle.parentNode) {
    return
  }

  const missionData = window.top.document.createElement('div')
  missionData.id = 'missionData'
  missionData.className = 'ui-content p-1'

  missionTitle.parentNode.insertBefore(missionData, missionTitle)

  missionData.innerHTML = `
    <div class="d-flex justify-content-between small">
      <div class="text-alt">Location:</div>
      <div data-content="location"></div>
    </div>
    <div class="d-flex justify-content-between small">
      <div class="text-alt">Distance:</div>
      <div data-content="distance"></div>
    </div>
    <div class="d-flex justify-content-between small">
      <div class="text-alt">Level Range:</div>
      <div data-content="level-range"></div>
    </div>
    <div class="d-flex justify-content-between small">
      <div class="text-alt">Battle Score:</div>
      <div data-content="battle-score"></div>
    </div>
  `

  return missionData
}

const data: Record<string, () => string> = {
  'battle-score': () => `${dw.getZoneLevel(dw.c.mission?.x, dw.c.mission?.y, dw.c.mission?.z)}`,
  'distance': () => {
    if (dw.c.z !== dw.c.mission?.z) {
      return `wrong layer️ 🚨`
    }

    const dx = dw.c.x - dw.c.mission.x
    const dy = dw.c.y - dw.c.mission.y
    const diagonal = Math.abs(dx) * 2 > Math.abs(dy) && Math.abs(dy) * 2 > Math.abs(dx)

    const dist = dw.distance(dw.c.x, dw.c.y, dw.c.mission.x, dw.c.mission.y)

    let direction = dist < dw.constants.MISSION_RANGE ? '🎯 ' : '🚨 '
    if (diagonal) {
      if (dx < 0) {
        direction += dy < 0 ? '↘' : '↗'
      } else {
        direction += dy < 0 ? '↙' : '↖'
      }
    } else {
      if (Math.abs(dx) > Math.abs(dy)) {
        direction += dx < 0 ? '➡' : '⬅'
      } else {
        direction += dy < 0 ? '⬇' : '⬆'
      }
    }

    return `${direction} ${dist.toLocaleString([], { maximumFractionDigits: 0 })}`
  },
  'level-range': () => {
    const minLevel = Math.max(1, (dw.c.mission?.item?.qual ?? 0) - dw.constants.LEVEL_BUFFER)
    const maxLevel = Math.max(1, (dw.c.mission?.item?.qual ?? 0) + dw.constants.LEVEL_BUFFER)

    const zoneLevel = dw.getZoneLevel()

    return `${zoneLevel >= minLevel && zoneLevel <= maxLevel ? '🎯 ' : '🚨 '} ${minLevel} - ${maxLevel}`
  },
  'location': () => `
    ${dw.c.mission?.x?.toLocaleString([], { maximumFractionDigits: 0 })},
    ${dw.c.mission?.y?.toLocaleString([], { maximumFractionDigits: 0 })},
    ${dw.c.mission?.z?.toLocaleString([], { maximumFractionDigits: 0 })}
  `,
}

function getMissionData() {
  if (!window.top) {
    return
  }

  let missionData: HTMLDivElement | null = window.top.document.querySelector('#missionData')

  if (missionData) {
    return missionData
  }

  return addMissionData()
}

function removeMissionData() {
  getMissionData()?.remove()
}

function updateMissionDate() {
  if (!dw.c.mission || !window.top) {
    return
  }

  if (!getMissionData()) {
    return
  }

  Object.entries(data).forEach(([content, fn]) => {
    const element = window.top?.document.querySelector(`#missionData [data-content="${content}"]`)
    if (!element) {
      return
    }

    element.innerHTML = fn()
  })
}

window.addEventListener('unload', removeMissionData)

setInterval(updateMissionDate, 1000)
