//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Canvas2 extends Module {

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

		// var grd = ctx.createRadialGradient(xmax*Math.random(), ymax*Math.random(), ymax*Math.random(), xmax*Math.random(),ymax*Math.random(), 100);

		var grd = ctx.createLinearGradient(0, 0, xmax*Math.random(), 0);
		grd.addColorStop(0, "#000");
		grd.addColorStop(1, "#ccc");

		// Fill with gradient
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, xmax, ymax);

		this.renderGrid(this.params["grid_rows"]*Math.random(),this.params["grid_rows"]*Math.random())
		drawText([xmax/2,ymax/2], Math.floor(Math.random()*255) + "", ymax*0.3 + "px", "rgba(255,255,255,0.5)", 100, 0, "Helvetica", this.getDomID())
		drawRectangle([0,0], xmax, ymax*0.15, "#000", this.getDomID())
		drawRectangle([0,ymax*0.85], xmax, ymax*0.15, "#000", this.getDomID())

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Canvas2;
