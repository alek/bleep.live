//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Drop3 extends Module {

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
			'A': [ [0,0,0,1],
				   [0,0,0,0],
				   [0,0,0,0],
				   [0,0,0,0]
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
		var block = size/matrix.length
		for (var i=0; i<matrix.length; i++) {
			for (var j=0; j<matrix[0].length; j++) {
				if (matrix[i][j] == 1) {
					
					drawCircle([x+j*block, y+i*block], block*0.3, fill, this.getDomID(), 1)
					drawLine([x+j*block, y+i*block], [x+i*block, y+j*block], "#fff", block*0.15, this.getDomID())
					drawCircle([x+i*block, y+j*block], block*0.3, fill, this.getDomID(), 1)
				}
			}
		}
	}

	render() {	
		var size = 100
		for (var i=0; i<xmax; i+=size) {
			for (var j=0; j<ymax; j+=size) {
				this.renderLetter(this.randomMatrix(3), i, j, size, "#fff")
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

export default Drop3;
