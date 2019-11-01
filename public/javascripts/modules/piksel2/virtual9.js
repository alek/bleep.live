//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class Virtual9 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.colors = ["#33c6f0", "#e1185a", "#ecb32a", "#2ab77e", "#490d4a"]
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, angle, anchor, opacity) {
		if (anchor == null) {
			anchor =  "middle"
		} 
		if (opacity == null) {
			opacity = 1.0
		}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(" + angle + " " + coord.join(" ") + ")",

			"style": "font-size:" + size + ";text-align:center;alignment-baseline:middle;text-anchor:" + anchor + ";opacity:" + opacity + ";font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}

	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}

	rndColor() {
		return this.colors[Math.floor(Math.random()*this.colors.length)]
	}

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		$("#svg-config").hide()
		var data = getBiorxivData()

		for (var x=((new Date())%(xmax*0.8)); x<xmax; x+=100) {	
			if (Math.random() > 0.5) {	
				drawPath([[x,0], [x+50, ymax/2], [x, ymax]], "rgba(255,255,255,0.8)", 200*Math.random(), this.getDomID())
			}
		}

		for (var i=0; i<10; i++) {	
			this.drawText([xmax*Math.random(),ymax/2], Math.random().toString(36).substr(2,1), ymax*Math.random(), this.rndColor(), 700, 0, "Helvetica", this.getDomID(), (new Date())%360, null, Math.random())
		}

		drawRectangle([0,ymax/2-30], xmax, 60, this.rndColor(), this.getDomID())
		this.drawText([xmax/2,ymax/2], this.rndTitle(data).toUpperCase(), 20, "#fff", 100, 5, "Roboto Mono", this.getDomID(), 0, "middle")

		// lines
		for (var i=0; i<xmax; i+=10) {
			drawLine([i,0], [i,ymax*0.025], this.rndColor(), 15*Math.random(), this.getDomID())
			drawLine([i,ymax*0.975], [i,ymax], this.rndColor(), 15*Math.random(), this.getDomID())
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual9;
