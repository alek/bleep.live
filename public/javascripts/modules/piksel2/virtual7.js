//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
// import { getBiorxivData } from '../../dataset/biorxiv.js'
import { getBiorxivData } from '../../dataset/hackadayio.js'

class Virtual7 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.colors = ["#33c6f0", "#e1185a", "#ecb32a", "#2ab77e", "#490d4a"]
		this.letters = {
			'G': [ [1,0,1,0,1],
				   [1,1,0,1,0],
				   [1,1,1,0,1],
				   [1,1,0,1,0],
				   [1,1,1,1,1]
			],
			'A': [ [0,1,1,1,0],
				   [1,0,0,0,1],
				   [0,1,1,1,0],
				   [1,0,0,0,1],
				   [0,1,1,1,0]
			],
			'T': [ [0,1,1,1,0],
				   [0,1,0,1,0],
				   [1,1,0,0,1],
				   [1,0,0,0,1],
				   [0,1,1,1,1]
			],
			'C': [ [1,1,1,1,1],
				   [0,0,0,1,1],
				   [0,0,1,0,0],
				   [1,1,0,0,0],
				   [1,1,1,1,1]
			]		
		}		
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	randomLetterGrid() {
		var keys = Object.keys(this.letters)
		return this.letters[keys[Math.floor(Math.random()*keys.length)]]
	}

	randomColor() {
		return this.colors[Math.floor(this.colors.length*Math.random())]
	}

	renderLetter(matrix, x, y, size, fill) {
		var block = size/matrix.length
		for (var i=0; i<matrix.length; i++) {
			for (var j=0; j<matrix[0].length; j++) {
				if (matrix[i][j] == 1) {
					// drawSquare([x+j*block, y+i*block], block, fill, this.getDomID(), 1)
					// drawCircle([x+j*block, y+i*block], block*0.3, fill, this.getDomID(), 1)
				} else {
					drawCircleOutline([x+j*block, y+i*block], block*0.3, "rgba(255,255,255," + Math.random() + ")", 2, this.getDomID(), 1)
				}
			}
		}
	}


	randomMatrix(dim) {
		var result = []
		for (var i=0; i<dim; i++) {
			var row = []
			for (var j=0; j<dim; j++) {
				row.push(Math.floor(2*Math.random()))
			}
			result.push(row)
		}
		return result
	}

	line() {
		var xoffset = xmax*Math.random()
		drawLine([xoffset, 0], [xoffset, ymax], "rgba(255,255,255," + Math.random() + ")", 1, this.getDomID())
	}

	glitch(text) {
		var result = ""
		for (var i=0; i<text.length; i++) {
			result += (Math.random() < 0.5) ? text.charAt(i) : "_"
		}
		return result
	}

	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}


	render() {	

		var data = getBiorxivData()

		// moveForward()
		// rotateLeft()

		$("#svg-config").remove()
		 $("body").css({"background-color": this.colors[Math.floor((new Date())/2000)%this.colors.length]})

		drawText([xmax*0.5,ymax*0.5], subWords(this.rndTitle(data), 30).toUpperCase(), "6336px", "rgba(255,255,255," + Math.random()/2 + ")", 700, -3, "Helvetica", this.getDomID())
		
		var w = xmax/4
		this.renderLetter(this.randomMatrix(8), xmax/2-w/2, ymax/2-w/2, w, "rgba(255,255,255," + Math.random() + ")")		

		drawCircleOutline([xmax/2,ymax/2], 100*Math.random(), "#fff", 1, this.getDomID())


		for (var i=0; i<12;i++) {
			drawCircleOutline(getViewport([xmax/2 + (xmax * (0.5-Math.random())),ymax/2]), xmax/12*Math.random(), "rgba(255,255,255," + Math.random() + ")", 10*Math.random(), this.getDomID())
		}

		for (var i=0; i<4; i++) {
			this.line()
		}

		for (var x=0; x<xmax; x+=5) {
			drawLine([x, 0], [x, ymax*0.025], "#fff", 5*Math.random(), this.getDomID())
			drawLine([x, ymax*0.975], [x, ymax], "#fff", 5*Math.random(), this.getDomID())
		}

		// drawText([xmax*0.75,ymax*0.5], this.glitch(this.rndTitle(data)), "36px", "#fff", 700, -3, "Helvetica", this.getDomID())
		// drawText([xmax*((new Date())%5000)/5000,ymax*0.5], this.glitch("TRAINSPOTTING"), "36px", "#fff", 700, -3, "Helvetica", this.getDomID())

		// drawText([xmax*((new Date())%3000)/3000,ymax*0.3], subWords(this.rndTitle(data), 30).toUpperCase(), "36px", "#fff", 700, -3, "Helvetica", this.getDomID())
		drawText([xmax*((new Date())%5000)/5000,ymax*0.5], subWords(this.rndTitle(data), 30).toUpperCase(), "36px", "#fff", 700, 50, "Helvetica", this.getDomID())
		// drawText([xmax*((new Date())%2000)/2000,ymax*0.7], subWords(this.rndTitle(data), 30).toUpperCase(), "36px", "#fff", 700, -3, "Helvetica", this.getDomID())


		//drawText([xmax*0.5,ymax*0.5], subWords(this.rndTitle(data), 30).toUpperCase(), "6336px", this.randomColor(), 700, -3, "Helvetica", this.getDomID())


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual7;
