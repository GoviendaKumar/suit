// vibration button handler
// by Anton modified by Govienda
import electron from 'electron'
const ipcRenderer = electron.ipcRenderer

import {vibBut} from './Buttons'

export let vibWidget = ({
	parent = document.body,
	position = 'center',
	title = 'widget'
} = {}) => {
	// body
	let widget = document.createElement('div')
	widget.classList.add('widget', position)
	parent.appendChild(widget)
	let vibro = vibBut({
		parent: widget,
		name : 'Vibrate',
		onPress   () {ipcRenderer.send('ui', {vibro: 1})},
		onRelease () {ipcRenderer.send('ui', {vibro: 0})},
	})
	return vibro
}
