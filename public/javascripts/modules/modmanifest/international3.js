//
// Simple grid-based typographic randomization
//

import Module from '../../lib/module.js'

class International3 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 50],
			"count": ["cc_2", 10],
			"width": ["cc_3", 10],
			"gap": ["cc_4", 127/2],
			"size": ["cc_5", 72/4],
			"weight": ["cc_6", 100],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"letter_spacing": ["cc_9", 0],
			"r2": ["cc_10", 0],
			"g2": ["cc_11", 0],
			"b2": ["cc_12", 0],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"count2": ["cc_16", 16]
		})
	}

	render() {	

		this.setBackgroundColor(getParametricColor(this.params,2))
		var nCircles = this.params["count"]
		var maxR = this.params["r"]*10

		for (var i=0; i<nCircles; i++) {
			var r = maxR*(i/nCircles)
			var segLen = r*Math.PI/2 
			circle({
				cx: xmax/2,
				cy: ymax/2,
				r: r,
				stroke: "#fff",	
				"stroke-dasharray": segLen + " " + segLen*this.params["gap"]/127,
				fill: "none",
				"transform": "rotate(" + Math.random()*360 + " " + xmax/2 + " " + ymax/2 + ")",
				style: "stroke-width:" + this.params["width"]
			}, this.getDomID());	
		}

		// this.renderGrid()
		// this.renderTitle([3,4])
		// this.renderBody([3,9])
		// this.renderBody([6,9])
		// this.renderBody([9,9])
		// this.renderBody([12,9])


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

export default International3;
