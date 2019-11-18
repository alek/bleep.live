//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class Drop2 extends Module {

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

	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}

	render() {	
		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		
		var data = getBiorxivData()

		drawLine([0,ymax/2], [xmax,ymax/2], "#fff", ymax, this.getDomID(), "", true, false, Math.random()*100 + " " + Math.random()*10)
		drawLine([0,ymax/2], [xmax,ymax/2], "#fff", ymax, this.getDomID(), "", true, false, Math.random()*47 + " " + Math.random()*10)
		drawText([xmax/2,ymax/2], this.rndTitle(data), ymax/5, "#000", 700, 20, "Roboto Mono", this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Drop2;
