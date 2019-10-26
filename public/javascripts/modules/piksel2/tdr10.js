//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class TDR10 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 30],
			"grid_rows": ["cc_9", 17],
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

	grid(coord) {
		return getGridCoordinates(coord, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax)
	}

	text = function(coord, content, size, color, spacing, angle, type, weight) {
		this.drawText(getViewport(this.grid(coord)), 
				 content, 
				 size ? size : 30, 
				 color ? color : this.params["foreground-color"], 
				 weight ? weight : 700, 
				 spacing ? spacing : -2, 
				 type ? type : "Helvetica", 
				 this.getDomID(),
				 angle ? angle : 0
				 )
	}


	// local override
	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, angle) {
		if (!angle) { angle = 0 }
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(" + angle + " " + coord[0] + " " + coord[1] + ")",
			"style": "font-size:" + size + ";text-align:left;alignment-baseline:left;text-anchor:left;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}

	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}


	render() {	

		if (Math.random() < 0.5) { moveForward() } else { moveBackward() }
			rotateLeft()

		var data = getBiorxivData()

		$("body").css({"background-color": "#2E2E2E"})

		for (var i=0; i<5; i++) {
			if (Math.random() < 0.5) { drawCircleOutline([xmax/2, ymax/2], xmax*Math.random(), "rgba(255,255,255," + Math.random()/3 + ")", 5*Math.random(), this.getDomID()) }
		}


		for (var i=0; i<this.params["grid_rows"]; i++) {
			this.text([i,i], this.rndTitle(data).toUpperCase(), 120*Math.random(), "#fff", 4, 0, "Roboto Mono", 100)
			this.text([i,i], this.rndTitle(data).toUpperCase(), 12, "#fff", 4, -90, "Roboto Mono", 100)			
		}

		var yoffset = ymax*Math.random()
		
		drawLine([0, yoffset], [xmax, yoffset], "#fff", 1, this.getDomID(), "", true)
		drawLine([0, yoffset], [xmax, yoffset], "rgba(255,255,255," + Math.random() + ")", 1, this.getDomID(), "", true)
		drawLine([0, yoffset], [xmax, yoffset], "#fff", 5*Math.random(), this.getDomID(), "", true)
		drawLine([0, yoffset], [xmax, yoffset], "#fff", 20*Math.random(), this.getDomID(), "", true)
		drawLine([0, yoffset], [xmax, yoffset], "rgba(255,255,255," + Math.random() + ")", 400*Math.random(), this.getDomID(), "", true)

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR10;
