//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class LogoGen1 extends Module {

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

		var entries = []
		for (var i=0; i<256; i++) {
			var binVal = (i >> 0).toString(2)
			while (binVal.length < 8) {
				binVal = "0" + binVal
			}
			entries.push(binVal)
		}

		var xoffset = 20
		var yoffset = 20

		for (var it=0; it< entries.length; it++) {
			// draw a single object
			for (var i=0; i<4; i++) {
				for (var j=0; j<4; j++) {
					var offset = i*(j+1)
					// if (Math.random() < 0.5) {
					if (entries[it].charAt(offset) == "1") {
						// drawCircle([xoffset+i*10, yoffset+j*10], 5*Math.random(), "#fff", this.getDomID())
						drawSquare([xoffset+i*10, yoffset+j*10], 10, "#fff", this.getDomID())
					}
				}
			}
			// move forward
			xoffset+=60
			if (xoffset > xmax/2) {
				xoffset = 20
				yoffset += 60
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

export default LogoGen1;
