//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Terrain2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 16],
			"grid_rows": ["cc_9", 16],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, Math.random()*(ymax/24), "#fff", this.getDomID(), i + "-" + j)
				// drawCircle(coord, Math.random()*5, "rgba(24,124,242," + Math.random() + ")", this.getDomID(), i + "-" + j)
			}
		}
	}	

	render() {	
		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())
		this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		var el = document.getElementById(10 + "-" + 10)
	}

	// state update as a result of a midi event
	update(event) {
		// super.update(event)
		// this.clear()
		// this.render()
	// 	for (var i=0; i<this.params["grid_rows"]-2; i+=6) {
	// 		for (var j=0; j<this.params["grid_rows"]-2; j+=6) {
	// 			var c1Val = document.getElementById(i + "-" + j).r.baseVal.value
	// 			var c2Val = document.getElementById((i + 5) + "-" + j).r.baseVal.value
	// 			var c3Val = document.getElementById(i + "-" + (j+5)).r.baseVal.value
	// 			var c4Val = document.getElementById((i+5) + "-" + (j+5)).r.baseVal.value
	// 			var avg = (c1Val + c2Val + c3Val + c4Val)/4
	// 			console.log(avg)

	// 			document.getElementById(i + "-" + j).r.baseVal.value = avg

	// 			var el = document.getElementById(i + "-" + j)
	// 			var size = el.r.baseVal.value
	// 			el.r.baseVal.value = Math.ceil(avg)
	// 		}
	// 	}
	// }

		//var rows = this.getConfigVal("rows", this.params["grid_rows"]-3)

		for (var i=0; i<this.params["grid_columns"]-3; i++) {
			for (var j=0; j<this.params["grid_rows"]-3; j++) {
				var c1Val = document.getElementById(i + "-" + j).r.baseVal.value
				var c2Val = document.getElementById((i + 4) + "-" + j).r.baseVal.value
				var c3Val = document.getElementById(i + "-" + (j+4)).r.baseVal.value
				var c4Val = document.getElementById((i+4) + "-" + (j+4)).r.baseVal.value
				
				var avg = (c1Val + c2Val + c3Val + c4Val)/4
				
				if (Math.random() < 0.9) {

					document.getElementById(i + "-" + j).r.baseVal.value = avg
					document.getElementById((i+2) + "-" + j).r.baseVal.value = avg
					document.getElementById(i + "-" + (j+2)).r.baseVal.value = avg
					document.getElementById((i+2) + "-" + (j+2)).r.baseVal.value = avg
				} else {
					document.getElementById(i + "-" + j).r.baseVal.value = 5
				}

				// if (Math.random() < 0.5) {
				// 	document.getElementById(i + "-" + j).setAttribute("fill", Math.random() < 0.5 ? "#fff" : "#000")
				// 	document.getElementById((i+2) + "-" + j).setAttribute("fill", Math.random() < 0.5 ? "#fff" : "#000")
				// 	document.getElementById(i + "-" + (j+2)).setAttribute("fill", Math.random() < 0.5 ? "#fff" : "#000")
				// 	document.getElementById((i+2) + "-" + (j+2)).setAttribute("fill", Math.random() < 0.5 ? "#fff" : "#000")
				// }

				// var el = document.getElementById(i + "-" + j)
				// var size = el.r.baseVal.value
				// el.r.baseVal.value = Math.ceil(avg)
			}
		}

		for (var i=this.params["grid_columns"]-3; i<=this.params["grid_columns"]; i++) {
			for (var j=this.params["grid_columns"]-3; j<=this.params["grid_columns"]; j++) {
				document.getElementById(i + "-" + j).setAttribute("fill", Math.random() < 0.5 ? "#fff" : "#000")
				document.getElementById(i + "-" + j).r.baseVal.value = (ymax/24)*Math.random()
			}
		}

	}



}

export default Terrain2;
