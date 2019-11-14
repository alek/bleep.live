//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Supercon5 extends Module {

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
		var width = xmax/2
		// var width = timeRamp(5000, 4*xmax)
		for (var i=0; i<Math.random()*30;i++) {
			image( {
				href: "../public/images/supercon/seg" + Math.ceil(Math.random()*28) + ".svg",
				x: xmax/2 - width/2,
				y: ymax/2 - width/2,
				// "transform": "rotate(" + (this.config["angle"] ? this.config["angle"] : timeRamp(3000, 360)) + ", " + xmax/2 + "," + ymax/2 + ")",
				width: width
			}, this.getDomID())
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Supercon5;
