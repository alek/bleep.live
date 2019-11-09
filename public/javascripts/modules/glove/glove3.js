//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Glove3 extends Module {

	constructor() {
		super({	// init params mapping
			"r1": ["cc_6", 50],
			"r2": ["cc_7", 50],
			"r3": ["cc_8", 50],
			"r4": ["cc_9", 50],
			 "r5": ["cc_10", 50],
			 "w1": ["cc_17", 50],
			 "w2": ["cc_18", 50],
			 "w3": ["cc_19", 50]
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
		// $("body").css({"background-color": "rgba(" + this.params["w1"]*4 + "," + this.params["w2"]*4 + "," + this.params["w3"]*4 + ",1)"})
		drawCircleOutline([xmax/2,ymax/2], this.params["r1"]*10, "#fff", this.params["w1"], this.getDomID())
		drawCircleOutline([xmax/2,ymax/2], this.params["r2"]*10, "#fff", this.params["w2"], this.getDomID())
		drawCircleOutline([xmax/2,ymax/2], this.params["r3"]*10, "#fff", this.params["w3"], this.getDomID())
		drawCircleOutline([xmax/2,ymax/2], this.params["r4"]*10, "#fff", 10, this.getDomID())
		drawCircleOutline([xmax/2,ymax/2], this.params["r5"]*10, "#fff", 10, this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Glove3;
