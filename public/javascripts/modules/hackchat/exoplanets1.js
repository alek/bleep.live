//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Exoplanets1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 24],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.size = Math.pow(2, 10) + 1;
		this.scale = 10*Math.random()
		// this.size = 500
	}

	// isometric projection
	iso(coord) {
		return [
			0.5 * (this.size + coord[0] - coord[1]),
			0.5 * (coord[0] + coord[1])
		]
	}

	// perspective projection
	perspective(coord, height) {

		if (height == null) {
			height = 0
		}
		
		var point = this.iso(coord)

		var x0 = xmax*0.5
		var y0 = ymax*0.2

		var z = this.size*0.5 - height + point[1]*0.75
		var x = (coord[0] - this.size*0.5)*6
		var y = (this.size - coord[1])*0.005 + 0

		return [
			x0 + x / y,
			y0 + z / y
		]
	}

	renderGrid(columns, rows) {
		// var last = 100*Math.random()
		// var height = 100*Math.random()
		var peak = this.getConfigVal("peak", 128)

		var displacementMap = new Float32Array((columns+1)*(rows+1))
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				displacementMap[i*rows+j] = Math.random()*peak
			}
		}

		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var height = displacementMap[i*rows + j]
				// var height = 50
				// var height = Math.random()*100
				// var height = 10*Math.random()
				//height = height*Math.random() + 50*Math.random()
				
				// var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax)
				//var coord = this.iso(getGridCoordinates([i,j], columns, rows, xmax, ymax))
				var coord = this.perspective(getGridCoordinates([i,j], columns, rows, xmax, ymax), height)
				
				// var dis = (i*5 + j*7)%255
				var dis = displacementMap[i*rows + j]*2
				// var color = "rgba(" + dis + "," + dis + "," + dis + ",1)"
				var color = "#fff"
				
				if (j > 0) {
					// drawLine(coord, getGridCoordinates([i,j-1], columns, rows, xmax, ymax), "rgba(255,255,255,0.5)", "1px", this.getDomID())
					drawLine(coord, this.perspective(getGridCoordinates([i,j-1], columns, rows, xmax, ymax), displacementMap[i*rows + j-1]), "rgba(255,255,255,0.5)", "1px", this.getDomID())
					// drawLine(coord, this.perspective(getGridCoordinates([i,j-1], columns, rows, xmax, ymax), displacementMap[i*rows + j-1]), color, "1px", this.getDomID())
				}
				if (i > 0) {
					// drawLine(coord, getGridCoordinates([i-1,j], columns, rows, xmax, ymax), "rgba(255,255,255,0.5)", "1px", this.getDomID())
					drawLine(coord, this.perspective(getGridCoordinates([i-1,j], columns, rows, xmax, ymax), displacementMap[(i-1)*rows + j]), "rgba(255,255,255,0.5)", "1px", this.getDomID())
					// drawLine(coord, this.perspective(getGridCoordinates([i-1,j], columns, rows, xmax, ymax), displacementMap[(i-1)*rows + j]), color, "1px", this.getDomID())
				}

				drawCircle(coord, 2, color, this.getDomID())
				// drawCircle(coord, 2, "#fff", this.getDomID())

			}
		}
	}	

	render() {	
		drawRectangle([0,0], xmax,ymax, "#000", this.getDomID())
		this.renderGrid(this.params["grid_rows"],this.params["grid_columns"])
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Exoplanets1;
