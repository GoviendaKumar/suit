
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
var udpPort = new OSC.UDPPort({
	localAddress : '0.0.0.0',
	localPort    : 9000
})

let sendToArduino = (address, args) => {
	udpPort.send({address, args},
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

	//address matching for LEDS   Left and Right
	l0lr : {arduino : '/l0lr'},    r0lr : {arduino : '/r0lr'},
	l0lg : {arduino : '/l0lg'},    r0lg : {arduino : '/r0lg'},
	l0lb : {arduino : '/l0lb'},    r0lb : {arduino : '/r0lb'},
	l1lr : {arduino : '/l1lr'},    r1lr : {arduino : '/r1lr'},
	l1lg : {arduino : '/l1lg'},    r1lg : {arduino : '/r1lg'},
	l1lb : {arduino : '/l1lb'},    r1lb : {arduino : '/r1lb'},
	l2lr : {arduino : '/l2lr'},    r2lr : {arduino : '/r2lr'},
	l2lg : {arduino : '/l2lg'},    r2lg : {arduino : '/r2lg'},
	l2lb : {arduino : '/l2lb'},    r2lb : {arduino : '/r2lb'},
	l3lr : {arduino : '/l3lr'},    r3lr : {arduino : '/r3lr'},
	l3lg : {arduino : '/l3lg'},    r3lg : {arduino : '/r3lg'},
	l3lb : {arduino : '/l3lb'},    r3lb : {arduino : '/r3lb'},
	l4lr : {arduino : '/l4lr'},    r4lr : {arduino : '/r4lr'},
	l4lg : {arduino : '/l4lg'},    r4lg : {arduino : '/r4lg'},
	l4lb : {arduino : '/l4lb'},    r4lb : {arduino : '/r4lb'},
	l5lr : {arduino : '/l5lr'},    r5lr : {arduino : '/r5lr'},
	l5lg : {arduino : '/l5lg'},    r5lg : {arduino : '/r5lg'},
	l5lb : {arduino : '/l5lb'},    r5lb : {arduino : '/r5lb'},
	l6lr : {arduino : '/l6lr'},    r6lr : {arduino : '/r6lr'},
	l6lg : {arduino : '/l6lg'},    r6lg : {arduino : '/r6lg'},
	l6lb : {arduino : '/l6lb'},    r6lb : {arduino : '/r6lb'},
	l7lr : {arduino : '/l7lr'},    r7lr : {arduino : '/r7lr'},
	l7lg : {arduino : '/l7lg'},    r7lg : {arduino : '/r7lg'},
	l7lb : {arduino : '/l7lb'},    r7lb : {arduino : '/r7lb'},
	l8lr : {arduino : '/l8lr'},    r8lr : {arduino : '/r8lr'},
	l8lg : {arduino : '/l8lg'},    r8lg : {arduino : '/r8lg'},
	l8lb : {arduino : '/l8lb'},    r8lb : {arduino : '/r8lb'},
	l9lr : {arduino : '/l9lr'},    r9lr : {arduino : '/r9lr'},
	l9lg : {arduino : '/l9lg'},    r9lg : {arduino : '/r9lg'},
	l9lb : {arduino : '/l9lb'},    r9lb : {arduino : '/r9lb'},

//address matching for IMUs Left and Right
	axl : {arduino : '/l0ax'},    axr : {arduino : '/r0ax'},
	ayl : {arduino : '/l0ay'},    ayr : {arduino : '/r0ay'},
	azl : {arduino : '/l0az'},    azr : {arduino : '/r0az'},
	gxl : {arduino : '/l0gx'},    gxr : {arduino : '/r0gx'},
	gyl : {arduino : '/l0gy'},    gyr : {arduino : '/r0gy'},
	gzl : {arduino : '/l0gz'},    gzr : {arduino : '/r0gz'},
	mxl : {arduino : '/l0mx'},    mxr : {arduino : '/r0mx'},
	myl : {arduino : '/l0my'},    myr : {arduino : '/r0my'},
	mzl : {arduino : '/l0mz'},    mzr : {arduino : '/r0mz'}
})

// on connect
udpPort.on('ready', () => {
	for (let i in States)
	sendToArduino(States[i].arduino, States[i].value)
})

ipcMain.on('ready', (event, arg) => {
	for (let i in States)
		sendToUi(i, States[i].value)
})

// on arduino change
udpPort.on('bundle', (oscBundle, timeTag, info) => {
	oscBundle.packets.forEach(packet => {
		let {address, args} = packet
		for (let i in States) {
			if (address == States[i].arduino) {
				sendToUi(i, args[0])
	  //	console.log(i, args[0])
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

ipcMain.on('reset', () => {
	for (let i in States) {
		sendToArduino(States[i].arduino, 0)
		sendToUi(i, 0)
	}
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
    console.log("An error occurred: ", error.message);
});
// osc house work
udpPort.open()

// exit
process.on('SIGINT', () => {
	midi.closePort()
	console.log('Buy Buy, Michaela!')
})
