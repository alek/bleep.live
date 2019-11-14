//
// Simple module demonstration
//

import Module from '../../lib/module.js'

class Line6 extends Module {

	constructor() {
		super({	// init params mapping
			"len": ["cc_2", 40],
			"amp": ["cc_3", 50],
			"opacity": ["cc_4", 0],
			"weight": ["cc_5", 64]
		})
	}


	gen() {
		var state = StateContainer.getInstance()
		var module = state["module"]

		// if (state["count"] > 1500) {
		// 	return
		// }

		// for (var i=0; i<5; i++) {
		// 	var path = [[state["count"],ymax/2]]
		// 	// for (var x=0; x<xmax; x+=200) {			
		// 	var len = module.params["len"]*4
		// 	for (var x=state["count"]; x<state["count"]+len; x+=100) {	
		// 		var amp = module.params["amp"]*10
		// 		var opacity = Math.max(module.params["opacity"]/127,0.2)
		// 		var ypos = (module.params["ypos"]/127)*ymax
		// 		path.push([x, ypos + (amp/2 - amp*Math.random())])
		// 	}
		// 	drawPath(path, "rgba(255,255,255," + opacity + ")", "1px", state["module"].getDomID() )
		// }

		var coords = [[100,100], [200,200]]
		// console.log("M 0 " + ymax/2 + " Q " + coords.map(x => x.join(" ")).join(", ") + " T " + xmax + " " + ymax/2)
		var coords = []

		var len = module.params["len"]*4
		for (var x=0; x<xmax*4; x+=len) {
			var amp = module.params["amp"]*10
			coords.push([x, ymax/2 + Math.floor(amp/2 - amp*Math.random())])
			coords.push([x+25, ymax/2])
			coords.push([x+50, ymax/2 - Math.floor(amp/2 - amp*Math.random())])
		}

		var opacity = Math.max(module.params["opacity"]/127,0.2)
		var weight = Math.max(module.params["weight"]/32,1)
		
		path( {
			d: "M 0 " + ymax/2 + " Q " + coords.map(x => x.join(" ")).join(", ") + " T " + xmax*4 + " " + ymax/2,
			"stroke-opacity": opacity,
			style: "fill:none;stroke:" + "#fff" + ";stroke-width:" + weight
		}, module.getDomID())

		state["count"] = (state["count"] + 50)%(xmax*4)
		// console.log(state["count"])

		// update viewport
		var el = document.getElementById(module.getDomID())
		//el["viewBox"]["baseVal"]["x"]+=1
		el["viewBox"]["baseVal"]["width"]+=5
		console.log(el["viewBox"]["baseVal"])

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

		//this.gen()

		window.setInterval(this.gen, 25)
		window.setInterval(this.reaper, 50)

		this.gen()
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

export default Line6;
