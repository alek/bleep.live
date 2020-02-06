//
// Randomly generated cellular automata
// 

import Module from '../../lib/module.js'

class Automata2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.vector = new Array(xmax*ymax)
		this.color = 255

		// init the scene
		for (var i=0; i<ymax*xmax; i++) {
			this.vector[i] = (Math.random() > 0.9)
		}

		// init automata transition rules
		this.table = []
		for (var i=0; i<16; i++) {
			this.table.push(Math.random() < 0.5)
		}
	}

	render() {	

		this.setupCanvas();
		var ctx = this.getCanvasContext();
		var image = ctx.createImageData(xmax,ymax)
		
		// ctx.clearRect(0,0,xmax,ymax);
		// var image = ctx.getImageData(0,0,xmax,ymax)

		for (var i=0; i<xmax; i++) {
			for (var j=0; j<ymax; j++) {
				var offset = j*xmax + i
				if (this.vector[offset] != null) {
					if (this.vector[j*xmax + i]) {
						setPixel(image, i, j, 255, 255, 255, 255)					
					} else {
						setPixel(image, i, j, 0, 0, 0, 255)					
					}
				}
			}
		}
		ctx.putImageData(image, 0, 0);

	}

	getVal(a1, a2, a3, a4) {
		var offset = parseInt('' + ~~a1 + ~~a2 + ~~a3 + ~~a4, 2)
		if (offset < this.table.length) {
			return this.table[offset]
		} else {
			return null
		}
	}

	update(event) {
		super.update(event)
		this.color = 0
		for (var i=1; i<this.vector.length-xmax-1; i++) {
			var val = this.getVal(this.vector[i-1], this.vector[i], this.vector[i+1], this.vector[i+xmax])	
			if (val != null) {
				this.vector[i] = val
			}

		}
		this.render()
	}

}

export default Automata2;
