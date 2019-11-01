//
// Table of contents of a Borges's biology book
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class Virtual1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.grid_rows = 40
		this.grid_columns = 20
		this.font_size = 14
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}

	grid(x,y) {
		return getGridCoordinates([x,y], this.grid_columns, this.grid_rows, xmax, ymax)
	}

	// local override
	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, anchor) {
		if (anchor == null) {
			anchor = "left"
		}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(0 50 100)",
			"style": "font-size:" + size + ";text-align:left;alignment-baseline:left;text-anchor:" + anchor + ";opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}

	render() {	

		var data = getBiorxivData()		
		//this.renderGrid(this.grid_rows,this.grid_columns)

		// drawText([xmax/2,ymax/2], this.rndTitle(data), 40, "#fff", 700, 0, "Helvetica", this.getDomID())

		// render titles
		var offsets = (xmax < 1500) ? [1, 11] : [1, 7, 13]
		for (var i=2; i<this.grid_rows*0.9; i+=6) {
			for (var j=0; j<offsets.length; j++) {
				var start = this.grid(offsets[j],i)
				var end = this.grid(offsets[j]+Math.floor(18/offsets.length)-1,i)

				var chapterNum = (Math.random() < 0.2) ? Math.floor(Math.random()*10) : Math.floor(i/4)
				// top title
				drawLine(start, end, "#fff", 1, this.getDomID())
				this.drawText([start[0] - this.font_size*1.5, start[1] + this.font_size*1.1], chapterNum + "", this.font_size, "#fff", 700, 0, "Helvetica", this.getDomID())			
				this.drawText([start[0], start[1] + this.font_size*1.1], subWords(this.rndTitle(data),30), this.font_size, "#fff", 100, 0, "Helvetica", this.getDomID())
				drawLine([start[0], start[1]+this.font_size*1.5], [end[0], end[1] + this.font_size*1.5], "#fff", 1, this.getDomID())
				this.drawText([end[0] - this.font_size*1.2, end[1] + this.font_size*1.1], Math.floor(10 + Math.random()*89) + "", this.font_size, "#fff", 700, 0, "Helvetica", this.getDomID(), "right")			

				// sub-entries
				for (var z=((ymax < 1000) ? 3 : 2); z<6; z++) {
					start = this.grid(offsets[j]+2, i+z)
					end = this.grid(offsets[j]+Math.floor(18/offsets.length)-1, i+z) 
					drawLine(start, end, "#fff", 1, this.getDomID())
					this.drawText([start[0] - this.font_size*2, start[1]-this.font_size*0.25], chapterNum + "." + z, this.font_size, "#fff", 700, 0, "Helvetica", this.getDomID())			
					this.drawText([start[0], start[1] - this.font_size*0.25], subWords(this.rndTitle(data),30), this.font_size, "#fff", 100, 0, "Helvetica", this.getDomID())
					this.drawText([end[0] - this.font_size*1.2, end[1] - this.font_size*0.25], Math.floor(10 + Math.random()*89) + "", this.font_size, "#fff", 700, 0, "Helvetica", this.getDomID(), "right")			
				}
			}
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual1;
