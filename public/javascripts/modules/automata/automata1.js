//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Automata1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.vector = new Array(xmax*ymax)
		for (var i=0; i<ymax*xmax; i++) {
			this.vector[i] = (Math.random() > 0.9)
		}
		// this.table = [false, false, false, true, true,false, true, false]
		
		// this.table = [false, false, false, true, true,false, true, false]	// glitch

		// this.table = [false, false, false, true, true,true, true, false]		// signal fail
		// this.table = [false, false, true, false, true,false, false, false]	// strobe

		// this.table = [false, false, true, false, true,true, false, false]		// meh
		// this.table = [false, false, true, false, true,true, false, true]			// meh decay

		// this.table = [false, false, true, true, true,true, false, false]			// static good intro

		// this.table = [false, true, false, false, false,false, false, false] 	// slide left

		// this.table = [false, true, false, false, true,false, true, false]		// strobe
		// this.table = [false, true, false, false, true,false, true, true]		// outro

		// this.table = [false, true, true, false, false, false, true, true] 	// texture
		// this.table = [false, true, true, false, false, true, true, false] 	// texture

		// this.table = [false, true, true, false, true, false, false, true] 	// slow period - interesting!

		// this.table = [false, true, true, false, true, true, false, false]	// forward motion	
		// this.table = [false, true, true, true, true, true, false, false] 	// forward - inching

		// this.table = [true, false, false, false, false, true, true, false] 	// great glitch
		// this.table = [true, false, false, false, false, true, true, true] 	// glitch outro
		// this.table = [true, false, false, true, true, true, true, false]		// glitch n

		// this.table = [true, false, true, true, false, true, false, false]	// gray noise outro
		// this.table = [true, true, false, false, false, false, true, false]	// forward gray

		// this.table = [true, true, true, false, false, true, false, true] 	// marble slow
		// this.table = [true, true, true, true, false, false, false, true] 	// marble slow 2

		this.table = [true, false, false, false, false, true, true, false] 	// great glitch

	}

	render() {	

		this.setupCanvas();
		var ctx = this.getCanvasContext();
		var image = ctx.createImageData(xmax,ymax)
		for (var i=0; i<xmax; i++) {
			for (var j=0; j<ymax; j++) {
				if (this.vector[j*xmax + i]) {
					setPixel(image, i, j, 255, 255, 255, 255)					
				}
			}
		}
		ctx.putImageData(image, 0, 0);

	}

	// getVal(a1, a2, a3) {
	// 	if (!a1 && !a2 && !a3) {
	// 		return false
	// 	} else if (!a1 && !a2 && a3) {
	// 		return false
	// 	} else if (!a1 && a2 && !a3) {
	// 		return false
	// 	} else if (!a1 && a2 && a3) {
	// 		return true
	// 	} else if (a1 && !a2 && !a3) {
	// 		return true
	// 	} else if (a1 && !a2 && a3) {
	// 		return false
	// 	} else if (a1 && a2 && !a3) {
	// 		return true
	// 	} else if (a1 && a2 && a3) {
	// 		return false
	// 	} else {
	// 		return false
	// 	}
	// }

	getVal(a1, a2, a3) {
		var offset = parseInt("" + ~~a1 + ~~a2 + ~~a3, 2)
		return this.table[offset]
	}


	// state update as a result of a midi event
	update(event) {
		super.update(event)
		//this.clear()
		for (var i=1; i<this.vector.length-1; i++) {
			this.vector[i] = this.getVal(this.vector[i-1], this.vector[i], this.vector[i+1])	
			//this.vector[i] = (Math.random() > 0.95)
		}
		this.render()
	}

}

export default Automata1;
