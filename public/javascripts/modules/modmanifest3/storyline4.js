//
// Constructive geometry for fun & profit
// 

import Module from '../../lib/module.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class StoryLine4 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.queries = getSearchQueries()
		//this.palette = ["#244F80", "#DCA116", "#C84316", "rgba(220,161,23,0.5)", "rgba(36,79,128,0.5)", "rgba(200,67,22,0.5)"]
		this.palette = ["#244F80", "#DCA116", "#C84316"]
		this.primary = this.randomColor()		
		this.objCount = 0
	}

	randomColor() {
		return this.palette[Math.floor(Math.random()*this.palette.length)]
	}

	randomQuery() {
		return this.queries[Math.floor(Math.random()*this.queries.length)]
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getViewport(getGridCoordinates([i,j], columns, rows, xmax, ymax))
				drawCircle(coord, 2, "rgba(255,255,255,0.02)", this.getDomID())
			}
		}
	}	

	render() {	

		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		//drawRectangle([0,0], xmax, ymax, "#E9E6D3", this.getDomID())

		var radius = ymax*0.15
		var center = [xmax/2,ymax/2]

		drawText([(xmax/2+this.objCount*4)%xmax,ymax/2], this.randomQuery()["term"], ymax*0.4 + "px", this.randomColor(), 700, -4, "Helvetica", this.getDomID())

		for (var i=0; i<3; i++) {
			var angle = 360*Math.random()
			// var off = radius*Math.random()
			var off = radius
			var target = getViewport([center[0]+off*Math.cos(deg2rad(angle)),center[1]+off*Math.sin(deg2rad(angle))])
			
			if (Math.random() < 0.3) {
				drawCircle(target, radius*Math.random(), this.primary, this.getDomID())
			}
			drawCircleOutline(target, radius*Math.random(), this.primary, 1, this.getDomID())
			center = target
			this.objCount++
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		if (this.objCount > 50) {
			this.clear()
			this.objCount = 0
		}
		this.render()
	}

}

export default StoryLine4;
