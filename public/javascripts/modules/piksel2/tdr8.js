//
// Experiments in HTML/CSS + SVG
//

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class TDR7 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 40],
			"grid_rows": ["cc_9", 30],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60],
			"background-color": ["cc_10", "#2E2E2E"],
			"foreground-color": ["cc_11", "#E9E2E0"]
		})
	}

	grid(coord) {
		return getGridCoordinates(coord, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax)
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(getViewport(coord), 2, "#fff", this.getDomID())
			}
		}
	}	

	text = function(coord, content, size, color, spacing, angle) {
		this.drawText(this.grid(coord), 
				 content, 
				 size ? size : 30, 
				 color ? color : this.params["foreground-color"], 
				 700, 
				 spacing ? spacing : -2, 
				 "Helvetica", 
				 this.getDomID(),
				 angle ? angle : 0
				 )
	}

	path = function(coords, width, color) {
		for (var i=0; i<coords.length; i++) {
			coords[i] = this.grid(coords[i])
		}
		drawPath(coords, color ? color : this.params["background-color"], width ? width : 20, this.getDomID())

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

	randomSnippet = function(data, len) {
		return subWords(data[Math.floor(Math.random()*data.length)]["title"], len)
	}


	randGridCoord = function() {
		return [ Math.floor(Math.random()*this.params["grid_columns"]),
				 Math.floor(Math.random()*this.params["grid_columns"])	
			   ]
	}

	randomPath = function(maxWidth, color) {
		var path = []
		var lastCoord = null
		for (var i=0; i<10; i++) {
			var coord = this.randGridCoord()
			if (lastCoord == null) {
				path.push(coord)
			} else {
				if (Math.random() < 0.5) {
					path.push([lastCoord[0], coord[1]])
				} else {
					path.push([coord[0], lastCoord[1]])
				}
			}
			lastCoord = coord
		}
		this.path(path, Math.random()*maxWidth, color)
	}

	randomLines = function(inc, width, len) {
		for (var i=0; i<ymax*0.3; i+=inc) {
			if (Math.random() < 0.3) {
				width = Math.ceil(Math.random()*inc)
				len = Math.random()*xmax
			}
			drawLine(getViewport([0,ymax*0.38 + i]), getViewport([len,ymax*0.38 + i]), this.params["background-color"], width + "px", this.getDomID())
		}		
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

		this.drawText( [ coord[0] + 2*delta, coord[1] + delta], content, height/2, fg, 700, 0, "Helvetica", this.getDomID() )
	}

	render() {	
		//this.renderGrid(16,16)
		// rotateLeft()
		// moveForward()

		var gridWidth = ymax/this.params["grid_rows"]
		
		var data = getBiorxivData()
		$("body").css({"background-color": this.params["background-color"]})
		//moveForward()

		drawRectangle([0,ymax*0.38], xmax, ymax*0.62, this.params["foreground-color"], this.getDomID())
		
		// some lines

		this.randomPath(ymax/2)
		this.randomPath(ymax, "#fff")

		this.randomLines(2, 2, Math.random()*xmax)
		// this.randomLines(5, 10, Math.random()*ymax)

		// right snippets
		for (var i=0; i<3; i++) {
			this.text( [24,8+i], this.randomSnippet(data, 12), gridWidth*1.2)
		}

		// left snippets
		this.text( [6,10], this.randomSnippet(data, 12), gridWidth*1.2)

		// large type
		
		this.text( [6,18], this.randomSnippet(data, 12), gridWidth*3.5, "#000", -gridWidth/3)			
		this.text( [6,20], this.randomSnippet(data, 12), gridWidth*3.5, "#fff", -gridWidth/3)
		this.text( [6,22], this.randomSnippet(data, 12), gridWidth*3.5, this.params["background-color"], -gridWidth/3)

		if (Math.random() < 0.5) { 		
			for (var i=0; i<5; i++) {
				var xpos = Math.ceil(Math.random()*this.params["grid_columns"])
				var ypos = Math.ceil(Math.random()*this.params["grid_rows"]/4)
				drawLine(this.grid([xpos,ypos]), this.grid([xpos, 30]), "rgba(255,255,255," + Math.random() + ")", 5*Math.random(), this.getDomID()) 
			}
		}

		if (Math.random() < 0.5) {
			this.path([ [5, 15], [25, 15], [25, 24], [5,24], [5, 15] ], 50*Math.random(), "rgba(255,255,255," + Math.random() + ")")
		}

		// this.path([ [15,15], [30,15], [30, 30], [15, 15] ], 50*Math.random(), "red")
		if (Math.random() < 0.9) { this.label(this.grid([15, 14]), 200 + xmax*Math.random(), 20, this.randomSnippet(data, 12), "#fff", "#000") }

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR7;
