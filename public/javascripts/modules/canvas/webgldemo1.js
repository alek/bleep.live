//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class WebGLDemo1 extends Module {

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

	render() {	

		this.setupCanvas();
		var ctx = this.getCanvasContext();

		// var gl = this.getWebGLContext();
		// gl.clearColor(0.0, 0.0, 0.0, 1.0);
		// gl.clear(gl.COLOR_BUFFER_BIT);



		// test canvas

		var grd = ctx.createRadialGradient(xmax/2, ymax/2, xmax*(1+Math.random()), xmax/2,ymax/2, 100);
		grd.addColorStop(0, randomPantoneHex());
		grd.addColorStop(1, randomPantoneHex());
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, xmax, ymax);



	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default WebGLDemo1;
