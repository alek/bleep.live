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
			"yspacing": ["cc_3", 5],
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

	normalDensity(x, mean, sigma) {
		return (1/Math.sqrt(2*Math.PI*Math.pow(sigma,2))) * Math.pow(Math.E, - Math.pow(x-mean, 2)/ (2*Math.pow(sigma,2)))
	}

	render() {	

		var pathCoordinates = []
		var init = true
		// var spacing = this.params["spacing"]
		var spacing = 10
		var yspacing = 10
		// var maxH = 5

		var timeOffset = Math.floor((Date.now()/100)%100)

		for (var offset = 0; offset < ymax; offset += (5 + yspacing)) {
			var queue = []
			var scale = 0.1 + Math.random()
			for (var i=0; i<xmax; i+=spacing*Math.random()) {
				// var maxH = (offset/100 + xmax/Math.sqrt(Math.abs(i-xmax/2)))/10
				// var maxH = this.normalDensity( (i-xmax/2)/xmax, 0, 0.15)*(80 + Math.random()*20)
				var maxH = this.normalDensity( (1+scale)*(i-xmax/2)/xmax, 0, 0.15)*(80 + Math.random()*20)

				// var maxH = 2
				// if (i > xmax/3 && i < 2*xmax/3) {
				// 	maxH = 10
				// }
				if (init) {
					queue.push([i, offset+ymax*0.5 - maxH - timeOffset])
					// queue.push([i, offset+ymax/2 + (maxH-2*maxH*Math.random())])
					// queue.push([i, offset+ymax/2 + (maxH-2*maxH*Math.random())])
				} else {
					queue.push([i, offset+ymax*0.5 - maxH - timeOffset])
					//queue.push([i, offset+ymax/2 + (maxH-2*maxH*Math.random())])
					//queue.push([i, pathCoordinates[Math.floor(i/spacing)][1] + Math.ceil(5 + 5*Math.random())])
				}
			}
			pathCoordinates = queue

			path( {
				d: "M" + pathCoordinates.map(x => x.join(" ")).join(" L") + "",
				"stroke-linejoin": "round",
				"stroke-linecap": "round",
				// style: "fill:none;stroke:" + randomPantoneHex() + ";stroke-width:" + 1
				// style: "fill:none;stroke:" + "rgba(255,0,255," + Math.random() + ")" + ";stroke-width:" + Math.ceil(1*Math.random())
				//style: "fill:none;stroke:" + "rgba(255,255,255," + Math.random() + ")" + ";stroke-width:" + Math.ceil(1*Math.random())
				style: "fill:" + randomPantoneHex() + " ;stroke:" + "#fff" + ";stroke-width:" + 0
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
