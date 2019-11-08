//
// Abstract carbon randomized beatstep
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Syn5 extends Module {

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
		Piksel.brackets([xmax/2,ymax/2], size, size, xmax*0.01, "rgba(0,0,0," + Math.random() + ")", 5, this.getDomID())

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Syn5;
