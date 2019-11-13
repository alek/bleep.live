//
// Simple grid-based typographic randomization
//

import Module from '../lib/module.js'

class International2 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 50],
			"r1": ["cc_2", 85],
			"g1": ["cc_3", 29],
			"b1": ["cc_4", 65],
			"size": ["cc_5", 72/4],
			"weight": ["cc_6", 100],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"letter_spacing": ["cc_9", 0],
			"r2": ["cc_10", 0],
			"g2": ["cc_11", 109/2],
			"b2": ["cc_12", 166/2],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"count": ["cc_16", 16]
		})
	}

	// renderGrid() {
	// 	for (var i=0; i<this.params["grid_columns"]; i++) {
	// 		for (var j=0; j<this.params["grid_rows"]; j++) {
	// 			var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
	// 			drawCircle(coord, 2, "#fff", this.getDomID())
	// 		}
	// 	}
	// }		

	renderTitle(pos) {

		var coord = getGridCoordinates(pos, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		var line = tractatus[Math.floor(Math.random()*tractatus.length)]
		var text = tractatus[Math.floor(Math.random()*tractatus.length)]
		var cellWidth = (xmax/this.params["grid_rows"])
		var fontSize = this.params["size"]*4
		var maxChars = (cellWidth/fontSize)*(this.params["grid_rows"])	// max 5 grid cells per line
		var maxLines = 5
		var node = getTextLayoutNode(text, maxChars, maxLines, this.params["size"]*4, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "Neue Haas Grotesk Display Pro",
			"font-size": this.params["size"]*4 + "px",
			"font-weight": this.params["weight"]*7,
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)


	}

	renderBody(pos) {
		var coord = getGridCoordinates(pos, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		var line = tractatus[Math.floor(Math.random()*tractatus.length)]
		var text = tractatus[Math.floor(Math.random()*tractatus.length)]
		var node = getTextLayoutNode(text, 20, 50, this.params["size"], {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "Neue Haas Grotesk Display Pro",
			"font-size": this.params["size"] + "px",
			"font-weight": this.params["weight"]*7,
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)
	}

	render() {	

		this.setBackgroundColor(this.getConfigVal("background",getParametricColor(this.params,2)))
		// this.setBackgroundColor(getParametricColor(this.params,2))
		
		// this.renderGrid()
		this.renderTitle([3,4])
		this.renderBody([3,9])
		this.renderBody([6,9])
		this.renderBody([9,9])
		this.renderBody([12,9])
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

export default International2;
