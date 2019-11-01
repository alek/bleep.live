//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Virtual6 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.letters = {
			'*': [ [1,0,1,0,1],
				   [0,1,0,1,0],
				   [1,1,1,0,1],
				   [0,1,0,1,0],
				   [1,0,1,0,1]
			],
			'8': [ [0,1,1,1,0],
				   [1,0,0,0,1],
				   [0,1,1,1,0],
				   [1,0,0,0,1],
				   [0,1,1,1,0]
			],
			'A': [ [0,1,1,1,0],
				   [0,1,0,1,0],
				   [1,1,0,0,1],
				   [1,0,0,0,1],
				   [0,1,1,1,1]
			],
			'Z': [ [1,1,1,1,1],
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

	randomLetterGrid() {
		var keys = Object.keys(this.letters)
		return this.letters[keys[Math.floor(Math.random()*keys.length)]]
	}

	renderLetter(matrix, x, y, size, fill) {
		var block = size/matrix.length
		for (var i=0; i<matrix.length; i++) {
			for (var j=0; j<matrix[0].length; j++) {
				if (matrix[i][j] == 1) {
					drawSquare([x+j*block, y+i*block], block, fill, this.getDomID(), 1)
				}
			}
		}
	}

	render() {	
		var w = xmax/3
		this.renderLetter(this.randomMatrix(5), xmax/2-w/2, ymax/2-w/2, w, "#fff")		
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual6;
