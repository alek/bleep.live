//
// Self-regulating randomly generated cellular automata
// 

import Module from '../../lib/module.js'

class Automata4 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})

		this.sqSize = 20
		this.width = this.dim(xmax)
		this.height = this.dim(ymax)

		this.vector = new Array(this.width*this.height)
		this.color = 255
		this.avg = 0

		// init the scene
		for (var i=0; i<this.width*this.height; i++) {
			this.vector[i] = (Math.random() > 0.9)
		}

		// init automata transition rules
		this.table = this.getRandomAutomata()
	}

	getRandomAutomata() {
		var table = []
		for (var i=0; i<16; i++) {
			table.push(Math.random() < 0.5)
		}
		return table
	}

	dim(val) {
		return Math.floor(val/this.sqSize)
	}


	rect(ctx, x, y, width, height, color) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(x, y, width, height);
		ctx.fill();		
	}

	render() {	

		this.setupCanvas();
		var ctx = this.getCanvasContext();
		for (var i=0; i<this.width; i++) {
			for (var j=0; j<this.height; j++) {
				var offset = j*this.width + i
				if (this.vector[offset] != null) {
					if (this.vector[offset]) {
						this.rect(ctx, i*this.sqSize, j*this.sqSize, this.sqSize, this.sqSize, "#fff")
					} else {
						this.rect(ctx, i*this.sqSize, j*this.sqSize, this.sqSize, this.sqSize, "#000")
					}
				}
			}
		}
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
		var avg = 0
		for (var i=1; i<this.vector.length-this.dim(xmax)-1; i++) {
			var val = this.getVal(this.vector[i-1], this.vector[i], this.vector[i+1], this.vector[i+xmax])	
			if (val != null) {
				this.vector[i] = val
				avg += val ? 1 : -1
			}
		}
		// automata update
		if (Math.abs(avg) > xmax || (Math.abs(avg - this.avg) < xmax*0.1) || (Math.random() < 0.1)) {
			this.table = this.getRandomAutomata()
		}

		this.avg = avg
		this.render()
	}

}

export default Automata4;
