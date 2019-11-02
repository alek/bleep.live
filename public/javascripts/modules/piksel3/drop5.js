//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Drop5 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		//this.angle = 180*Math.random()
		this.size = 20
		this.running = false
		this.angles = []
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	


	deg2rad(degrees) {
	  return degrees * Math.PI/180;
	}


	outOfBoundsX(cx, cy, r) {
		return (cx < r || cx > xmax -r)
	}

	outOfBoundsY(cx, cy, r) {
		return (cy < r || cy > ymax - r)
	}

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		for (var i=0; i<200; i++) {	
			if (Math.random() < 0.9) {
				drawCircleOutline([xmax/2,ymax/2], this.size*(1 - Math.random()/2), "rgba(255,255,255," + Math.random() + ")", 1, this.getDomID(), "circle-" + i)
			} else {
				drawCircle([xmax/2,ymax/2], this.size*(1 - Math.random()/2), "#fff", this.getDomID(), "circle-" + i)
			}
			this.angles.push(360*Math.random())
		}
		// drawCircle([xmax/2,ymax/2], 50, "#fff", this.getDomID(), "circle-1")
		this.running = true
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)

		if (!this.running) {
			this.render()
		} else {

			for (var i=0; i<this.angles.length; i++) {

				var cx = parseInt(document.getElementById('circle-' + i).getAttribute('cx'))
				var cy = parseInt(document.getElementById('circle-' + i).getAttribute('cy'))
				var r = parseInt(document.getElementById('circle-' + i).getAttribute('r'))

				if (this.outOfBoundsY(cx, cy, r)) {
					// this.angle = -this.angle
					this.angles[i] = -this.angles[i]
				} else if (this.outOfBoundsX(cx, cy, r)) {
					// this.angle = 180-this.angle
					this.angles[i] = 180-this.angles[i]
				}

				document.getElementById('circle-' + i).setAttribute('cx',cx+r*2*Math.cos(this.deg2rad(this.angles[i])));
				document.getElementById('circle-' + i).setAttribute('cy',cy+r*2*Math.sin(this.deg2rad(this.angles[i])));
				if (Math.random() < 0.1) {
					document.getElementById('circle-' + i).setAttribute('r',r+1);
				}

			}
		}
		
	}

}

export default Drop5;
