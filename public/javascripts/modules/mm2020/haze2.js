//
// Experimenting with camera motion + canvas rendering
// Blur-hypno style
// 

import Module from '../../lib/module.js'

class Haze2 extends Module {

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

		var x0 = xmax*timeSlide(5000,1)				// left-right
		// var y0 = ymax*(1-timeSlide(3000, 1))			// up-down

		// var x0 = xmax*0.5
		var y0 = ymax*0.1

		// var z = this.size*0.5 - height + point[1]*0.75
		var z = this.size*timeSlide(5000,1) - height + point[1]*timeSlide(5000,2)
		// var x = (point[0] - this.size*0.5)*6
		var x = (point[0] - this.size*(timeSlide(5000,1)-0.2))*6
		// var y = (this.size - coord[1])*0.005 + 0
		var y = (this.size - coord[1])*(0.02-timeSlide(5000,0.003)) + 0

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

	// get average of an array
	average(values) {
		var valid = values.filter(function(val) { return val !== -1; });
        var total = valid.reduce(function(sum, val) { return sum + val; }, 0);
		return total / valid.length;
	}

	// compute square value
	square(x, y, size, offset) {
     	var ave = this.average([
            this.get(x - size, y - size),   // upper left
            this.get(x + size, y - size),   // upper right
            this.get(x + size, y + size),   // lower right
            this.get(x - size, y + size)    // lower left
          ]);
          this.set(x, y, ave + offset);
	}

	// compute diamond value
	diamond(x, y, size, offset) {
      var ave = this.average([
        this.get(x, y - size),      // top
        this.get(x + size, y),      // right
        this.get(x, y + size),      // bottom
        this.get(x - size, y)       // left
      ]);
      this.set(x, y, ave + offset);
    }

	// division etc
	divide(size) {	  
	  var roughness = 0.7
      var x, y, half = size / 2;
      var scale = roughness * size;
      if (half < 1) return;

      for (y = half; y < this.max; y += size) {
        for (x = half; x < this.max; x += size) {
          // this.square(x, y, half, Math.random() * scale * 2 - scale);
          this.square(x, y, half, Math.sin(y+x) * scale * 2 - scale);
        }
      }
      for (y = 0; y <= this.max; y += half) {
        for (x = (y + half) % size; x <= this.max; x += size) {
          // this.diamond(x, y, half, Math.random() * scale * 2 - scale);
          this.diamond(x, y, half, Math.sin(y*x) * scale * 2 - scale);
        }
      }
      this.divide(size / 2);
	}

	draw(ctx) {

		// drawText([xmax/2,ymax/2], (Math.random() + "").slice(2,10), ymax/20 + "px", "rgba(255,255,255," + Math.random() + ")", 100, "40", "Roboto Mono", this.getDomID())		
		for (var i=0; i<this.max; i++) {
			for (var j=0; j<this.max; j++) {
				var coord = this.perspective([i, j], this.get(i, j))				
				// if (coord[0] > 0 && coord[0] < xmax && coord[1] > 0 && coord[1] < ymax) {
					// drawCircle(coord, 2, "#fff", this.getDomID())
					ctx.beginPath();
					ctx.arc(coord[0], coord[1], 1, 0, 2 * Math.PI);
					
					ctx.fill();
					if (j > 0) {
						ctx.moveTo(coord[0], coord[1]);
						var target = this.perspective([i,j-1], this.get(i, j-1))
						ctx.lineTo(target[0], target[1]);
						ctx.stroke();
						// this.line(coord, this.perspective([i,j-1], this.get(i, j-1)), "#fff", "1px", 0.5)
					}
					if (i > 0 ) {						
						//this.line(coord, this.perspective([i-1,j], this.get(i-1, j)), "#fff", "1px", 0.5)
						ctx.moveTo(coord[0], coord[1]);
						var target = this.perspective([i-1,j], this.get(i-1, j))
						ctx.lineTo(target[0], target[1]);
						ctx.stroke();
					}
				// }
			}
		}		
		// drawText([xmax/2,ymax/2], (Math.random() + "").slice(0,5), "128px", "#fff", 700, "-2", "Helvetica", this.getDomID())		
	}

	render() {	

		this.setupCanvas();
		var ctx = this.getCanvasContext();
		ctx.globalAlpha = 0.8
		ctx.fillStyle = '#fff';
		ctx.strokeStyle = '#fff'

		// if (Math.random() < 0.9) {
		// 	drawCircleOutline([xmax/2,ymax/2], ymax*Math.random(), "rgba(255,255,255," + Math.random() + ")", ymax*0.2*Math.random(), this.getDomID())
			ctx.clearRect(0,0,xmax,ymax);
		// }

		this.set(0,0,this.max/2);
		this.set(this.max,0,this.max/2);
		this.set(this.max,this.max,this.max/2);
		this.set(0,this.max,this.max/2);

		for (var i=0; i<this.max; i++) {
			for (var j=0; j<this.max; j++) {
				this.set(i,j,0)
			}
		}

		this.divide(this.max);

		this.draw(ctx);

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		for (var i=0; i<this.max; i++) {
			for (var j=0; j<this.max; j++) {
				if (Math.random() < 0.6) {
					var current = this.get(i,j)
					//this.set(i,j, current + Math.sin(current)*Math.random())
				}
			}
		}
		this.clear()
		this.render()
		// this.draw()
	}

}

export default Haze2;
