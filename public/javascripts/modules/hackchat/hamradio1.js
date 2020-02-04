//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class HamRadio1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
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
		var path = []
		for (var x=0; x<xmax; x+=xmax*0.1) {
			let y = ymax/2 + (0.25-Math.random()/2)*ymax
			drawCircle([x, y], 5, "#fff", this.getDomID())
			path.push([x,y])
		}
		drawPath(path, "#fff", 2, this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default HamRadio1;
