
import '../graphic/style.sass'
import electron from 'electron'
import {loop} from './helpers'
import {Widget} from './Widget'
import {vibWidget} from './vibWidget'
import {ColorPicker} from './ColorPicker'
import {Pin} from './Pin'
import {Cords} from './Cords'

const ipcRenderer = electron.ipcRenderer

let pinList = []
let cords = Cords()

let pins = {
	lArm 			: 0, rArm			 : 0,
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
			pins[i].sendToServer(rgb)
		})
	}
})

document.body.onmousedown = e => {
	pinList = []
	for (let i in pins) pinList.push(i)
}

colorPicker.setColor({r: 100, g: 150, b: 255})
pinList.forEach(i => pins[i].setColor({r: 100, g: 150, b: 255}))

let IMUs = {
	lHand : Widget({position: 'lHand' , title: 'Left Hand'}),
	rHand : Widget({position: 'rHand', title: 'Left Hand'})
}

let vib = {
	rFoot : vibWidget({position: 'back', title: 'Back'})
}

setInterval(() => {
 	let setTriplet = plot => {
 		plot.x.record(Math.random())
 		plot.y.record(Math.random())
 		plot.z.record(Math.random())
 	}
 	let setDevice = device => {
		setTriplet(device.gyro)
 		setTriplet(device.magn)
 		setTriplet(device.acc)
 	}
 	for (let i in IMUs) setDevice(IMUs[i])
 }, 100)

loop(() => {
	for (let i in IMUs) IMUs[i].draw()
	cords.draw(pinList, pins, colorPicker.wheel)
})

ipcRenderer.on('update', (event, msg) => {
	for (let i in msg) {
		// console.log(msg)
		// if (i == 'vibro') IMUs.lFoot.vibro.setState(msg[i])
		//
		// if (i == 'gx1') IMUs.lFoot.gyro.x.record(msg[i])
		// if (i == 'gy1') IMUs.lFoot.gyro.y.record(msg[i])
		// if (i == 'gz1') IMUs.lFoot.gyro.z.record(msg[i])
		// if (i == 'mx1') IMUs.lFoot.magn.x.record(msg[i])
		// if (i == 'my1') IMUs.lFoot.magn.y.record(msg[i])
		// if (i == 'mz1') IMUs.lFoot.magn.z.record(msg[i])
		// if (i == 'ax1') IMUs.lFoot.acc.x.record(msg[i])
		// if (i == 'ay1') IMUs.lFoot.acc.y.record(msg[i])
		// if (i == 'az1') IMUs.lFoot.acc.z.record(msg[i])

		// if (i == 'gx2') IMUs.rFoot.gyro.x.record(msg[i])
		// if (i == 'gy2') IMUs.rFoot.gyro.y.record(msg[i])
		// if (i == 'gz2') IMUs.rFoot.gyro.z.record(msg[i])
		// if (i == 'mx2') IMUs.rFoot.magn.x.record(msg[i])
		// if (i == 'my2') IMUs.rFoot.magn.y.record(msg[i])
		// if (i == 'mz2') IMUs.rFoot.magn.z.record(msg[i])
		// if (i == 'ax2') IMUs.rFoot.acc.x.record(msg[i])
		// if (i == 'ay2') IMUs.rFoot.acc.y.record(msg[i])
		// if (i == 'az2') IMUs.rFoot.acc.z.record(msg[i])

		if (i == 'r') pins.lArm.setColor({r: msg[i] * 255})
		if (i == 'g') pins.lArm.setColor({g: msg[i] * 255})
		if (i == 'b') pins.lArm.setColor({b: msg[i] * 255})

		pinList.forEach(id => {
			if (i == id) {
				pins[id].setColor({})
				let set = false
				if (!set) {
					colorPicker.setColor({})
					set = true
				}
			}
		})
	}
})

ipcRenderer.send('ready')
