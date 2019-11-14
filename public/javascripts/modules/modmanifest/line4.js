//
// Simple module demonstration
//

import Module from '../../lib/module.js'

class Line4 extends Module {

	constructor() {
		super({	// init params mapping
			"len": ["cc_8", 40],
			"amp": ["cc_9", 50],
			"opacity": ["cc_10", 0],
			"ypos": ["cc_11", 64]
		})
	}


	gen() {
		var state = StateContainer.getInstance()
		var module = state["module"]
		if (state["count"] > 1500) {
			return
		}

		for (var i=0; i<5; i++) {
			var path = [[state["count"],ymax/2]]
			// for (var x=0; x<xmax; x+=200) {			
			var len = module.params["len"]*4
			for (var x=state["count"]; x<state["count"]+len; x+=100) {	
				var amp = module.params["amp"]*10
				var opacity = Math.max(module.params["opacity"]/127,0.2)
				var ypos = (module.params["ypos"]/127)*ymax
				// path.push([x, ymax/2 + (amp/2 - amp*Math.random())])
				path.push([x, ypos + (amp/2 - amp*Math.random())])
				// drawPath([[0,ymax/2], [30, ymax/2 - 20*Math.random()], [50, ymax/2+20*Math.random()], [100, ymax/2-20], [xmax/2, ymax/2], [xmax,ymax/2]], "rgba(255,255,255,0.5)", "1px", state["module"].getDomID() )
			}
			drawPath(path, "rgba(255,255,255," + opacity + ")", "1px", state["module"].getDomID() )
		}
		state["count"] = (state["count"] + 50)%xmax
		// console.log(state["count"])

		// update viewport
		var el = document.getElementById(module.getDomID())
		// console.log(el["viewBox"]["baseVal"])
		// if (Math.random() < 0.2) {
			el["viewBox"]["baseVal"]["x"]+=1
		// }
		// console.log(el["viewBox"]["baseVal"])

	}


	// initial render
	render() {	
		
		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this

		window.setInterval(this.gen, 25)

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

export default Line4;
