
console.log(`\nServer Started ${new Date()}\n`)

const {
	ipcMain,
	BrowserWindow
} = require('electron')

const MIDI = require('midi')
const OSC  = require('osc')
const Storage = require('./Storage')
const normalize = require('./normalize')
const colorflow = require('./colorflow')

// inits
let storage = new Storage()
var midi = new MIDI.input()

var udpPort = new OSC.UDPPort({
	localAddress : '0.0.0.0',
	localPort    : 9004
})
var extPort = new OSC.UDPPort({
	localAddress : '0.0.0.0',
	localPort    : 9005
})

sendToArduino = (address, args) => {
	//console.log(address, args)
	udpPort.send({address, args},
		'192.168.1.6', 8000)
}

sendTovj = (address, args) => {
	//console.log(address, args)
 	extPort.send({address, args},
	 	'192.168.1.1', 8000)
}

sendToUi = (key, value) => {
	let win = BrowserWindow.getAllWindows()
	if (win.length > 0) {
		let msg = {}
		msg[key] = value
		win[0].webContents.send('update', msg)

		if (value == 'ping')
			win[0].webContents.send(value)
		if (value == 'connected')
			win[0].webContents.send(value)
		if (value == 'disconnected')
		  win[0].webContents.send(value)
	}
}

let constatus = 0
setInterval(function () {
	constatus = 0
	setTimeout(connection, 1000)
}, 1000)

let connection = () => {
	if (constatus == 1) sendToUi(0, 'connected')
	else sendToUi(0, 'disconnected')
}

let ledAddr = (params => {
	for (let i in params)
		params[i].value = storage.get(i)
	return params
})({
	vibro : {
		arduino : '/v1',
		midi    : 76,
		midiMap : v => v == 0? 0: 1
	},

	r : {
		arduino : '/faderR',
		midi    : 8,
		midiMap : v => v/127
	},
	g : {
		arduino : '/faderG',
		midi    : 23,
		midiMap : v => v/127
	},
	b : {
		arduino : '/faderB',
		midi    : 9,
		midiMap : v => v/127
	},
	//address matching for LEDS   Left and Right
	l0lr: {arduino: '/l0lr'},    r0lr: {arduino: '/r0lr'},
	l0lg: {arduino: '/l0lg'},    r0lg: {arduino: '/r0lg'},
	l0lb: {arduino: '/l0lb'},    r0lb: {arduino: '/r0lb'},
	l1lr: {arduino: '/l1lr'},    r1lr: {arduino: '/r1lr'},
	l1lg: {arduino: '/l1lg'},    r1lg: {arduino: '/r1lg'},
	l1lb: {arduino: '/l1lb'},    r1lb: {arduino: '/r1lb'},
	l2lr: {arduino: '/l2lr'},    r2lr: {arduino: '/r2lr'},
	l2lg: {arduino: '/l2lg'},    r2lg: {arduino: '/r2lg'},
	l2lb: {arduino: '/l2lb'},    r2lb: {arduino: '/r2lb'},
	l3lr: {arduino: '/l3lr'},    r3lr: {arduino: '/r3lr'},
	l3lg: {arduino: '/l3lg'},    r3lg: {arduino: '/r3lg'},
	l3lb: {arduino: '/l3lb'},    r3lb: {arduino: '/r3lb'}
})

let imuAddr = (params => {
	for (let i in params)
		params[i].value = storage.get(i)
	return params
})({
  //address matching for IMUs Left and Right
	axl : {arduino: '/l0ax'},    axr: {arduino: '/r0ax'},
	ayl : {arduino: '/l0ay'},    ayr: {arduino: '/r0ay'},
	azl : {arduino: '/l0az'},    azr: {arduino: '/r0az'},
	gxl : {arduino: '/l0gx'},    gxr: {arduino: '/r0gx'},
	gyl : {arduino: '/l0gy'},    gyr: {arduino: '/r0gy'},
	gzl : {arduino: '/l0gz'},    gzr: {arduino: '/r0gz'},
	mxl : {arduino: '/l0mx'},    mxr: {arduino: '/r0mx'},
	myl : {arduino: '/l0my'},    myr: {arduino: '/r0my'},
	mzl : {arduino: '/l0mz'},    mzr: {arduino: '/r0mz'}
})

// on connect
udpPort.on('ready', () => {
	for (let i in ledAddr)
	sendToArduino(ledAddr[i].arduino, ledAddr[i].value)
})

ipcMain.on('ready', (event, arg) => {
	for (let i in ledAddr)
		sendToUi(i, ledAddr[i].value)
})

udpPort.on("message", (oscMsg) => {
	if (oscMsg.address == '/ping') sendToUi(0, 'ping')
})

let vj = false
ipcMain.on('vj', (event, arg) => {
	vj = arg
})

let raw = false
ipcMain.on('raw', (event, arg) => {
	raw = arg
})

extPort.on("message", (oscMsg) => {
	//console.log(oscMsg.address, oscMsg.args)
	for (let i in ledAddr) {
		if (vj && oscMsg.address == ledAddr[i].arduino)

			sendToArduino(oscMsg.address, oscMsg.args)
	}
})

// on arduino change
udpPort.on('bundle', (oscBundle, timeTag, info) => {
	constatus = 1
	oscBundle.packets.forEach(packet => {
		let {address, args} = packet
		for (let i in imuAddr) {
			if (address == imuAddr[i].arduino) {
				if(raw)
				 {
					 sendToUi(i, args[0])
				 	 sendTovj(imuAddr[i].arduino, args[0])
				 }
				else
				 normalize(imuAddr[i].arduino, args[0])
				break
			}
		}
	})
})

// on midi change
midi.on('message', (time, data) => {
	for (let i in ledAddr) {
		if (data[1] == ledAddr[i].midi) {
			let v = ledAddr[i].midiMap(data[2])
			ledAddr[i].value = v
			storage.set(i, v)
			sendToUi(i, v)
			sendToArduino(ledAddr[i].arduino, v)
			break
		}
	}
})

let pixwalk = false
ipcMain.on('walk', (event, arg) => {
	pixwalk = arg
})

let rgb = { ls: {r: 0, g: 0, b: 0}, rs: {r: 0, g: 0, b: 0}}
// on ui change
ipcMain.on('ui', (event, arg) => {
	for (let i in arg) {
		let v = arg[i]
		ledAddr[i].value = v
		storage.set(i, v)
		if(pixwalk){
			if (i == 'l0lr') rgb.ls.r = v
			if (i == 'l0lg') rgb.ls.g = v
			if (i == 'l0lb') rgb.ls.b = v
			if (i == 'l0lr') colorflow(rgb, 'left', true)
			if (i == 'r0lr') rgb.rs.r = v
			if (i == 'r0lg') rgb.rs.g = v
			if (i == 'r0lb') rgb.rs.b = v
			if (i == 'r0lr') colorflow(rgb, 'right', true)
		}
		else sendToArduino(ledAddr[i].arduino, v)
	}
})

ipcMain.on('reset', () => {
	for (let i in ledAddr) {
		sendToArduino(ledAddr[i].arduino, 0)
		sendToUi(i, 0)
	}
})
ipcMain.on('ping', () => {
	sendToArduino('/ping')
})
ipcMain.on('calibrate' , () => {
	lr = l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = r1 = r2 = r3 = r4 = r5 = r6 = r7 = r8 = r9 = true
})
ipcMain.on('range', (event, arg) => {
	range = arg
})
ipcMain.on('auto', (event, arg) => {
	auto = arg
})

// midi house work
console.log(`[midi] devices found:`)
for (let i = 0; i < midi.getPortCount(); i ++) {
	let name = midi.getPortName(i);
	console.log(`\t${i} :`, name)
	if (name.match('Numark iDJ Live II')) midi.openPort(i)
}

// OSC error handling
udpPort.on("error", function (error) {
    console.log("An error occurred in udpPort: ", error.message);
})

extPort.on("error", function (error) {
    console.log("An error occurred in extPort: ", error.message);
})

// osc house work
udpPort.open()
extPort.open()

// exit
process.on('SIGINT', () => {
	midi.closePort()
	console.log('Server Stopped')
})
