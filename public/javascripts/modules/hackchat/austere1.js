//
// Austere Engineering HackChat
// 

import Module from '../../lib/module.js'

class Austere1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		// this.center = [xmax/2, ymax/2]
		this.center = {"x": xmax*0.5, "y": ymax*0.52}
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	//
	// get a rectangle at a given depth relative to the vanishing point
	//
	getDepth(coords, depth, vp) {
		return [
			{ "x": coords[0].x - depth*((vp.x - coords[0].x)/(vp.y - coords[0].y)), "y": coords[0].y - depth},
			{ "x": coords[1].x - depth*((vp.x - coords[1].x)/(vp.y - coords[1].y)), "y": coords[1].y - depth},
			{ "x": coords[1].x - depth*((vp.x - coords[1].x)/(vp.y - coords[1].y)),
			  "y": coords[2].y + ((vp.y-coords[2].y)/(vp.x-coords[2].x))*(coords[1].x - coords[2].x - depth*((vp.x-coords[1].x)/(vp.y-coords[1].y)))},
			{ "x": coords[0].x - depth*((vp.x - coords[0].x)/(vp.y - coords[0].y)),
			  "y": coords[3].y + ((vp.y-coords[3].y)/(vp.x-coords[3].x))*(coords[0].x - coords[3].x - depth*((vp.x-coords[0].x)/(vp.y-coords[0].y)))}
		]
	}

	// get rectangle coordinates for a given center
	getCoords(center, width, height) {
		return [{ "x": center[0] - width/2, "y": center[1] - height/2}, 
				{ "x": center[0] + width/2, "y": center[1] - height/2}, 
				{ "x": center[0] + width/2, "y": center[1] + height/2}, 
				{ "x": center[0] - width/2, "y": center[1] + height/2}]
	}

	createObject(coord, width, height, startDepth, endDepth) {
		var coords = this.getCoords(coord, width, height)
		return {
			center: coord,
			width: width,
			height: height,
			startDepth: startDepth,
			endDepth: endDepth,
			fill: "#fff",
			domID: this.getDomID(),
			vp: this.center,
			coord: coord,
			container: this,
			frontPanel: this.getDepth(coords, startDepth, this.center),
			endPanel: this.getDepth(coords, endDepth, this.center),
			draw: function() { 
				if (this.coord[0] < xmax/2) {		  	// bottom left
					drawCoordPolygon([this.frontPanel[3], this.frontPanel[0], this.endPanel[0], this.endPanel[3]], "#B4B4B4", this.domID) 	// left
					drawCoordPolygon([this.frontPanel[2], this.frontPanel[3], this.endPanel[3], this.endPanel[2]], "#494848", this.domID)   // bottom
					drawCoordPolygon([this.frontPanel[0], this.frontPanel[1], this.endPanel[1], this.endPanel[0]], "#D4D4D4", this.domID)	// top			
					drawCoordPolygon([this.frontPanel[1], this.frontPanel[2], this.endPanel[2], this.endPanel[1]], "#636363", this.domID)  	// right					
				} else if (this.coord[0] > xmax/2) {  // bottom right
					drawCoordPolygon([this.frontPanel[1], this.frontPanel[2], this.endPanel[2], this.endPanel[1]], "#636363", this.domID)  	// right					
					drawCoordPolygon([this.frontPanel[2], this.frontPanel[3], this.endPanel[3], this.endPanel[2]], "#494848", this.domID)   // bottom
					drawCoordPolygon([this.frontPanel[0], this.frontPanel[1], this.endPanel[1], this.endPanel[0]], "#D4D4D4", this.domID)	// top	
					drawCoordPolygon([this.frontPanel[3], this.frontPanel[0], this.endPanel[0], this.endPanel[3]], "#B4B4B4", this.domID) 	// left
				} 

				drawCoordPolygon(this.frontPanel, "#fff", this.domID)																 		// front
			}
		}
	}

	render() {	

		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())
		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		// var a = this.createObject([xmax*0.2, ymax*0.7], 50, 50, 50*Math.random(), 50)
		// a.draw()
		
		// this.createObject([xmax*0.2, ymax*0.7], 50, 50, 50*Math.random(), 50).draw()
		// this.createObject([xmax*0.7, ymax*0.7], 50, 50, 50*Math.random(), 50).draw()
		// this.createObject([xmax*0.2, ymax*0.3], 50, 50, 50*Math.random(), 50).draw()
		// this.createObject([xmax*0.7, ymax*0.3], 50, 50, 50*Math.random(), 50).draw()

		// this.createObject([xmax*0.48, ymax*0.7], 50, 50, 50*Math.random(), 50).draw()

		// for (var i=0; i<xmax; i+=50) {
		// 	// this.createObject([i, 600], 25, 25, 25*Math.random(), 50 + 25*Math.random()).draw()
		// 	// this.createObject([i, 570], 25, 25, 20+50*Math.random(), 50 + 25*Math.random()).draw()
		// 	// this.createObject([i, 540], 25, 25, 20+50*Math.random(), 50 + 25*Math.random()).draw()
		// 	// this.createObject([i, 510], 25, 25, 10+50*Math.random(), 50 + 25*Math.random()).draw()
		// 	// this.createObject([i, 480], 25, 25, 40+50*Math.random(), 50 + 25*Math.random()).draw()
		// 	this.createObject([i, ymax*0.7], 25, 25, 10+50*Math.random(), 50 + 25*Math.random()).draw()
		// }

		var dim = 30
		scale += 0.05
		if (scale > 2.5) {
			scale = 0.1
		}

		for (var height=ymax*0.9; height>ymax*0.7; height-=dim) {
			for (var i=xmax; i>xmax*0.5; i-=dim) {
				this.createObject(getViewport([i, height]), dim, dim, 4*dim*Math.random(), 4*dim + ymax*0.1*Math.random()).draw()
			}
			for (var i=0; i<xmax*0.5; i+=dim) {
				this.createObject(getViewport([i, height]), dim, dim, 4*dim*Math.random(), 4*dim + ymax*0.1*Math.random()).draw()
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

export default Austere1;
