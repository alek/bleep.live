//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class TDR3 extends Module {

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
			this.renderBrackets([xmax/2,ymax/2], xmax*0.4, xmax*0.4, 100*Math.random(), "rgba(255,255,255," + Math.random() + ")", 40*Math.random())
		}

		if (Math.random() < 0.5) {
			this.renderBrackets([xmax/2,ymax/2], xmax*0.3, xmax*0.3, 100*Math.random(), "rgba(255,255,255," + Math.random() + ")", 40*Math.random())
		}

		if (Math.random() < 0.5) {
			this.renderBrackets([xmax/2,ymax/2], xmax*0.2, xmax*0.2, 100*Math.random(), "rgba(255,255,255," + Math.random() + ")", 40*Math.random())
		}

		if (Math.random() < 0.5) {
			this.renderBrackets([xmax/2,ymax/2], xmax*0.1, xmax*0.1, 30*Math.random(), "rgba(255,255,255," + Math.random() + ")", 2*Math.random())
		}

		drawText([xmax/2, ymax/2], "[ " + Math.random().toString(36).substr(2, 8).toUpperCase() + " ]", 10, "#fff", 100, 1, "Roboto Mono", this.getDomID())

		if (Math.random() < 0.1) {
			var gridCells = Math.floor(50*Math.random())
			this.renderGrid(gridCells, gridCells)
		}

		// drawText([xmax/2, ymax/2], "[ " + randomTractatus() + " ]", Math.sqrt(xmax)/4, "#fff", 100, 1, "Roboto Mono", this.getDomID())		

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR3;
