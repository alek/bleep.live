//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Deconstruction2 extends Module {

	constructor() {
		super({	// init params mapping
			"amp0": ["cc_1", 100],
			"amp1": ["cc_2", 100],
			"amp2": ["cc_3", 100],
			"amp3": ["cc_4", 100],
			"opacity": ["cc_5", 64]
		})
	}

	gen() {
	
		var state = StateContainer.getInstance()
		var module = state["module"]
		noise.seed(Math.random()); 

		for (var i=0; i<xmax*2; i+=100) {
			for (var j=0; j<ymax; j+=100) {
				drawRectangle([i*Math.random(),j*Math.random()], 100*Math.random(), Math.random()*100*noise.simplex2(i, j), "#fff", module.getDomID() )
			}
		}

		var el = document.getElementById(module.getDomID())
		el["viewBox"]["baseVal"]["x"]+=1
		el["viewBox"]["baseVal"]["width"]+=2

	}

	reaper() {
		var el = document.getElementsByTagName("rect")
		for (var i=0; i<el.length/10; i++) {
			el[i].remove()
		}
	}


	// initial render
	render() {	
		
		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this

		this.gen()

		window.setInterval(this.gen, 25)
		window.setInterval(this.reaper, 50)

	}

	update(event) {
		super.update(event)
		// this.clear()
		//this.render()
	}

}

export default Deconstruction2;
