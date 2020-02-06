//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class StoryLine1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.palette = ["#244F80", "#DCA116", "#C84316", "rgba(220,161,23,0.5)", "rgba(36,79,128,0.5)", "rgba(200,67,22,0.5)"]
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	randomColor() {
		return this.palette[Math.floor(Math.random()*this.palette.length)]
	}

	getCoords(start, delta) {
		var result = [start]
		var inc = delta
		var off = Math.floor(Math.random()*delta)
		var mult = 2

		for (var i=0; i<12; i++) {

			if (i > 0 && i%8 == 0) {
				mult+=2
			}

			if (i > 0 && i%4 == 0) {
				inc += delta*mult*Math.sqrt(2)
			}

			var last = result.slice(-1).pop()
			switch (i%4) {
				case 0:
					result.push([last[0]+inc, last[1]])
					break
				case 1:
					result.push([last[0], last[1]-inc])
					break
				case 2:
					result.push([last[0]-2*inc, last[1]])
					break
				case 3:
					result.push([last[0], last[1]+2*inc])
					break

			}
		}

		return result
	}

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		drawRectangle([0,0], xmax, ymax, "#E9E6D3", this.getDomID())

		// drawRectangleOutline([xmax/2,ymax/2], 100, 100, "#244F80", this.getDomID(), 4)
		// drawCircleOutline([xmax/2-50,ymax/2-50], 50, "#DCA116", 4, this.getDomID())

		var delta = 20

		var coords = this.getCoords([xmax/2,ymax/2], delta)
		coords = coords.map(x => getViewport(x))

		// moveForward()
		// rotateLeft()
		scale += 0.025
		//theta += 0.0125

		// drawLine(getViewport([0,0]), getViewport([xmax,ymax]), this.randomColor(), 2, this.getDomID())

		for (var i=ymax*0.62; i<ymax; i+=4) {
			drawLine(getViewport([0,i]), getViewport([xmax,i]), "rgba(253,250,231,0.5)", 1, this.getDomID())
		}

		for (var i=0; i<coords.length-2; i++) {
			// drawCircle(coords[i], 5, this.palette[0], this.getDomID())
			// if (i>0) { drawLine(coords[i-1], coords[i], this.palette[0], "2px", this.getDomID()) }
			var dice = Math.random()
			if (dice < 0.35) {
				drawCircleOutline(coords[i], delta*(1+Math.floor(Math.random()*4)), this.randomColor(), "2px", this.getDomID())
			} else if (dice < 0.5) {
				drawPolygon([coords[i], coords[i+1], coords[i+2]], this.randomColor(), this.getDomID())
			} else if (dice < 0.7) {
				drawCircle(coords[i], delta*(1+Math.floor(Math.random()*2)), this.randomColor(), this.getDomID() )
			}

		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default StoryLine1;
