//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class TDR4 extends Module {

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
				drawCircle(coord, 1, "#fff", this.getDomID())
			}
		}
	}	

	renderBrackets(center, width, height, len, color, stroke) {

		// clockwise bracket rendering

		drawPath([
			[center[0] - width/2 + len, center[1] - height/2], 
			[center[0] - width/2, center[1] - height/2],
			[center[0] - width/2,  center[1] - height/2 + len]
			], color, stroke, this.getDomID())

		drawPath([
			[center[0] + width/2 - len, center[1] - height/2], 
			[center[0] + width/2, center[1] - height/2],
			[center[0] + width/2,  center[1] - height/2 + len]
			], color, stroke, this.getDomID())

		drawPath([
			[center[0] + width/2 , center[1] + height/2 - len], 
			[center[0] + width/2, center[1] + height/2],
			[center[0] + width/2 - len,  center[1] + height/2]
			], color, stroke, this.getDomID())

		drawPath([
			[center[0] - width/2 + len, center[1] + height/2], 
			[center[0] - width/2, center[1] + height/2],
			[center[0] - width/2,  center[1] + height/2 - len]
			], color, stroke, this.getDomID())

	}


	render() {	

		var squareCount = 5
		var squareSize = 20*Math.random()

		if (Math.random() < 0.5) {
			var dim = ymax*0.5*Math.random()
			this.renderBrackets([xmax/2,ymax/2], dim, dim, 25, "#fff", 10*Math.random())
		}

		// this.renderBrackets([xmax/2,ymax/2], xmax-100, ymax-100, 50, "#fff", 1)

		var fontSize = 10 + 500*Math.random()

		var angle = 0
		for (var i=0; i<ymax; i+=fontSize) {
				text( { 
					x: 0,
					y: i,
					"fill": "rgba(255,255,255," + Math.random()/4 + ")",
					"transform": "rotate(" + i + " " + xmax/2 + " " + ymax/2 + ")",
					"style": "font-size:" + fontSize + ";text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:Helvetica;sans-serif;font-weight:" + 100 * Math.ceil(Math.random()*7) + ";letter-spacing:-2px;"
				}, randomTractatus(), this.getDomID()); 
				angle += 3
		}

		//drawText([xmax/2, ymax/2], randomTractatus(), 50, "#fff", 700, -5, "Helvetica", this.getDomID())		

		drawText([xmax/2, ymax/2], "[ " + Math.random().toString(36).substr(2, 8).toUpperCase() + " ]", 10, "#fff", 100, 1, "Roboto Mono", this.getDomID())

		if (Math.random() < 0.5) { drawCircle([xmax*0.5-40,ymax*0.8], 10, "#fff", this.getDomID()) }
		if (Math.random() < 0.5) { drawCircle([xmax*0.5,ymax*0.8], 10, "#fff", this.getDomID()) }
		if (Math.random() < 0.5) { drawCircle([xmax*0.5+40,ymax*0.8], 10, "#fff", this.getDomID()) }

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR4;
