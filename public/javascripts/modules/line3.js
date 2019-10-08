//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Line3 extends Module {

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
		for (var i=0; i<5; i++) {
			var path = [[state["count"],ymax/2]]
			// for (var x=0; x<xmax; x+=200) {			
			var len = state["module"].params["len"]*4
			for (var x=state["count"]; x<state["count"]+len; x+=50) {	
				var amp = state["module"].params["amp"]*20
				var opacity = state["module"].params["opacity"]/127
				var ypos = (state["module"].params["ypos"]/127)*ymax
				// path.push([x, ymax/2 + (amp/2 - amp*Math.random())])
				path.push([x, ypos + (amp/2 - amp*Math.random())])
				// drawPath([[0,ymax/2], [30, ymax/2 - 20*Math.random()], [50, ymax/2+20*Math.random()], [100, ymax/2-20], [xmax/2, ymax/2], [xmax,ymax/2]], "rgba(255,255,255,0.5)", "1px", state["module"].getDomID() )
			}
			drawPath(path, "rgba(255,255,255," + opacity + ")", "1px", state["module"].getDomID() )
		}
		state["count"] = (state["count"] + 50)%xmax
		// console.log(state["count"])
		// update viewport
	}


	// initial render
	render() {	
		
		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this

		window.setInterval(this.gen, 50)

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

export default Line3;
