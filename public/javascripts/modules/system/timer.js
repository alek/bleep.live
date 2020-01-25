//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Timer extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.initTime = null
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	render() {	

		if (this.initTime === null) { this.initTime = Date.now() }

		var n = Date.now() - this.initTime

		drawText([xmax/2,ymax/2], n, "72px", "#fff", 700, -4, "Helvetica", this.getDomID())
		//drawCircleOutline([xmax/2,ymax/2], ymax*0.3, "#fff", ymax*0.05, this.getDomID())

		var r = ymax*0.3
		var fullCircle = 2*r*Math.PI

		circle({
			cx: xmax/2,
			cy: ymax/2,
			r: ymax*0.3,
			stroke: "#fff",
			fill: "none",
			"stroke-dasharray": ((n/10)%fullCircle) + " " + fullCircle,		
			"transform": "rotate(0 0 0)",
			style: "stroke-width:" + ymax*0.05
		}, this.getDomID());	

		circle({
			cx: xmax/2,
			cy: ymax/2,
			r: ymax*0.4,
			stroke: "#fff",
			fill: "none",
			"stroke-dasharray": (n%fullCircle) + " " + fullCircle,		
			"transform": "rotate(0 0 0)",
			style: "stroke-width:" + ymax*0.0125
		}, this.getDomID());	

		circle({
			cx: xmax/2,
			cy: ymax/2,
			r: ymax*0.2,
			stroke: "#fff",
			fill: "none",
			"stroke-dasharray": (n%fullCircle) + " " + fullCircle,		
			"transform": "rotate(0 0 0)",
			style: "stroke-width:" + ymax*0.025
		}, this.getDomID());	
		
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Timer;