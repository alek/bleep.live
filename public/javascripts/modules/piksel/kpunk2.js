//
// Simple grid-based typographic randomization
//

import Module from '../../lib/module.js'

class KPunk2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_10", 50],
			"angle": ["cc_11", 0]
		})
		this.ballCoord = getRandomCoord(xmax,ymax)
		this.ballAngle = 10
		this.matrix = math.zeros(40,40)
		this.matrixCache = null 
	}

	renderGrid(columns, rows) {
		for (var i=0; i<columns; i++) {
			for (var j=0; j<rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	renderField(matrix, r)	{
		var isInitialized = !!document.getElementById("0:0") // check if init states already existis in the DOM
		var dim = matrix.size()
		for (var i=0; i<dim[0]; i++) {
			for (var j=0; j<dim[1]; j++) {
				var angle = matrix.get([i,j])
				var coord = getGridCoordinates([i, j], dim[0], dim[1], xmax, ymax) 
				var radAlpha1 = -angle * Math.PI / 180
				var radAlpha2 = (180-angle)%360 * Math.PI / 180
				if (this.matrixCache == null && !isInitialized) { // init				
					drawLine([r/2*Math.cos(radAlpha1) + coord[0], r/2*Math.sin(radAlpha1) + coord[1]], 
							 [r/2*Math.cos(radAlpha2) + coord[0], r/2*Math.sin(radAlpha2) + coord[1]],
							 // randomPantoneHex(), Math.floor(Math.random()*Math.log(xmax)) + "px", this.getDomID(), i + ":" + j)
							  // "#fff", Math.floor(Math.random()*Math.log(xmax)) + "px", this.getDomID(), i + ":" + j)
							  "rgba(255,255,255," + Math.random() + ")", Math.floor(Math.random()*Math.log(xmax)) + "px", this.getDomID(), i + ":" + j)

				} else if (this.matrixCache != null && angle != this.matrixCache.get([i,j])) {	// update angle if changed
					var el = document.getElementById(i + ":" + j)
					// el.setAttribute("transform", "rotate(" + Math.random()*360 + "," + coord[0] + "," + coord[1] + ")")
					el.setAttribute("transform", "rotate(" + angle + "," + coord[0] + "," + coord[1] + ")")
				}
			}
		}
	}

	edgeHit(coord) {
		return this.edgeXHit(coord) || this.edgeYHit(coord)
	}

	outOfBounds(coord, border) {
		return coord[0] < -border || coord[0] > xmax + border || coord[1] < -border || coord[1] > ymax + border
	}

	edgeXHit(coord) {
		return coord[0] <= 0 || coord[0] >= xmax
	}

	edgeYHit(coord) {
		return  coord[1] <= 0 || coord[1] >= ymax
	}

	render() {	
		var dim = this.matrix.size()
		var step = xmax/40

		this.ballCoord[0] = this.ballCoord[0] + step*Math.cos(-this.ballAngle * Math.PI / 180)
		this.ballCoord[1] = this.ballCoord[1] + step*Math.sin(-this.ballAngle * Math.PI / 180)

		if (Math.random() < 0.05) {
			this.ballAngle = Math.floor(Math.random()*360)
		}

		if (this.edgeXHit(this.ballCoord)) {
			this.ballAngle = (180-this.ballAngle)
		} else if (this.edgeYHit(this.ballCoord)) {
			this.ballAngle = (-this.ballAngle)
		}

		//drawCircle(this.ballCoord, Math.random()*2, "#fff", this.getDomID())

		if (!this.edgeHit(this.ballCoord)) {
			var nextCoord = [Math.floor(this.ballCoord[0]/(xmax/dim[0])),Math.floor(this.ballCoord[1]/(ymax/dim[1]))]
			for (var x=0; x<dim[0]; x++) {
				for (var y=0; y<dim[1]; y++) {
					if (nextCoord[0] == x && nextCoord[1] == y) {
						continue;
					}
					var force = Math.floor(1000/Math.sqrt(Math.pow(x - nextCoord[0], 2)  + Math.pow(y - nextCoord[1], 2)))
					// console.log(force)
					if (force > 0) {
						this.matrix.set([x,y], Math.min(force,360))
					}
				}
			}
			// this.matrix.set(nextCoord, Math.random()*360)
		} else {
			// todo: only if stuck
			if (this.outOfBounds(this.ballCoord, 30)) {
				this.ballCoord = getRandomCoord(xmax, ymax)
			}
		}

		this.renderField(this.matrix, xmax/10)
		this.matrixCache = math.matrix(this.matrix)


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		// this.clear()
		this.render()
	}

}

export default KPunk2;
