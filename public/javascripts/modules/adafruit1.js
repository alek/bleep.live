//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Adafruit1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"p": ["cc_12", 20],			
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
				// if (Math.random() < 0.2) {
				// 	fill = "#fff"
				// 	if (target == null) {
				// 		target = getGridCoordinates(
				// 			[Math.floor(Math.random()*this.params["grid_columns"]),Math.floor(Math.random()*this.params["grid_rows"])], 
				// 			this.params["grid_columns"], 
				// 			this.params["grid_rows"], 
				// 			xmax, 
				// 			ymax) 
				// 	}
				// 	drawLine([start[0]+2, start[1]+2], [target[0]+2, target[1]+2], "rgba(255,255,255,0.5)", 1, this.getDomID())
				// 	drawText(coord, count++ + "", 10, "red", 400, 0, "Helvetica", this.getDomID() )
				// 	// if (Math.random() < 0.05) {
				// 		target = coord
				// 	// }
				// }
				rect({
					x: coord[0],
					y: coord[1],
					width: 4,
					height: 4,
					stroke: "#fff",
					fill: fill,
					style: "stroke-width:1"
				}, this.getDomID()
				);	
			}
		}

		// pick a random start

		var start = getGridCoordinates(
				[Math.floor(Math.random()*this.params["grid_columns"]),Math.floor(Math.random()*this.params["grid_rows"])], 
				this.params["grid_columns"], 
				this.params["grid_rows"], 
				xmax, 
				ymax)

		for (var i=0; i<this.params["count"]*2; i++) {

			// random target
			target = getGridCoordinates(
				[Math.floor(Math.random()*this.params["grid_columns"]),Math.floor(Math.random()*this.params["grid_rows"])], 
				this.params["grid_columns"], 
				this.params["grid_rows"], 
				xmax, 
				ymax) 

			drawLine([start[0]+2, start[1]+2], [target[0]+2, target[1]+2], "rgba(255,255,255,0.5)", 1, this.getDomID())

			rect({
				x: start[0],
				y: start[1],
				width: 4,
				height: 4,
				stroke: "#fff",
				fill: "#fff",
				style: "stroke-width:4"
			}, this.getDomID()
			);	

			if (Math.random() < parseInt(this.params["p"])/127) {
				start = target
			}
		}

	}		

	// initial render
	render() {	

		var el = addSVG("circle", {
			cx: xmax/2,
			cy: ymax/2,
			r: parseInt(this.params["radius"])*10,
			stroke: "none",
			fill: "rgb(" + this.params["r"] + "," + this.params["g"] + "," + this.params["b"] + ")",
			// fill: "red",
			style: "stroke-width:0",
		});

		// el.appendChild(addSVG("animate", {
		// 	attributeName: 'r',
		// 	attributeType: 'XML',
		// 	from: this.params["r"],
		// 	to: this.params['r']*3,
		// 	dur: 2000 + 'ms',
		// 	repeatCount: 'indefinite'
		// }));

		super.render(el)

		this.renderGrid()	

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

export default Adafruit1;
