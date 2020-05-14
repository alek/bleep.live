//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class PCBBringUp2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	render() {	

		var color = "#3FA9F5"
		drawRectangle([0,0], xmax, ymax, "#002", this.getDomID())

		var sq = 30
		for (var x=0; x<xmax; x+=sq) {
			var path = []
			for (var i=0; i<ymax; i+=sq) {
				path.push([x,i])
			}
			drawPath(path, color, 1, this.getDomID())
		}

		for (var y=0; y<ymax; y+=sq) {
			var path = []
			for (var i=0; i<xmax; i+=sq) {
				path.push([i,y])
			}
			if (Math.random() < 0.5) {
				drawPath(path, color, 1, this.getDomID())
			}
		}

		for (var x=0; x<xmax; x+=sq) {
			for (var y=0; y<ymax; y+=sq) {
				if (Math.random() < 0.5) {
					drawCircle([x,y], sq/4, color, this.getDomID())	
					// drawCircle([x,y], sq/8, "#000", this.getDomID())	
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

export default PCBBringUp2;
