//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Chemical5 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	getGridCoordinates(columns, rows) {
		var result = []
		for (var i=0; i<=columns; i++) {
			result.push([])
			for (var j=0; j<=rows; j++) {
				//console.log(getGridCoordinates([i,j], columns, rows, xmax, ymax))
				result[i].push(getGridCoordinates([i,j], columns, rows, xmax, ymax))
			}
		}
		return result
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	stripe(coord, width, height) {
		drawCircle(coord, 2, "#fff", this.getDomID())

	}


	arrow(start, size, color, angle) {
		var delta = size*0.2

		var pathEntries = [
			[start[0], start[1] + size - delta/Math.sqrt(2)], 
			[start[0] + delta/Math.sqrt(2), start[1]+size], 
			[start[0]+size - delta, start[1] + delta + delta/Math.sqrt(2)], 
			[start[0]+size - delta, start[1]+size], 
			[start[0]+size, start[1]+size-delta], 
			[start[0]+size, start[1]], 
			[start[0]+delta, start[1]], 
			[start[0], start[1]+delta], 
			[start[0]+size-delta*(1+1/Math.sqrt(2)), start[1]+delta], 
			[start[0], start[1]+size-delta/Math.sqrt(2)]
			]

		path( {
			d: "M" + pathEntries.map(x => x.join(" ")).join(" L") + "",
			"transform": "rotate(" + angle + " " + (start[0] + size/2) + " " + (start[1] + size/2) + ")",
			style: "fill:" + color + ";stroke:" + color + ";stroke-width:" + 1
		}, this.getDomID())

		// drawText([start[0] + size + delta, start[1] + size], "™", delta, "#fff", 100, 0, "Helvetica", this.getDomID())
		// drawText([start[0] + size + delta, start[1]], "™", delta, "#fff", 100, 0, "Helvetica", this.getDomID())

	}

	barcode(coord, width, nelements) {
		var offset = 0
		for (var i=0; i<nelements; i++) {
			var height = Math.random()*10
			drawRectangle([coord[0], coord[1] + offset], width, height, "#fff", this.getDomID())
			var spacing = Math.random()*10
			offset += height + spacing
		}
	}

	fauxtext(coord, maxwidth, lineheight,  nelements) {
		for (var i=0; i<nelements; i++) {
			drawRectangle([coord[0], coord[1] + i*lineheight*3], maxwidth*Math.random(), lineheight, "#fff", this.getDomID())
		}
	}

	connectionmachine(coord, width, height, circleSize) {
		for (var i=0; i<width; i++) {
			for (var j=0; j<height; j++) {
				if (i%5 != 0 && j%5 != 0) {
					if (Math.random() < 0.5) {
						drawCircle([coord[0] + i*circleSize*3, coord[1] + j*circleSize*3], circleSize, "#fff", this.getDomID())
					}
				}
			}
		}
	}

	// quarterarc()
	speaker(coord) {
		drawCircle(coord, 2, "#fff", this.getDomID())
	}

	render() {	

		// this.renderGrid(10,10)
		
		var coords = this.getGridCoordinates(this.getConfigVal("grid-x",10),this.getConfigVal("grid-y",10))
		var width = (xmax/10)*0.9

		for (var i=0; i<coords.length; i++) {
			for (var j=0; j<coords[i].length; j++) {
				// if (Math.random() < 0.3) {
					var idx = j%7
					if (idx < 2) {
						this.barcode(coords[i][j], width*0.9, 4)	
					} else if (idx < 4) {
						this.connectionmachine(coords[i][j], 24, 8, 2)
					} else if (idx < 6) {
						this.fauxtext(coords[i][j], width, 4, 4)
					} else if (idx < 8) {
						if (Math.random() < 0.2) {
							this.arrow(coords[i][j], 40, "#fff", 90*Math.floor(Math.random()*4))
						}
					}
					
				// }
			}
		}


		// static

		// this.stripe([50,100], 20, 20)
		// this.barcode([300,100], 60, 15)
		// this.connectionmachine([300,300], 20, 10, 2)
		// this.fauxtext([100,100], 100, 4, 10)
		// this.connectionmachine([100,300], 10, 10, 4)
		// this.arrow([100,240], 40, "#fff", 90*Math.floor(Math.random()*4))
		// this.speaker([400,240], 40, "#fff", 90*Math.floor(Math.random()*4))


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Chemical5;
