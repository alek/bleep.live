//
// Exploding Gradient Inevitable
// 

import Module from '../../lib/module.js'

class Inevitable7 extends Module {

	constructor() {
		super({	// init params mapping
			"l_acc_x": ["cc_11", 50],
			"l_acc_y": ["cc_12", 50],
			"l_acc_z": ["cc_13", 50],
			"r_acc_x": ["cc_17", 50],
			"r_acc_y": ["cc_18", 50],
			"r_acc_z": ["cc_19", 50],
			"l_gyr_x": ["cc_14", 50],
			"l_gyr_y": ["cc_15", 50],
			"l_gyr_z": ["cc_16", 50],
			"r_gyr_x": ["cc_20", 50],
			"r_gyr_y": ["cc_21", 50],
			"r_gyr_z": ["cc_22", 50],
			"l1": ["cc_1", 50],
			"l2": ["cc_2", 50],
			"l3": ["cc_3", 50],
			"l4": ["cc_4", 50],
			"l5": ["cc_5", 50],
			"r1": ["cc_6", 25],
			"r2": ["cc_7", 50],
			"r3": ["cc_8", 50],
			"r4": ["cc_9", 50],
			"r5": ["cc_10", 50]
		})
		//this.colors = ["#3f0b55", "#24868d", "#f9e856"]
		this.colors = [ [63,11,85], [68,133,140], [249,232,86] ]
		this.gradient = this.getRange(this.colors[0], this.colors[1], 16).concat(this.getRange(this.colors[1], this.colors[2], 16))
		this.offset = 0
		this.scale = 0
		this.inc = 1
	}

	getRGB(color) {
		return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")"
	}

	getRGBA(color, alpha) {
		return "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + alpha + ")"
	}

	randomColor() {
		return this.gradient[Math.floor(Math.random()*this.gradient.length)]
	}

	getRange(start, end, len, alpha) {
		if (alpha == null) {
			alpha = 0.5
		}
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

	getCirclePoints(r) {
		var result = []
		// var inc = 0.1
		// for (var theta = 0; theta < 360*32; theta+=8) {
		// 	// var point = getViewport([r*Math.cos(deg2rad(theta*coeff1)), ymax/2+r*(1+Math.sin(deg2rad(theta*coeff2)))])
		// 	var point = getViewport([xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta))])
		// 	result.push(getViewport(point))
		// 	r+=rDelta
		// }
		for (var theta = 0; theta <= 360; theta+=this.params["r2"]/25) {
			var point = getViewport([xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta))])
			result.push(getViewport(point))
		}
		return result
	}


	line(ctx, start, end, color) {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = this.params["r3"]*Math.random()
		ctx.moveTo(start[0], start[1]);
		ctx.lineTo(end[0], end[1]);	
		ctx.stroke();
	}

	render() {	

		// var width = xmax/32
		
		// var sqSize = ymax*parseFloat(this.getConfigVal("scaleFactor", 0.05))
		// var sqSize = ymax*Math.max(0.05, ymax*(this.params["r"]/1024))
		//var sqSize = Math.max(ymax*parseFloat(this.getConfigVal("scaleFactor", 0.05)), this.params["r_acc_x"])
		//console.log(sqSize)

		// var sqSize = ymax*parseFloat(this.getConfigVal("scaleFactor", 0.05))

		// this.renderVoid(20)
		// this.renderPlanet([xmax/2,ymax/2], sqSize, 6)
		// this.renderPlanet([xmax*0.25,ymax*0.75], sqSize, 12)
		// this.renderPlanet([0,ymax*0.2], sqSize, 2)

		// this.renderPlanet([0,ymax], sqSize, 1)

		// for (var i=0; i<30*Math.random(); i++) {
		// 	var offset = ymax*Math.random()
		// 	drawLine([0,offset], [xmax,offset], this.gradient[Math.floor(Math.random()*this.gradient.length)], ymax/4*Math.random(), this.getDomID())
		// }

		this.setupCanvas();
		var ctx = this.getCanvasContext();
		if (this.params["r5"] > 60) {
			ctx.clearRect(0,0,xmax,ymax);
		}

		var radius = ymax*(this.params["r1"]/255)
		var points = this.getCirclePoints(radius)

		// drawCircle(points[Math.floor(Math.random()*points.length)], 5, "#fff", this.getDomID())
		// for (var i=0; i<points.length-30; i++) {
			// for (var j=0; j<20; j+=7) {
		// for (var i=0; i<10; i++) {
		// 	// console.log(this.randomColor(0.5))
		// 		this.line(ctx, [xmax/2,ymax/2], points[Math.floor(Math.random()*points.length)], Math.random() < 0.5 ? "#fff" : "#000")
		// 	}
		// 	// }
		// // }

		// for (var it=0; it<20; it++) {
		// 	var idx = Math.floor(Math.random()*points.length)
		// 	for (var i=idx; i<Math.min(idx+10, points.length-1); i++) {
		// 		this.line(ctx, points[i], points[i+1], Math.random() < 0.9 ? "#fff" : "#000")
		// 	}
		// }

		var start = Math.floor(this.offset*points.length)
		var end = Math.min(Math.ceil((this.offset+0.15)*(points.length-1)), points.length-1)

		for (var i=start; i<end; i++)  {
			this.line(ctx, getViewport(points[i]), getViewport(points[i+1]), Math.random() < 0.5 ? "#fff" : "#000")
			// this.line(ctx, getViewport(points[i]), getViewport(points[i+1]), "#fff")
		}
		this.offset += 0.1
		if (this.offset >= 0.99) {
			this.offset = 0
		}

		// scale += 0.01
		// if (scale > 4) {
		// 	scale = 1
		// }
		// moveForward()
		scale += 0.001

	}

	// state update as a result of a midi event
	update(event) {
		// console.log(event)
		super.update(event)

		// console.log("LEFT: " + this.params["l_gyr_x"] + "\t" + this.params["l_gyr_y"] + "\t" + this.params["l_gyr_z"])
		// console.log("RIGHT: " + this.params["r_gyr_x"] + "\t" + this.params["r_gyr_y"] + "\t" + this.params["r_gyr_z"])
		// this.gradient = this.getRange(this.colors[1], this.colors[1], 16).concat(this.getRange(this.colors[1], this.colors[0], 16))
		//this.gradient = this.getRange([this.params["l_acc_x"]*2,this.params["l_acc_y"]*2,this.params["l_acc_z"]*2], [this.params["r_acc_x"]*2,this.params["r_acc_y"]*2,this.params["r_acc_z"]*2], 32)

		this.gradient = this.getRange(
			[this.params["r_gyr_x"]*6,this.params["r_gyr_y"]*4,this.params["r_gyr_z"]*4], 
			[this.params["l_gyr_x"]*4,this.params["l_gyr_y"]*4,this.params["l_gyr_z"]*4], 32).concat(
			this.getRange(
			[this.params["l_gyr_x"]*4,this.params["l_gyr_y"]*4,this.params["l_gyr_z"]*4],
			[this.params["r_gyr_x"]*6,this.params["r_gyr_y"]*4,this.params["r_gyr_z"]*4], 32)
			)

			this.params["r1"] = this.scale
			this.scale += this.inc
			if (this.scale > 120) {
				this.inc = -1
			}
			if (this.scale < 0) {
				this.inc = 1
			}

			// this.params["r1"] = ymax*Math.random()
			// console.log(this.params["r1"])
			// if (this.params["r1"] >= 255) {
			// 	this.params["r1"] = 0
			// }

		// if (Math.random() < 0.5) {
		// 	this.params["r1"] = 255*Math.random()
		// }
		// console.log(this.params["r_acc_x"])

		if (event.meta == "clock") {
			// console.log(this.params["r5"])
			if (this.params["r5"] > 60) {
				this.clear()
			}
			this.render()
		}
	}

}

export default Inevitable7;
