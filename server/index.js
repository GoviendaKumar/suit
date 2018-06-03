
console.log(`\nHello, Michaela! ${new Date()}\n`)

const {
	ipcMain,
	BrowserWindow
} = require('electron')

const MIDI = require('midi')
const OSC  = require('osc')
const Storage = require('./Storage')

// inits
let storage = new Storage()
var midi = new MIDI.input()
var osc = new OSC.UDPPort({
	localAddress : '192.168.1.255',
	localPort    : 9000
})

let sendToArduino = (address, args) => {
	osc.send({address, args},
		'192.168.1.123', 8000)
}

let sendToUi = (key, value) => {
	let win = BrowserWindow.getAllWindows()
	if (win.length > 0) {
		let msg = {}
		msg[key] = value
		win[0].webContents.send('update', msg)
	}
}

let States = (params => {
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

	gx1 : {arduino : '/1/gx1'},
	gy1 : {arduino : '/1/gy1'},
	gz1 : {arduino : '/1/gz1'},
	mx1 : {arduino : '/1/mx'},
	my1 : {arduino : '/1/my'},
	mz1 : {arduino : '/1/mz'},
	ax1 : {arduino : '/1/ax1'},
	ay1 : {arduino : '/1/ay1'},
	ax1 : {arduino : '/1/az1'},

	gx2 : {arduino : '/1/gx2'},
	gy2 : {arduino : '/1/gy2'},
	gz2 : {arduino : '/1/gz2'},
	mx2 : {arduino : '/1/mx2'},
	my2 : {arduino : '/1/my2'},
	mz2 : {arduino : '/1/mz2'},
	ax2 : {arduino : '/1/ax2'},
	ay2 : {arduino : '/1/ay2'},
	ax2 : {arduino : '/1/az2'},
})

// on connect
osc.on('ready', () => {
	for (let i in States)
		sendToArduino(States[i].arduino, States[i].value)
})

ipcMain.on('ready', (event, arg) => {
	for (let i in States)
		sendToUi(i, States[i].value)
})

// on arduino change
osc.on('bundle', (oscBundle, timeTag, info) => {
	oscBundle.packets.forEach(packet => {
		let {address, args} = packet
		for (let i in States) {
			if (address == States[i].arduino) {
				sendToUi(i, args[0])
				console.log(i, args[0])
				break
			}
		}
	})
})

// on midi change
midi.on('message', (time, data) => {
	for (let i in States) {
		if (data[1] == States[i].midi) {
			let v = States[i].midiMap(data[2])
			// update stuff
			States[i].value = v
			storage.set(i, v)
			sendToUi(i, v)
			sendToArduino(States[i].arduino, v)
			break
		}
	}
})

// on ui change
ipcMain.on('ui', (event, arg) => {
	for (let i in arg) {
		let v = arg[i]
		States[i].value = v
		storage.set(i, v)
		sendToArduino(States[i].arduino, v)
	}
})

// midi house work
console.log(`[midi] devices found:`)
for (let i = 0; i < midi.getPortCount(); i ++) {
	let name = midi.getPortName(i);
	console.log(`\t${i} :`, name)
	if (name.match('Numark iDJ Live II')) midi.openPort(i)
}

// osc house work
osc.open()

// exit
process.on('SIGINT', () => {
	midi.closePort()
	console.log('Buy Buy, Michaela!')
})
