//
// Simple grid-based typographic randomization
//

import Module from '../../lib/module.js'

class KPunk1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_10", 5],
			"angle": ["cc_11", 0]
		})
		this.ballCoord = getRandomCoord(xmax,ymax)
		this.ballAngle = 10
		this.matrix = math.zeros(30,30)
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
							  "#fff", Math.floor(Math.random()*10) + "px", this.getDomID(), i + ":" + j)

				} else if (this.matrixCache != null && angle != this.matrixCache.get([i,j])) {	// update angle if changed
					var el = document.getElementById(i + ":" + j)
					el.setAttribute("transform", "rotate(" + Math.random()*360 + "," + coord[0] + "," + coord[1] + ")")
				}
			}
		}
	}

	edgeHit(coord) {
		return this.edgeXHit(coord) || this.edgeYHit(coord)
	}

	edgeXHit(coord) {
		return coord[0] <= 0 || coord[0] >= xmax
	}

	edgeYHit(coord) {
		return  coord[1] <= 0 || coord[1] >= ymax
	}

	render() {	
		var dim = this.matrix.size()

		this.ballCoord[0] = this.ballCoord[0] + 10*Math.cos(-this.ballAngle * Math.PI / 180)
		this.ballCoord[1] = this.ballCoord[1] + 10*Math.sin(-this.ballAngle * Math.PI / 180)

		if (Math.random() < 0.1) {
			this.ballAngle = Math.floor(Math.random()*360)
		}

		if (this.edgeXHit(this.ballCoord)) {
			this.ballAngle = (180-this.ballAngle)
		} else if (this.edgeYHit(this.ballCoord)) {
			this.ballAngle = (-this.ballAngle)
		}

		// drawCircle(this.ballCoord, Math.random()*2, "#fff", this.getDomID())

		if (!this.edgeHit(this.ballCoord)) {
			this.matrix.set([Math.floor(this.ballCoord[0]/(xmax/dim[0])),Math.floor(this.ballCoord[1]/(ymax/dim[1]))], Math.random()*360)
		}

		this.renderField(this.matrix, 30)
		this.matrixCache = math.matrix(this.matrix)


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		// this.clear()
		this.render()
	}

}

export default KPunk1;
