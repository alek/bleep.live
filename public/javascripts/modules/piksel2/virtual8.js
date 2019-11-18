//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class Virtual8 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.fontSize = Math.sqrt(ymax)*0.85
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

	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID) {
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(0 50 100)",
			"style": "font-size:" + size + "px;text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}


	node(coord, text) {
		var fontSize = this.fontSize
		var width = text.length*fontSize
		drawRectangleOutline([coord[0] - width/2, coord[1] - fontSize], width, fontSize*2, "#fff", this.getDomID(), 1)
		drawText(coord, text.toUpperCase(), fontSize, "#fff", 100, 0, "Roboto Mono", this.getDomID())
	}

	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		$("#svg-config").hide()

		if (Math.random() < 0.2) {
			var yoffset = ymax*Math.random()
			drawLine([0,yoffset], [xmax,yoffset], "rgba(255,255,255," + Math.random() + ")", 100*Math.random() + "px", this.getDomID(), "", true, false)	
		}

		// render the net
		var data = getBiorxivData()
		for (var i=0.2; i<1; i+=0.2) {
			for (var j=0.2; j<1; j+= 0.2) {
				if (i > 0.2) {
					drawLine([xmax*0.2*(Math.ceil(Math.random()*4)),ymax*(i-0.2)+this.fontSize], [xmax*j,ymax*i-this.fontSize], "rgba(255,255,255," + Math.random() + ")", 2*Math.random()+"px", this.getDomID(), "", false, false)
				}
				this.node([xmax*j,ymax*i], this.rndTitle(data).split(" ")[0])
			}
		}

		// render lines
		for (var i=0; i<ymax; i+=5) {
			drawLine([0,i], [20,i], "#fff", 10*Math.random() + "px", this.getDomID())
			drawLine([xmax-20,i], [xmax,i], "#fff", 10*Math.random() + "px", this.getDomID())
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual8;
