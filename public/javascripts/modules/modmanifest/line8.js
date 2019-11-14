//
// Simple module demonstration
//

import Module from '../../lib/module.js'

class Line8 extends Module {

	constructor() {
		super({	// init params mapping
			"amp0": ["cc_1", 50],
			"amp1": ["cc_2", 50],
			"amp2": ["cc_3", 50],
			"amp3": ["cc_4", 0],
			"opacity": ["cc_5", 64]
		})
	}


	gen() {
		var state = StateContainer.getInstance()
		var module = state["module"]

		// if (state["count"] > 1500) {
		// 	return
		// }

		var dString = "M 0 " + ymax/2 + " "

		for (var i=0; i<20; i++) {
			var amp1 = parseInt(module.params["amp1"])*4
			var amp2 = parseInt(module.params["amp2"])*4
			var amp3 = parseInt(module.params["amp3"])*8
			var opacity = Math.max(module.params["opacity"]/127,0.2)

			dString+= "q " 
						+ Math.floor(amp1*Math.random()) 
						+ "," + Math.floor(-1*amp2*Math.random()) 
						+ " " + Math.floor(amp3*Math.random()) 
						+ ",50 t 150 -50 "
		}
		
		path( {
			d: dString,
			"stroke-opacity": opacity,
			"fill": "red",
			style: "fill:none;stroke:" + "#fff" + ";stroke-width:" + Math.floor(1+amp2/10*Math.random())
		}, module.getDomID())

		state["count"] = (state["count"] + 50)%xmax

		// update viewport
		var el = document.getElementById(module.getDomID())
		el["viewBox"]["baseVal"]["x"]+=1
	//	el["viewBox"]["baseVal"]["width"]+=5
		// console.log(el["viewBox"]["baseVal"])

	}

	reaper() {
		var el = document.getElementsByTagName("path")
		for (var i=0; i<el.length/10; i++) {
			el[i].remove()
		}
	}


	// initial render
	render() {	
		
		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this

		// this.gen()

		window.setInterval(this.gen, 25)
		window.setInterval(this.reaper, 50)

	}

	// state update as a result of a midi event
	// update(event) {
	// 	var knob = event['knob']
	// 	var paramName = this.wiring[knob]
	// 	var el = document.getElementById(this.getDomID())
	// 	// el.childNodes[0][paramName]['baseVal']['value'] = event['value']
	// }

	update(event) {
		super.update(event)
		// this.clear()
		//this.render()
	}

}

export default Line8;
