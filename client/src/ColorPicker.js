
import {map, dragAndDrop, HSVtoRGB, RGBtoHSV} from './helpers'

export let ColorPicker = ({
	parent = document.body,
	onColorChange = () => {}
} = {}) => {
	// body
	let colorPicker = document.createElement('div')
	colorPicker.classList.add('colorPicker')
	parent.appendChild(colorPicker)
	colorPicker.onclick = e => e.stopPropagation()
	// wheel
	let wheel = document.createElement('div')
	wheel.classList.add('wheel')
	colorPicker.appendChild(wheel)
	// hue
	let hue = document.createElement('div')
	hue.classList.add('hue')
	colorPicker.appendChild(hue)
	// slider
	let slider = document.createElement('div')
	slider.classList.add('slider')
	colorPicker.appendChild(slider)
	// value
	let value = document.createElement('div')
	value.classList.add('value')
	slider.appendChild(value)
	// hue & saturation
	let setHueAndSaturation = e => {
		let wheelRect = wheel.getBoundingClientRect()
		let radius = (wheel.offsetWidth - hue.offsetWidth) / 2
		let center = {
			x: wheel.offsetWidth  / 2,
			y: wheel.offsetHeight / 2}
		let pos = {
			x : e.pageX - (wheelRect.left + center.x),
			y : e.pageY - (wheelRect.top  + center.y)}
		let length = Math.sqrt(
			Math.pow(pos.x, 2) + 
			Math.pow(pos.y, 2))
		let short = {
			x : pos.x / length * radius,
			y : pos.y / length * radius}
		let huePosition = length > radius? short: pos
		hue.style.left = center.x + huePosition.x + 'px'
		hue.style.top  = center.y + huePosition.y + 'px'
		hsv.s = Math.sqrt(
			Math.pow(huePosition.x, 2) + 
			Math.pow(huePosition.y, 2)) / radius
		let hueValue = Math.atan2(
			huePosition.y, 
			huePosition.x) / (2 * Math.PI)
		hsv.h = hueValue < 0? -1 * hueValue: 1 - hueValue
		onColorChange(HSVtoRGB(hsv))
		e.stopPropagation()
	}
	dragAndDrop(wheel, {
		onDown : setHueAndSaturation,
		onMove : setHueAndSaturation
	})
	// value
	let setValue = e => {
		let lRaw = e.pageX - 
			slider.getBoundingClientRect().left - 
			value.offsetWidth / 2
		let lMax = slider.offsetWidth - value.offsetWidth
		let lCurrent = lRaw < 0? 0: lRaw > lMax? lMax: lRaw
		hsv.v = lCurrent / lMax
		value.style.left = lCurrent + 'px'
		wheel.style.opacity = map(hsv.v, 0, 1, .2, .5)
		onColorChange(HSVtoRGB(hsv))
		e.stopPropagation()
	}
	dragAndDrop(slider, {
		onDown : setValue,
		onMove : setValue
	})
	let hsv = {h: 0, s: 0, v: 0}
	// interface
	return {
		wheel,
		setColor (rgb) {
			hsv = RGBtoHSV(rgb)
			// value
			value.style.left = 
				hsv.v * (slider.offsetWidth - value.offsetWidth)
			// hue & saturation
			let wheelRect = wheel.getBoundingClientRect()
			let rad = -2 * hsv.h * Math.PI
			// rad = rad < 0? -1 * rad: 360 - rad
			let radius = (wheelRect.width - hue.offsetWidth)/2
			let huePosition = {
				x : hsv.s * radius * Math.cos(rad),
				y : hsv.s * radius * Math.sin(rad)
			}
			hue.style.left = huePosition.x + wheelRect.width /2 + 'px'
			hue.style.top  = huePosition.y + wheelRect.height/2 + 'px'
		}
	}
}

