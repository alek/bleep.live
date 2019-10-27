//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class Chemical5 extends Module {

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
	
	// local override
	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, angle, anchor) {
		if (!angle) { angle = 0 }
		if (!anchor) { anchor = "left" }
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(" + angle + " " + coord[0] + " " + coord[1] + ")",
			"style": "font-size:" + size + ";text-align:" + anchor + ";alignment-baseline:" + anchor + ";text-anchor:" + anchor + ";opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}

	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}

	speedmark = function(coord, width, height) {
		drawPolygon([ coord, 
					 [coord[0], coord[1] - height/2],
					 [coord[0] + width, coord[1] - height],
					 [coord[0] + width, coord[1] - height/2],
					 coord ], "#fff", this.getDomID())
	}

	render() {	
		var data = getBiorxivData()

		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		// this.drawText([200,500], this.rndTitle(data), "80px", "#fff", 700, -5, "Helvetica", this.getDomID(), 0, "left")


		var titleSize = xmax/20
		var coord = [xmax*0.05,ymax*0.9]

		var node = getTextLayoutNode(this.rndTitle(data), 10, 4, titleSize*0.95, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "Helvetica",
			"font-size": titleSize + "px",
			"font-weight": 700,
			"transform": "rotate(" + -90 + " " + coord[0] + " " + coord[1] + ")",
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)


		for (var i=0; i<10; i++) {	
			this.speedmark([xmax*0.05+5*titleSize, ymax*(0.9 - (0.1*i*Math.random())) ], titleSize*0.62,titleSize*0.62)
		}

		var smallcapSize = Math.ceil(ymax/100)
		var numLines = ymax/smallcapSize*0.5

		for (var i=0; i<numLines; i++) {	
			this.drawText([0.5*xmax,0.9*ymax - i*(smallcapSize+2)], this.rndTitle(data).toUpperCase(), smallcapSize + "px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), 0, "left")
		}

		var arrowSize = xmax/40
		for (var i=0; i<Math.floor(Math.random()*10); i++) {
			arrow([0.5*xmax+(arrowSize*1.5*i), 0.9*ymax - (numLines+1)*(smallcapSize+2) - arrowSize*1.2], arrowSize, "#fff", 0, this.getDomID())		
		}

		var lh = titleSize*0.1
		for (var i=ymax*0.1; i<ymax*0.9; i+=lh*1.4) {
			drawLine([0,i], [titleSize*0.38,i], "#fff", lh*Math.random(), this.getDomID(), false, false)
		}

		var ox = ymax*(0.1 + Math.random()*0.8)
		drawLine([0.5*xmax,ox], [xmax,ox], "rgba(255,255,255," + (0.5 + Math.random()/2) + ")", 100*Math.random(), this.getDomID())


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Chemical5;
