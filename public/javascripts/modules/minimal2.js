//
// Simple grid-based typographic randomization
//

import Module from '../lib/module.js'

class Minimal2 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 5],
			"r1": ["cc_2", 255],
			"g1": ["cc_3", 255],
			"b1": ["cc_4", 255],
			"size": ["cc_5", 72/4],
			"weight": ["cc_6", 2],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"letter_spacing": ["cc_9", 0],
			"r2": ["cc_10", 0/2],
			"g2": ["cc_11", 0/2],
			"b2": ["cc_12", 0/2],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
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

	renderObjects() {
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				// if (this.params["animate"] > 0) {
					// drawCircle(coord, 2, "#fff", this.getDomID())
				//}

				var center = getGridCoordinatesCenter([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 

				if (Math.random() > 0.5) {
					drawCircle(center, this.params["r"], getParametricColor(this.params,1), this.getDomID())					
				} else {
					drawCircleOutline(center, this.params["r"], getParametricColor(this.params,1), this.params["weight"], this.getDomID())
				}
			}
		}
	}

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

		this.setBackgroundColor(getParametricColor(this.params,2))
		this.renderObjects()
		// for (var i=0; i<this.params["grid_columns"])
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

export default Minimal2;
