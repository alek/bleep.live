//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class TreeVis1 extends Module {

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

	label(coord, value, domID) {
		drawText(coord, value, "10px", "#fff", 100, 0, "Roboto Mono", domID)
	}

	render() {	

		var domID = this.getDomID()
		var mod = this

		drawRectangle([0,0], xmax, ymax, "#1E2445", domID)

		// $.get("http://localhost:5133/api/tree?prefix=hack", function( data ) {

		var filter = "?prefix=vendor"
		// var filter = ""

		$.get("http://localhost:5133/api/tree" + filter, function( data ) {			
			var tree = data.body

			var root = tree
			var rootName = "/"

			if (filter.length > 0) {
				root = tree[0].children
				rootName = tree[0].value
			}

			for (var i=0; i<root.length; i++) {
				var l1 = root[i]

				var coord = getCircleCoord(xmax/2,ymax/2, i*17, 100+i*10)
				drawLine([xmax/2,ymax/2], coord, "#574799", "1px", domID)

				if (l1.is_file) {
					console.log(l1.value + "\t" + l1.is_file)
				} else {
					console.log(l1.value)
					for (var j=0; j<l1.children.length; j++) {

						var l2 = l1.children[j]

						var c2 = getCircleCoord(coord[0],coord[1], j*27, 50+i*5) 
						drawLine(coord, c2, "#574799", "1px", domID)
						drawCircle(c2, 2, "#F25C8B", domID)
						// mod.label([c2[0],c2[1] - 10], l2.value, domID)

						console.log("\t" + l2.value + "\t" + l2.is_file)
					}
				}

				mod.label([coord[0],coord[1] - 18], l1.value, domID)				
				drawCircle(coord, 10, "#7DA4FF", domID)
			}

			drawCircle([xmax/2,ymax/2], 10, "#fff", domID)
			mod.label([xmax/2,ymax/2 - 20], rootName, domID)

		});

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TreeVis1;
