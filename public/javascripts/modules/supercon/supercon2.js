//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Supercon from './supercon.js'

class Supercon2 extends Module {

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
		// $("#svg-config").append('<mask id="Mask"><rect id="mask-rect" x="0" y="0" width="300" height="500" fill="red" /></mask>')
		//this.renderGrid(32, 18)
		// Supercon.cablestrip([0,ymax/2], xmax, ymax/4, 5, 10, this.getDomID())
		Supercon.pcbBoard([0,0], xmax, ymax, this.getDomID())

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Supercon2;
