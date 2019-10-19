//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Japan4 extends Module {

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

		// this.renderGrid(10,10)

		var width = 100
		var height = width

		var positions = [2,4,6,8]

		for (var i=0; i<positions.length; i++) {
			var start = getGridCoordinates([positions[i],5], 10,10, xmax, ymax)
			var flip = Math.random() < 0.5 ? 0 : 1
			var sign = Math.random() < 0.5 ? -1 : 1
			var radius = 200*Math.random()
			drawCircle(start, Math.random()*100, "url(#grad1)", this.getDomID())
			drawCircle(start, Math.random()*50, "url(#grad1)", this.getDomID())
			drawCircle(start, Math.random()*25, "url(#grad1)", this.getDomID())
			radialPath([
					start, 
					[radius, radius, flip, flip, flip, start[0]+width*Math.random(), start[1]+height/2],
					[radius, radius, flip, flip, flip, -width*Math.random(), -height*Math.random()],
					[radius, radius, flip, flip, flip, -width*Math.random(), -height*Math.random()],
					[radius, radius, flip, flip, flip, width*Math.random(), 0]
					],
				"url(#grad1)", this.getDomID())
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Japan4;
