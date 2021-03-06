//
// Josef Muller Brockman-style logo generator
// 

import Module from '../../lib/module.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class Constructive4 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.palette = ["#244F80", "#DCA116", "#C84316", "rgba(220,161,23,0.5)", "rgba(36,79,128,0.5)", "rgba(200,67,22,0.5)"]
		this.foo = 0.1
		this.offset = 0
		this.inc = 10
		this.queries = getSearchQueries()		
	}

	randomColor() {
		return this.palette[Math.floor(Math.random()*this.palette.length)]
	}

	randomQuery() {
		return this.queries[Math.floor(Math.random()*this.queries.length)]
	}

	getBorderColor() {
		return "rgba(255,255,255," + (0.1 + Math.random()*0.3) + ")"
	}

	// local override
	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID) {
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(0 50 100)",
			"style": "font-size:" + size + ";text-align:left;alignment-baseline:middle;text-anchor:left;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content.toString(), domID); 
	}

	render() {	

		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())
		
		var sqSize = ymax*0.075

		var dim = ymax*0.8
		var mainDiagonal = dim*Math.sqrt(2)
		var cornerDiagonal = dim/Math.sqrt(2)

		var center = [xmax/2,ymax/2]
		var border = [[center[0]-dim/2, center[1]-dim/2], [center[0]+dim/2, center[1]-dim/2], [center[0]+dim/2, center[1]+dim/2], [center[0]-dim/2, center[1]+dim/2] ]

		var delta = dim/16

		if (true) {

			//drawPolygonOutline(border, this.getBorderColor(), this.getDomID())
			drawLine(border[0], border[2], this.getBorderColor(), 1, this.getDomID())
			drawLine(border[1], border[3], this.getBorderColor(), 1, this.getDomID())
			drawCircleOutline(center, mainDiagonal/4, this.getBorderColor(), 1, this.getDomID())

			rect({
				x: center[0]-cornerDiagonal/2,
				y: center[1]-cornerDiagonal/2,
				width: cornerDiagonal,
				height: cornerDiagonal,
				stroke: this.getBorderColor(),
				fill: "none",
				"transform": "rotate(45 " + center[0] + " " + center[1] + ")",
				style: "stroke-width:1;"
			}, this.getDomID());	

			for (var i=0; i<9; i++) {
				var off = center[0] - dim/4 + i*delta
				drawLine([off, 0], [off, ymax], this.getBorderColor(), 1, this.getDomID())
			}

			for (var i=0; i<9; i++) {
				var off = center[1] - dim/4 + i*delta
				drawLine([0, off], [xmax, off], this.getBorderColor(), 1, this.getDomID())
			}

			drawLine([center[0] - dim/4, 0], [center[0] - dim/4, ymax], this.getBorderColor(), 1, this.getDomID())
		}

		// for (var x=0; x<16; x++) {
		// 	for (var y=0; y< 16; y++) {
		// 		var xoff = 7-x
		// 		var yoff = 7-y
		// 		this.foo += 0.0005
		// 		if (this.foo > 3.5) {
		// 			this.foo = 0.1
		// 		}
		// 		if (Math.pow(xoff,2) + Math.pow(yoff,2) <= Math.ceil(mainDiagonal/delta)*this.foo) {
		// 			var dice = Math.random()
		// 			if (dice < 0.25) {
		// 				// drawSquare([border[0][0] + dim/4 + x*delta, border[0][1] + dim/4 + y*delta], delta, "#fff", this.getDomID())
		// 				if (Math.random() < 0.5) {
		// 					drawPolygon([
		// 						[border[0][0] + x*delta, border[0][1] + y*delta],
		// 						[border[0][0] + (x+1)*delta, border[0][1] + y*delta],
		// 						[border[0][0] + (x+1)*delta, border[0][1] + (y+1)*delta]
		// 						], 
		// 						this.randomColor(), this.getDomID(), 0)
		// 				} else {
		// 					drawPolygon([
		// 						[border[0][0] + x*delta, border[0][1] + y*delta],
		// 						[border[0][0] + x*delta, border[0][1] + (y+1)*delta],
		// 						[border[0][0] + (x+1)*delta, border[0][1] + (y+1)*delta]
		// 						], 
		// 						this.randomColor(), this.getDomID(), 0)
		// 				}
		// 			}  else if (dice < 0.35) {
		// 				drawSquare([border[0][0] + x*delta, border[0][1] + y*delta], delta, this.randomColor(), this.getDomID())
		// 			} else if (dice < 0.45) {
		// 				drawCircle([border[0][0] + x*delta + delta/2, border[0][1] + y*delta + delta/2], delta/2, this.randomColor(), this.getDomID())
		// 			}
		// 		}
		// 	}
		// }

		for (var y=ymax*0.1; y<ymax*0.9; y+=30) {
			this.drawText([xmax*0.1+this.offset, y], this.randomQuery()["term"], 18 + "px", "#fff", 700, 0, "Helvetica", this.getDomID())
			this.drawText([xmax*0.3-this.offset, y], this.randomQuery()["term"], 18 + "px", "#fff", 100, 0, "Helvetica", this.getDomID())
			this.drawText([xmax*0.5+this.offset, y], this.randomQuery()["term"], 18 + "px", "#fff", 700, 0, "Helvetica", this.getDomID())
			this.drawText([xmax*0.7-this.offset, y], this.randomQuery()["term"], 18 + "px", "#fff", 100, 0, "Helvetica", this.getDomID())

		}

		this.offset += this.inc
		if (this.offset > 500) {
			this.inc = -1
		} 

		if (this.offset < 0) {
			this.inc = 1
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Constructive4;
