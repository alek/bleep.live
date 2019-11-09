//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Glove2 extends Module {

	constructor() {
		super({	// init params mapping
			"r1": ["cc_6", 50],
			"r2": ["cc_7", 50],
			"r3": ["cc_8", 50],
			"r4": ["cc_13", 50],
			 "r5": ["cc_10", 50]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		//console.log(this.getParams())
		// drawCircle([xmax/2,ymax/2], this.params["r1"]*timeRamp(4000,5), "#fff", this.getDomID())
		// drawCircle([xmax/2,ymax/2], this.params["r2"]*timeRamp(4000,5), "#000", this.getDomID())
		// drawCircle([xmax/2,ymax/2], this.params["r3"]*timeRamp(4000,5), "#fff", this.getDomID())
		// drawCircle([xmax/2,ymax/2], this.params["r4"]*timeRamp(4000,5), "#fff", this.getDomID())
		// drawCircle([xmax/2,ymax/2], this.params["r5"]*timeRamp(4000,5), "#fff", this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		if (event._type == "cc") {
			var key = this.getParamNameFromCC(event.knob)
			if (key != null) {
				console.log(key)
			}
		}
		// this.clear()
		// this.render()
	}

}

export default Glove2;
