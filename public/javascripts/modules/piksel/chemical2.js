//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class Chemical2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_10", 50],
			"angle": ["cc_11", 0]
		})
		this.renderCache = {}	
		this.count = 0
		this.circleQueue = []
	}

	getCacheEntry(o1, o2) {
		if (o2 != null) {
			return o1[0] + o1[1] + "-" + o2[0] + o2[1]
		} else {
			return o1[0] + o1[1]
		}
	}

	addRenderCache(o1,o2) {
		this.renderCache[this.getCacheEntry(o1,o2)] = true
	}

	isRendered(o1, o2) {
		return this.renderCache[this.getCacheEntry(o1,o2)]
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	molecule(coord, r, depth, angleoffset) {
		var angles = [120, 240, 360]
		for (var i=0; i<angles.length; i++) {
			if (angleoffset != null) {
				angles[i] = (angles[i] + angleoffset)%360
			}
			var target = [coord[0] + r*Math.cos(angles[i]*Math.PI/180), coord[1] + r*Math.sin(angles[i]*Math.PI/180)]
			if (!this.isRendered(coord, target)) {
				// if (Math.random() < 0.618) {
					drawLine(coord, target, randomPantoneHex(), "2px", this.getDomID())
					this.count++
				// }
				this.addRenderCache(coord, target)
			} 
			if (depth > 0) {
				this.molecule(target, r, depth-1, angleoffset)
			}
		}
		if (!this.isRendered(coord)) {
			this.circleQueue.push(coord)
			// drawCircle(coord, Math.floor(r/10), "#fff", this.getDomID())
			this.addRenderCache(coord)
		}
	}

	render() {	
		// this.renderGrid(20,20)
		var start = Date.now()
		// this.molecule([xmax/2, ymax/2], 50, 4)
		this.molecule([xmax/2, ymax/2], 200*Math.random(), Math.ceil(Math.random()*5), Math.random()*360)
		for (var i=0; i<this.circleQueue.length; i++) {
			drawCircle(this.circleQueue[i], 5 + 5*Math.random(), "#fff", this.getDomID())
		}

		drawCircleOutline([xmax/2, ymax/2], Math.random()*ymax, "#fff", 80*Math.random(), this.getDomID())

		// this.molecule([xmax/2, ymax/2], 50, 3, 50)
		// this.molecule([xmax/2, ymax/2], 100*Math.random(), Math.ceil(Math.random()*5), Math.random()*360)
		// console.log("ELAPSED: " + (Date.now() - start)/1000)
		// console.log(this.count)
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.renderCache = {}
		this.circleQueue = []
		this.render()
	}

}

export default Chemical2;
