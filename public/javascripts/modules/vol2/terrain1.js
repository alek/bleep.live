//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Terrain1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 32],
			"grid_rows": ["cc_9", 32],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 1, "rgba(255,255,255," + Math.random() + ")", this.getDomID(), i + "-" + j)
			}
		}
	}	

	render() {	
		this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		var el = document.getElementById(10 + "-" + 10)
	}

	// state update as a result of a midi event
	update(event) {
		// super.update(event)
		// this.clear()
		// this.render()
		for (var i=0; i<this.params["grid_rows"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var el = document.getElementById(i + "-" + j)
				var size = el.r.baseVal.value
				var newSize = size
				if (size < 5) {
					newSize = size+1
				} else if (size == 0) {
					newSize = 1
				} else {
					newSize =size*Math.random()
				}
				// var newSize = Math.ceil(size * (Math.random() < 0.1 ? 0 : 1 + Math.random() ))
				el.r.baseVal.value = Math.ceil(newSize)
			}
		}
	}

}

export default Terrain1;
