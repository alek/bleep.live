//
// Abstract carbon randomized beatstep
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Syn3 extends Module {

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

	render() {	
		// $("body").css({"background-color": "#c6f700"})
		$("circle").attr("stroke", "#000")
		$("circle").attr("stroke-width", "1px")
		$("circle").attr("fill", "#c6f700")
		$("circle").attr("r", "2")
		var size = xmax/4 * (1+Math.random())
		// Piksel.brackets([xmax/2,ymax/2], size, size, xmax*0.01, "rgba(255,255,255," + Math.random() + ")", 5, this.getDomID())
		for (var i=0; i<100; i++) {
			Piksel.triangular1([xmax/2,ymax/2], ymax/4, "rgba(255,255,255," + Math.random() + ")", 1, this.getDomID())
		}
		text( { 
			x: xmax/2,
			y: ymax/2,
			"fill": Math.random() < 0.8 ? "#fff" : "#000",
			"transform": getRotateVal(0, [xmax/2,ymax/2]),
			"style": "font-size:" + ymax*0.1 + ";text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:Helvetica;sans-serif;font-weight:" + 700 + ";letter-spacing:" + -5 + "px;"
		}, Piksel.randomTitle().split(" ")[0], this.getDomID()); 

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Syn3;
