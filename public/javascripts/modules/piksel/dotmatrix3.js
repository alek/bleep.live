//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Dotmatrix3 extends Module {

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

	renderTypeOld(offset, xgap, ygap, xelem, yelem) {
		for (var i=0; i<xelem; i++) {
			for (var j=0; j<yelem; j++) {
				var dice = Math.random()
				if (dice < 0.4) {
						rect({
							x: offset[0] + xgap*i,
							y: offset[1] + ygap*j,
							width: xgap,
							height: ygap,
							stroke: "#fff",
							fill: "#fff",
							style: "stroke-width:1;"
						}, this.getDomID());	

					// drawRectangle([offset[0] + xgap*i, offset[1] + ygap*j], xgap, ygap, "#fff", this.getDomID())
				} else if (dice < 0.5) {
					var coords = [[offset[0] + xgap*i, offset[1] + ygap*j], 
								  [offset[0] + xgap*i + xgap, offset[1] + ygap*j],
								  [offset[0] + xgap*i + xgap, offset[1] + ygap*j + ygap] ]
					path( {
						d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
						style: "fill:#fff;stroke:" + "#fff" + ";stroke-width:" + 0
					}, this.getDomID())
				} else if (dice < 0.6) {
						var coords = [[offset[0] + xgap*i, offset[1] + ygap*j], 
									  [offset[0] + xgap*i, offset[1] + ygap*j + ygap],
									  [offset[0] + xgap*i + xgap, offset[1] + ygap*j + ygap] ]
						path( {
							d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
							style: "fill:#fff;stroke:" + "#fff" + ";stroke-width:" + 0
						}, this.getDomID())

						// rect({
						// 	x: offset[0] + xgap*i + 2,
						// 	y: offset[1] + ygap*j + 2,
						// 	width: xgap - 4,
						// 	height: ygap - 4,
						// 	stroke: "#fff",
						// 	fill: "#fff",
						// 	rx: "50px",
						// 	style: "stroke-width:1;"
						// }, this.getDomID());	
					}
			}
		}
	}

	renderType(offset, xgap, ygap, xelem, yelem) {
		// var matrix = math.zeros(xelem,yelem)
		var last = null
		var pathCoords = []
		for (var i=0; i<xelem; i++) {
				for (var j=0; j<yelem; j++) {					
					var pos = [offset[0] + xgap*i, offset[1] + ygap*j]
					var dice = Math.random()
					if (dice < 0.1) {
						if (!last) {
							last = pos
						} else {
							pathCoords.push(pos)
							pathCoords.push([pos[0], last[1]])
							pathCoords.push([pos[0], last[1]])
							pathCoords.push(last)
							// drawLine(pos,last, "#fff", 1, this.getDomID())
							// drawLine(pos,[pos[0], last[1]], "#fff", 2, this.getDomID())
							// drawLine([pos[0], last[1]], last, "#fff", 2, this.getDomID())
							last = pos
						}
						//drawCircle(pos, 2, "#fff", this.getDomID())
						// matrix.set([i,j])
					}
				}
		}
		// console.log( "M" + pathCoords.map(x => x.join(" ")).join(" L") + "")
		path( {
			d: "M" + pathCoords.map(x => x.join(" ")).join(" L") + "",
			style: "fill:none;stroke:" + "#fff" + ";stroke-width:" + 1
		}, this.getDomID())


	}

	render() {	

		//this.renderGrid(40,40)

		var gridx = 60
		var gridy = 60	

		var xgap = xmax/gridx
		var ygap = ymax/gridy

		for (var i=0; i<=gridx; i+=8) {
			for (var j=0; j<=gridy; j+=8) {
				this.renderType(getGridCoordinates([i,j], gridx,gridy, xmax, ymax), xgap, ygap, 7, 7)			
			}
		}


		// this.renderType(getGridCoordinates([10,10], gridx,gridy, xmax, ymax), xgap, ygap, 8, 8)			

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

export default Dotmatrix3;
