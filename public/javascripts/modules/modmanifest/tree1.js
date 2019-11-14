//
// Simple module demonstration
//

import Module from '../../lib/module.js'

class Tree1 extends Module {

	constructor() {
		super({	// init params mapping
			"p": ["cc_8", 20],
			"grid_columns": ["cc_1", 40],
			"grid_rows": ["cc_2", 40],
			"count": ["cc_11", 200]
		})
	}

	renderGrid() {
		var start = null
		var target = null
		var count = 0
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				start = coord
				// drawCircle(coord, 2, "#fff", this.getDomID())
				var fill = "none"
				rect({
					x: coord[0],
					y: coord[1],
					width: 1,
					height: 1,
					stroke: "#fff",
					fill: fill,
					style: "stroke-width:1"
				}, this.getDomID()
				);	
			}
		}
	}		

	gen() {
		var nrows = parseInt(this.params["grid_rows"])
		var ncols = parseInt(this.params["grid_columns"])
		var coord = getGridCoordinates([Math.floor(nrows/5),Math.floor(nrows/2)], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		drawText(coord, "schematic-file-converter", 36, "#fff", 700, 0, "Helvetica", this.getDomID())

		coord = getGridCoordinates([Math.floor(nrows/2),Math.floor(nrows/2)], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		drawText(coord, "schematic-file-converter", 36, "#fff", 400, 0, "Helvetica", this.getDomID())

	}


	// initial render
	render() {	

		// var el = addSVG("circle", {
		// 	cx: xmax/2,
		// 	cy: ymax/2,
		// 	r: parseInt(this.params["radius"])*10,
		// 	stroke: "none",
		// 	fill: "rgb(" + this.params["r"] + "," + this.params["g"] + "," + this.params["b"] + ")",
		// 	// fill: "red",
		// 	style: "stroke-width:0",
		// });

		// super.render(el)
		//this.renderGrid()	
		this.gen()

	}

	// state update as a result of a midi event
	// update(event) {
	// 	var knob = event['knob']
	// 	var paramName = this.wiring[knob]
	// 	var el = document.getElementById(this.getDomID())
	// 	// el.childNodes[0][paramName]['baseVal']['value'] = event['value']
	// }

	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Tree1;
