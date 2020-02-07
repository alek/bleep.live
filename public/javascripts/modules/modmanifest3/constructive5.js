//
// Josef Muller Brockman-style logo generator
// 

import Module from '../../lib/module.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class Constructive5 extends Module {

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
		return "rgba(255,255,255," + (0.1 + Math.random()*0.05) + ")"
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
		
		var sqSize = ymax*0.075

		var dim = ymax*0.8
		var mainDiagonal = dim*Math.sqrt(2)
		var cornerDiagonal = dim/Math.sqrt(2)

		var center = [xmax/2,ymax/2]
		var border = [[center[0]-dim/2, center[1]-dim/2], [center[0]+dim/2, center[1]-dim/2], [center[0]+dim/2, center[1]+dim/2], [center[0]-dim/2, center[1]+dim/2] ]

		var delta = dim/16

		if (false) {

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

		for (var x=border[0][0]; x<border[1][0]; x+= 10) {
			for (var y=border[0][1]; y<border[3][1]; y+= 10) {
				let xoff = center[0] - x,
					yoff = center[1] - y
				var d = Math.sqrt(Math.pow(xoff,2) + Math.pow(yoff,2))
				if (d < mainDiagonal/4) {
					// drawCircle([x,y], 5*Math.random(), "#fff", this.getDomID())
					if (Math.random() < 0.5) {
						drawCircle(getViewport([x,y]), Math.abs(mainDiagonal/4-d)/25, "#fff", this.getDomID())
					}
				}
			}
		}

		scale += 0.01
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Constructive5;
