//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class PikselGrid5 extends Module {

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
		noise.seed(Math.random());
		var r = timeRamp(5000,xmax)
		Piksel.addCircularClip("glitchClip", xmax/2, ymax/2, r)

		var height = xmax*this.getConfigVal("ratio", timeRamp(2000,2.0))
		var width = xmax*this.getConfigVal("ratio", timeRamp(2000,2.0))
		var p = this.getConfigVal("p", 0.9)
		if (Math.random() < p) {
			image( {
				href: this.getConfigVal("image", "../public/images/piksel/pixel-asset-12.svg"),
				x: xmax/2-width/2,
				y: ymax/2-height/2,
				"clip-path": "url(#glitchClip)",
				"transform": "rotate(" + timeRamp(10000,360) + ", " + xmax/2 + "," + ymax/2 + ")",
				width: width
			}, this.getDomID())
			drawCircleOutline([xmax/2,ymax/2],r*(1+Math.random()), "#fff", 20*Math.random(), this.getDomID())
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default PikselGrid5;
