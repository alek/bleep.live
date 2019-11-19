//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class PikselGrid4 extends Module {

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
		var config = this.getConfig()
		var height = xmax*this.getConfigVal("ratio", 0.15)
		var width = xmax*this.getConfigVal("ratio", 0.15)
		var p = this.getConfigVal("p", 0.6)
		for (var i=-xmax; i<2*xmax; i+=height) {
			for (var j=-ymax; j<2*ymax; j+=width) {
				if (Math.random() < p) {
					image( {
						href: this.getConfigVal("image", "../public/images/piksel/pixel-asset-9.svg"),
						x: i,
						y: j,
						"transform": "rotate(" + Math.floor(Math.random()*4)*90 + ", " + (i+width/2) + "," + (j+height/2) + ")",
						width: width
					}, this.getDomID())
				} else {
					image( {
						href: this.getConfigVal("image", "../public/images/piksel/pixel-asset-9.svg"),
						x: i,
						y: j,
						"transform": "rotate(" + Math.floor(Math.random()*4)*90 + ", " + (i+width/2) + "," + (j+height/2) + ")",
						width: width/2
					}, this.getDomID())					
				}
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

export default PikselGrid4;
