//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class OffWhite1 extends Module {

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

	train1() {
		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())

		if(this.getConfigVal("scanLine", true)) {
			drawRectangle([0,ymax*Math.random()], xmax, ymax*0.25*Math.random(), materialPalette[Math.floor(Math.random()*materialPalette.length)], this.getDomID())
		}

		var inc = this.getConfigVal("inc", 50)

		for (var x=0; x<xmax; x+=inc) {
			line({
				x1: x,
				y1: 0,
				x2: x,
				y2: ymax,
				stroke: "#fff",
				"transform": "rotate(0 0 0)",
				"stroke-width": 50*Math.random() + "px",
				"stroke-dasharray": 10*Math.random() + " " + 5*Math.random()
			}, this.getDomID());
		}

		drawRectangle([0,0], xmax, ymax*0.25, "#000", this.getDomID())
		drawRectangle([0,ymax*0.75], xmax, ymax*0.25, "#000", this.getDomID())		
	}

	train2() {
		drawRectangle([0,0], xmax, ymax, "#9E9E9E", this.getDomID())
		var size = ymax*0.5*Math.random()

		
		drawCircle([xmax/2,ymax/2], size, "#E91E63", this.getDomID())
		drawCircle([xmax/2,ymax/2], size*Math.random(), "#9E9E9E", this.getDomID())
	
		drawText([xmax/2,ymax/2], "" + Math.random(), "128px", "#fff", 700, -2, "Helvetica", this.getDomID())				
	}

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		this.train1()

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default OffWhite1;
