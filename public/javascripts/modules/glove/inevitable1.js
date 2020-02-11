//
// Exploding Gradient Inevitable
// 

import Module from '../../lib/module.js'

class Inevitable1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"l_acc_x": ["cc_11", 50],
			"l_acc_y": ["cc_12", 50],
			"l_acc_z": ["cc_13", 50],
			"r_acc_x": ["cc_17", 50],
			"r_acc_y": ["cc_18", 50],
			"r_acc_z": ["cc_19", 50]
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
				drawSquare([i,j], sqSize, this.gradient[offset], this.getDomID())				
			}
		}
	}

	render() {	

		var width = xmax/32
		
		var sqSize = ymax*parseFloat(this.getConfigVal("scaleFactor", 0.05))
		// var sqSize = ymax*Math.max(0.05, ymax*(this.params["r"]/1024))
		//var sqSize = Math.max(ymax*parseFloat(this.getConfigVal("scaleFactor", 0.05)), this.params["r_acc_x"])
		//console.log(sqSize)

		// var sqSize = ymax*parseFloat(this.getConfigVal("scaleFactor", 0.05))

		// this.renderVoid(20)
		// this.renderPlanet([xmax/2,ymax/2], sqSize, 6)
		// this.renderPlanet([xmax*0.25,ymax*0.75], sqSize, 12)
		// this.renderPlanet([0,ymax*0.2], sqSize, 2)

		this.renderPlanet([0,ymax], sqSize, 1)

	}

	// state update as a result of a midi event
	update(event) {
		// console.log(event)
		super.update(event)
		// console.log("LEFT: " + this.params["l_acc_x"] + "\t" + this.params["l_acc_y"] + "\t" + this.params["l_acc_z"])
		// console.log("RIGHT: " + this.params["r_acc_x"] + "\t" + this.params["r_acc_y"] + "\t" + this.params["r_acc_z"])
		// this.gradient = this.getRange(this.colors[1], this.colors[1], 16).concat(this.getRange(this.colors[1], this.colors[0], 16))
		//this.gradient = this.getRange([this.params["l_acc_x"]*2,this.params["l_acc_y"]*2,this.params["l_acc_z"]*2], [this.params["r_acc_x"]*2,this.params["r_acc_y"]*2,this.params["r_acc_z"]*2], 32)
		this.gradient = this.getRange(
			[this.params["r_acc_x"]*6,this.params["r_acc_y"]*4,this.params["r_acc_z"]*4], 
			[this.params["l_acc_x"]*4,this.params["l_acc_y"]*4,this.params["l_acc_z"]*4], 
			32)
		
		// console.log(this.params["r_acc_x"])
		// console.log("(" + [this.params["r_acc_x"]*6,this.params["r_acc_y"]*4,this.params["r_acc_z"]*4].join(",") + ")" + "\t" 
		// 		+ "(" + [this.params["l_acc_x"]*4,this.params["l_acc_y"]*4,this.params["l_acc_z"]*4].join(",") + ")")

		if (event.meta == "clock") {
			this.clear()
			this.render()
		}
	}

}

export default Inevitable1;
