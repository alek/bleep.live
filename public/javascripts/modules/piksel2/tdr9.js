//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class TDR9 extends Module {

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
	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, angle) {
		if (!angle) { angle = 0 }
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(" + angle + " " + coord[0] + " " + coord[1] + ")",
			"style": "font-size:" + size + ";text-align:left;alignment-baseline:middle;text-anchor:left;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}

	label = function(coord, width, height, content, bg, fg) {
		var delta = 10
		drawPolygon([ coord, 
					  [coord[0] + width,coord[1]], 
					  [coord[0] + width, coord[1] + height], 
					  [coord[0] + delta, coord[1] + height ], 
					  [coord[0], coord[1] + height - delta], 
					  coord ], 
					  bg, this.getDomID())

		this.drawText( [ coord[0] + 2*delta, coord[1] + height*0.5], content, height*0.6, fg, 700, 0, "Helvetica", this.getDomID() )
	}

	scanLine = function(maxWidth, yoffset) {
		if (!yoffset) { yoffset = ymax*0.38 }
		if (Math.random() < 0.5) {
			var xoffset = Math.random()*xmax
			drawLine(getViewport([xoffset,yoffset]), getViewport([xoffset,ymax]), "rgba(255,255,255," + Math.random() + ")", maxWidth*Math.random() + "px", this.getDomID())
		}

	}


	render() {	
		
		$("body").css({"background-color": "#2E2E2E"})
		
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		
		var data = getBiorxivData()			

		text( { 
			x: xmax*0.1,
			y: ymax/2,
			"fill": "#fff",
			"transform": "rotate(0 50 100)",
			"style": "font-size:" + xmax/10 + ";text-align:left;alignment-baseline:middle;text-anchor:left;opacity:1.0;font-family:Helvetica;sans-serif;font-weight:" + 700 + ";letter-spacing:" + -10 + "px;"
		}, data[Math.floor(Math.random()*data.length)]["title"], this.getDomID()); 

		this.label([xmax*0.2, ymax*0.6], (new Date())%xmax, ymax/35, data[Math.floor(Math.random()*data.length)]["title"], "#fff", "#2E2E2E")
		this.label([xmax*0.4, ymax*0.65], xmax, ymax/35, data[Math.floor(Math.random()*data.length)]["title"], "#fff", "#2E2E2E")
		this.label([xmax*0.6, ymax*0.7], (new Date())%(xmax*0.73), ymax/35, data[Math.floor(Math.random()*data.length)]["title"], "#fff", "#2E2E2E")

		for (var i=0; i<10; i++) {
			this.scanLine(1)
		}

		this.scanLine(50, ymax*Math.random())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR9;
