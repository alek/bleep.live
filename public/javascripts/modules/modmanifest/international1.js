//
// Simple grid-based typographic randomization
//

import Module from '../../lib/module.js'

class International1 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 50],
			"r1": ["cc_2", 85],
			"g1": ["cc_3", 29],
			"b1": ["cc_4", 65],
			"size": ["cc_5", 72],
			"weight": ["cc_6", 100],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"letter_spacing": ["cc_9", 3],
			"r2": ["cc_10", 0],
			"g2": ["cc_11", 0],
			"b2": ["cc_12", 0],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"count": ["cc_16", 16]
		})
	}

	// initial render
	render() {	
		this.setBackgroundColor(this.getConfigVal("background",getParametricColor(this.params,2)))
		for (var i=0; i<this.getConfigVal("grid_rows", this.params["grid_rows"]); i++) {
			var coord = getGridCoordinates([Math.floor(Math.random()*this.params["grid_columns"]*0.62),i], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
			var line = tractatus[Math.floor(Math.random()*tractatus.length)]

			text( { 
				x: coord[0],
				y: coord[1],
				"fill": "#fff",
				"transform": "rotate(0 50 100)",
				"font-family": "Neue Haas Grotesk Display Pro",
				"font-size": this.getConfigVal("size", this.params["size"])*4 + "px",
				"font-weight": this.getConfigVal("weight", this.params["weight"]*7),
				"opacity": 1.0,
				"text-align": "left",
				"dx": Array(line.length).fill("-" + this.getConfigVal("letter_spacing",this.params["letter_spacing"])*4 + "px").join(" "),
				"dy": "1.2em",
			}, line, this.getDomID()); 

		}
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

export default International1;
