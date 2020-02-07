//
// Constructive geometry for fun & profit
// 

import Module from '../../lib/module.js'

class StoryLine3 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.palette = ["#244F80", "#DCA116", "#C84316", "rgba(220,161,23,0.5)", "rgba(36,79,128,0.5)", "rgba(200,67,22,0.5)"]
		this.primary = this.randomColor()		
	}

	randomColor() {
		return this.palette[Math.floor(Math.random()*this.palette.length)]
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
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		drawRectangle([0,0], xmax, ymax, "#E9E6D3", this.getDomID())

		var radius = 100
		var center = [xmax/2,ymax/2]

		moveForward()
		theta += 0.005

		for (var angle=0; angle<=360*16; angle+=30) {

			var off = radius*Math.random()
			
			var target = getViewport([center[0]+off*Math.cos(deg2rad(angle)),center[1]+off*Math.sin(deg2rad(angle))])
			drawLine(center, target, this.primary, 1, this.getDomID())
			drawCircleOutline(target, radius, this.primary, 1, this.getDomID())
			
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default StoryLine3;
