//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Deconstruction1 extends Module {

	constructor() {
		super({	// init params mapping
			"amp0": ["cc_1", 100],
			"amp1": ["cc_2", 100],
			"amp2": ["cc_3", 100],
			"amp3": ["cc_4", 100],
			"opacity": ["cc_5", 64]
		})
		noise.seed(Math.random()); 
	}


	gen() {
		var state = StateContainer.getInstance()
		var module = state["module"]



		// if (state["count"] > 1500) {
		// 	return
		// }

		// var dString = "M 0 " + ymax/10*(state["count"]/100) + " "
		// var dString = "M 0 " + ymax/2 + " "

		// for (var i=0; i<20; i++) {
		// 	var amp1 = parseInt(module.params["amp1"])
		// 	var amp2 = parseInt(module.params["amp2"])
		// 	var amp3 = parseInt(module.params["amp3"])
		// 	var opacity = Math.max(module.params["opacity"]/127,0.2)

		// 	dString+= "q " 
		// 				+ Math.floor(amp1*Math.random()) 
		// 				+ "," + Math.floor(-1*amp2*Math.random()) 
		// 				+ " " + Math.floor(amp3*Math.random()) 
		// 				+ ",50 t 150 -50 "
		// }

		
		var amp1 = parseInt(module.params["amp1"])
		var amp2 = parseInt(module.params["amp2"])
		var amp3 = parseInt(module.params["amp3"])
		var opacity = Math.max(module.params["opacity"]/127,0.2)

		var dString = "M " + 0 + " " + ymax/2

		for (var i=0; i<amp3; i++) {
			dString += " t " + (50*Math.random() + amp1) + " " + (i%2==0 ? 1 : -1)*amp2*noise.simplex2(i, Math.random()*ymax) + " "
			// dString += " t " + 50 + " " + (i%2==0 ? 1 : -1)*50 + " "
		}

		// console.log(dString)

		var op = noise.perlin2(Math.random()*xmax, ymax/2)

		path( {
			d: dString,
			"stroke-opacity": op,
			style: "fill:none;stroke:" + "#fff" + ";stroke-width:" + Math.floor(op*10)
		}, module.getDomID())

		state["count"] = (state["count"] + 1)%xmax

		// update viewport
		var el = document.getElementById(module.getDomID())
		el["viewBox"]["baseVal"]["x"]+=1
		// el["viewBox"]["baseVal"]["x"]-=1
		// el["viewBox"]["baseVal"]["width"]+=3
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

		this.gen()

		window.setInterval(this.gen, 25)
		window.setInterval(this.reaper, 200)

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

export default Deconstruction1;
