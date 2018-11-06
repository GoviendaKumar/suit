/////////////////////////////////////////////pixel walk function
let colorflow = (rgb, side, mod) => {
  if(side == 'left'||side == 'both'){
		sendToArduino('/l0lr', rgb.ls.r); sendToUi('l0lr', rgb.ls.r)
    sendToArduino('/l0lg', rgb.ls.g); sendToUi('l0lg', rgb.ls.g)
    sendToArduino('/l0lb', rgb.ls.b); sendToUi('l0lb', rgb.ls.b)
		setTimeout(function(){sendToArduino('/l1lr', rgb.ls.r); sendToUi('l1lr', rgb.ls.r)}, 150)
		setTimeout(function(){sendToArduino('/l1lg', rgb.ls.g); sendToUi('l1lg', rgb.ls.g)}, 150)
		setTimeout(function(){sendToArduino('/l1lb', rgb.ls.b); sendToUi('l1lb', rgb.ls.b)}, 150)
    setTimeout(function(){sendToArduino('/l2lr', rgb.ls.r); sendToUi('l2lr', rgb.ls.r)}, 300)
		setTimeout(function(){sendToArduino('/l2lg', rgb.ls.g); sendToUi('l2lg', rgb.ls.g)}, 300)
		setTimeout(function(){sendToArduino('/l2lb', rgb.ls.b); sendToUi('l2lb', rgb.ls.b)}, 300)
    setTimeout(function(){sendToArduino('/l3lr', rgb.ls.r); sendToUi('l3lr', rgb.ls.r)}, 450)
    setTimeout(function(){sendToArduino('/l3lg', rgb.ls.g); sendToUi('l3lg', rgb.ls.g)}, 450)
    setTimeout(function(){sendToArduino('/l3lb', rgb.ls.b); sendToUi('l3lb', rgb.ls.b)}, 450)
    if (mod == 2){
      setTimeout(function(){sendToArduino('/l0lr', 0); sendToUi('l0lr', 0)}, 150)
  		setTimeout(function(){sendToArduino('/l0lg', 0); sendToUi('l0lg', 0)}, 150)
  		setTimeout(function(){sendToArduino('/l0lb', 0); sendToUi('l0lb', 0)}, 150)
      setTimeout(function(){sendToArduino('/l1lr', 0); sendToUi('l1lr', 0)}, 300)
  		setTimeout(function(){sendToArduino('/l1lg', 0); sendToUi('l1lg', 0)}, 300)
  		setTimeout(function(){sendToArduino('/l1lb', 0); sendToUi('l1lb', 0)}, 300)
      setTimeout(function(){sendToArduino('/l2lr', 0); sendToUi('l2lr', 0)}, 450)
  		setTimeout(function(){sendToArduino('/l2lg', 0); sendToUi('l2lg', 0)}, 450)
  		setTimeout(function(){sendToArduino('/l2lb', 0); sendToUi('l2lb', 0)}, 450)
      setTimeout(function(){sendToArduino('/l3lr', 0); sendToUi('l3lr', 0)}, 600)
      setTimeout(function(){sendToArduino('/l3lg', 0); sendToUi('l3lg', 0)}, 600)
      setTimeout(function(){sendToArduino('/l3lb', 0); sendToUi('l3lb', 0)}, 600)
    }
	}
	if(side == 'right'||side == 'both'){
    sendToArduino('/r0lr', rgb.rs.r); sendToUi('r0lr', rgb.rs.r)
    sendToArduino('/r0lg', rgb.rs.g); sendToUi('r0lg', rgb.rs.g)
    sendToArduino('/r0lb', rgb.rs.b); sendToUi('r0lb', rgb.rs.b)
		setTimeout(function(){sendToArduino('/r1lr', rgb.rs.r); sendToUi('r1lr', rgb.rs.r)}, 150)
		setTimeout(function(){sendToArduino('/r1lg', rgb.rs.g); sendToUi('r1lg', rgb.rs.g)}, 150)
		setTimeout(function(){sendToArduino('/r1lb', rgb.rs.b); sendToUi('r1lb', rgb.rs.b)}, 150)
    setTimeout(function(){sendToArduino('/r2lr', rgb.rs.r); sendToUi('r2lr', rgb.rs.r)}, 300)
    setTimeout(function(){sendToArduino('/r2lg', rgb.rs.g); sendToUi('r2lg', rgb.rs.g)}, 300)
    setTimeout(function(){sendToArduino('/r2lb', rgb.rs.b); sendToUi('r2lb', rgb.rs.b)}, 300)
    setTimeout(function(){sendToArduino('/r3lr', rgb.rs.r); sendToUi('r3lr', rgb.rs.r)}, 450)
    setTimeout(function(){sendToArduino('/r3lg', rgb.rs.g); sendToUi('r3lg', rgb.rs.g)}, 450)
    setTimeout(function(){sendToArduino('/r3lb', rgb.rs.b); sendToUi('r3lb', rgb.rs.b)}, 450)
    if (mod == 2){
      setTimeout(function(){sendToArduino('/r0lr', 0); sendToUi('r0lr', 0)}, 150)
      setTimeout(function(){sendToArduino('/r0lg', 0); sendToUi('r0lg', 0)}, 150)
      setTimeout(function(){sendToArduino('/r0lb', 0); sendToUi('r0lb', 0)}, 150)
      setTimeout(function(){sendToArduino('/r1lr', 0); sendToUi('r1lr', 0)}, 300)
      setTimeout(function(){sendToArduino('/r1lg', 0); sendToUi('r1lg', 0)}, 300)
      setTimeout(function(){sendToArduino('/r1lb', 0); sendToUi('r1lb', 0)}, 300)
      setTimeout(function(){sendToArduino('/r2lr', 0); sendToUi('r2lr', 0)}, 450)
      setTimeout(function(){sendToArduino('/r2lg', 0); sendToUi('r2lg', 0)}, 450)
      setTimeout(function(){sendToArduino('/r2lb', 0); sendToUi('r2lb', 0)}, 450)
      setTimeout(function(){sendToArduino('/r3lr', 0); sendToUi('r3lr', 0)}, 600)
      setTimeout(function(){sendToArduino('/r3lg', 0); sendToUi('r3lg', 0)}, 600)
      setTimeout(function(){sendToArduino('/r3lb', 0); sendToUi('r3lb', 0)}, 600)
    }
	}
}
module.exports = colorflow
