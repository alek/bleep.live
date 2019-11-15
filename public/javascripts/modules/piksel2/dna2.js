//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
// import { getBiorxivData } from '../../dataset/biorxiv.js'
import { getBiorxivData } from '../../dataset/hackadayio.js'

class DNA2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60],
			"dna_modulo": ["cc_3", 100]
		})
		this.counter = 0
		this.palette = ["#33c6f0", "#e1185a", "#ecb32a", "#2ab77e", "#490d4a"]
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

	renderChar(offset, squareSize, dimX, dimY) {
		for (var i=0; i<4; i++) {
			var x = Math.floor(Math.random()*dimX)*squareSize
			var y = Math.floor(Math.random()*dimY)*squareSize
			var width = squareSize*dimX - x
			var height = squareSize*dimY - y
			var color = "#fff"
			if (Math.random() < 0.5) {
				drawRectangle([offset[0] + x, offset[1] + y], width, squareSize, color, this.getDomID())			
			} else {
				drawRectangle([offset[0] + x, offset[1] + y], squareSize, height, color, this.getDomID())			
			}
		}
	}

	dna(offset, amplitude, color) {
		if (!offset) { offset = 0 }
		if (!amplitude) { amplitude = 60 }
		if (!color) { color = "#fff" }
		var lastPeak = null
		// for (var i=offset; i<xmax+offset; i+=10) {
		for (var i=offset; i<xmax+offset; i+=200) {			
		// for (var i=offset; i<xmax+offset; i+=(1+this.params["dna_modulo"]*2)) {					
			var height = (Math.sin(deg2rad(i+this.counter))*amplitude)
			var top = [i - offset, ymax/2-height]
			var bottom = [i - offset,ymax/2+height]
			drawLine(top, bottom, "#fff", 1, this.getDomID(), "", false, false)		
			if (lastPeak != null) {
				drawLine(lastPeak[0], top, "#fff", 5, this.getDomID())
				drawLine(lastPeak[1], bottom, "#33c6f0", 5, this.getDomID())
			}
			lastPeak = [top, bottom]
		}
		this.counter+=2
	}

	render() {	

		var data = getBiorxivData()

		// header
		drawLine([0.025*xmax, 0.1*ymax], [0.98*xmax, 0.1*ymax], "#fff", 1, this.getDomID())

		// top left text
		this.drawText([0.025*xmax, 0.1*ymax-40], subWords(this.rndTitle(data),50), 21, "#fff", 700, -1, "Helvetica", this.getDomID(), 0)
		this.drawText([0.025*xmax, 0.1*ymax-20], subWords(this.rndTitle(data),50), 21, "gray", 700, -1, "Helvetica", this.getDomID(), 0)

		// tags below the line
		for (var i=0; i<5; i++) {
			this.drawText([0.025*xmax + i*0.2*xmax, 0.1*ymax+20], subWords(this.rndTitle(data),10).toUpperCase(), 8, "#fff", 700, 2, "Roboto Mono", this.getDomID(), 0)
		}

		// hieroglyphics
		var squareCount = 5
		var squareSize = 20

		for (var i=0; i<10; i++) {
			this.renderChar([xmax*0.95-(0.012*xmax*i),ymax*0.025], 2, 5, 6)
		}

		// hype line below
		this.drawText([0.84*xmax, 0.07*ymax], "/".repeat(Math.ceil(Math.random()*50)), 10, "#fff", 700, 0, "Helvetica", this.getDomID(), 0, "right")


		// central animation
		// this.waveform()
		this.dna()
		this.dna(this.counter, 100, "#fff")
		this.dna(this.counter, 50, randomPantoneHex())

		// sidebar
		this.drawText([0.98*xmax, 0.85*ymax], subWords(this.rndTitle(data).toUpperCase(),50), 6, "#fff", 100, 3, "Roboto Mono", this.getDomID(), -90)

		// ---- footer rendering 

		// bottom left text
		for (var i=0; i<5; i++) {	
			this.drawText([0.025*xmax, (0.9 + 0.01*i)*ymax], subWords(this.rndTitle(data).toUpperCase(),50), 6, "#fff", 100, 3, "Roboto Mono", this.getDomID())
		}

		// bottom center barcode

		this.drawText([0.5*xmax-2, 0.9*ymax - 10], subWords(this.rndTitle(data).toUpperCase(),50), 9, "#fff", 700, 0, "Helvetica", this.getDomID())			
		for (var i=0; i<xmax*0.3; i+=5) {
			drawLine([0.5*xmax + i, ymax*0.9], [0.5*xmax + i, ymax*0.9+30], "#fff", Math.ceil(Math.random()*5), this.getDomID())
		}

		// bottom right arrow
		arrow([0.9*xmax, 0.9*ymax], 30, "#fff", Math.floor(Math.random()*4)*90, this.getDomID())
		arrow([0.95*xmax, 0.9*ymax], 30, "#fff", Math.floor(Math.random()*4)*90, this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default DNA2;
