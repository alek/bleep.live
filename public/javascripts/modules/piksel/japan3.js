//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Japan3 extends Module {

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

	radialPath(coordinates, fill) {
		if (!fill) {
			fill = "none"
		}

		var pathEntries = ["M"].concat(coordinates[0])
		var arcPrefix = "A"

		for (var i=1; i<coordinates.length; i++) {
			pathEntries = pathEntries.concat([arcPrefix])
									 .concat(coordinates[i])
			arcPrefix = "a"
		}

		//console.log(pathEntries.join(" "))

		path( {
			d: pathEntries.join(" "),
			style: "fill:" + fill + ";stroke:" + fill + ";stroke-width:" + 0
		}, this.getDomID())

	}	

	render() {	
		
		var width = 100
		var height = width
		var arcRadius = 50

		//drawRectangleOutline([xmax/2-width/2, ymax/2-height/2], width, height, "#fff", this.getDomID())

		// static

		this.radialPath([
				[xmax/2-width/2, ymax/2-height/2], 
				[30, 30, 0, 0, 1, xmax/2+width*0.25, ymax/2+height/2],
				[10, 10, 1, 1, 0, -width/2, -height/2],
				[10, 10, 1, 1, 1, -width/2, -height/2],
				[10, 10, 1, 1, 1, +width/4, 0]
				],
			"url(#grad1)")

		for (var i=0; i<150; i+=30) {
			this.radialPath([
					[xmax/2-width/2-i, ymax/2-height/2-i], 
					[30, 30, 0, 0, 1, xmax/2+width*0.25, ymax/2+height/2],
					[10, 10, 1, 1, 0, -width/2, -height/2],
					[10, 10, 1, 1, 1, -width/2, -height/2],
					[10, 10, 1, 1, 1, +width/4, 0]
					],
				"url(#grad1)")
		}

		drawCircle([xmax/2, ymax/2+25], 20, "#73f893", this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Japan3;
