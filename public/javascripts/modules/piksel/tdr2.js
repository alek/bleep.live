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
			if (Math.random() < 0.5) {
				drawRectangle([offset[0] + x, offset[1] + y], width, squareSize, "#fff", this.getDomID())			
			} else {
				drawRectangle([offset[0] + x, offset[1] + y], squareSize, height, "#fff", this.getDomID())			
			}
		}
	}


	render() {	
		// this.renderGrid(10,10)
		var squareCount = 5
		var squareSize = 50*Math.random()
		// this.renderLetter(Math.floor(width*xmax/ymax),width)

		// V1

		// this.renderChar([xmax*0.1,ymax/3],squareSize,squareCount, squareCount+1)
		// this.renderChar([xmax*0.4,ymax/3],squareSize,squareCount, squareCount+1)
		// this.renderChar([xmax*0.7,ymax/3],squareSize,squareCount, squareCount+1)


		for (var i=200; i<xmax-200; i+= (squareCount*2)*squareSize) {
			this.renderChar([i,ymax/2-squareCount*squareSize/2],squareSize,squareCount, squareCount+1)			
		}

		// V2
		// for (var i=0; i<xmax; i+=(squareCount+1)*squareSize) {
		// 	for (var j=0; j<ymax; j+= (squareCount+1)*squareSize) {
		// 		this.renderChar([i, j],squareSize,squareCount, width+1)				
		// 	}
		// }

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR2;
