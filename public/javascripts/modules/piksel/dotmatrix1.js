//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Dotmatrix1 extends Module {

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

	renderType(offset, xgap, ygap, xelem, yelem) {
		for (var i=0; i<xelem; i++) {
			for (var j=0; j<yelem; j++) {
				var random = Math.random()
				if (Math.random() < 0.5) {
						rect({
							x: offset[0] + xgap*i,
							y: offset[1] + ygap*j,
							width: (xgap - 2)*random,
							height: (ygap - 2)*random,
							stroke: "#fff",
							fill: "#fff",
							rx: "5px",
							ry: "5px",
							style: "stroke-width:1;"
						}, this.getDomID());	

					// drawRectangle([offset[0] + xgap*i, offset[1] + ygap*j], xgap, ygap, "#fff", this.getDomID())
				}
			}
		}
	}


	render() {	

		//this.renderGrid(40,40)

		var gridx = 20
		var gridy = 20	

		var xgap = xmax/gridx
		var ygap = ymax/gridy

		for (var i=0; i<=gridx; i+=5) {
			for (var j=0; j<=gridy; j+=5) {
				this.renderType(getGridCoordinates([i,j], gridx,gridy, xmax, ymax), xgap, ygap, 4, 4)			
			}
		}



		// var start = getGridCoordinates([2,2], 40,40, xmax, ymax)

		// for (var x = 2; x<38; x+=8) {
		// 	for (var y = 2; y<38; y+= 8) {

		// 	var c = getGridCoordinates([x,y], 40,40, xmax, ymax)
		// 	var pathCoords = [c[0], c[1]]

		// 	for (var i=0; i<2; i++) {
		// 		if (i%2 == 0) {
		// 			pathCoords.push(pathCoords[i] + xgap, pathCoords[i+1])
		// 		} else {
		// 			pathCoords.push(pathCoords[i], pathCoords[i+1] + ygap)
		// 		}
				
		// 	}
		// 	drawPolygon(pathCoords, "#fff", this.getDomID())
		// }

		// }



	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Dotmatrix1;
