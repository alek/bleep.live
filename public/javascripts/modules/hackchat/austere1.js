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
		this.center = {"x": xmax/2, "y": ymax/2}
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	// getDepth(coords, depth) {
	// 	return [ []
	// 	]
	// }


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
			container: this,
			coords: coords,
			frontPanel: this.getDepth(coords, startDepth, this.center),
			endPanel: this.getDepth(coords, endDepth, this.center),
			draw: function() { 
				drawCoordPolygon(this.coords, "#fff", this.domID)
				drawCircle([this.endPanel[0].x, this.endPanel[0].y], 5, "red", this.domID)
				drawCircle([this.endPanel[1].x, this.endPanel[1].y], 5, "green", this.domID)
				drawCircle([this.endPanel[2].x, this.endPanel[2].y], 5, "yellow", this.domID)
				drawCircle([this.endPanel[3].x, this.endPanel[3].y], 5, "blue", this.domID)
			}
		}
	}

	createObjectOld(coord, width, height, depth) {
		return {
			center: coord,
			width: width,
			height: height,
			depth: depth,
			fill: "#fff",
			domID: this.getDomID(),
			vp: this.center,
			// coords: [coord, [coord[0] + width, coord[1]], [coord[0] + width, coord[1] + height], [coord[0], coord[1] + height]],
			coords: [[coord[0] - width/2, coord[1] - height/2], 
					 [coord[0] + width/2, coord[1] - height/2], 
					 [coord[0] + width/2, coord[1] + height/2], 
					 [coord[0] - width/2, coord[1] + height/2]],
			draw: function() { 

				// draw face
				
				
				// drawPolygon([this.coords[2], this.coords[3], this.vp], "#474646", this.domID)
				// drawPolygon([this.coords[1], this.coords[2], this.vp], "#606060", this.domID)
				// drawPolygon([this.coords[0], this.coords[1], this.vp], "#CECECE", this.domID)
				// var delta = 100

				// drawRectangle(this.coords[0], this.width, this.height, "#fff", this.domID)

				// drawPolygon([this.coords[2], 
				// 	         this.coords[3], 
				// 	         [this.coords[1][0] + delta, this.coords[1][1] + delta*((this.vp[1]-this.coords[1][1])/(this.vp[0]-this.coords[1][0]))],
				// 	         [this.coords[0][0] + delta, this.coords[0][1] + delta*((this.vp[1]-this.coords[0][1])/(this.vp[0]-this.coords[0][0]))]], 
				// 	         "gray", this.domID)

				// drawPolygon([this.coords[1], 
				// 	         this.coords[2], 
				// 	         [this.coords[2][0] + delta, this.coords[2][1] + delta*((this.vp[1]-this.coords[2][1])/(this.vp[0]-this.coords[2][0]))],
				// 	         [this.coords[1][0] + delta, this.coords[1][1] + delta*((this.vp[1]-this.coords[1][1])/(this.vp[0]-this.coords[1][0]))]], 
				// 	         "gray", this.domID)

				// drawPolygon([this.coords[0], 
				// 	         this.coords[1], 
				// 	         [this.coords[1][0] + this.depth, this.coords[1][1] + this.depth*((this.vp[1]-this.coords[1][1])/(this.vp[0]-this.coords[1][0]))],
				// 	         [this.coords[0][0] + this.depth, this.coords[0][1] + this.depth*((this.vp[1]-this.coords[0][1])/(this.vp[0]-this.coords[0][0]))]], 
				// 	         "#CECECE", this.domID)

				// top + bottom
				//
				// x = x_1 - d * ( (c_1 - x_1) / (c_2 - y_1) )
				// y = y_1 - d

				// left + right
				//
				// x = x_1 - delta
				// y = y_1 - delta * ( (c_2 - y_1) / (c_1 - x_1) )


				// ------

				// drawPolygon([this.coords[1], 
				// 	         this.coords[2], 
				// 	         [this.coords[2][0] - this.depth*((this.vp[0]-this.coords[2][0])/(this.vp[1]-this.coords[2][1])), this.coords[2][1] - this.depth],
				// 	         [this.coords[1][0] - this.depth*((this.vp[0]-this.coords[1][0])/(this.vp[1]-this.coords[1][1])), this.coords[1][1] - this.depth]],
				// 	         "gray", this.domID)


				// drawRectangle(this.coords[0], this.width, this.height, "#fff", this.domID)

				// drawCircle(this.coords[1], 5, "red", this.domID)				
				// drawCircle(this.coords[2], 5, "blue", this.domID)				
				// drawCircle([this.coords[2][0] - this.depth*((this.vp[0]-this.coords[2][0])/(this.vp[1]-this.coords[2][1])), this.coords[2][1] - this.depth], 5, "yellow", this.domID)				
				// drawCircle([this.coords[1][0] - this.depth*((this.vp[0]-this.coords[1][0])/(this.vp[1]-this.coords[1][1])), this.coords[1][1] - this.depth], 5, "green", this.domID)				


				drawPolygon([this.coords[3], 
					         this.coords[0], 
					         [this.coords[0][0] + this.depth, this.coords[0][1] + this.depth*((this.vp[1] - this.coords[0][1])/(this.vp[0]-this.coords[0][0]))],
					         [this.coords[3][0] + this.depth, this.coords[3][1] + this.depth*((this.vp[1] - this.coords[3][1])/(this.vp[0]-this.coords[3][0]))]],
					         "gray", this.domID)

				drawPolygon([this.coords[2], 
					         this.coords[3], 
					         [this.coords[3][0] - this.depth*((this.vp[0]-this.coords[3][0])/(this.vp[1]-this.coords[3][1])), this.coords[3][1] - this.depth],
					         [this.coords[2][0] - this.depth*((this.vp[0]-this.coords[2][0])/(this.vp[1]-this.coords[2][1])), this.coords[2][1] - this.depth]],
					         "#CECECE", this.domID)

				drawPolygon([this.coords[1], 
					         this.coords[2], 
					         [this.coords[2][0] + this.depth, this.coords[2][1] + this.depth*((this.vp[1] - this.coords[2][1])/(this.vp[0]-this.coords[2][0]))],
					         [this.coords[1][0] + this.depth, this.coords[1][1] + this.depth*((this.vp[1] - this.coords[1][1])/(this.vp[0]-this.coords[1][0]))]],
					         "gray", this.domID)

				drawPolygon([this.coords[0], 
					         this.coords[1], 
					         [this.coords[1][0] - this.depth*((this.vp[0]-this.coords[1][0])/(this.vp[1]-this.coords[1][1])), this.coords[1][1] - this.depth],
					         [this.coords[0][0] - this.depth*((this.vp[0]-this.coords[0][0])/(this.vp[1]-this.coords[0][1])), this.coords[0][1] - this.depth]],
					         "#CECECE", this.domID)


				drawRectangle(this.coords[0], this.width, this.height, "#fff", this.domID)

				drawCircle([this.coords[0][0], this.coords[0][1] - this.depth], 5, "green", this.domID)				
				drawCircle([this.coords[1][0]+this.depth, this.coords[1][1]], 5, "red", this.domID)				

				drawLine([0, this.coords[0][1] - this.depth], [xmax, this.coords[0][1] - this.depth], "green", 2, this.domID)
				drawLine([this.coords[1][0] + this.depth, 0], [this.coords[1][0] + this.depth, ymax], "red", 2, this.domID)


				// drawCircle(this.coords[1], 5, "red", this.domID)				
				// drawCircle(this.coords[2], 5, "blue", this.domID)				
				// drawCircle([this.coords[2][0] + this.depth, this.coords[2][1] + this.depth*((this.vp[1] - this.coords[2][1])/(this.vp[0]-this.coords[2][0]))], 5, "yellow", this.domID)				

				// drawCircle([this.coords[1][0] - this.depth*((this.vp[0]-this.coords[1][0])/(this.vp[1]-this.coords[1][1])), this.coords[1][1] - this.depth], 5, "green", this.domID)				

				// for (var i=3; i>0; i--) {
				// 	drawPolygon([this.coords[i-1], 
				// 		         this.coords[i], 
				// 		         [this.coords[i][0] - this.depth*((this.vp[0]-this.coords[i][0])/(this.vp[1]-this.coords[i][1])), this.coords[i][1] - this.depth],
				// 		         [this.coords[i-1][0] - this.depth*((this.vp[0]-this.coords[i-1][0])/(this.vp[1]-this.coords[i-1][1])), this.coords[i-1][1] - this.depth]],
				// 		         randomPantoneHex(), this.domID)


				// 	// drawPolygon([this.coords[i-1], 
				// 	// 	         this.coords[i], 
				// 	// 	         [this.coords[i][0] + this.depth, this.coords[i][1] + this.depth*((this.vp[1]-this.coords[i][1])/(this.vp[0]-this.coords[i][0]))],
				// 	// 	         [this.coords[i-1][0] + this.depth, this.coords[i-1][1] + this.depth*((this.vp[1]-this.coords[i-1][1])/(this.vp[0]-this.coords[i-1][0]))]], 
				// 	// 	         // colors[i], this.domID)
				// 	// 	         randomPantoneHex(), this.domID)
				// }

				// var colors = ["gray", "red", "green", "blue"]

				// for (var i=3; i>0; i--) {
				// 	drawPolygon([this.coords[i-1], 
				// 		         this.coords[i], 
				// 		         [this.coords[i][0] + this.depth, this.coords[i][1] + this.depth*((this.vp[1]-this.coords[i][1])/(this.vp[0]-this.coords[i][0]))],
				// 		         [this.coords[i-1][0] + this.depth, this.coords[i-1][1] + this.depth*((this.vp[1]-this.coords[i-1][1])/(this.vp[0]-this.coords[i-1][0]))]], 
				// 		         // colors[i], this.domID)
				// 		         randomPantoneHex(), this.domID)
				// }

				// for (var i=3; i>0; i--) {
				// 	drawPolygon([this.coords[i-1], 
				// 		         this.coords[i], 
				// 		         [this.coords[i][0] + this.depth, this.coords[i][1] + this.depth*((this.vp[1]-this.coords[i][1])/(this.vp[0]-this.coords[i][0]))],
				// 		         [this.coords[i-1][0] + this.depth, this.coords[i-1][1] + this.depth*((this.vp[1]-this.coords[i-1][1])/(this.vp[0]-this.coords[i-1][0]))]], 
				// 		         // colors[i], this.domID)
				// 		         randomPantoneHex(), this.domID)
				// }


				// drawRectangle(this.coords[0], this.width, this.height, "#fff", this.domID)


				// drawCircle(this.coords[0], 5, "red", this.domID)
				// drawCircle(this.coords[1], 5, "green", this.domID)
				// drawCircle([this.coords[1][0] + delta, this.coords[1][1] + delta*((this.vp[1]-this.coords[1][1])/(this.vp[0]-this.coords[1][0]))], 5, "yellow", this.domID)
				// drawCircle([this.coords[0][0] + delta, this.coords[0][1] + delta*((this.vp[1]-this.coords[0][1])/(this.vp[0]-this.coords[0][0]))], 5, "blue", this.domID)

				// drawLine(this.coords[0], this.vp, "#fff", "1px", this.domID)
				// drawLine(this.coords[1], this.vp, "#fff", "1px", this.domID)
				// drawLine(this.coords[2], this.vp, "#fff", "1px", this.domID)
				// drawLine(this.coords[3], this.vp, "#fff", "1px", this.domID)
			}
		}
	}

	render() {	

		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		var a = this.createObject([xmax*0.2, ymax*0.7], 50, 50, 0, 50)
		a.draw()
		
		// this.createObject([300, ymax/2+300], 80, 80, 80).draw()
		// this.createObject([300, ymax/2+200], 80, 80, 80).draw()	
		// this.createObject([300, ymax/2+100], 80, 80, 80).draw()	

		// for (var i=0.2; i<1; i+=0.2) {
		// 	for (var j=0.2; j<1; j+=0.2) {
		// 		this.createObject([xmax*i, ymax*j], 50 + 50*Math.random(), 50 + 50*Math.random()).draw()
		// 	}
		// }

		// for (var i=xmax; i>0; i-=100) {
		// 	var offset = (i > xmax/2) ? i : (xmax/2-i)
		// 	for (var j=ymax/2; j>0; j-=100) {
		// 		this.createObject([offset, ymax/2+j], 80, 80).draw()				
		// 	}
		// }


		// var dim = xmax*(0.1*Math.random()) + 20
		// var dim = 100
		// for (var i=xmax; i>0; i-=dim) {
		// 	var offset = (i > xmax/2) ? i : (xmax/2-i)
 	// 		for (var j=ymax/2; j>0; j-=dim) {
		// 		this.createObject([offset, ymax/2+j], dim*0.8, dim*0.8).draw()				
		// 	}
		// }


		// this.createObject([offset, ymax/2+300], 80, 80).draw()
		// this.createObject([offset, ymax/2+200], 80, 80).draw()	
		// this.createObject([offset, ymax/2+100], 80, 80).draw()			

		// this.createObject([900, ymax/2+300], 80, 80).draw()
		// this.createObject([900, ymax/2+200], 80, 80).draw()	
		// this.createObject([900, ymax/2+100], 80, 80).draw()	

		// this.createObject([800, ymax/2+300], 80, 80).draw()
		// this.createObject([800, ymax/2+200], 80, 80).draw()	
		// this.createObject([800, ymax/2+100], 80, 80).draw()	

		// this.createObject([700, ymax/2+300], 80, 80).draw()
		// this.createObject([700, ymax/2+200], 80, 80).draw()	
		// this.createObject([700, ymax/2+100], 80, 80).draw()	

		// this.createObject([600, ymax/2+300], 80, 80).draw()
		// this.createObject([600, ymax/2+200], 80, 80).draw()	
		// this.createObject([600, ymax/2+100], 80, 80).draw()	

		// this.createObject([100, ymax/2+300], 80, 80).draw()
		// this.createObject([100, ymax/2+200], 80, 80).draw()	
		// this.createObject([100, ymax/2+100], 80, 80).draw()	

		// this.createObject([200, ymax/2+300], 80, 80).draw()
		// this.createObject([200, ymax/2+200], 80, 80).draw()	
		// this.createObject([200, ymax/2+100], 80, 80).draw()	

		// this.createObject([300, ymax/2+300], 80, 80).draw()
		// this.createObject([300, ymax/2+200], 80, 80).draw()	
		// this.createObject([300, ymax/2+100], 80, 80).draw()	
		
		// this.createObject([400, ymax/2+300], 80, 80).draw()
		// this.createObject([400, ymax/2+200], 80, 80).draw()	
		// this.createObject([400, ymax/2+100], 80, 80).draw()	

		// this.createObject([500, ymax/2+300], 80, 80).draw()
		// this.createObject([500, ymax/2+200], 80, 80).draw()	
		// this.createObject([500, ymax/2+100], 80, 80).draw()	

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Austere1;
