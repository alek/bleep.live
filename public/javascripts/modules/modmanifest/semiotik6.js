//
// Simple grid-based typographic randomization
//

import Module from '../../lib/module.js'

class Semiotik6 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 29],
			"r1": ["cc_2", 127],
			"g1": ["cc_3", 127],
			"b1": ["cc_4", 127],
			"vertices": ["cc_5", 6],
			"weight": ["cc_6", 44],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"circle_r": ["cc_9", 22],
			"r2": ["cc_10", 0],
			"g2": ["cc_11", 0],
			"b2": ["cc_12", 0],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 127],
			"opacity2": ["cc_15", 127],
			"count": ["cc_16", 16]
		})
	}

	renderGrid() {
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}		

	go() {

		var radius = this.params['r']*10	// polygon radius

		// circle({
		// 	cx: xmax/2,
		// 	cy: ymax/2,
		// 	r: radius,
		// 	stroke: "#fff",
		// 	fill: "none",
		// 	"transform": "rotate(0 0 0)",
		// 	style: "stroke-width:2"
		// }, this.getDomID());	

		var vertices = this.params["vertices"]			// number of polygon vertices
		var angles = randomPartition(1.0, vertices)		// polygon angles
		var coords = []

		for (var i=0; i<angles.length; i++) {
			var angle = sum(angles.slice(0,i))*Math.PI*2
			var x = xmax/2 + Math.cos(angle)*radius
			var y = ymax/2 + Math.sin(angle)*radius
			drawCircle([x,y], this.params["circle_r"], getParametricColor(this.params,1), this.getDomID())
			coords.push([x,y])
		}

		for (var i=0; i<coords.length; i++) {
			drawLine(coords[Math.floor(Math.random()*coords.length)],
					coords[Math.floor(Math.random()*coords.length)],
					getParametricColor(this.params,1), 
					this.params["weight"],
					this.getDomID())
		}





	}

	render() {	

		this.setBackgroundColor(getParametricColor(this.params,2))
		// this.renderGrid()
		this.go()
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.setBackgroundColor(getParametricColor(this.params,2))
		} else {
			this.clear()
			this.render()
		}
	}

}

export default Semiotik6;
