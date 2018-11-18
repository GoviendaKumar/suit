// for database
// by Anton
const fs   = require('fs')

// https://codeburst.io/how-to-store-user-data-in-electron-3ba6bf66bc1e
class Storage {

	constructor () {
		this.path = `${__dirname}/states.json`
		try {
			this.data = JSON.parse(fs.readFileSync(this.path))
		} catch(error) {
			this.data = {}
		}
	}

	get (key) {
		return this.data[key] || 0
	}

	set (key, value) {
		this.data[key] = value
		fs.writeFileSync(this.path, JSON.stringify(this.data))
	}
}

module.exports = Storage
