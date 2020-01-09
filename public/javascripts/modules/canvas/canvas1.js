//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Canvas1 extends Module {

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
		grd.addColorStop(0, randomPantoneHex());
		grd.addColorStop(1, randomPantoneHex());

		// Fill with gradient
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, xmax, ymax);

		this.renderGrid(this.params["grid_rows"]*Math.random(),this.params["grid_rows"]*Math.random())

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Canvas1;
