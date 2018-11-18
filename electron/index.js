// electron window for executing html page. window creation and configuration
// by Anton
const {app, BrowserWindow} = require('electron')
const url  = require('url')
const path = require('path')
const env  = require('../dev')
let window = null

let server = require('../server/')

if (env == 'dev') require('electron-reload')(__dirname, {
	hardResetMethod : 'exit',
	electron        : './node_modules/.bin/electron'
})

let createWindow = () => {
	window = new BrowserWindow({
		width	    : 800,
		height	    : 800,
		resizable   : false,
		// vibrancy    : 'dark',
		titleBarStyle : 'hidden-inset',
		// transparent : true,
		// frame 	    : false
	})
	if (env == 'dev')
		setTimeout(() => {
			window.loadURL('http://localhost:8000/client')
			window.webContents.openDevTools()
		}, 1000)
	else
		window.loadURL(url.format({
			pathname : path.join(__dirname, '../client/index.html'),
			protocol : 'file:',
			slashes  : true
		}))
	window.on('closed', () => window = null)
}

app.on('ready', createWindow)

app.on('activate', () => {
	if (window === null) createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
