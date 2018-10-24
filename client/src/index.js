import '../graphic/style.sass'
import electron from 'electron'
import {loop} from './helpers'
import {Widget} from './Widget'
import {vibWidget} from './vibWidget'
import {ColorPicker, setbpm} from './ColorPicker'
import {Pin} from './Pin'
import {Cords} from './Cords'
import {Button, radio, label} from './Buttons'

const EventEmitter = require('events')

var Quaternion = require('quaternion')
var q = new Quaternion("99.3+8i")
console.log(q)

const ipcRenderer = electron.ipcRenderer

Button('Ping to costume', 'ping')
Button('Set zero position', 'calibrate')
Button('  External artist  ', 'ext')
Button('Autonomous mode', 'auto')
radio('reset', 'LEDs off', 'restxt')
radio('conti', 'Continuous', 'contitxt')
radio('fix', 'Fixed', 'fixtxt')
radio('norm', 'Normalized', 'normtxt')
radio('raw', 'Raw', 'rawtxt')
radio('stand', 'Standard', 'standtxt')
radio('pix', 'Pixel-walk', 'pixtxt')
radio('strob', 'Stroboscope', 'strotxt')
radio('extstr', 'External BPM', 'extstrtxt')
label('imu', 'IMU CALIBRATION', 'calibrate')
label('range', 'Min-Max range:', 'conti')
label('commu', 'COMMUNICATION', 'ping')
label('inte', 'INTERACTION', 'auto')
label('valu', 'IMU values:', 'norm')
label('fiber', 'Fiber coloring:', 'stand')
label('speed', 'Speed', 'strob')

let pinList = []
let cords = Cords()

let pins = {
	lArm      : 0, rArm      : 0,
	lRibs     : 0, rRibs     : 0,
	lThigh    : 0, rThigh    : 0,
	lFoot     : 0, rFoot     : 0
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

let sallpins = Pin ({
	position : 'aPin',
	onClick (e) {
		pinList = []
		for (let i in pins) pinList.push(i)
	}
})

let colorPicker = ColorPicker({
	onColorChange (rgb) {
		document.querySelector('.reset').checked = false
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

document.querySelector('.reset').onclick = () => {
	ipcRenderer.send('reset')
  for (let i in pins) {
		pins[i].setColor({r: 0, g: 0, b: 0})
	}
}

let pingdom = document.querySelector('.ping')
		pingdom.style.backgroundColor = 'white'
		pingdom.style.color = 'black'
pingdom.onmousedown = () => {
	pingdom.style.backgroundColor = 'grey'
	pingdom.style.color = 'red'
	ipcRenderer.send('ping')
}
pingdom.onmouseup = () => {
	pingdom.style.backgroundColor = 'white'
	pingdom.style.color = 'black'
}

let calibdom = document.querySelector('.calibrate')
		calibdom.style.backgroundColor = 'white'
		calibdom.style.color = 'black'
calibdom.onmousedown = () => {
	calibdom.style.backgroundColor = 'grey'
	calibdom.style.color = 'white'
	ipcRenderer.send('calibrate')
}
calibdom.onmouseup = () => {
	calibdom.style.backgroundColor = 'white'
	calibdom.style.color = 'black'
}

let ext = 0
let extdom = document.querySelector('.ext')
		extdom.style.color = 'black'
		extdom.style.backgroundColor = 'white'
extdom.onclick = () => {
	if (ext == 0){
		ext = 1
		ipcRenderer.send('ext', true)
		extdom.style.color = 'lightgreen'
		extdom.style.backgroundColor = 'grey'
	}
	else {
		ext = 0
		ipcRenderer.send('ext', false)
		extdom.style.color = 'black'
		extdom.style.backgroundColor = 'white'
	}
}
extdom.onmousedown = () => {
	if (ext == 0) extdom.style.color = 'white'
	else extdom.style.color = 'grey'
}

let aut = 0
let autodom = document.querySelector('.auto')
		autodom.style.color = 'black'
		autodom.style.backgroundColor = 'white'
autodom.onclick = () => {
	if (aut == 0){
		aut = 1
		ipcRenderer.send('auto', true)
		autodom.style.color = 'lightgreen'
		autodom.style.backgroundColor = 'grey'
	}
	else {
		aut = 0
		ipcRenderer.send('auto', false)
		autodom.style.color = 'black'
		autodom.style.backgroundColor = 'white'
	}
}
autodom.onmousedown = () => {
	if (aut == 0) autodom.style.color = 'white'
	else autodom.style.color = 'grey'
}

let stand = document.querySelector('.stand')
let standtxt = document.querySelector('.standtxt')
let pix = document.querySelector('.pix')
let pixtxt = document.querySelector('.pixtxt')
let strob = document.querySelector('.strob')
let strotxt = document.querySelector('.strotxt')
stand.checked = true
standtxt.style.color = '#1b8f1b'

stand.onclick = () => {
	ipcRenderer.send('mod', 1)
	pix.checked = strob.checked = false
	standtxt.style.color = '#1b8f1b'
	pixtxt.style.color = strotxt.style.color = 'white'
}
pix.onclick = () => {
	ipcRenderer.send('mod', 2)
	stand.checked = strob.checked = false
	pixtxt.style.color = '#1b8f1b'
	standtxt.style.color = strotxt.style.color = 'white'
}
strob.onclick = () => {
	colorPicker.strobocall()
	pix.checked = stand.checked = false
	strotxt.style.color = '#1b8f1b'
	pixtxt.style.color = standtxt.style.color = 'white'
}

let normdom = document.querySelector('.norm')
let normtxtdom = document.querySelector('.normtxt')
normdom.checked = true
normtxtdom.style.color = '#1b8f1b'
normdom.onclick = () => {
	ipcRenderer.send('norm', true)
	document.querySelector('.raw').checked = false
	normtxtdom.style.color = '#1b8f1b'
	document.querySelector('.rawtxt').style.color = 'white'
}
document.querySelector('.raw').onclick = () =>{
	ipcRenderer.send('norm', false)
	normdom.checked = false
	normtxtdom.style.color = 'white'
	document.querySelector('.rawtxt').style.color = '#1b8f1b'
}

let contidom = document.querySelector('.conti')
let contitxtdom = document.querySelector('.contitxt')
contidom.checked = true
contitxtdom.style.color = '#1b8f1b'
contidom.onclick = () => {
	ipcRenderer.send('range', true)
	document.querySelector('.fix').checked = false
	contitxtdom.style.color = '#1b8f1b'
	document.querySelector('.fixtxt').style.color = 'white'
}
document.querySelector('.fix').onclick = () =>{
	ipcRenderer.send('range', false)
	contidom.checked = false
	contitxtdom.style.color = 'white'
	document.querySelector('.fixtxt').style.color = '#1b8f1b'
}

let extstrdom = document.querySelector('.extstr')
let extstrtxtdom = document.querySelector('.extstrtxt')
extstrdom.onclick = () => {
	extstrtxtdom.style.color = '#1b8f1b'
}
document.querySelector('.stslider').onclick = () => {
	extstrtxtdom.style.color = 'white'
	extstrdom.checked = false
}

colorPicker.setColor({r: 255, g: 255, b: 255})
pinList.forEach(i => pins[i].setColor({r: 255, g: 255, b: 255}))

let IMUs = {
	lArm : Widget({position: 'lHand' , title: 'LEFT HAND'}),
	rArm : Widget({position: 'rHand', title: 'RIGHT HAND'})
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
		 if (i == 'vibro') vib.lArm.setState((msg[i][0]))

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

		 if (i == 'bpm') setbpm((msg[i][0]))

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
