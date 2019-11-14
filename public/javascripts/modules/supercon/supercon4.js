//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Supercon4 extends Module {

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
		var config = this.getConfig()
		for (var i=-xmax; i<2*xmax; i+=xmax*0.08) {
			for (var j=-ymax; j<2*ymax; j+=xmax*0.08) {
				if (Math.random() < 0.6) {
					image( {
						href: "../public/images/supercon/seg" + Math.ceil(Math.random()*27) + ".svg",
						x: i,
						y: j,
						"transform": "rotate(" + (this.config["angle"] ? this.config["angle"] : 0) + ", " + xmax/2 + "," + ymax/2 + ")",
						width: xmax*(this.config["width"] ? this.config["width"] : 0.17)
						// width: xmax*(this.config["width"] ? this.config["width"] : 1.17)
					}, this.getDomID())
				}
			}
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Supercon4;
