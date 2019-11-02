//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Drop4 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.letters = {
			'G': [ [0,1,1,1],
				   [1,0,0,1],
				   [1,0,0,1],
				   [1,1,1,0]
			],
			'A': [ [1,1,1,1],
				   [1,1,1,1],
				   [1,1,1,1],
				   [1,1,1,1]
			],
			'T': [ [1,1,1,1],
				   [0,0,1,0],
				   [0,1,0,0],
				   [0,1,0,0]
			],
			'C': [ [0,1,1,1],
				   [1,0,0,0],
				   [1,0,0,0],
				   [1,1,1,1]
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

	// symmetric block render
	renderLetter(matrix, x, y, size, fill) {
		drawRectangleOutline([x,y], size, size, "#fff", this.getDomID(), 1)
		var block = size/(matrix.length-1)
		for (var i=0; i<matrix.length; i++) {
			for (var j=0; j<matrix[0].length; j++) {
				if (matrix[i][j] == 1) {
					drawCircle([x+j*block, y+i*block], block*0.3, fill, this.getDomID(), 1)
					drawCircle([x+i*block, y+j*block], block*0.3, fill, this.getDomID(), 1)
					drawLine([x+j*block, y+i*block], [x+i*block, y+j*block], fill, block*0.15, this.getDomID())
				}
			}
		}
	}

	logo(xoffset, yoffset, size, color) {
		drawCircle([xoffset,yoffset], size*1.2, "#fff", this.getDomID())
		this.renderLetter(this.randomMatrix(3), xoffset-size/2, yoffset-size/2, size, "#000")
	}

	render() {	
		$("#svg-config").hide()
		var size = xmax*0.9/14
		for (var i=xmax*0.05; i<xmax*0.95; i+=size*1.5) {
			for (var j=ymax*0.1; j<ymax*0.95; j+=size*1.5)
			this.logo(i, j, size/2)
		}
		//this.logo(xmax/2, ymax/2, 100)
		// this.renderLetter(this.letters['A'], xmax/2-size/4, ymax/2-size/4, size, "#fff")
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Drop4;
