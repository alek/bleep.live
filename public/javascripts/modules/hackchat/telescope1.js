//
// DIY Radio Telescopes HackChat
// 

import Module from '../../lib/module.js'

class Telescope1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		//this.colors = ["#3f0b55", "#24868d", "#f9e856"]
		this.colors = [ [63,11,85], [68,133,140], [249,232,86] ]
		this.gradient = this.getRange(this.colors[0], this.colors[1], 16).concat(this.getRange(this.colors[1], this.colors[2], 16))
	}

	getRGB(color) {
		return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")"
	}

	getRange(start, end, len) {
		var result = []
		var alpha = 0.0
		for (var i=0; i<len; i++) {
			var c = []
			alpha += 1.0/len
			c[0] = Math.floor(end[0]*alpha + (1-alpha)*start[0])
			c[1] = Math.floor(end[1]*alpha + (1-alpha)*start[1])
			c[2] = Math.floor(end[2]*alpha + (1-alpha)*start[2])
			result.push(this.getRGB(c))
		}
		return result 
	}

	rnd(entries) {
		return entries[Math.floor(Math.random()*entries.length)]
	}

	renderVoid(sqSize) {
		for (var i=0; i<xmax; i+=sqSize) {
			for (var j=0; j<ymax; j+= sqSize) {
				drawSquare([i,j], sqSize, this.rnd(this.gradient.slice(0,1)), this.getDomID())
			}
		}
	}

	renderPlanet(center, sqSize, factor) {
		for (var i=0; i<xmax; i+=sqSize) {
			for (var j=0; j<ymax; j+= sqSize) {
				var d = Math.sqrt(Math.pow(center[0]-i, 2) + Math.pow(center[1]-j,2))
				var offset = Math.max(Math.floor(this.gradient.length - d/(sqSize/factor) + Math.random()), 0)
				if (offset > 2) {
					drawSquare([i,j], sqSize, this.gradient[offset], this.getDomID())
				}
			}
		}
	}

	render() {	

		var width = xmax/32
		var sqSize = 40
		this.renderVoid(20)
		// this.renderPlanet([xmax/2,ymax/2], sqSize, 6)
		// this.renderPlanet([xmax*0.25,ymax*0.75], sqSize, 12)
		// this.renderPlanet([0,ymax*0.2], sqSize, 2)

		this.renderPlanet([0,ymax], sqSize, 1)

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Telescope1;
