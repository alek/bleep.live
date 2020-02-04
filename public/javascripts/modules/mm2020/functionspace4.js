//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class FunctionSpace4 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.queries = getSearchQueries()
		scale = 0.2
		this.thetaInc = 0.1
	}

	randomQuery() {
		return this.queries[Math.floor(Math.random()*this.queries.length)]
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	// Box-Muller Gaussian
	random() {
	    var u = 0, v = 0;
	    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	    while(v === 0) v = Math.random();
	    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
	}

	test() {
		this.setupCanvas();
		var ctx = this.getCanvasContext();
		ctx.clearRect(0,0,xmax,ymax);
		//ctx.globalAlpha = 0.8
		
		ctx.strokeStyle = '#fff'
		// var colors = ["#040404", "#060503", "#03045A", "#270271", "#760862", "#D06C1F", "#F2920A", "#FFE614", "#FFF7B1"]
		var colors = ["#040404", "#060503", "#03045A", "#270271", "#760862", "#D06C1F", "#F2920A", "#FFE614"]

		// seed signal
		var seed = []
		var pixelSize = 4

		// var idx = Math.floor(Math.random()*colors.length)
		// var idx = 0
		var idx = 5
		for (var j=0; j<xmax/pixelSize; j++) {
			seed.push(idx)
			idx += Math.floor(this.random())
			idx = Math.abs(idx)%colors.length
		}

		// console.log(seed)

		for (var i=0; i<ymax; i+=pixelSize) {
			// var idx = 0
			// var idx = Math.floor(colors.length/2)
			// var idx = Math.floor(Math.random()*colors.length)
			// var idx = i%colors.length
			for (var j=0; j<xmax; j+= pixelSize) {
				ctx.beginPath();

				let idx = Math.floor(seed[j/pixelSize] + Math.random()*2)
				if (Math.random() < 0.01) {
					seed[j/pixelSize] = idx
				}

				ctx.fillStyle = colors[Math.abs(idx)%colors.length];
				// ctx.fillStyle = colors[seed[j/4]];
				// ctx.fillStyle = colors[idx];
				// idx += Math.floor(this.random())
				// if (idx < 0) {
				// 	idx = 0
				// }
				// idx = idx%colors.length
				// idx = Math.abs(idx)%colors.length
				ctx.rect(j, i, pixelSize-1, pixelSize-1);
				// ctx.arc(j, i, 1, 0, 2 * Math.PI);
				ctx.fill();				
			}
		}

	}

	rect(ctx, x, y, width, height, color) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(x, y, width, height);
		ctx.fill();		
	}

	circle(ctx, x, y, r, color) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fill();		
	}

	randomColor() {
		// var colors = ["#03045A", "#270271", "#760862", "#D06C1F", "#F2920A", "#FFE614"]
		// return colors[Math.floor(Math.random()*colors.length)]
		return "rgba(255,255,255," + Math.random() + ")"
	}

	spiral(ctx, r, pointSize) {
		var inc = 0.1
		for (var theta = 0; theta < 360*16; theta+=5) {
			var point = getViewport([xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta))])
			// drawCircle(point, 2, "#fff", this.getDomID())
			// this.rect(ctx, xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta)), 5, 5, "#fff")
			this.circle(ctx, point[0], point[1], pointSize, "#fff")
			// r+=Math.random()
			r+=1
		}
	}

	render() {	

		this.setupCanvas();
		var ctx = this.getCanvasContext();
		ctx.clearRect(0,0,xmax,ymax);

		//this.rect(ctx, xmax*Math.random(), ymax*Math.random(), 50, 50, "red")

		// // this.test()
		// var colors = ["#03045A", "#270271", "#760862", "#D06C1F", "#F2920A", "#FFE614"]
		// var sqSize = 25
		// var modulo = Math.ceil(128*Math.random())

		// for (var i=1; i<xmax; i+=sqSize) {
		// 	for (var j=1; j<ymax; j+= sqSize) {
		// 		let delta = xmax/colors.length,
		// 			offset = Math.floor(i/delta)
		// 		let cxy = ((i*(xmax/sqSize+j))%modulo)*(255/modulo)
		// 		let color = "rgba(0,0," + cxy + ",1.0)"
		// 		// this.rect(ctx, i, j, xmax/colors.length, ymax/colors.length, colors[i/colors.lenght])
		// 		// this.rect(ctx, i, j, xmax/colors.length, ymax/colors.length, colors[i/colors.lenght])
		// 		// console.log(i + "\t" + Math.floor(i/colors.length))
		// 		// this.rect(ctx, i, j, xmax/colors.length, ymax/colors.length, colors[(i+j)%colors.length])
		// 		var coord = getViewport([i,j])
		// 		this.rect(ctx, coord[0], coord[1], xmax/colors.length, ymax/colors.length, color)
		// 	}
		// }

		// var r = Math.random()*100
		// var r = ymax*0.2
		// var inc = 0.1
		// for (var theta = 0; theta < 720; theta+=5) {
		// 	var point = getViewport([xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta))])
		// 	// drawCircle(point, 2, "#fff", this.getDomID())
		// 	// this.rect(ctx, xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta)), 5, 5, "#fff")
		// 	this.circle(ctx, point[0], point[1], 5, "#fff")
		// 	r+=Math.random()*2
		// }
		//theta += 0.05
		rotateLeft()
		// moveBackward()
		// if (Math.random() < 0.1) {
		// 	scale = 1
		// }

		scale += 0.01

		if (scale > 2) {
			scale = 0.2
		}
		
		// theta += this.thetaInc
		// this.thetaInc += 0.01
		// if (Math.random() < 0.02) {
		// 	scale = 0.2
		// }

		// console.log(scale)

		// scale = Math.random()
		// scale += inc
		// inc += 0.5

		this.spiral(ctx, ymax*0.5, 8)
		this.spiral(ctx, ymax*0.4, 6)
		this.spiral(ctx, ymax*0.3, 4)
		this.spiral(ctx, ymax*0.2, 2)
		this.spiral(ctx, ymax*0.1, 1)

		drawRectangle([0,0],xmax, ymax*0.2, "#000", this.getDomID())
		drawRectangle([0,ymax*0.8],xmax, ymax*0.2, "#000", this.getDomID())


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default FunctionSpace4;
