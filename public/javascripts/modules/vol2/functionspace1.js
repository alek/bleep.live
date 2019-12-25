//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class FunctionSpace1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
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

	take1() {
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		var boff = 0
		// for (var base = 0; base < ymax; base += ymax*0.04) {
			var base = ymax/2
			var coords = []
			
			for (var i=0; i<xmax; i++) {
				var offset = sigmoid((boff + xmax/2-i)/50)*100
				coords.push([i, base+offset])
			}
			
			path( {
					d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
					style: "fill:none;stroke:#fff;stroke-width:" + "10px;stroke-opacity:" + 1
				}, this.getDomID())
			boff += 10
		// }		
	}

	texture1() {
		for (var base = 0; base < ymax; base += 10) {
			var coords = []
			
			for (var i=0; i<xmax; i+=10) {
				var val = sigmoid((xmax/2-i)/80)
				var offset = val*100
				drawCircle([i, base+offset], 3, "rgba(255,255,255," + val + ")", this.getDomID())
			}
		}
	}

	texture2() {
		$("body").css({"background-color": "#fff"})
		for (var base = 0; base < ymax; base+=20) {
			var grad = 60
			var cIdx = 0
			var amp = 200
			for (var i=0; i<xmax; i+=1) {
				var val = sigmoid((xmax/2-i)/grad)
				var offset = val*amp
				drawCircle([i, base+offset], Math.sqrt(xmax-i)/4, "rgba(" + cIdx +  ",0,0," + val + ")", this.getDomID())
			}
		}
	}

	render() {	

		$("body").css({"background-color": "#fff"})

		var base = ymax/2
		// for (var grad = 20; grad < 100; grad+=20) {
			// var cIdx = Math.floor(Math.random()*255)
		// for (var base = 0; base < ymax; base+=20) {
			var grad = 60
			var cIdx = 0
			var amp = 200
			for (var i=0; i<xmax; i+=2) {
				var val = sigmoid((xmax/2-i)/grad)
				var offset = val*amp
				drawCircle([i, base+offset], Math.sqrt(xmax*1.2-i)/4, "rgba(" + cIdx +  ",0,0," + val + ")", this.getDomID())
			}
		// }

		//this.texture1()

			// // var base = ymax/2
			// for (var base = 0; base < ymax; base += 10) {
			// 	var coords = []
				
			// 	for (var i=0; i<xmax; i+=10) {
			// 		var val = sigmoid((xmax/2-i)/80)
			// 		var offset = val*100
			// 		// drawSquare([i, base+offset], 3, "rgba(255,255,255," + val + ")", this.getDomID())
			// 		drawCircle([i, base+offset], 3, "rgba(255,255,255," + val + ")", this.getDomID())
			// 		// drawRectangle([i, base+offset], 5, 3, "rgba(255,255,255," + val + ")", this.getDomID())
			// 	}
			// }

			// path( {
			// 		d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
			// 		style: "fill:none;stroke:#fff;stroke-width:" + "10px;stroke-opacity:" + 1
			// 	}, this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default FunctionSpace1;
