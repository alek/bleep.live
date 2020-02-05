//
// mesmerizing thing
// 

import Module from '../../lib/module.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class FunctionSpace13 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.queries = getSearchQueries()
		scale = 0.9
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

	square(ctx, x, y, r, color) {
		this.rect(ctx, x, y, r, r, color)
	}

	circle(ctx, x, y, r, color) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fill();		
	}

	line(ctx, start, end, color) {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(start[0], start[1]);
		ctx.lineTo(end[0], end[1]);	
		ctx.stroke();
	}

	randomColor() {
		// var colors = ["#03045A", "#270271", "#760862", "#D06C1F", "#F2920A", "#FFE614"]
		// return colors[Math.floor(Math.random()*colors.length)]
		return "rgba(255,255,255," + Math.random() + ")"
	}

	spiral(ctx, r, pointSize) {
		var inc = 0.1
		for (var theta = 0; theta < 360*32; theta+=5) {
			var point = getViewport([xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta))])
			// drawCircle(point, 2, "#fff", this.getDomID())
			// this.rect(ctx, xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta)), 5, 5, "#fff")
			this.circle(ctx, point[0], point[1], pointSize, "#fff")
			// r+=Math.random()
			r+=1
		}
	}

	getSpiralPoints(r, pointSize, rDelta, tDelta, coeff1, coeff2) {
		var result = []
		var inc = 0.1
		for (var theta = 0; theta < 360*32; theta+=8) {
			var point = getViewport([xmax*0.5+r*(1-Math.cos(deg2rad(theta*coeff1))), ymax/2+r*(1+Math.sin(deg2rad(theta*coeff2)))])
			// var point = getViewport([xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta))])
			result.push(getViewport(point))
			r+=rDelta
		}
		return result
	}


	getSpiralPoints2(r, pointSize, rDelta, tDelta, coeff1, coeff2) {
		var result = []
		var inc = 0.1
		for (var theta = 0; theta < 360*32; theta+=8) {
			// var point = getViewport([r*Math.cos(deg2rad(theta*coeff1)), ymax/2+r*(1+Math.sin(deg2rad(theta*coeff2)))])
			var point = getViewport([xmax/2+r*Math.cos(deg2rad(theta)), ymax/2+r*Math.sin(deg2rad(theta))])
			result.push(getViewport(point))
			r+=rDelta
		}
		return result
	}


	render() {	

		this.setupCanvas();
		var ctx = this.getCanvasContext();
		ctx.clearRect(0,0,xmax,ymax);
		// var image = ctx.createImageData(xmax, ymax);
		var image = ctx.getImageData(0,0,xmax,ymax)
		// if (img == null) {
		// 	console.log("NULL")
		// }

		// console.log(img)
		// var points = this.getSpiralPoints(0, 3, 0.7, 15, 0.3, 0.5)

		// for (var i=0; i<points.length-30; i++) {
		// 	for (var j=0; j<20; j+=7) {
		// 		this.line(ctx, points[i], points[i+j], "rgba(255,255,255," + 0.5 + ")")
		// 	}
		// }

		// var points = this.getSpiralPoints2(100, 2, 5, 1, 0.3, 0.5)

		// for (var i=0; i<points.length-30; i++) {
		// 	for (var j=0; j<20; j+=7) {
		// 		this.line(ctx, points[i], points[i+j], "rgba(255,255,255," + 0.1 + ")")
		// 	}
		// }

		// for (var i=0; i<200; i++) {
		// 	var coord = getViewport([xmax/2+100*Math.random(), ymax/2])
		// 	this.rect(ctx, coord[0], coord[1], 1, 1, "rgba(255,255,255," + Math.random() + ")")
		// }

		// if (Math.random() < 0.3) { 	
		// 	this.circle(ctx, xmax*Math.random(), ymax/2*Math.random(), 20*Math.random(), "#fff")
			// drawText([xmax*0.5, ymax*0.5], this.randomQuery()["term"], ymax*0.05 + "px", "#fff", 700, 0, "JetBrains Mono", this.getDomID())
		// }

		// scale += 0.3
		// theta += 0.03

		// this.circle(ctx, xmax/2,ymax/2, 50, "red")


		var inc = 10
		// var scale = 10+10*Math.random()
		var scale = 20
		var f1 = Math.floor(10*Math.random())
		var f2 = Math.floor(10*Math.random())

		for (var i=0; i<xmax; i+=inc) {
			for (var j=0; j<ymax; j+=inc) {
				// console.log(i + "\t" + j + "\t" + inc)
				// var x = ((i-xmax/2)/xmax)*scale
				// var y = ((j-ymax/2)/ymax)*scale

				var x = ((i-xmax*0.5)/xmax)*scale
				var y = ((j-ymax*0.5)/ymax)*scale

				// var left = Math.sin(Math.sin(x+y) + Math.cos(y+x))
				// var right = Math.cos(Math.sin(x*y) + Math.cos(Math.pow(x,2)))

				var left = x + Math.sin(y)
				// var right = Math.cos(Math.sin(x*y) + Math.cos(Math.pow(x,2)))
				var right = Math.pow(x,f1) + Math.pow(Math.sin(y),f2) 

				// var left = scale*(Math.cos(x) + Math.sin(y*x))
				// var right = Math.sin(x) + Math.cos(y+x)

				var delta = Math.abs(left-right)

				if (Math.abs(left-right) < 0.1) {
					// this.circle(ctx, i, j, inc/2, "#fff")
					setPixel(image, i, j, 255, 255, 255, 255)					
					setPixel(image, i+400, j, 255, 255, 255, 255)					
					// setPixel(image, i+xmax*0.2, j, 255, 255, 255, 255)					
					// setPixel(image, i-xmax*0.2, j, 255, 255, 255, 255)					
					inc = 1
				} else {
					inc = 3
				}
			}
		}

		ctx.putImageData(image, 0, 0);



	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		//this.clear()
		this.render()
	}

}

export default FunctionSpace13;
