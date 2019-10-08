//
// Simple grid-based typographic randomization
//

import Module from '../lib/module.js'

class Minimal3 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 20],
			"r1": ["cc_2", 255],
			"g1": ["cc_3", 255],
			"b1": ["cc_4", 255],
			"size": ["cc_5", 72/4],
			"weight": ["cc_6", 40],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"pantone": ["cc_9", 0],
			"r2": ["cc_10", 0/2],
			"g2": ["cc_11", 0/2],
			"b2": ["cc_12", 0/2],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"count": ["cc_16", 16]
		})
	}

	renderGrid() {
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}		

	renderObjects() {
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {

				var rowWidth = xmax/this.params["grid_columns"]
				var columnHeight = ymax/this.params["grid_rows"]

				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				var center = getGridCoordinatesCenter([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 

				var lineWidth = this.params["weight"]
				var fill = (this.params["pantone"] == 0) ? getParametricColor(this.params,1) : randomPantoneHex()
				
				var dice = Math.random()
				if (dice < 0.15) {
					drawPolygon([	// (bottom left - top right)
								[coord[0] + rowWidth, coord[1]],
								[coord[0] + rowWidth-lineWidth, coord[1]],
								[coord[0], coord[1]+columnHeight],
								[coord[0]+lineWidth, coord[1]+columnHeight],
								], fill, this.getDomID())
				} else if (dice < 0.3) { // top left - bottom right
					drawPolygon([
								coord, 
								[coord[0]+lineWidth, coord[1]], 
								[coord[0] + rowWidth, coord[1] + columnHeight-lineWidth],   
								[coord[0] + rowWidth, coord[1] + columnHeight] 
								], fill, this.getDomID())
				} else {

				}
			}
		}
	}

	render() {	
		this.setBackgroundColor(getParametricColor(this.params,2))		
		//this.renderGrid()
		this.renderObjects()
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.setBackgroundColor(getParametricColor(this.params,2))
		} else {
			this.clear()
			this.render()
		}
	}

}

export default Minimal3;
