
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

export let Button = (txt, clas) => {
	let b = document.createElement('input')
  b.type = 'button'
	b.value = txt
	b.classList.add(clas)
  document.body.appendChild(b)
}

export let radio = (clas, txt, tclas) => {
	let r = document.createElement('input')
  r.type = 'radio'
	r.classList.add(clas)
	document.body.appendChild(r)
	let l = document.createElement('label')
  l.appendChild(document.createTextNode(txt))
	l.classList.add(tclas)
  document.body.insertBefore(l, document.querySelector(clas))
}

export let label = (clas, txt, bclas) => {
	let l = document.createElement('label')
	l.appendChild(document.createTextNode(txt))
	l.classList.add(clas)
	document.body.insertBefore(l, document.querySelector(bclas))
}
