//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Arch1 extends Module {

	constructor() {
		super({	// init params mapping
			"stroke-width": ["cc_7", 5],
			"size": ["cc_8", 5],
		})
		this.forward = true
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	polygon(coords) {
		polygon( {
			points: coords.map(getViewport).join(" "),
			// style: "fill:none;stroke:#fff;stroke-width:" + this.params["stroke-width"]
			style: "fill:none;stroke:#fff;stroke-width:" + (this.params["stroke-width"]/10)
		}, this.getDomID())
	}

	gen(start, size) {
		start = [start[0] - size/2, start[1] - size/2]
		var offset = size/2		
		this.polygon([start, [start[0]+size,start[1]], [start[0]+size,start[1]+size], [start[0], start[1]+size]])
		this.polygon([[start[0]+size,start[1]], [start[0]+size + offset,start[1]-offset], [start[0]+size+offset,start[1]+offset], [start[0]+size, start[1]+size]])
		this.polygon([[start[0]+size,start[1]], [start[0]+size + offset,start[1]-offset], [start[0]+offset,start[1]-offset], start])
	}

	render() {	

		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		// if (Math.random() < 0.5) {
		//	moveForward()
		// } else {
		// 	moveBackward()
		// }

		if (this.forward) {
			moveForward()
		} else {
			moveBackward()
		}

		if ((new Date())%10 == 0) {
			this.forward = !this.forward
		}

		rotateLeft()

		// this.polygon([[200,300], [500,250], [500,400], [200, 400]])
		// this.polygon([[500,250], [600, 225], [600, 375], [500,400]])
		// this.polygon([[500,250], [600, 225], [400,150], [500,250]])
		// this.polygon([[400,150], [500,250], [200,300], [300,175]])

		// this.polygon([[200,300*Math.random()], [500,250], [500,400], [200, 400]])
		// for (var i=0; i<10; i++) {	
		// 		this.polygon([[200/i,300], [500,250], [500,400], [200, 400]])
		// 	// this.polygon([[200,300/i], [500,250], [500,400], [200, 400]])
		// 	this.polygon([[500,250], [600, 225], [600*i, 375], [500,400]])
		// 	// this.polygon([[500,250], [600, 225], [400,150], [500,250]])
		// 	// this.polygon([[400,150], [500,250], [200,300], [300,175]])

		// }

		
		// var size = 50
		// var start = [xmax/2-size/2,ymax/2-size/2]

		// this.polygon([start, [start[0]+size,start[1]], [start[0]+size,start[1]+size], [start[0], start[1]+size]])

		for (var i=1; i<600; i+=50) {
			this.gen([xmax/2,ymax/2], i)			
		}

		// this.gen([xmax/2,ymax/2], 200)


		// for (var i=10; i<1000; i+=10) {	
		// 	size = i
		// 	this.polygon([start, [start[0]+size,start[1]], [start[0]+size,start[1]+size], [start[0], start[1]+size]])
		// }

		// for (var i=0; i<100; i+=20) {
		// 	this.gen([xmax/i,ymax/Math.sqrt(i)], 20*Math.random())
		// }

		// this.gen([xmax/2,ymax/2],100)
		// this.gen([0,0],100)

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Arch1;
