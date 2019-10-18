//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Chemical5 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	layout(content) {
		// var coord = getGridCoordinates(getRandomCoord(20,20,2), 20, 20, xmax, ymax)
		var coord = [100,100]
		var node = getTextLayoutNode(content, xmax/20, 200, 8, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "PT Mono",
			"font-size": 6*Math.random() + "px",
			"font-weight": 100,
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)


		coord = [400,100]
		node = getTextLayoutNode(content, 10, 400, 8, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "Helvetica",
			"font-size": 12*Math.random() + "px",
			"font-weight": 100,
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)


		coord = [800,100]
		node = getTextLayoutNode(content, 30, 20*Math.random(), 8, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "PT Mono",
			"font-size": 6 + "px",
			"font-weight": 100,
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)

	}

	render() {	
		// this.renderGrid(10,10)
		this.layout(document.getElementsByTagName('html')[0].innerHTML)
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.renderCache = {}
		this.circleCache = {}
		this.render()
	}

}

export default Chemical5;
