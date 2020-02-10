//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Exoplanets3 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 24],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.detail = 6
		this.size = Math.pow(2, this.detail) + 1;
		this.max = this.size - 1 
		this.map = new Float32Array(this.size * this.size)
	}

	set(x, y, val) {
		this.map[x + this.size * y] = val;
	}

	get(x, y) {
  	   if (x < 0 || x > this.max || y < 0 || y > this.max) return -1;
       return this.map[x + this.size * y];
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

		// var point = this.iso(coord)
		var point = coord

		// var x0 = xmax*0.5
		// var y0 = ymax*0.2
		var x0 = xmax*timeRamp(7000,1) 
		var y0 = ymax*timeRamp(10000,0.8)

		var z = this.size*0.5 - height + point[1]*0.75
		var x = (point[0] - this.size*0.5)*(4+timeRamp(20000,20))
		var y = (this.size - coord[1])*0.005 + 0

		return [
			x0 + x / y,
			y0 + z / y
		]
	}

	line(start, end, stroke, width, opacity) {
		line({
			x1: start[0],
			y1: start[1],
			x2: end[0],
			y2: end[1],
			stroke: stroke,
			"stroke-width": width,			
			"stroke-opacity": opacity,
		}, this.getDomID());
	}

	render() {	

		drawRectangle([0,0], xmax,ymax, "#000", this.getDomID())

		this.set(0,0,this.max/2);
		this.set(this.max,0,this.max/2);
		this.set(this.max,this.max,this.max/2);
		this.set(0,this.max,this.max/2);

		for (var i=0; i<this.max; i++) {
			for (var j=0; j<this.max; j++) {
				// this.set(i,j,5*Math.random())
				// this.set(i, j, 3*Math.sin(Math.random()+i+Math.cos(j)))
				this.set(i, j, 10*Math.sin(i)+Math.cos(i+j*Math.random())) // metropolis!
			}
		}

		for (var i=0; i<this.max; i++) {
			for (var j=0; j<this.max; j++) {
				var coord = this.perspective([i, j], this.get(i, j))				
				if (coord[0] > 0 && coord[0] < xmax && coord[1] > 0 && coord[1] < ymax) {
					drawCircle(coord, 2, "#fff", this.getDomID())
					if (j > 0) {
						this.line(coord, this.perspective([i,j-1], this.get(i, j-1)), "#fff", "1px", 0.5+Math.random())
					}
					if (i > 0) {
						this.line(coord, this.perspective([i-1,j], this.get(i-1, j)), "#fff", "1px", 0.5)
					}
				}
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

export default Exoplanets3;
