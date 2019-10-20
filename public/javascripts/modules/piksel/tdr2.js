//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class TDR2 extends Module {

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

	renderLetter(columns, rows) {
		var width = xmax/columns
		var height = ymax/rows

		for (var i=0; i<10; i++) {
			var dotX = Math.floor(Math.random()*columns)
			var dotY = Math.floor(Math.random()*rows)
			
			var coord = getGridCoordinates([dotX,dotY], columns, rows, xmax, ymax) 

			if (Math.random() < 0.5) {
				drawRectangle(coord, width, height*Math.ceil(Math.random()*rows), "#fff", this.getDomID())
			} else {
				drawRectangle(coord, width*Math.ceil(Math.random()*rows), height, "#fff", this.getDomID())
			}
			
			// drawCircle(coord, 20, "#fff", this.getDomID())

		}
	}


	renderChar(offset, squareSize, dimX, dimY) {
		for (var i=0; i<4; i++) {
			var x = Math.floor(Math.random()*dimX)*squareSize
			var y = Math.floor(Math.random()*dimY)*squareSize
			var width = squareSize*dimX - x
			var height = squareSize*dimY - y
			var color = "#fff"
			if (Math.random() < 0.5) {
				drawRectangle([offset[0] + x, offset[1] + y], width, squareSize, color, this.getDomID())			
			} else {
				drawRectangle([offset[0] + x, offset[1] + y], squareSize, height, color, this.getDomID())			
			}
		}
	}

	renderBrackets(center, width, height, len, color, stroke) {

		drawLine([center[0] - width/2, center[1] - height/2], [center[0] - width/2 + len, center[1] - height/2], color, stroke, this.getDomID())
		drawLine([center[0] - width/2, center[1] - height/2], [center[0] - width/2, center[1] - height/2 + len], color, stroke, this.getDomID())

		drawLine([center[0] + width/2, center[1] - height/2], [center[0] + width/2 - len, center[1] - height/2], color, stroke, this.getDomID())
		drawLine([center[0] + width/2, center[1] - height/2], [center[0] + width/2, center[1] - height/2 + len], color, stroke, this.getDomID())

		drawLine([center[0] + width/2, center[1] + height/2], [center[0] + width/2 - len, center[1] + height/2], color, stroke, this.getDomID())
		drawLine([center[0] + width/2, center[1] + height/2], [center[0] + width/2, center[1] + height/2 - len], color, stroke, this.getDomID())

		drawLine([center[0] - width/2, center[1] + height/2], [center[0] - width/2 + len, center[1] + height/2], color, stroke, this.getDomID())
		drawLine([center[0] - width/2, center[1] + height/2], [center[0] - width/2, center[1] + height/2 - len], color, stroke, this.getDomID())

	}


	render() {	

		var squareCount = 5
		var squareSize = 20*Math.random()

		for (var i=xmax*0.2; i<xmax-xmax*0.2; i+= (squareCount*2)*squareSize) {
			this.renderChar([i,ymax/2-squareCount*squareSize/2],squareSize,squareCount, squareCount+1)			
		}

		if (Math.random() < 0.5) {
			this.renderBrackets([xmax/2,ymax/2], xmax*0.8, xmax*0.2, 30, "rgba(255,255,255," + Math.random() + ")", 1)
		}
		if (Math.random() < 0.5) {
			var size = Math.random()
			this.renderBrackets([xmax/2,ymax/2], size*xmax, size*ymax, 10, "rgba(255,255,255," + Math.random() + ")", 1)
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR2;
