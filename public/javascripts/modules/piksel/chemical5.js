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
		this.renderCache = {}	
		this.count = 0
		this.circleCache = {}
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
					if (depth %3 == 0) {
						if (Math.random() < 0.7) {
							drawLine(coord, target, "#fff", 3 + "px", this.getDomID(), "", Math.random() < 0.3 ? true : false)
							this.count++
						}
						this.circleCache[this.getCacheEntry(coord)] = coord
						this.circleCache[this.getCacheEntry(target)] = target
					}
			} 
			if (depth > 0) {
				if (Math.random() < 0.5) {
					this.molecule(target, r, depth-1, angleoffset)
				}
			}
		}
	}

	render() {	
		var start = Date.now()

		// this.molecule([xmax/2, ymax/2], 25 + Math.random()*100, 12, Math.random()*360)
		
		// this.molecule([xmax/2, ymax/2], 50, 8, 0)
		this.molecule([xmax/2, ymax/2], 25 + Math.random()*this.getConfigVal("depth",25), 12, Math.random()*180)

		// this.molecule([xmax*0.25, ymax/2], 25 + Math.random()*25, 12, Math.random()*180)
		// this.molecule([xmax*0.75, ymax/2], 25 + Math.random()*25, 12, Math.random()*180)

		for (var key in this.circleCache) {
			drawCircle(this.circleCache[key], Math.random() < 0.5 ? 4 : 8, "#fff", this.getDomID())
		}
		
		drawCircleOutline([xmax/2, ymax/2], Math.random()*ymax, "#fff", 80*Math.random(), this.getDomID())
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
