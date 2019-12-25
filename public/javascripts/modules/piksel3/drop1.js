//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Drop1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.counter = 0
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	rndBase() {
		var bases = ['G', 'A', 'T', 'C']
		return bases[Math.floor(Math.random()*bases.length)]
	}

	pair(coord, width, renderBase) {
		drawLine([coord[0]-width/2, coord[1]], [coord[0]+width/2, coord[1]], "#fff", 1, this.getDomID())
		
		drawCircle([coord[0]-width/2, coord[1]], 5, "#fff", this.getDomID())
		drawCircle([coord[0]+width/2, coord[1]], 5, "#fff", this.getDomID())
		
		if (renderBase) {
			drawText([coord[0]-width/2-20, coord[1]], this.rndBase(), "18px", "#fff", 100, 0, "Helvetica", this.getDomID())
			drawText([coord[0]+width/2+20, coord[1]], this.rndBase(), "18px", "#fff", 100, 0, "Helvetica", this.getDomID())
		}
	}

	render() {	
		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		var amp = ymax*this.getConfigVal("amp",0.2)

		for (var i=0; i<ymax; i+=10) {
			this.pair([xmax*0.5,i], amp*Math.sin((i + Math.floor(this.counter++/6) )/(amp*0.4)), false)
		}

		for (var i=0; i<ymax; i+=40) {
			this.pair([xmax/3,i], amp*Math.sin((i + Math.floor(this.counter++/5) )/amp), false)
		}

		for (var i=0; i<ymax; i+=20) {
			this.pair([2*xmax/3,i], amp*Math.sin((i + Math.floor(this.counter++/5) )/amp), false)
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Drop1;
