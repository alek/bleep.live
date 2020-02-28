//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Neural1 extends Module {

	constructor() {
		super({	// init params mapping
			"l_acc_x": ["cc_11", 50],
			"l_acc_y": ["cc_12", 50],
			"l_acc_z": ["cc_13", 50],
			"r_acc_x": ["cc_17", 50],
			"r_acc_y": ["cc_18", 50],
			"r_acc_z": ["cc_19", 50],
			"l_gyr_x": ["cc_14", 50],
			"l_gyr_y": ["cc_15", 50],
			"l_gyr_z": ["cc_16", 50],
			"r_gyr_x": ["cc_20", 50],
			"r_gyr_y": ["cc_21", 50],
			"r_gyr_z": ["cc_22", 50],
			"l1": ["cc_1", 50],
			"l2": ["cc_2", 50],
			"l3": ["cc_3", 50],
			"l4": ["cc_4", 50],
			"l5": ["cc_5", 50],
			"r1": ["cc_6", 25],
			"r2": ["cc_7", 50],
			"r3": ["cc_8", 50],
			"r4": ["cc_9", 50],
			"r5": ["cc_10", 50]
		})

		this.offset = 0
		this.grad = 0
		this.amp = 0.25		
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
		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		
		this.setupCanvas();
		var ctx = this.getCanvasContext();

		this.offset = this.offset + 4
		if (this.offset > xmax) {
			this.grad = (this.grad+100)%(ymax/2)
			this.offset = 0
		}

		for (var i=0; i<200; i++) {
			// drawCircle([this.offset, ymax/2 + (0.5-Math.random())*ymax*this.amp], 1, "rgba(255,255,255," + Math.random()/10 + ")", this.getDomID())
			drawCircle([this.offset, ymax - this.grad - (0.5-Math.random())*ymax*this.amp], 1, "rgba(255,255,255," + Math.random()/10 + ")", this.getDomID())
			// drawCircle([this.offset, ymax - this.grad - ymax*this.amp], 1, "rgba(255,255,255," + Math.random()/10 + ")", this.getDomID())
		}
		//this.amp = timeRamp(10000,1)
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		// this.clear()
		// console.log(this.params["r2"])
		this.amp = this.params["r2"]/255

		if (event.meta == "clock") {
			this.render()
		}
	}

}

export default Neural1;
