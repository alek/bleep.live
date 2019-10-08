//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Deconstruction3 extends Module {

	constructor() {
		super({	// init params mapping
			"amp0": ["cc_1", 100],
			"amp1": ["cc_2", 100],
			"amp2": ["cc_3", 100],
			"amp3": ["cc_4", 100],
			"opacity": ["cc_5", 64],
			"amp6": ["cc_6", 100],
			"amp7": ["cc_7", 100],
			"amp8": ["cc_8", 100],
			"amp9": ["cc_9", 100],
			"amp10": ["cc_10", 100],
			"amp11": ["cc_11", 100]
		})
	}

	gen() {
	
		var state = StateContainer.getInstance()
		var module = state["module"]
		noise.seed(Math.random()); 

		// console.log(Math.abs(10*noise.perlin2(x, ymax)))

		for (var x=0; x<xmax; x+=module.params["amp8"]) {
			// drawLine([x,0], [x,ymax], "#fff", Math.abs(10*noise.simplex2(x, ymax)), module.getDomID())
			drawLine([x,0], [x,ymax], "#fff", Math.abs(module.params["amp9"]*noise.perlin2(x/xmax, 1)), module.getDomID())
		}

		// for (var i=0; i<xmax*2; i+=100) {
		// 	for (var j=0; j<ymax; j+=100) {
		// 		drawRectangle([i*Math.random(),j*Math.random()], 100*Math.random(), Math.random()*100*noise.simplex2(i, j), "#fff", module.getDomID() )
		// 		//drawCircle([i,j], 30*noise.simplex2(i, j), "#fff", module.getDomID())
		// 	}
		// }

		// var el = document.getElementById(module.getDomID())
		// el["viewBox"]["baseVal"]["x"]+=1
		// el["viewBox"]["baseVal"]["width"]+=2

	}

	reaper() {
		var el = document.getElementsByTagName("line")
		for (var i=0; i<el.length/2; i++) {
			el[i].remove()
		}
	}


	// initial render
	render() {	
		
		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this

		this.gen()

		this.intervals.push(window.setInterval(this.gen, 50))
		this.intervals.push(window.setInterval(this.reaper, 50))

	}

	update(event) {
		super.update(event)
		// this.clear()
		//this.render()
	}

}

export default Deconstruction3;
