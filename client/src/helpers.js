// helper functions
// by Anton
export let loop = callback => {
	let frame = () => {
		callback()
		window.requestAnimationFrame(frame)
	}
	frame()
}

export let map = (
	value,
	aMin, aMax,
	bMin, bMax,
	clamp
) => {
	var x = clamp == true? (
		value < aMin? aMin:
		value > aMax? aMax: value
	):  value
	return (
		(x - aMin) /
		(aMax - aMin) *
		(bMax - bMin) + bMin
	)
}
////////////////////////////////////////// html page drag and drop event listener
export let dragAndDrop = (dom, {
	onDown = () => {},
	onMove = () => {},
	onUp   = () => {}
}) => {
	let down = e => {
		onDown(e)
		dom.removeEventListener('mousedown', down)
		window.addEventListener('mousemove', move)
		window.addEventListener('mouseup', up)
	}
	let move = e => {
		onMove(e)
	}
	let up = e => {
		onUp(e)
		dom.addEventListener('mousedown', down)
		window.removeEventListener('mousemove', move)
		window.removeEventListener('mouseup', up)
	}
	dom.addEventListener('mousedown', down)
}

// r, g, b [0, 255]
export let RGBtoHSV = ({r, g, b}) => {
	r /= 255
	g /= 255
	b /= 255
	let max = Math.max(r, g, b)
	let min = Math.min(r, g, b)
	let h, s, v = max
	let d = max - min
	s = max == 0? 0: d / max
	if (max == min)
		h = 0
	else {
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break
			case g: h = (b - r) / d + 2; break
			case b: h = (r - g) / d + 4; break
		}
		h /= 6
	}
	// h, s, v [0, 1]
	return {h, s, v}
}

// h, s, v [0, 1]
export let HSVtoRGB = ({h, s, v}) => {
	let r, g, b
	let i = Math.floor(h * 6)
	let f = h * 6 - i
	let p = v * (1 - s)
	let q = v * (1 - f * s)
	let t = v * (1 - (1 - f) * s)
	switch (i % 6) {
		case 0: r = v, g = t, b = p; break
		case 1: r = q, g = v, b = p; break
		case 2: r = p, g = v, b = t; break
		case 3: r = p, g = q, b = v; break
		case 4: r = t, g = p, b = v; break
		case 5: r = v, g = p, b = q; break
	}
	// r, g, b [0, 255]
	return {
		r: parseInt(r * 255),
		g: parseInt(g * 255),
		b: parseInt(b * 255)
	}
}
