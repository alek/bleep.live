//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class TDR6 extends Module {

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

	arrow(start, size, color) {
		var delta = size*0.2

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

		path( {
			d: "M" + pathEntries.map(x => x.join(" ")).join(" L") + "",
			"transform": "rotate(" + Math.floor(Math.random()*4)*90 + " " + (start[0] + size/2) + " " + (start[1] + size/2) + ")",
			style: "fill:" + color + ";stroke:" + color + ";stroke-width:" + 1
		}, this.getDomID())

		// drawText([start[0] + size + delta, start[1] + size], "™", delta, "#fff", 100, 0, "Helvetica", this.getDomID())
		// drawText([start[0] + size + delta, start[1]], "™", delta, "#fff", 100, 0, "Helvetica", this.getDomID())

	}

	render() {	
		// this.renderGrid(32,22)
		// for (var i=0; i<20; i++) {
		// 	this.arrow([Math.random()*xmax,Math.random()*ymax],100*Math.random(), "#fff")
		// }
		// for (var i=0; i<20; i++) {
			// this.arrow([xmax/2,ymax/2],50, "#fff")
		// }

		var rows = 5
		var columns = xmax/ymax*rows
		var dim = xmax/columns

		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				this.arrow(coord,dim/4*Math.floor(Math.random()*4), "#fff")
			}
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR6;
