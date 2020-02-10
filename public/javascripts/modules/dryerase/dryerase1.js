//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class DryErase1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.spacing = 40
		this.gutter = 10
	}

	// renderGrid(columns, rows, spacing) {
	// 	for (var i=0; i<=columns; i++) {
	// 		for (var j=0; j<=rows; j++) {
	// 			var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
	// 			drawCircle(coord, 2, "#fff", this.getDomID())
	// 		}
	// 	}
	// }	

	renderGrid() {
		var delta = this.spacing + this.gutter
		for (var i=0; i<xmax; i+=delta) {
			for (var j=0; j<ymax; j+=delta) {
				drawLine([i,j], [xmax,j], "#808080", "1px", this.getDomID())
				drawLine([i,j], [i,ymax], "#808080", "1px", this.getDomID())
			}
		}		
	}

	align(coord) {
		var delta = this.spacing + this.gutter
		return [coord[0] - coord[0]%delta,
				coord[1] - coord[1]%delta + this.gutter
				]
	}

	fillGrid() {
		for (var i=0; i<10; i++) {
			drawCircle(this.align([xmax*(0.3 + Math.random()*0.4), ymax*(0.3 + Math.random()*0.4)]), this.spacing/2, "#fff", this.getDomID())
		}
	}

	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID) {
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(0 50 100)",
			"style": "font-size:" + size + ";text-align:center;alignment-baseline:middle;text-anchor:left;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content.toString(), domID); 
	}

	render() {	
		drawRectangle([0,0], xmax,ymax, "#000", this.getDomID())
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		//this.renderGrid()
		this.fillGrid()

		var textCoord = this.align([xmax*0.8, ymax*0.8])
		this.drawText(textCoord, "dry_erase_0x1", "12px", "#fff", 700, 0, "JetBrains Mono", this.getDomID())
		this.drawText([textCoord[0], textCoord[1]+15], "video: alek", "12px", "#808080", 100, 0, "JetBrains Mono", this.getDomID())
		this.drawText([textCoord[0], textCoord[1]+30], "music: bogdan", "12px", "#808080", 100, 0, "JetBrains Mono", this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default DryErase1;
