//
// Simple processing-style animations
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Process1 extends Module {

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
		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())
		var size = ymax*0.1

		for (var i=0; i<xmax; i+=size) {
			for (var j=0; j<ymax; j+=size) {
				// Piksel.arrow([i,j], (timeSlide(2000,40) + (i+j)/50)%40, "#fff", Math.floor(Math.random()*4)*45, this.getDomID())		
				Piksel.arrow([i,j], (timeSlide(2000,size*0.8) + (i+j)/size)%(size*0.8), "#fff", 90, this.getDomID())		
			}
		}

		// for (var i=0; i<xmax; i+=25) {
		// 	for (var j=0; j<ymax; j+=25) {
		// 		Piksel.arrow([i,j], timeSlide(2000,10) + ((i+j)/50)%10, "#fff", 0, this.getDomID())		
		// 	}
		// }

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Process1;
