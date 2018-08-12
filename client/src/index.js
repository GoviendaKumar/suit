
import '../graphic/style.sass'
import electron from 'electron'
import {loop} from './helpers'
import {Widget} from './Widget'
import {vibWidget} from './vibWidget'
import {ColorPicker} from './ColorPicker'
import {Pin} from './Pin'
import {Cords} from './Cords'
import {Button} from './Buttons'

var Quaternion = require('quaternion')
var q = new Quaternion("99.3+8i")
console.log(q)

const ipcRenderer = electron.ipcRenderer

let pinList = []
let cords = Cords()

let pins = {
	lArm      : 0, rArm      : 0,
	lRibs     : 0, rRibs     : 0,
	lThigh    : 0, rThigh    : 0,
	lFoot     : 0, rFoot     : 0,
}

for (let i in pins) {
	pins[i] = Pin ({
		position : i,
		onClick (e) {
			if (e.shiftKey) {
				if (pinList.length == Object.keys(pins).length)
					pinList = []
				let index = pinList.indexOf(i)
				if (index == -1) {
					pinList.push(i)
					colorPicker.setColor(pins[i].rgb)
				} else {
					pinList.splice(index, 1)
					if (pinList.length == 0)
						for (let i in pins) pinList.push(i)
				}
			} else {
				pinList = []
				pinList.push(i)
				colorPicker.setColor(pins[i].rgb)
			}
			e.stopPropagation()
		}
	})
	pinList.push(i)
}

let colorPicker = ColorPicker({
	onColorChange (rgb) {
		pinList.forEach(i => {
			pins[i].setColor(rgb)
			if (pins[i] == pins.lArm)
			ipcRenderer.send('ui', {
			  l0lr: rgb.r,    l0lg: rgb.g,    l0lb: rgb.b})
			if (pins[i] == pins.rArm)
		  ipcRenderer.send('ui', {
			  r0lr: rgb.r,    r0lg: rgb.g,    r0lb: rgb.b})
			if (pins[i] == pins.lRibs)
			ipcRenderer.send('ui', {
			  l1lr: rgb.r,    l1lg: rgb.g,    l1lb: rgb.b})
			if (pins[i] == pins.rRibs)
			ipcRenderer.send('ui', {
				r1lr: rgb.r,    r1lg: rgb.g,    r1lb: rgb.b})
			if (pins[i] == pins.lThigh)
			ipcRenderer.send('ui', {
			  l2lr: rgb.r,    l2lg: rgb.g,    l2lb: rgb.b})
			if (pins[i] == pins.rThigh)
			ipcRenderer.send('ui', {
				r2lr: rgb.r,    r2lg: rgb.g,    r2lb: rgb.b})
			if (pins[i] == pins.lFoot)
			ipcRenderer.send('ui', {
				l3lr: rgb.r,    l3lg: rgb.g,    l3lb: rgb.b})
			if (pins[i] == pins.rFoot)
			ipcRenderer.send('ui', {
				r3lr: rgb.r,    r3lg: rgb.g,    r3lb: rgb.b})
		})
	}
})

Button('Reset LEDs', 'reset')
Button('  Select All  ', 'allPins')
Button('      Ping      ', 'ping')
Button('  calibrate   ', 'calibrate')
Button('VJ Disabled', 'evj')
Button('   Auto Disabled    ', 'auto')
Button(' PixWalk Disabled ', 'pixwalk')
Button('Normalized Values', 'raw')
Button('Continuous Range', 'range')

document.querySelector('.reset').onclick = () => {
	ipcRenderer.send('reset')
  for (let i in pins) {
		pins[i].setColor({r: 0, g: 0, b: 0})
	}
}
document.querySelector('.allPins').onclick = () => {
	pinList = []
	for (let i in pins) pinList.push(i)
}
document.querySelector('.ping').onclick = () => {
	ipcRenderer.send('ping')
}
document.querySelector('.calibrate').onclick = () => {
	ipcRenderer.send('calibrate')
}

let vj = 0
document.querySelector('.evj').onclick = () => {
	if (vj == 0){
		vj = 1
		ipcRenderer.send('vj', true)
		document.querySelector('.evj').value = "VJ Enabled "
	}
	else {
		vj = 0
		ipcRenderer.send('vj', false)
		document.querySelector('.evj').value = "VJ Disabled"
	}
}

let aut = 0
document.querySelector('.auto').onclick = () => {
	if (aut == 0){
		aut = 1
		ipcRenderer.send('auto', true)
		document.querySelector('.auto').value = "   Auto Enabled     "
	}
	else {
		aut = 0
		ipcRenderer.send('auto', false)
		document.querySelector('.auto').value = "   Auto Disabled    "
	}
}

let walk = 0
document.querySelector('.pixwalk').onclick = () => {
	if (walk == 0){
		walk = 1
		ipcRenderer.send('walk', true)
		document.querySelector('.pixwalk').value = " PixWalk Enabled  "
	}
	else {
		walk = 0
		ipcRenderer.send('walk', false)
		document.querySelector('.pixwalk').value = " PixWalk Disabled "
	}
}

let raw = 0
document.querySelector('.raw').onclick = () => {
	if (raw == 0){
		raw = 1
		ipcRenderer.send('raw', true)
		document.querySelector('.raw').value = "      Raw Values     "
	}
	else {
		raw = 0
		ipcRenderer.send('raw', false)
		document.querySelector('.raw').value = "Normalized Values"
	}
}

let range = 1
document.querySelector('.range').onclick = () => {
	if (range == 1){
		range = 0
		ipcRenderer.send('range', false)
		document.querySelector('.range').value = "     Fixed Range    "
	}
	else {
		range = 1
		ipcRenderer.send('range', true)
		document.querySelector('.range').value = "Continuous Range"
	}
}

colorPicker.setColor({r: 255, g: 255, b: 255})
pinList.forEach(i => pins[i].setColor({r: 255, g: 255, b: 255}))

let IMUs = {
	lArm : Widget({position: 'lHand' , title: 'Left Hand'}),
	rArm : Widget({position: 'rHand', title: 'Right Hand'})
}

let vib = {
	lArm : vibWidget({position: 'back', title: 'Back'})
}

loop(() => {
	for (let i in IMUs) IMUs[i].draw()
	cords.draw(pinList, pins, colorPicker.wheel)
})

let con = true
let con1 = true

ipcRenderer.on('connected', (event, msg) => {
	if (con) {
		document.body.style.backgroundImage = "url('./graphic/bodyg.png')"
		con = false
		con1 = true
	}
})

ipcRenderer.on('disconnected', (event, msg) => {
	if (con1) {
		document.body.style.backgroundImage = "url('./graphic/body.png')"
		con1 = false
		con = true
	}
})

ipcRenderer.on('ping', (event, msg) => {
	document.body.style.backgroundImage = "url('./graphic/bodyr.png')"
	con = true
	con1 = true
})

ipcRenderer.on('update', (event, msg) => {
	for (let i in msg) {
		 if (i == 'vibro') vib.lArm.vibro.setState(msg[i])

		 if (i == 'axl') IMUs.lArm.acc.x.record(msg[i])
		 if (i == 'ayl') IMUs.lArm.acc.y.record(msg[i])
		 if (i == 'azl') IMUs.lArm.acc.z.record(msg[i])
		 if (i == 'gxl') IMUs.lArm.gyro.x.record(msg[i])
		 if (i == 'gyl') IMUs.lArm.gyro.y.record(msg[i])
		 if (i == 'gzl') IMUs.lArm.gyro.z.record(msg[i])
		 if (i == 'mxl') IMUs.lArm.magn.x.record(msg[i])
		 if (i == 'myl') IMUs.lArm.magn.y.record(msg[i])
		 if (i == 'mzl') IMUs.lArm.magn.z.record(msg[i])

		 if (i == 'axr') IMUs.rArm.acc.x.record(msg[i])
		 if (i == 'ayr') IMUs.rArm.acc.y.record(msg[i])
		 if (i == 'azr') IMUs.rArm.acc.z.record(msg[i])
		 if (i == 'gxr') IMUs.rArm.gyro.x.record(msg[i])
		 if (i == 'gyr') IMUs.rArm.gyro.y.record(msg[i])
		 if (i == 'gzr') IMUs.rArm.gyro.z.record(msg[i])
		 if (i == 'mxr') IMUs.rArm.magn.x.record(msg[i])
		 if (i == 'myr') IMUs.rArm.magn.y.record(msg[i])
		 if (i == 'mzr') IMUs.rArm.magn.z.record(msg[i])

		 if (i == 'l0lr') pins.lArm.setColor({r: msg[i]})
		 if (i == 'l0lg') pins.lArm.setColor({g: msg[i]})
		 if (i == 'l0lb') pins.lArm.setColor({b: msg[i]})
		 if (i == 'l1lr') pins.lRibs.setColor({r: msg[i]})
		 if (i == 'l1lg') pins.lRibs.setColor({g: msg[i]})
		 if (i == 'l1lb') pins.lRibs.setColor({b: msg[i]})
		 if (i == 'l2lr') pins.lThigh.setColor({r: msg[i]})
		 if (i == 'l2lg') pins.lThigh.setColor({g: msg[i]})
		 if (i == 'l2lb') pins.lThigh.setColor({b: msg[i]})
		 if (i == 'l3lr') pins.lFoot.setColor({r: msg[i]})
		 if (i == 'l3lg') pins.lFoot.setColor({g: msg[i]})
		 if (i == 'l3lb') pins.lFoot.setColor({b: msg[i]})

		 if (i == 'r0lr') pins.rArm.setColor({r: msg[i]})
		 if (i == 'r0lg') pins.rArm.setColor({g: msg[i]})
		 if (i == 'r0lb') pins.rArm.setColor({b: msg[i]})
		 if (i == 'r1lr') pins.rRibs.setColor({r: msg[i]})
		 if (i == 'r1lg') pins.rRibs.setColor({g: msg[i]})
		 if (i == 'r1lb') pins.rRibs.setColor({b: msg[i]})
		 if (i == 'r2lr') pins.rThigh.setColor({r: msg[i]})
		 if (i == 'r2lg') pins.rThigh.setColor({g: msg[i]})
		 if (i == 'r2lb') pins.rThigh.setColor({b: msg[i]})
		 if (i == 'r3lr') pins.rFoot.setColor({r: msg[i]})
		 if (i == 'r3lg') pins.rFoot.setColor({g: msg[i]})
		 if (i == 'r3lb') pins.rFoot.setColor({b: msg[i]})

		pinList.forEach(id => {
			if (i == id) {
				pins[id].setColor({})
				let set = false
				if (!set) {
					colorPicker.setColor({})
					set = true }}})
	 }
})

ipcRenderer.send('ready')
