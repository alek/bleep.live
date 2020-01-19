//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class AssetGen1 extends Module {

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

	pattern1() {
		for (var i=0; i<4; i++) {
			for (var j=0; j<8; j++) {
				drawCircle([50 + i*20, 50 + j*20], 3 + Math.random()*3, "#fff", this.getDomID())
			}
		}		
	}

	treeNode(coord, numChildren, delta) {
		drawCircle(coord, 5, "#fff", this.getDomID())
		for (var i=0; i<numChildren; i++) {
			drawCircle(coord, 5, "#fff", this.getDomID())
			for (var j=0; j<numChildren; j++) {
				if (Math.random() < 0.5 || j==0) {
					drawLine(coord, [coord[0]+delta, coord[1]+j*delta], "#fff", "1px", this.getDomID())
					drawCircle([coord[0]+delta, coord[1]+j*delta], 5, "#fff", this.getDomID())
				}
			}
		}
	}

	branchPattern() {
		var delta = 25
		this.treeNode([xmax/2, ymax/2], 4, 25)
		this.treeNode([xmax/2+delta, ymax/2], 4, 25)
		this.treeNode([xmax/2+2*delta, ymax/2], 4, 25)
	}

	pseudoCode(coord) {
		for (var i=0; i<10; i++) {
			drawText([coord[0] - 10, coord[1]+i*20+5], i + "", "10px", "#fff", 100, 0, "JetBrains Mono", this.getDomID())
			drawRectangle([coord[0], coord[1]+i*20], 20+80*Math.random(), 10, "#fff", this.getDomID())
		}
	}

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		this.pattern1()
		// this.branchPattern()
		// this.pseudoCode([xmax/2,ymax/2])
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default AssetGen1;
