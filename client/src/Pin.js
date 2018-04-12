
import {map} from './helpers'
import electron from 'electron'
const ipcRenderer = electron.ipcRenderer

export let Pin = ({
	parent   = document.body,
	position = 'center',
	onClick  = e => {}
} = {}) => {
	// body
	let pin = document.createElement('div')
	pin.classList.add('pin', position)
	parent.appendChild(pin)
	// event
	pin.onmousedown = onClick
	let rgb = {r: 0, g: 0, b: 0}
	// interface
	return {
		pin,
		get rgb() {return rgb},
		setColor ({
			r = rgb.r,
			g = rgb.g,
			b = rgb.b
		}){
			rgb = {
				r: parseInt(r),
				g: parseInt(g),
				b: parseInt(b)
			}
			pin.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
		},
		sendToServer (rgb) {
			console.log(rgb)
			ipcRenderer.send('ui', {
				r: rgb.r / 255,
				g: rgb.g / 255,
				b: rgb.b / 255
			})
		}
	}
}
