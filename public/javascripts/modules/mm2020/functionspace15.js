//
// mesmerizing thing
// 

import Module from '../../lib/module.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class FunctionSpace15 extends Module {

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
		var image = ctx.getImageData(0,0,xmax,ymax)

		for (var t=0; t<360; t+=0.1) {
			let x = xmax/2 + 100*(Math.sin(t)*(Math.exp(Math.cos(t)) - 2*Math.cos(4*t) + Math.pow(Math.sin(t/12), 5))),
				y = ymax/2 + 100*(Math.cos(t)*(Math.exp(Math.cos(t)) - 2*Math.cos(4*t) + Math.pow(Math.sin(t/12), 5)))

			let coord = getViewport([x,y])
			// this.circle(ctx, coord[0], coord[1], 1, "#fff")
			this.circle(ctx, coord[0], coord[1], 1, "rgba(255,255,255," + Math.random() + ")")
			// setPixel(image, Math.floor(coord[0]), Math.floor(coord[1]), 255, 255, 255, 255)					
		}

		scale+=0.004
		theta -= 0.02
		// ctx.putImageData(image, 0, 0);

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		//this.clear()
		this.render()
	}

}

export default FunctionSpace15;
