//
// Abstract carbon randomized beatstep
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Syn4 extends Module {

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
		$("body").css({"background-color": "#c6f700"})
		$("circle").attr("stroke", "#000")
		$("circle").attr("stroke-width", "1px")
		$("circle").attr("fill", "#c6f700")
		$("circle").attr("r", "2")
		var size = xmax/4 * (1+Math.random())
		Piksel.brackets([xmax/2,ymax/2], size, size, xmax*0.01, "rgba(0,0,0," + Math.random() + ")", 5, this.getDomID())
		rotateLeft()
		if (timeSlide(8000, 100) > 50) {
			moveForward()
		} else {
			moveBackward()
		}
		for (var i=0; i<100; i++) {
			Piksel.triangular2([xmax/2,ymax/2], ymax/4, "#000", 2 + 10*Math.random(), 120, 50 + Math.random()*50, this.getDomID())
		}
		Piksel.tunnel1([xmax/2, ymax/2], size/2, 4, Math.random() < 0.8 ? "#000" : "#fff", ymax*0.1*Math.random(), this.getDomID());
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Syn4;
