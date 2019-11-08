//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Bitfilter2 extends Module {

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
		$("body").css({"background-color": "#d1d3d3"})
		for (var i=0; i<1; i+=(0.1+timeRamp(5000,0.8))) {
			Piksel.tdr1([xmax*i, ymax*0.5], xmax/4, 45*Math.floor(timeRamp(1700,8)), "i-" + i , this.getDomID())
		}
		var fontSize = ymax*0.08
		Piksel.renderTitle([0.05*xmax, 0.1*ymax], Piksel.randomTitle().split(" ")[0], fontSize + "px", "#000", 700, -4, "Helvetica", this.getDomID())
		Piksel.renderTitle([0.05*xmax, 0.1*ymax + fontSize], Piksel.randomTitle().split(" ")[0], fontSize + "px", "#fff", 700, -4, "Helvetica", this.getDomID())

		//drawLine([0.05*xmax, 0.1*ymax + fontSize*0.8], [(0.05+Math.random())*xmax, 0.1*ymax + fontSize*0.8], "#000", "1px", this.getDomID())

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Bitfilter2;
