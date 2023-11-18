window.addEventListener('unload', () => {
  if (!window.top) {
    return
  }

  const customButtons = window.top.document.querySelectorAll('.custom-btn')
  for (let i = 0; i < customButtons.length; i++) {
    customButtons[i].remove()
  }
})

export function addMenuButton(title: string, handler: () => void) {
  if (!window.top) {
    return
  }

  const menuButtons = window.top.document.querySelector('#menuButtons')

  if (!menuButtons) {
    return
  }

  const button = window.top.document.createElement('div')
  button.className = 'ui-btn p-0 me-1 custom-btn'
  button.style.width = '32px'
  button.innerText = title
  button.addEventListener('click', (e) => {
    e.preventDefault()
    handler()
  })
  menuButtons.appendChild(button)
}

let inventoryButtonCount = 1

export function addInventoryButton(title: string, handler: () => void) {
  if (!window.top) {
    return
  }

  const inventoryButtons = window.top.document.querySelector('#crafting-bag .ui-title')
  if (!inventoryButtons) {
    return
  }

  inventoryButtonCount++

  const button = window.top.document.createElement('div')
  button.className = 'ui-btn p-1 custom-btn'
  button.style.width = '34px'
  button.style.height = '34px'
  button.style.position = 'absolute'
  button.style.top = '4px'
  button.style.right = `${inventoryButtonCount * 38 + 4}px`
  button.innerText = title
  button.addEventListener('click', (e) => {
    e.preventDefault()
    handler()
  })
  inventoryButtons.appendChild(button)
}
