const RANGE = 15
const PLAYER = '#ff0000';
const WALL = '#000000';
const FALLBACK = '#dddddd';
const TERRAIN_COLORS: Record<number, string> = {
  [dw.enums.Terrain.EMPTY]: '#ff00ff', // Magenta
  [dw.enums.Terrain.GRASS]: '#228b22', // Forest Green
  [dw.enums.Terrain.CLOUD]: '#ADD8E6', // Light Blue (more distinct)
  [dw.enums.Terrain.DIRT]: '#8B4513', // Saddle Brown (darker for contrast)
  [dw.enums.Terrain.DESERT]: '#F4A460', // Sandy Brown (brighter)
  [dw.enums.Terrain.STONE]: '#808080', // Grey (adjusted for contrast)
  [dw.enums.Terrain.TREE]: '#006400', // Dark Green (for distinctiveness from grass)
  [dw.enums.Terrain.UNDERWATER]: '#4682B4', // Steel Blue (less cyan, more distinct from water)
  [dw.enums.Terrain.WATER]: '#1E90FF', // Dodger Blue (more vibrant)
  [dw.enums.Terrain.WINTER]: '#E0FFFF', // Light Cyan (for a chilly feel, more distinct from white)
} as const;

const CONTAINER_SELECTOR = '#minimap'
const ELEMENT_CLASS = 'custom-minimap'
const ELEMENT_SELECTOR = `${CONTAINER_SELECTOR} .${ELEMENT_CLASS}`

let done = false

function createMinimapCanvas() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  const container = window.top.document.querySelector(CONTAINER_SELECTOR)
  if (!container) {
    return []
  }

  const canvas = window.top.document.createElement('canvas')!
  canvas.className = `${ELEMENT_CLASS} ui mt-2`
  canvas.style.width = '100%'
  canvas.style.height = 'auto'
  canvas.width = RANGE * 2 + 1
  canvas.height = RANGE * 2 + 1

  container.insertBefore(canvas, container.firstChild)
}

let x: number
let y: number
let z: number

function isCanvas(element: Element): element is HTMLCanvasElement {
  return element.nodeName === 'CANVAS'
}

function updateMinimap() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  const ez = Math.floor(dw.c.z)
  const ey = Math.floor(dw.c.y)
  const ex = Math.floor(dw.c.x)

  if (x === ex && y === ey && z === ez) {
    // Skip frame
    if (!done) {
      window.top.requestAnimationFrame(updateMinimap)
    }
    return
  }

  const canvas = window.top.document.querySelector(ELEMENT_SELECTOR)
  if (!canvas || !isCanvas(canvas)) {
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  for (let dy = -RANGE; dy <= RANGE; dy++) {
    for (let dx = -RANGE; dx <= RANGE; dx++) {
      const wall = dw.getTerrainAt(ex+dx, ey+dy, ez)
      const floor = dw.getTerrainAt(ex+dx, ey+dy, ez - 1)
      if (wall === undefined || wall > 0) {
        ctx.fillStyle = WALL
      } else if (floor === undefined) {
        ctx.fillStyle = FALLBACK
      } else {
        ctx.fillStyle = TERRAIN_COLORS[floor] || FALLBACK
      }

      ctx.beginPath()
      ctx.rect(RANGE + dx, RANGE + dy, 1, 1)
      ctx.fill()
    }
  }

  ctx.fillStyle = PLAYER
  ctx.beginPath()
  ctx.rect(RANGE, RANGE, 1, 1)
  ctx.fill()

  x = ex
  y = ey
  z = ez

  if (!done) {
    window.top.requestAnimationFrame(updateMinimap)
  }
}

function onUnload() {
  if (!window.top) {
    // Not running in an iframe
    return
  }

  done = true

  for (const elem of window.top.document.querySelectorAll(ELEMENT_SELECTOR)) {
    elem.remove()
  }
}

createMinimapCanvas()

if (window.top) {
  window.top.requestAnimationFrame(updateMinimap)
}

window.addEventListener('unload', onUnload)
