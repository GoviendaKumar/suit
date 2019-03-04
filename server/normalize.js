// normalization of imu values and autonomous mod
// by Govienda
const colorflow = require('./colorflow')

let lr = l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = r1 = r2 = r3 = r4 = r5 = r6 = r7 = r8 = r9 = true
let l0lr = l0lg = l0lb = r0lr = r0lg = r0lb = pl0lr = pl0lg = pl0lb = pr0lr = pr0lg = pr0lb = 0
let a = auto = false
let c = range = true
let m = mod = 1
let rgb = { ls: {r: 0, g: 0, b: 0}, rs: {r: 0, g: 0, b: 0}}

let imuL = {
		a: {x:{min: 0, max: 0, v: 0}, y:{min: 0, max: 0, v: 0}, z:{min: 0, max: 0, v: 0}},
		g: {x:{min: 0, max: 0, v: 0}, y:{min: 0, max: 0, v: 0}, z:{min: 0, max: 0, v: 0}},
		m: {x:{min: 0, max: 0, v: 0}, y:{min: 0, max: 0, v: 0}, z:{min: 0, max: 0, v: 0}}
}
let imuR = {
	  a: {x:{min: 0, max: 0, v: 0}, y:{min: 0, max: 0, v: 0}, z:{min: 0, max: 0, v: 0}},
	  g: {x:{min: 0, max: 0, v: 0}, y:{min: 0, max: 0, v: 0}, z:{min: 0, max: 0, v: 0}},
	  m: {x:{min: 0, max: 0, v: 0}, y:{min: 0, max: 0, v: 0}, z:{min: 0, max: 0, v: 0}}
}

// normalization and autonomous funtion
let normalize = (adr, arg) => {
	if (adr == '/l0ax'){
		if(l1){// for initializing range once
			imuL.a.x.min = arg-0.1
		  imuL.a.x.max = arg+0.1
		  l1 = false
		}
		if(range){// for calculating range
				if (imuL.a.x.min > arg) imuL.a.x.min = arg
				if (imuL.a.x.max < arg) imuL.a.x.max = arg
			}
		imuL.a.x.v = Math.round(((arg - imuL.a.x.min) * 100)/(imuL.a.x.max - imuL.a.x.min))// normalization from 0 - 100
		sendToUi('axl', imuL.a.x.v)// send normalized value to ui and external
		sendToExt('/l0ax', imuL.a.x.v)
		if (auto)
			l0lr = Math.round(((arg - imuL.a.x.min) * 255)/(imuL.a.x.max - imuL.a.x.min)) // normalization from 0 - 255 for LEDs autonomous color mapping
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0ay'){
		if(l2){
			imuL.a.y.min = arg-0.1
			imuL.a.y.max = arg+0.1
			l2 = false
		}
		if(range){
			if (imuL.a.y.min > arg) imuL.a.y.min = arg
			if (imuL.a.y.max < arg) imuL.a.y.max = arg
		}
		imuL.a.y.v = Math.round(((arg - imuL.a.y.min) * 100)/(imuL.a.y.max - imuL.a.y.min))
		sendToUi('ayl', imuL.a.y.v)
		sendToExt('/l0ay', imuL.a.y.v)
		if (auto)
			l0lg = Math.round(((arg - imuL.a.y.min) * 255)/(imuL.a.y.max - imuL.a.y.min))
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0az'){
		if(l3){
			imuL.a.z.min = arg-0.1
			imuL.a.z.max = arg+0.1
			l3 = false
		}
		if(range){
			if (imuL.a.z.min > arg) imuL.a.z.min = arg
			if (imuL.a.z.max < arg) imuL.a.z.max = arg
		}
		imuL.a.z.v = Math.round(((arg - imuL.a.z.min) * 100)/(imuL.a.z.max - imuL.a.z.min))
		sendToUi('azl', imuL.a.z.v)
		sendToExt('/l0az', imuL.a.z.v)
		if (auto)
			l0lb = Math.round(((arg - imuL.a.z.min) * 255)/(imuL.a.z.max - imuL.a.z.min))
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0gx'){
		if(l4){
			imuL.g.x.min = arg-0.1
			imuL.g.x.max = arg+0.1
			l4 = false
		}
		if(range){
			if (imuL.g.x.min > arg) imuL.g.x.min = arg
			if (imuL.g.x.max < arg) imuL.g.x.max = arg
		}
		imuL.g.x.v = Math.round(((arg - imuL.g.x.min) * 100)/(imuL.g.x.max - imuL.g.x.min))
		sendToUi('gxl', imuL.g.x.v)
		sendToExt('/l0gx', imuL.g.x.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0gy'){
		if(l5){
			imuL.g.y.min = arg-0.1
			imuL.g.y.max = arg+0.1
			l5 = false
		}
		if(range){
			if (imuL.g.y.min > arg) imuL.g.y.min = arg
			if (imuL.g.y.max < arg) imuL.g.y.max = arg
		}
		imuL.g.y.v = Math.round(((arg - imuL.g.y.min) * 100)/(imuL.g.y.max - imuL.g.y.min))
		sendToUi('gyl', imuL.g.y.v)
		sendToExt('/l0gy', imuL.g.x.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0gz'){
		if(l6){
			imuL.g.z.min = arg-0.1
			imuL.g.z.max = arg+0.1
			l6 = false
		}
		if(range){
			if (imuL.g.z.min > arg) imuL.g.z.min = arg
			if (imuL.g.z.max < arg) imuL.g.z.max = arg
		}
		imuL.g.z.v = Math.round(((arg - imuL.g.z.min) * 100)/(imuL.g.z.max - imuL.g.z.min))
		sendToUi('gzl', imuL.g.z.v)
		sendToExt('/l0gz', imuL.g.z.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0mx'){
		if(l7){
			imuL.m.x.min = arg-0.1
		  imuL.m.x.max = arg+0.1
		  l7 = false
		}
		if(range){
			if (imuL.m.x.min > arg) imuL.m.x.min = arg
			if (imuL.m.x.max < arg) imuL.m.x.max = arg
		}
		imuL.m.x.v = Math.round(((arg - imuL.m.x.min) * 100)/(imuL.m.x.max - imuL.m.x.min))
		sendToUi('mxl', imuL.m.x.v)
		sendToExt('/l0mx', imuL.m.x.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0my'){
		if(l8){
			imuL.m.y.min = arg-0.1
			imuL.m.y.max = arg+0.1
			l8 = false
		}
		if(range){
			if (imuL.m.y.min > arg) imuL.m.y.min = arg
			if (imuL.m.y.max < arg) imuL.m.y.max = arg
		}
		imuL.m.y.v = Math.round(((arg - imuL.m.y.min) * 100)/(imuL.m.y.max - imuL.m.y.min))
		sendToUi('myl', imuL.m.y.v)
		sendToExt('/l0my', imuL.m.y.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/l0mz'){
		if(l9){
			imuL.m.z.min = arg-0.1
			imuL.m.z.max = arg+0.1
			l9 = false
		}
		if(range){
			if (imuL.m.z.min > arg) imuL.m.z.min = arg
			if (imuL.m.z.max < arg) imuL.m.z.max = arg
		}
		imuL.m.z.v = Math.round(((arg - imuL.m.z.min) * 100)/(imuL.m.z.max - imuL.m.z.min))
		sendToUi('mzl', imuL.m.z.v)
		sendToExt('/l0mz', imuL.m.z.v)
	}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0ax'){
		if(r1){
			imuR.a.x.min = arg-0.1
			imuR.a.x.max = arg+0.1
			r1 = false
		}
		if(range){
			if (imuR.a.x.min > arg) imuR.a.x.min = arg
			if (imuR.a.x.max < arg) imuR.a.x.max = arg
		}
		imuR.a.x.v = Math.round(((arg - imuR.a.x.min) * 100)/(imuR.a.x.max - imuR.a.x.min))
		console.log(imuR.a.x.v);
		sendToUi('axr', imuR.a.x.v)
		sendToExt('/r0ax', imuR.a.x.v)
		if (auto)
			r0lr = Math.round(((arg - imuR.a.x.min) * 255)/(imuR.a.x.max - imuR.a.x.min))
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0ay'){
		if(r2){
			imuR.a.y.min = arg-0.1
			imuL.a.y.max = arg+0.1
			r2 = false
		}
		if(range){
			if (imuR.a.y.min > arg) imuR.a.y.min = arg
			if (imuR.a.y.max < arg) imuR.a.y.max = arg
		}
		imuR.a.y.v = Math.round(((arg - imuR.a.y.min) * 100)/(imuR.a.y.max - imuR.a.y.min))
		sendToUi('ayr', imuR.a.y.v)
		sendToExt('/r0ay', imuR.a.y.v)
		if (auto)
			r0lg = Math.round(((arg - imuR.a.y.min) * 255)/(imuR.a.y.max - imuR.a.y.min))
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0az'){
		if(r3){
			imuR.a.z.min = arg-0.1
			imuR.a.z.max = arg+0.1
			r3 = false
		}
		if(range){
			if (imuR.a.z.min > arg) imuR.a.z.min = arg
			if (imuR.a.z.max < arg) imuR.a.z.max = arg
		}
		imuR.a.z.v = Math.round(((arg - imuR.a.z.min) * 100)/(imuR.a.z.max - imuR.a.z.min))
		sendToUi('azr', imuR.a.z.v)
		sendToExt('/r0az', imuR.a.z.v)
		if (auto)
			r0lb = Math.round(((arg - imuR.a.z.min) * 255)/(imuR.a.z.max - imuR.a.z.min))
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0gx'){
		if(r4){
			imuR.g.x.min = arg-0.1
			imuR.g.x.max = arg+0.1
			r4 = false
		}
		if(range){
			if (imuR.g.x.min > arg) imuR.g.x.min = arg
			if (imuR.g.x.max < arg) imuR.g.x.max = arg
		}
		imuR.g.x.v = Math.round(((arg - imuR.g.x.min) * 100)/(imuR.g.x.max - imuR.g.x.min))
		sendToUi('gxr', imuR.g.x.v)
		sendToExt('/r0gx', imuR.g.x.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0gy'){
		if(r5){
			imuR.g.y.min = arg-0.1
			imuR.g.y.max = arg+0.1
			r5 = false
		}
		if(range){
			if (imuR.g.y.min > arg) imuR.g.y.min = arg
			if (imuR.g.y.max < arg) imuR.g.y.max = arg
		}
		imuR.g.y.v = Math.round(((arg - imuR.g.y.min) * 100)/(imuR.g.y.max - imuR.g.y.min))
		sendToUi('gyr', imuR.g.y.v)
		sendToExt('/r0gy', imuR.g.y.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0gz'){
		if(r6){
			imuR.g.z.min = arg-0.1
			imuR.g.z.max = arg+0.1
			r6 = false
		}
		if(range){
			if (imuR.g.z.min > arg) imuR.g.z.min = arg
			if (imuR.g.z.max < arg) imuR.g.z.max = arg
		}
		imuR.g.z.v = Math.round(((arg - imuR.g.z.min) * 100)/(imuR.g.z.max - imuR.g.z.min))
		sendToUi('gzr', imuR.g.z.v)
		sendToExt('/r0gz', imuR.g.z.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0mx'){
		if(r7){
			imuR.m.x.min = arg-0.1
			imuR.m.x.max = arg+0.1
			r7 = false
		}
		if(range){
			if (imuR.m.x.min > arg) imuR.m.x.min = arg
			if (imuR.m.x.max < arg) imuR.m.x.max = arg
		}
		imuR.m.x.v = Math.round(((arg - imuR.m.x.min) * 100)/(imuR.m.x.max - imuR.m.x.min))
		sendToUi('mxr', imuR.m.x.v)
		sendToExt('/r0mx', imuR.m.x.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0my'){
		if(r8){
			imuR.m.y.min = arg-0.1
			imuR.m.y.max = arg+0.1
			r8 = false
		}
		if(range){
			if (imuR.m.y.min > arg) imuR.m.y.min = arg
			if (imuR.m.y.max < arg) imuR.m.y.max = arg
		}
		imuR.m.y.v = Math.round(((arg - imuR.m.y.min) * 100)/(imuR.m.y.max - imuR.m.y.min))
		sendToUi('myr', imuR.m.y.v)
		sendToExt('/r0my', imuR.m.y.v)
	}/////////////////////////////////////////////////////////////////////////////////////////
	if (adr == '/r0mz'){
		if(r9){
			imuR.m.z.min = arg-0.1
			imuR.m.z.max = arg+0.1
			r9 = false
		}
		if(range){
			if (imuR.m.z.min > arg) imuR.m.z.min = arg
			if (imuR.m.z.max < arg) imuR.m.z.max = arg
		}
		imuR.m.z.v = Math.round(((arg - imuR.m.z.min) * 100)/(imuR.m.z.max - imuR.m.z.min))
		sendToUi('mzr', imuR.m.z.v)
		sendToExt('/r0mz', imuR.m.z.v)
	}
}

// autonomous mod send currently mapped colors every second
setInterval(function () {
	if (auto){
		if((Math.abs(pl0lr-l0lr)) > 20 || (Math.abs(pl0lg-l0lg)) > 20 || (Math.abs(pl0lb-l0lb)) > 20){
			rgb.ls.r = l0lr
			rgb.ls.g = l0lg
			rgb.ls.b = l0lb
			colorflow(rgb, 'left', mod)// send rgb to pixel walk funtion
			pl0lr = l0lr
			pl0lg = l0lg
			pl0lb = l0lb
		}
	  if ((Math.abs(pr0lr-r0lr)) > 20 || (Math.abs(pr0lg-r0lg)) > 20 || (Math.abs(pr0lb-r0lb)) > 20){
		 	rgb.rs.r = r0lr
		 	rgb.rs.g = r0lg
		 	rgb.rs.b = r0lb
		 	colorflow(rgb, 'right', mod)
			pr0lr = r0lr
			pr0lg = r0lg
			pr0lb = r0lb
		}
	}
}, 1000);

module.exports = normalize
