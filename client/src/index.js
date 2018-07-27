
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
			  l0lr: rgb.r / 255,    l0lg: rgb.g / 255,    l0lb: rgb.b / 255,
		  	l1lr: rgb.r / 255,    l1lg: rgb.g / 255,    l1lb: rgb.b / 255 })
			if (pins[i] == pins.rArm)
		  ipcRenderer.send('ui', {
			  r0lr: rgb.r / 255,    r0lg: rgb.g / 255,    r0lb: rgb.b / 255,
			  r1lr: rgb.r / 255,    r1lg: rgb.g / 255,    r1lb: rgb.b / 255 })
			if (pins[i] == pins.lRibs)
			ipcRenderer.send('ui', {
			  l2lr: rgb.r / 255,    l2lg: rgb.g / 255,    l2lb: rgb.b / 255,
				l3lr: rgb.r / 255,    l3lg: rgb.g / 255,    l3lb: rgb.b / 255,
			  l4lr: rgb.r / 255,    l4lg: rgb.g / 255,    l4lb: rgb.b / 255 })
			if (pins[i] == pins.rRibs)
			ipcRenderer.send('ui', {
				r2lr: rgb.r / 255,    r2lg: rgb.g / 255,    r2lb: rgb.b / 255,
				r3lr: rgb.r / 255,    r3lg: rgb.g / 255,    r3lb: rgb.b / 255,
				r4lr: rgb.r / 255,    r4lg: rgb.g / 255,    r4lb: rgb.b / 255 })
			if (pins[i] == pins.lThigh)
			ipcRenderer.send('ui', {
			  l5lr: rgb.r / 255,    l5lg: rgb.g / 255,    l5lb: rgb.b / 255,
				l6lr: rgb.r / 255,    l6lg: rgb.g / 255,    l6lb: rgb.b / 255,
			  l7lr: rgb.r / 255,    l7lg: rgb.g / 255,    l7lb: rgb.b / 255 })
			if (pins[i] == pins.rThigh)
			ipcRenderer.send('ui', {
				r5lr: rgb.r / 255,    r5lg: rgb.g / 255,    r5lb: rgb.b / 255,
				r6lr: rgb.r / 255,    r6lg: rgb.g / 255,    r6lb: rgb.b / 255,
				r7lr: rgb.r / 255,    r7lg: rgb.g / 255,    r7lb: rgb.b / 255 })
			if (pins[i] == pins.lFoot)
			ipcRenderer.send('ui', {
				l8lr: rgb.r / 255,    l8lg: rgb.g / 255,    l8lb: rgb.b / 255,
				l9lr: rgb.r / 255,    l9lg: rgb.g / 255,    l9lb: rgb.b / 255 })
			if (pins[i] == pins.rFoot)
			ipcRenderer.send('ui', {
				r8lr: rgb.r / 255,    r8lg: rgb.g / 255,    r8lb: rgb.b / 255,
				r9lr: rgb.r / 255,    r9lg: rgb.g / 255,    r9lb: rgb.b / 255 })
		})
	}
})

Button('Reset LEDs', 'reset')
Button('Select All', 'allPins')
Button('Ping', 'ping')
Button('calibrate', 'calibrate')
Button('VJ Disabled', 'evj')
Button('Auto Disabled', 'auto')
Button('PixWalk Enabled', 'pixwalk')

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
		document.querySelector('.evj').value = "VJ Enabled"
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
		document.querySelector('.auto').value = "Auto Enabled"
	}
	else {
		aut = 0
		ipcRenderer.send('auto', false)
		document.querySelector('.auto').value = "Auto Disabled"
	}
}

let walk = 0
document.querySelector('.pixwalk').onclick = () => {
	if (walk == 0){
		walk = 1
		ipcRenderer.send('walk', true)
		document.querySelector('.pixwalk').value = "PixWalk Enabled"
	}
	else {
		walk = 0
		ipcRenderer.send('walk', false)
		document.querySelector('.pixwalk').value = "PixWalk Disabled"
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
		 //if (i == 'vibro') IMUs.lArm.vibro.setState(msg[i])

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

		if (i == 'r') pins.lArm.setColor({r: msg[i] * 255})
		if (i == 'g') pins.lArm.setColor({g: msg[i] * 255})
		if (i == 'b') pins.lArm.setColor({b: msg[i] * 255})

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
