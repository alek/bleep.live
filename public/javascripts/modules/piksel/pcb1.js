//
// Simple grid-based typographic randomization
//

import Module from '../../lib/module.js'

class PCB1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_1", 24],
			"grid_rows": ["cc_2", 14]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<columns; i++) {
			for (var j=0; j<rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}		

	render() {	
		// this.setBackgroundColor(getParametricColor(this.params,2))		
		this.renderGrid(this.params["grid_columns"], this.params["grid_rows"])
		// this.renderGrid(50, 50)
		// for (var i=0; i<10; i++) {
		// 	this.renderGrid(Math.ceil(Math.random()*20), Math.ceil(Math.random()*40))
		// }
		// this.renderObjects()
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default PCB1;
