
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

colorPicker.setColor({r: 255, g: 255, b: 255})
pinList.forEach(i => pins[i].setColor({r: 255, g: 255, b: 255}))

let IMUs = {
	lArm : Widget({position: 'lHand' , title: 'Left Hand'}),
	rArm : Widget({position: 'rHand', title: 'Right Hand'})
}

let vib = {
	lArm : vibWidget({position: 'back', title: 'Back'})
}

// setInterval(() => {
//  	let setTriplet = plot => {
//  		plot.x.record(Math.random())
//  		plot.y.record(Math.random())
//  		plot.z.record(Math.random())
//  	}
//  	let setDevice = device => {
// 		setTriplet(device.acc)
// 		setTriplet(device.gyro)
//  		setTriplet(device.magn)
//  	}
//  	for (let i in IMUs) setDevice(IMUs[i])
//  }, 100)

loop(() => {
	for (let i in IMUs) IMUs[i].draw()
	cords.draw(pinList, pins, colorPicker.wheel)
})

ipcRenderer.on('update', (event, msg) => {
	for (let i in msg) {
		 console.log(msg)
	//	 if (i == 'vibro') IMUs.lArm.vibro.setState(msg[i])

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
					set = true
				}
			}
		})
	}
})

ipcRenderer.send('ready')
