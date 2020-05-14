//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class PCBBringUp1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	render() {	
		var sq = 30
		for (var x=0; x<xmax; x+=sq) {
			var path = []
			for (var i=0; i<ymax; i+=sq) {
				path.push([x,i])
			}
			drawPath(path, "#fff", 1, this.getDomID())
		}

		for (var y=0; y<ymax; y+=sq) {
			var path = []
			for (var i=0; i<xmax; i+=sq) {
				path.push([i,y])
			}
			drawPath(path, "#fff", 1, this.getDomID())
		}

		for (var x=0; x<xmax; x+=sq) {
			for (var y=0; y<ymax; y+=sq) {
				drawCircle([x,y], sq/4, "#fff", this.getDomID())	
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

export default PCBBringUp1;
