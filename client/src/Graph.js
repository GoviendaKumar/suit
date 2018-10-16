
import {map} from './helpers'

let Graph = (cv, ct, color) => {
	let padding = 0
	let buffer = []
	let value  = {s: 0, v: 0}
	let range  = {sMin: 0, sMax: 0, vMin: 0, vMax: 0}
	return {
		record (v) {
			value.s = v
			if (range.sMin > v) range.sMin = v
			if (range.sMax < v) range.sMax = v
		},
		draw () {
			// animate range
			range.vMin += (range.sMin - range.vMin) * .01
			range.vMax += (range.sMax - range.vMax) * .01
			// value.v += (value.s - value.v) * 0.5
			value.v = value.s
			// shift buffer
			buffer.push(value.v)
			buffer = buffer.slice(-100)
			// draw stuff
			ct.beginPath()
			buffer.forEach((v, i) => {
				ct[i == 0? 'moveTo': 'lineTo'](
					i * cv.width / (buffer.length - 1),
					map(v,
						range.vMin, range.vMax,
						padding, cv.height-padding))
			})
			ct.strokeStyle = color
			ct.lineWidth   = 1
			ct.stroke()
		}
	}
}

export let GraphXYZ = ({
	parent = document.body,
	type   = 'gyroscope'
} = {}) => {
	// container
	let device = document.createElement('div')
	device.classList.add('device')
	parent.appendChild(device)
	// icon
	let icon = document.createElement('div')
	icon.classList.add('icon')
	icon.style.backgroundImage = `url('./graphic/${type}.png')`
	device.appendChild(icon)
	// canvas
	var cv = document.createElement('canvas')
	var ct = cv.getContext('2d')
	device.appendChild(cv)
	// settings
	cv.width  = 150
	cv.height = 30
	let x = Graph(cv, ct, 'hsl(320,100%,50%)')
	let y = Graph(cv, ct, 'hsl( 90,100%,50%)')
	let z = Graph(cv, ct, 'hsl(200,100%,50%)')
	// interface
	return {
		x,y,z,
		draw() {
			ct.clearRect(0, 0, cv.width, cv.height)
			// graph
			x.draw()
			y.draw()
			z.draw()
			// mask
			let gradient = ct.createRadialGradient(
				cv.width/2, cv.height/2, 0,
				cv.width/2, cv.height/2, cv.width/2)
			let bg = 'hsla(200, 15%, 7%, 1)'
			let to = 'hsla(200, 15%, 7%, 0)'
			gradient.addColorStop(0, to)
			gradient.addColorStop(1, bg)
			ct.fillStyle = gradient
			ct.fillRect(0, 0, cv.width, cv.height)
		}
	}
}
