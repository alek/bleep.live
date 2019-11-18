//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Virtual10 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.colors = ["#33c6f0", "#e1185a", "#ecb32a", "#2ab77e", "#490d4a"]
	}

	rndColor() {
		return this.colors[Math.floor(Math.random()*this.colors.length)]
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

	rndThread() {

		var coords = []
		for (var i=0; i<1000; i+=50) {
			coords.push([50 + 50*Math.random(), (50 - Math.random()*100), 50 + 50*Math.random(), (50 - Math.random()*100) ])
		}

		path( {
			d: "M -100 " + ymax/2 + " t " + coords.map(x => x.join(" ")).join(" t ") + "",
			style: "fill:none;stroke:" + "rgba(255,255,255," + Math.random()/2 + ")" + ";stroke-width:" + 2*Math.random()
		}, this.getDomID())
	}

	render() {	
		// var w = xmax/3
		// this.renderLetter(this.randomMatrix(5), xmax/2-w/2, ymax/2-w/2, w, "#fff")		
		$("#svg-config").hide()

		for (var dim = 2; dim < 10; dim++) {	
			for (var i=0; i<xmax; i+=(xmax/10)) {
				this.renderLetter(this.randomMatrix(dim), i, (dim-2)*(xmax/10), (xmax/10), Math.random() < 0.5 ? "#fff" : "#000")		
			}
		}

		// for (var i=0; i<200; i++) {
		// 	this.rndThread()
		// }


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual10;
