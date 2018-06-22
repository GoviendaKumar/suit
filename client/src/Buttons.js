
export let vibBut = ({
	parent = document.body,
	name   = 'Vibration',
	onPress   = () => {},
	onRelease = () => {},
	onClick   = () => {},
} = {}) => {
	let button = document.createElement('div')
	button.classList.add('vibro')
	parent.appendChild(button)
	// events
	button.onmousedown = onPress
	button.onclick     = onClick
	button.onmouseup   = onRelease
	// label
	// button.innerHTML   = name
	return {
		setState(v) {
			button.classList[v? 'add': 'remove']('active')
		}
	}
}

export let Button = (butTxt, butClass) => {
	let b = document.createElement('input')
  b.type = 'button'
	b.value = butTxt
	b.classList.add(butClass)
  document.body.appendChild(b)
}
