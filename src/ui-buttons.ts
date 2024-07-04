let firstMenuButton = true

export function addMenuButton(icon: string, title: string, handler: () => void) {
  if (!window.top) {
    return
  }

  const menuButtons = window.top.document.querySelector('#minimenu')

  if (!menuButtons) {
    return
  }

  const button = window.top.document.createElement('div')
  button.className = 'ui-btn-frame p-0 me-1 custom-btn'
  button.style.height = '38px'
  button.style.width = '38px'
  button.style.overflow = 'hidden'
  if (firstMenuButton) {
    button.style.marginLeft = "calc(var(--px)* 1)";
    firstMenuButton = false
  }
  button.title = title
  button.addEventListener('click', (e) => {
    e.preventDefault()
    handler()
  })

  const buttonText = window.top.document.createElement('span')
  buttonText.innerText = icon
  buttonText.style.fontSize = '28px'
  buttonText.style.paddingTop = '4px'
  button.appendChild(buttonText)

  menuButtons.appendChild(button)
}

export function addMinimapButton(icon: string, title: string, handler: () => void) {
  if (!window.top) {
    return
  }

  const minimap = window.top.document.querySelector('#minimap')
  if (!minimap) {
    return
  }

  let minimapButtons: HTMLDivElement | null = minimap.querySelector('#custom-minimap-buttons')
  if (!minimapButtons) {
    minimapButtons = window.top.document.createElement('div')
    minimapButtons.id = 'custom-minimap-buttons'
    minimapButtons.className = 'd-flex position-absolute start-0 ui custom-btn'
    minimapButtons.style.bottom = '-18px'
    minimapButtons.style.fontSize = '16px'
    minimap.appendChild(minimapButtons)
  }

  const button = window.top.document.createElement('div')
  button.className = 'ui-btn-frame p-0 w-8 h-8'
  button.style.bottom = '-21px'
  button.title = title
  button.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    handler()
    return false
  })

  const buttonText = window.top.document.createElement('span')
  buttonText.setAttribute('data-tooltip', title)
  buttonText.innerText = icon
  buttonText.style.fontSize = '16px'
  buttonText.style.paddingTop = '2px'
  button.appendChild(buttonText)

  minimapButtons.appendChild(button)
}

function onUnload() {
  if (!window.top) {
    return
  }

  const customButtons = window.top.document.querySelectorAll('.custom-btn')
  for (let i = 0; i < customButtons.length; i++) {
    customButtons[i].remove()
  }
}

window.addEventListener('unload', onUnload)
