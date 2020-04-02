//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBookmarks } from '../../dataset/bookmarks.js'

class MemoryCube1 extends Module {

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

	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		var bookmarks = getBookmarks()
		for (var i=0; i<bookmarks.length; i++) {
			// console.log(bookmarks[i])
			drawText(getRandomCoord(xmax,ymax,xmax*0.1), bookmarks[i]["title"], "14px", "#fff", 300, 0, "Roboto", this.getDomID())
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default MemoryCube1;
