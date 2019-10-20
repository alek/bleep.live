//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class TDR5 extends Module {

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

	arrow(start, size, color, stroke) {
		var delta = size*0.2
		// drawRectangleOutline(start, size, size, "rgba(255,255,255,0.2)", this.getDomID())

		var pathEntries = [
			[start[0], start[1] + size - delta/Math.sqrt(2)], 
			[start[0] + delta/Math.sqrt(2), start[1]+size], 
			[start[0]+size - delta, start[1] + delta + delta/Math.sqrt(2)], 
			[start[0]+size - delta, start[1]+size], 
			[start[0]+size, start[1]+size-delta], 
			[start[0]+size, start[1]], 
			[start[0]+delta, start[1]], 
			[start[0], start[1]+delta], 
			[start[0]+size-delta*(1+1/Math.sqrt(2)), start[1]+delta], 
			[start[0], start[1]+size-delta/Math.sqrt(2)]
			]

		// just the edge - works

		// var pathEntries = [
		// 	[start[0]+size - delta, start[1] + delta], 
		// 	[start[0]+size - delta, start[1]+size], 
		// 	[start[0]+size, start[1]+size-delta], 
		// 	[start[0]+size, start[1]], 
		// 	[start[0]+delta, start[1]], 
		// 	[start[0], start[1]+delta], 
		// 	[start[0]+size-delta, start[1]+delta], 
		// 	]


		path( {
			d: "M" + pathEntries.map(x => x.join(" ")).join(" L") + "",
			style: "fill:" + color + ";stroke:" + stroke + ";stroke-width:" + 1
		}, this.getDomID())

	}

	render() {	
		// this.renderGrid(10,10)
		// this.arrow([400,400],200, "#fff", "#fff")
		// this.arrow([200,200],100, "#fff", "#fff")
		for (var i=0; i<20; i++) {
			this.arrow([Math.random()*xmax,Math.random()*ymax],200*Math.random(), "#fff", "#fff")
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR5;
