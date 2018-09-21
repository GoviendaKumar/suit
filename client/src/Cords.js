
export let Cords = ({
	parent = document.body
} = {}) => {
	// canvas
	var cv = document.createElement('canvas')
	var ct = cv.getContext('2d')
	parent.appendChild(cv)
	// interface
	return {
		draw (list, pins, wheel) {
			// update window size
			cv.width  = window.innerWidth
			cv.height = window.innerHeight
			let fromRect = wheel.getBoundingClientRect()
			let from = {
				x: fromRect.left + fromRect.width/2,
				y: fromRect.top} // + fromRect.height/2
			// draw pair
			let draw = (pin, select) => {
				let toRect = pin.getBoundingClientRect()
				let to = {
					x: toRect.left + toRect.width/2,
					y: toRect.bottom} // + toRect.height/2
				let middle = from.y - (from.y - to.y)/2
				ct.beginPath()
				ct.moveTo(from.x, from.y)
				ct.bezierCurveTo(
					from.x, middle * .9,
					to.x, middle * 1.1,
					to.x, to.y)
				ct.strokeStyle = `rgba(255,255,255, ${select? .4: .05})`
				ct.stroke()
			}
			// choose selected
			for (let i in pins)
				draw(pins[i].pin, list.indexOf(i) > -1)
		}
	}
}
