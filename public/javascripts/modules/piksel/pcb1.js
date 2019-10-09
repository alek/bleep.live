//
// Simple grid-based typographic randomization
//

import Module from '../../lib/module.js'

class PCB1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_1", 24],
			"grid_rows": ["cc_2", 14],
			"line_count": ["cc_3", 50]
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

	renderLines(columns, rows) {
		for (var i=0; i<this.params["line_count"]*4; i++) {
			var x = Math.floor(Math.random()*columns)
			var y = Math.floor(Math.random()*rows)
			var coord1 = getGridCoordinates([x,y], columns, rows, xmax, ymax) 
			var coord2 = getGridCoordinates([ x+Math.floor(Math.random()*2), y+Math.floor(Math.random()*2) ], columns, rows, xmax, ymax) 
			drawLine(coord1, coord2, "#fff", "1px", this.getDomID() )	
		}
	}

	render() {	
		// this.setBackgroundColor(getParametricColor(this.params,2))		
		this.renderGrid(this.params["grid_columns"], this.params["grid_rows"])
		this.renderLines(this.params["grid_columns"], this.params["grid_rows"])
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
