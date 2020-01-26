//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class DryErase2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.spacing = 40
		this.gutter = 10
		this.words = ["sketch", "made in", "b39", "your experience", "swing", "set 3", "1/8",  "Chromatic", "Triplet", "Forward", "Reverse",
					  "mars plastic", "micro carbon", "fineliner", "black", "waterproof",  "pignemt", "pigment ink", "auto scan", "electron",
					  "transaction", "translator", "lock", "delivery", "your sound", "dry erase"]
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
		var maxHeight = this.config["maxHeight"] == null ? ymax : this.config["maxHeight"]

		var delta = this.spacing + this.gutter
		for (var i=0; i<xmax; i+=delta) {
			
			for (var j=0; j<ymax; j+=delta) {
				if (Math.random() < 0.5) {
					drawLine([i,j], [i+this.spacing,j], "rgba(255,0,0,0.5)", "1px", this.getDomID())
				}
				if (Math.random() < 0.1) {
					drawLine([i,j-this.spacing/4], [i,j+this.spacing/4], "rgba(255,0,0,0.5)", maxHeight*Math.random() + "px", this.getDomID())
				}
			}
		}		
	}

	randomWord() {
		return this.words[Math.floor(Math.random()*this.words.length)]
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

	drawLabel() {
		var textCoord = this.align([xmax*0.8, ymax*0.8])
		this.drawText(textCoord, "dry_erase_0x1", "12px", "#fff", 700, 0, "JetBrains Mono", this.getDomID())
		this.drawText([textCoord[0], textCoord[1]+15], "video: alek", "12px", "#808080", 100, 0, "JetBrains Mono", this.getDomID())
		this.drawText([textCoord[0], textCoord[1]+30], "music: bogdan", "12px", "#808080", 100, 0, "JetBrains Mono", this.getDomID())
	}

	render() {	
		
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		this.renderGrid()
		if (Math.random() < 0.5) {
			var textCoord = [xmax/2,ymax/2]
			var color = Math.random() < 0.25 ? "#fff" : "rgba(255,0,0," + Math.random() + ")"
			drawText(textCoord, this.randomWord(), "120px", color, 700, 0, "JetBrains Mono", this.getDomID())
		}

		this.fillGrid()

		// var textCoord = this.align([xmax*0.5, ymax*0.8])
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default DryErase2;
