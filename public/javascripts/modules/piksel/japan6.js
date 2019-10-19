//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Japan6 extends Module {

	constructor() {
		super({	// init params mapping
			"spacing": ["cc_1", 10],
			"maxH": ["cc_2", 20],
			"yspacing": ["cc_3", 10],
			"angle": ["cc_4", 60]
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

	sinc(val) {
		if (val == 0) {
			return 1
		} else {
			return Math.sin(val)/val
		}
	}

	render() {	

		var pathCoordinates = []
		var init = true
		// var spacing = this.params["spacing"]
		var spacing = 10
		// var maxH = 5

		for (var offset = 0; offset < ymax*0.9; offset += (5 + this.params["yspacing"])) {
			var queue = []
			for (var i=0; i<xmax; i+=spacing) {
				var maxH = xmax/Math.sqrt(Math.abs(i-xmax/2)) + offset%xmax
				if (init) {
					// queue.push([i, offset+ymax*0.2 + maxH])
					queue.push([i, offset+ymax/2 + (maxH-2*maxH*Math.random())])
				} else {
					queue.push([i, pathCoordinates[Math.floor(i/spacing)][1] + Math.ceil(2 + 12*Math.random())])
				}
			}
			pathCoordinates = queue

			path( {
				d: "M" + pathCoordinates.map(x => x.join(" ")).join(" L") + "",
				"stroke-linejoin": "round",
				"stroke-linecap": "round",
				style: "fill:none;stroke:" + randomPantoneHex() + ";stroke-width:" + 1
				//style: "fill:none;stroke:" + "rgba(255,0,255," + Math.random() + ")" + ";stroke-width:" + Math.ceil(1*Math.random())
			}, this.getDomID())
			init = false
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Japan6;
