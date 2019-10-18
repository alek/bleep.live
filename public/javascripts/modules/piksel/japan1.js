//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Japan1 extends Module {

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
		//var width = 100+500*Math.random()
		
		var width = 100
		var height = width

		//drawRectangleOutline([xmax/2-width/2, ymax/2-height/2], width, height, "#fff", this.getDomID())
		// if(Math.random() > 0) { drawCircle([xmax/2 - width/4,ymax/2-height/4], width/5, "#fff", this.getDomID()) }
		// if(Math.random() > 0) { drawCircle([xmax/2 + width/4,ymax/2-height/4], width/5, "#fff", this.getDomID()) }
		// if(Math.random() > 0) { drawCircle([xmax/2 - width/4,ymax/2+height/4], width/5, "#fff", this.getDomID()) }
		// if(Math.random() > 0) { drawCircle([xmax/2 + width/4,ymax/2+height/4], width/5, "#fff", this.getDomID()) }

		// random bounded spline
		var coords = []
		for (var i=0; i<4;i++) {
			coords.push( [Math.floor(xmax/2-width/2 + Math.random()*width), Math.floor(ymax/2-height/2 + Math.random()*height)] )
		}

		//console.log("M " + coords[0][0] + " " + coords[0][1] + " C " + coords.slice(1).map(x => x.join(" ")).join(", ") + "")

		var arcRadius = 400

		for (var i=0; i<400; i++) {
			arcRadius -= 4
			path( {
				d: ["M", xmax/2-arcRadius/2, ymax/2, // center of the canvas
					"A", arcRadius, arcRadius, 	 // arc radius
					"1", "1", "1", 		 // x-axis-rotation large-arc-flag sweep-flag
					xmax/2+arcRadius/2, ymax/2		 // end arc
					].join(" "),
				// style: "fill:none;stroke:#fff;stroke-width:" + 2*Math.random()
				style: "fill:none;stroke:" + randomPantoneHex() + ";stroke-width:" + 2*Math.random()
			}, this.getDomID())
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Japan1;
