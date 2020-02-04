//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class HamRadio2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	// Box-Muller Gaussian
	random() {
	    var u = 0, v = 0;
	    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	    while(v === 0) v = Math.random();
	    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
	}

	render() {	
		// // this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		// var path = []
		// for (var x=0; x<xmax; x+=xmax*0.1) {
		// 	let y = ymax/2 + (0.25-Math.random()/2)*ymax
		// 	drawCircle([x, y], 5, "#fff", this.getDomID())
		// 	path.push([x,y])
		// }
		// drawPath(path, "#fff", 2, this.getDomID())
		this.setupCanvas();
		var ctx = this.getCanvasContext();
		ctx.clearRect(0,0,xmax,ymax);
		//ctx.globalAlpha = 0.8
		
		ctx.strokeStyle = '#fff'
		// var colors = ["#040404", "#060503", "#03045A", "#270271", "#760862", "#D06C1F", "#F2920A", "#FFE614", "#FFF7B1"]
		var colors = ["#040404", "#060503", "#03045A", "#270271", "#760862", "#D06C1F", "#F2920A", "#FFE614"]

		// seed signal
		var seed = []
		var pixelSize = 4

		// var idx = Math.floor(Math.random()*colors.length)
		// var idx = 0
		var idx = 5
		for (var j=0; j<xmax/pixelSize; j++) {
			seed.push(idx)
			idx += Math.floor(this.random())
			idx = Math.abs(idx)%colors.length
		}

		// console.log(seed)

		for (var i=0; i<ymax; i+=pixelSize) {
			// var idx = 0
			// var idx = Math.floor(colors.length/2)
			// var idx = Math.floor(Math.random()*colors.length)
			// var idx = i%colors.length
			for (var j=0; j<xmax; j+= pixelSize) {
				ctx.beginPath();

				let idx = Math.floor(seed[j/pixelSize] + Math.random()*2)
				if (Math.random() < 0.01) {
					seed[j/pixelSize] = idx
				}

				ctx.fillStyle = colors[Math.abs(idx)%colors.length];
				// ctx.fillStyle = colors[seed[j/4]];
				// ctx.fillStyle = colors[idx];
				// idx += Math.floor(this.random())
				// if (idx < 0) {
				// 	idx = 0
				// }
				// idx = idx%colors.length
				// idx = Math.abs(idx)%colors.length
				ctx.rect(j, i, pixelSize-1, pixelSize-1);
				// ctx.arc(j, i, 1, 0, 2 * Math.PI);
				ctx.fill();				
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

export default HamRadio2;
