//
// MMBit9: slow motion
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'
import MM from './modmanifest.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class MMBit9 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.queries = getSearchQueries()
		this.polygon = null
		this.forward = true
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	textLayout(text, maxChars, maxLines, size, weight, coord) {
		var node = getTextLayoutNode(text, maxChars, maxLines, size, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "JetBrains Mono",
			"font-size": size + "px",
			"font-weight": weight,
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)		
	}	

	randomQuery() {
		return this.queries[Math.floor(Math.random()*this.queries.length)]
	}

	// randomly shuffle the array
	shuffle(array) {
	    let counter = array.length;
	    while (counter > 0) {
	        let index = Math.floor(Math.random() * counter);
	        counter--;
	        let temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
	    }
	    return array;
	}

	// generate random convex polygon of given size 
	// https://cglab.ca/~sander/misc/ConvexGeneration/convex.html
	randomPolygon(n, width, height, center) {

		let xPool = [],
			yPool = []

		for (var i=0; i<n; i++) {
			xPool.push(Math.random()*width)
			yPool.push(Math.random()*height)
		}

		// Sort them 
		xPool.sort()
		yPool.sort()

		// Determine min/max generated values
		let minX = xPool[0],
			maxX = xPool.slice(-1)[0],
			minY = yPool[0],
			maxY = yPool.slice(-1)[0]

		// Randomly divide the interior points into two chains 
		// & extract the vector components 

		let xVec = [],
			yVec = []

		let lastTop = minX,
			lastBot = minX

		for (var i=1; i<n-1; i++) {
			let x = xPool[i]
			if (Math.random() > 0.5) {
				xVec.push(x-lastTop)
				lastTop = x
			} else {
				xVec.push(lastBot - x)
				lastBot = x
			}
		}

		xVec.push(maxX - lastTop)
		xVec.push(lastBot - maxX)

		let lastLeft = minY,
			lastRight = minY

		for (var i=1; i<n-1; i++) {
			let y = yPool[i]
			if (Math.random() > 0.5) {
				yVec.push(y - lastLeft)
				lastLeft = y
			} else {
				yVec.push(lastRight - y)
				lastRight = y
			}
		}

		yVec.push(maxY - lastLeft)
		yVec.push(lastRight - maxY)

		// Randomly pair up the X- and Y-components 
		yVec = this.shuffle(yVec)

		// Combine the paired up components into vectors 
		let vec = []
		for (var i=0; i<n; i++) {
			vec.push([xVec[i], yVec[i]])
		}

		// Sort the vectors by angle 
		vec.sort(function(a,b) {
			const v1 = Math.atan2(a[1], a[0])
			const v2 = Math.atan2(b[1], b[0])
			if (v1 > v2) {
				return 1
			} else if (v1 < v2) {
				return -1
			} else {
				return 0
			}
		})

		// Lay them end-to-end to form a polygon 
		let x = 0,
			y = 0,
			minPolygonX = 0,
			minPolygonY = 0

		let points = []
		for (var i=0; i<n; i++) {
			points.push([x, y])
			x += vec[i][0]
			y += vec[i][1]

			minPolygonX = Math.min(minPolygonX, x)
			minPolygonY = Math.min(minPolygonY, y)
		}

        // Move the polygon to the original min and max coordinates

		let xShift = minX - minPolygonX,
			yShift = minY - minPolygonY

		for (var i=0; i<n; i++) {
			points[i] = [points[i][0] + xShift, points[i][1] + yShift]
		}


		// center on the page

		var centroid = this.getCenter(points)
		for (var i=0; i<n; i++) {
			points[i] = [points[i][0] + center[0] - centroid[0], points[i][1] + center[1] - centroid[1]]
		}


		return points
	}

	renderBox = function(center, width, height) {
		var color = "rgba(255,255,255,0.1)"
		// rect({
		// 		x: center[0]-width/2,
		// 		y: center[1]-height/2,
		// 		width: width,
		// 		height: height,
		// 		stroke: color,
		// 		fill: "none",
		// 		style: "stroke-width:1;"
		// 	}, this.getDomID());	
		var numCells = 64*Math.random()
		for (var x=center[0]-width/2; x<center[0]+width/2; x+= width/numCells) {
			drawLine([x, center[1]-height/2], [x, center[1]+height/2], color, "1px", this.getDomID())
		}
		for (var y=center[1]-height/2; y<center[1]+height/2; y+= height/numCells) {
			drawLine([center[0]-width/2, y], [center[0]+width/2, y], color, "1px", this.getDomID())
		}
	}

	// draw graph by connecting random polygon edges
	drawGraph(polygon, color) {
		for (var i=0; i<polygon.length*20; i++) {
			let start = polygon[Math.floor(Math.random()*polygon.length)],
				end = polygon[Math.floor(Math.random()*polygon.length)]
			drawLine(start, end, color, Math.random()/4 + "px", this.getDomID())
		}
	}

	// https://en.wikipedia.org/wiki/Centroid#Of_a_polygon
	getCentroid(polygon) {
		let a = 0	// polygon's signed area

		for (var i=0; i<polygon.length-1; i++) {
			a += polygon[i][0]*polygon[i+1][1] - polygon[i+1][0]*polygon[i][1]
		}
		a = a/2

		console.log(a)

		let c_x = 0,	// centroid coordinates
			c_y	= 0

		for (var i=0; i<polygon.length-1; i++) {
			c_x += (polygon[i][0] + polygon[i+1][0])*(polygon[i][0]*polygon[i+1][1] - polygon[i+1][0]*polygon[i][1])
			c_y += (polygon[i][1] + polygon[i+1][1])*(polygon[i][0]*polygon[i+1][1] - polygon[i+1][0]*polygon[i][1])
		}

		return [c_x/6*a, c_y/6*a]
	}

	// hacky version
	getCenter = function (arr) {
		var minX, maxX, minY, maxY;
		for (var i = 0; i < arr.length; i++)
		{
		    minX = (arr[i][0] < minX || minX == null) ? arr[i][0] : minX;
		    maxX = (arr[i][0] > maxX || maxX == null) ? arr[i][0] : maxX;
		    minY = (arr[i][1] < minY || minY == null) ? arr[i][1] : minY;
		    maxY = (arr[i][1] > maxY || maxY == null) ? arr[i][1] : maxY;
		}
		return [(minX + maxX) / 2, (minY + maxY) / 2];
	}


	gen() {
		//drawRectangle([0,0], xmax, ymax, "rgba(255,255,255," + Math.random()/8 + ")", this.getDomID())
		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		
		var entry = this.randomQuery()
		

		//this.renderBox([xmax/2,ymax/2], xmax, ymax)

		for (var i=0; i<100; i++) {
			var polygon = this.randomPolygon(6, ymax/2,ymax/2, [xmax/2,ymax/2]) 
			var op = Math.random()/2
			drawPolygon(polygon, "rgba(255," + Math.floor(Math.random()*255) + ",255," + 0.01*Math.random() + ")", this.getDomID())
			if (Math.random() < 0.01) {
				this.drawGraph(polygon, "rgba(255,255,255," + (0.5 - op) + ")")
			}
		}

		// drawText([xmax/2, ymax*0.85], entry["term"], "14px", "gray", 100, 0, "JetBrains Mono", this.getDomID())

		if (Math.random() < 0.5) {
			drawCircleOutline([xmax/2, ymax/2], ymax*0.4, randomPantoneHex(), "10px", this.getDomID())
		}
	}

	gen2() {
		var color = randomPantoneHex()

		for (var i=0; i<Math.random()*100; i++) {
			var offset = ymax*Math.random()
			drawLine([0,offset], [xmax, offset], rgbToRgba(hexToRgb(color), Math.random()), ymax*0.05*Math.random(), this.getDomID(), null, true, null, "5 1")
		}

		drawRectangle([0,0], xmax, ymax, rgbToRgba(darkenRgb(hexToRgb(randomPantoneHex()),150), 0.8), this.getDomID())

		this.renderBox([xmax/2,ymax/2], xmax/2, xmax/2)

		// var polygon = this.randomPolygon(6, xmax/3,ymax/3, [xmax/2,ymax/2]) 
		var rgbColor = hexToRgb(color)

		var polygon = getViewport(this.randomPolygon(7, xmax*0.3,ymax*0.3, [xmax/2,ymax/2]))
		moveForward()

		// for (var i=0; i<polygon.length; i++) {
		// 	drawLine(polygon[i], [xmax/2,ymax], "rgba(255,255,255," + 0.2 + ")", "1px", this.getDomID())
		// 	drawLine(polygon[i], [xmax/2,0], "rgba(255,255,255," + Math.random()*0.2 + ")", "1px", this.getDomID())
			// drawLine(polygon[i], [0,ymax/2], "rgba(255,255,255," + Math.random()*0.2 + ")", "1px", this.getDomID())
			// drawLine(polygon[i], [xmax,ymax/2], "rgba(255,255,255," + Math.random()*0.2 + ")", "1px", this.getDomID())
			// drawLine(polygon[i], [0,ymax], "rgba(255,255,255," + Math.random()*0.2 + ")", "1px", this.getDomID())
			// drawLine(polygon[i], [xmax,ymax], "rgba(255,255,255," + Math.random()*0.2 + ")", "1px", this.getDomID())
			// drawLine(polygon[i], [xmax,0], "rgba(255,255,255," + Math.random()*0.2 + ")", "1px", this.getDomID())
			// drawLine(polygon[i], [0,0], "rgba(255,255,255," + Math.random()*0.2 + ")", "1px", this.getDomID())
		// }

		// drawRectangle([xmax/2 - 30, 50], 30, 30, rgbToRgba(lightenRgb(rgbColor,25),1.0), this.getDomID())
		// drawRectangle([xmax/2, 50], 30, 30, color, this.getDomID())
		// drawRectangle([xmax/2 + 30, 50], 30, 30, rgbToRgba(darkenRgb(rgbColor,25),1.0), this.getDomID())


		// drawPolygon(polygon, rgbToRgba(rgbColor, 0.2), this.getDomID())	

		// for (var i=0; i<polygon.length; i++) {
			// drawText(polygon[i], i.toString(), "12px", "#fff", 300, 0, "JetBrains Mono", this.getDomID())
			// drawCircle(polygon[i], 2, "#fff", this.getDomID())
		// }

		// drawPolygon(polygon.slice(0,3), "rgba(255,255,255," + 0.5 + ")", this.getDomID())	
		// drawPolygon(polygon.slice(3,6), "rgba(255,255,255," + 0.1 + ")", this.getDomID())	

		// if (Math.random() < 0.5) {
			// drawPolygon(polygon, rgbToRgba(lightenRgb(rgbColor,50),1.0), this.getDomID())	
			// drawPolygon(polygon.slice(0,3), rgbToRgba(darkenRgb(rgbColor,50),1.0), this.getDomID())	
			// drawPolygon(polygon.slice(4,7), color, this.getDomID())	
		// }

		// drawPolygon(polygon.slice(0,3), rgbToRgba(rgbColor, 0.8), this.getDomID())	
		// drawPolygon(polygon.slice(3,6), rgbToRgba(rgbColor, 0.2), this.getDomID())	

		// var centroid = this.getCenter(polygon)
		// console.log(centroid)

		// if (Math.random() < 0.5) {
		// 	drawCircleOutline([xmax/2, ymax/2], ymax*(0.4 + 0.5*Math.random()), color, ymax*0.05*Math.random() + "px", this.getDomID())
		// }

		var entry = this.randomQuery()
		//drawText([xmax/2, ymax*0.15], this.randomQuery()["term"], "14px", "gray", 100, 0, "JetBrains Mono", this.getDomID())
		// drawText([xmax/2, ymax/2], this.randomQuery()["term"], "14px", "gray", 100, 0, "JetBrains Mono", this.getDomID())

		if (Math.random() < 0.4) {
			drawText([xmax/2, ymax/2], capitalize(this.randomQuery()["term"]), ymax*0.1 + "px", "#fff", 700, -5, "Helvetica", this.getDomID())
		}

		// text( { 
		// 	x: xmax*0.78,
		// 	y: ymax/2,
		// 	"fill": color,
		// 	"transform": "rotate(90 " + xmax*0.78 + " " + ymax/2 + ")",
		// 	"style": "font-size:" + ymax*0.01 + "px" + ";text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:" + "JetBrains Mono" + ";sans-serif;font-weight:" + 100 + ";letter-spacing:" + 0 + "px;"
		// }, this.randomQuery()["term"].toUpperCase(), this.getDomID()); 

		// this.gen()		
	}

	drawPolygon = function(coords, fill, domID) {
		polygon( {
			points: coords.join(" "),
			"clip-path": "frame",
			style: "fill:" + fill +";stroke:#fff;stroke-width:0"
		}, domID)
	}

	test() {	

		var color = randomPantoneHex()
		var rgbColor = hexToRgb(color)

		// var polygon = this.randomPolygon(7, ymax*0.5,ymax*0.5, [xmax/2,ymax/2])

		// if (this.polygon == null || Math.random() < 0.3) {
			this.polygon = this.randomPolygon(7, ymax*0.5,ymax*0.5, [xmax/2,ymax/2])
		// }

		var polygon = this.polygon

		var centroid = this.getCenter(polygon)

		for (var i=0; i<polygon.length; i++) {
			polygon[i] = getViewport(polygon[i])
		}

		//rotateLeft()
		// theta -= 0.02
		// scale += 0.05

		// if (Math.random() < 0.5) {
		// 	scale = 1
		// }

		// if (timeRamp(5000, 100) > 50) {
		// 	// moveForward()
		// 	scale += 0.01
		// } else {
		// 	scale -= 0.01
		// 	// moveBackward()
		// }

		// for (var i=0; i<ymax; i+=64) {
		// 	drawText([xmax/2, i], this.randomQuery()["term"], "48px", color, 100, 0, "JetBrains Mono", this.getDomID())
		// }


		//this.drawPolygon(polygon, color, this.getDomID())

		var targetX = Math.random()*xmax
		var targetY = Math.random()*ymax

		// for (var i=0; i<polygon.length-1; i++) {
		// 	// drawLine(polygon[i], centroid, "#fff", 1, this.getDomID())
		// 	if (Math.random() < 0.5) {
		// 		this.drawPolygon([polygon[i], polygon[i+1], [targetX,0]], "rgba(255,255,255," + Math.random() + ")", this.getDomID())
		// 	} else {
		// 		this.drawPolygon([polygon[i], polygon[i+1], [0, targetY]], "rgba(255,255,255," + Math.random() + ")", this.getDomID())
		// 	}
		// 	//this.drawPolygon([polygon[i], polygon[i+1], centroid], rgbToRgba(darkenRgb(rgbColor,i*20),1.0), this.getDomID())
		// }

		for (var i=0; i<polygon.length; i++) {
			// drawLine(polygon[i], centroid, "#fff", 1, this.getDomID())
			// if (Math.random() < 0.5) {
			// 	this.drawPolygon([polygon[i], polygon[i+1], [targetX,0]], "rgba(255,255,255," + Math.random() + ")", this.getDomID())
			// } else {
			// 	this.drawPolygon([polygon[i], polygon[i+1], [0, targetY]], "rgba(255,255,255," + Math.random() + ")", this.getDomID())
			// }
			let target = (i+1)%polygon.length
			let delta1 = Math.sqrt(Math.pow(polygon[i][0] - centroid[0],2) + Math.pow(polygon[i][1] - centroid[1],2)),
				delta2 = Math.sqrt(Math.pow(polygon[target][0] - centroid[0],2) + Math.pow(polygon[target][1] - centroid[1],2))

			// let theta1 = rad2deg(Math.atan2(polygon[target][0] - polygon[i][0], polygon[target][1] - polygon[i][1])),
				// theta2 = rad2deg(Math.atan2(polygon[target][0] - polygon[i][0], polygon[target][1] - polygon[i][1]))

			let theta1 = Math.atan2(polygon[i][0] - centroid[0], polygon[i][1] - centroid[1]),
				theta2 = Math.atan2(polygon[target][0] - centroid[0], polygon[target][1] - centroid[1])

			let dot1 = [ centroid[0] + Math.cos(theta1)*50, centroid[1] + Math.sin(theta1)*50 ],
				dot2 = [ centroid[0] + Math.cos(theta2)*50, centroid[1] + Math.sin(theta2)*50 ]

			// drawCircle(dot1, 3, "#fff", this.getDomID())

			// this.drawPolygon([polygon[i], dot1, dot2, polygon[target]], rgbToRgba(darkenRgb(rgbColor,i*20),1.0), this.getDomID())



			// console.log(rad2deg(theta1))
			console.log(i + "\t" + theta1 + "\t" + rad2deg(theta1) + "\t" + 50*Math.cos(theta1) + "\t" + 50*Math.sin(theta1))
			// console.log(40*Math.cos(theta1))
			// console.log(40*Math.sin(theta1))

			// console.log(delta1 + "\t" + delta2)
				//delta2 = Math.sqrt(Math.pow(polygon[i][0] - centroid[i][0],2) + Math.pow(polygon[i][1] - centroid[i][0],1))

			// this.drawPolygon([polygon[i], polygon[target], [centroid[0] + delta1/2, centroid[1] + delta1/2],  ], rgbToRgba(darkenRgb(rgbColor,i*20),1.0), this.getDomID())
			
			this.drawPolygon([polygon[i], polygon[target],centroid  ], rgbToRgba(darkenRgb(rgbColor,i*20),0.2), this.getDomID())

			// drawCircle(dot1, 3, "#fff", this.getDomID())
			// drawCircle(dot2, 3, "#fff", this.getDomID())

			drawLine(polygon[i], dot1, "#fff", 1, this.getDomID())
			// drawLine(polygon[target], dot2, "red", 1, this.getDomID())

			drawText(polygon[i], i+"", "12px", "#fff", 100, 0, "JetBrains Mono", this.getDomID())
			drawText(dot1, i+"", "12px", "#fff", 100, 0, "JetBrains Mono", this.getDomID())

		}


		// drawCircle([xmax/2,ymax/2], ymax*0.1*Math.random(), "#000", this.getDomID())
		// drawCircle([xmax/2,ymax/2], ymax*0.1*Math.random(), color, this.getDomID())


		for (var i=0; i<ymax; i+=64) {
			//drawText([xmax/2, i], this.randomQuery()["term"], "24px", "rgba(255,255,255," + Math.random() + ")", 100, 0, "JetBrains Mono", this.getDomID())
		}

		// drawCircleOutline([xmax/2,ymax/2], ymax*(0.4 + Math.random()), "rgba(255,255,255," + Math.random() + ")", ymax*0.2*Math.random() + "px", this.getDomID())

		// if (this.polygon == null || Math.random() < 0.2) {
		// var polygon = this.randomPolygon(7, ymax*0.5,ymax*0.5, [xmax/2,ymax/2])
		// }

		// for (var i=0; i<this.polygon.length; i++) {
		// 	this.polygon[i] = getViewport(this.polygon[i])
		// }

		// if (Date.now()%10000 < 5000) {
		// 	moveForward()
		// } else {
		// 	moveBackward()
		// }

		// Piksel.addRectangleClip("frame", xmax*0.25, ymax*0.25, xmax*0.5, ymax*0.5)

		// Piksel.addPolygonClip("glitchClip-1", this.randomPolygon(7, ymax*0.6,ymax*0.6, [xmax/2,ymax/2]))

		// for (var i=0; i<ymax; i+= 16) {
		// 	line({
		// 		x1: 0,
		// 		y1: i,
		// 		x2: xmax,
		// 		y2: i,
		// 		"clip-path": "url(#glitchClip-1)",
		// 		stroke: "rgba(255,255,255,1)",
		// 		"stroke-width": 16*Math.random(),
		// 	}, this.getDomID());
		// }

		// Piksel.addPolygonClip("glitchClip-2", this.randomPolygon(7, ymax*0.6,ymax*0.6, [xmax/2,ymax/2]))

		// for (var i=0; i<ymax; i+= 32) {
		// 	line({
		// 		x1: 0,
		// 		y1: i,
		// 		x2: xmax,
		// 		y2: i,
		// 		"clip-path": "url(#glitchClip-2)",
		// 		stroke: "rgba(255,0,0,1)",
		// 		"stroke-width": 16*Math.random(),
		// 	}, this.getDomID());
		// }

		// if (Math.random() < 0.3) {
		// 	Piksel.brackets([xmax/2,ymax/2], ymax*0.5, ymax*0.5, xmax*0.04, "#fff", "1px", this.getDomID())
		// }

		// circle({
		// 	cx: xmax/2,
		// 	cy: ymax/2,
		// 	r: ymax*0.3,
		// 	stroke: "#fff",
		// 	fill: "#fff",
		// 	"clip-path": "url(#glitchClip-1)",
		// 	"transform": "rotate(0 0 0)",
		// 	style: "stroke-width:0",
		// 	// filter: "url(#f1)",
		// }, this.getDomID());	

		// this.drawPolygon(this.polygon, rgbToRgba(lightenRgb(rgbColor,50),1.0), this.getDomID())	
		// this.drawPolygon(this.polygon.slice(0,3), color, this.getDomID())	
		// this.drawPolygon(this.polygon.slice(1,4), rgbToRgba(darkenRgb(rgbColor,50),1.0), this.getDomID())	
		// this.drawPolygon(this.polygon.slice(2,5), rgbToRgba(darkenRgb(rgbColor,100),1.0), this.getDomID())	
		// this.drawPolygon(this.polygon.slice(3,5), rgbToRgba(darkenRgb(rgbColor,100),1.0), this.getDomID())	
		// this.drawPolygon(this.polygon.slice(4,7), color, this.getDomID())	

		// moveBackward()

		//drawRectangle([0,0], xmax, ymax*0.2, "#000", this.getDomID())
		//drawRectangle([0,0], xmax*0.2, ymax, "#000", this.getDomID())
		//drawRectangle([0,ymax*0.8], xmax, ymax*0.2, "#000", this.getDomID())
		//drawRectangle([xmax*0.8,0], xmax*0.2, ymax, "#000", this.getDomID())

	}

	render() {

		

		var d = ymax*0.3

		for (var angle=0; angle<360; angle+=30) {
			d += 20
			// d = ymax*Math.random()
			var poly = [
						[xmax/2,ymax/2], 
						[xmax/2 + d*Math.cos(deg2rad(angle)),ymax/2 + d*Math.sin(deg2rad(angle))], 
						[xmax/2 + d*Math.cos(deg2rad(angle+30)),ymax/2 + d*Math.sin(deg2rad(angle+30))]
						]
			for (var i=0; i<poly.length; i++) {
				poly[i] = getViewport(poly[i])
			}
			//console.log(poly)
			rotateLeft()
			var color = Math.random() < 0.5 ? rgbToRgba(lightenRgb(hexToRgb(randomPantoneHex()),150), 1.0) : rgbToRgba(darkenRgb(hexToRgb(randomPantoneHex()),150), 1.0)
			drawPolygon(poly, color, this.getDomID())
		}


		// var angle = 0
		// var d = 20
		// var poly = [
		// 			[xmax/2,ymax/2], 
		// 			[xmax/2 + d*Math.cos(deg2rad(angle)),ymax/2 + d*Math.sin(deg2rad(angle))], 
		// 			[xmax/2 + d*Math.cos(deg2rad(angle+30)),ymax/2 + d*Math.sin(deg2rad(angle+30))]
		// 			]
		// drawPolygon(poly, randomPantoneHex(), this.getDomID())

		this.gen2()

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default MMBit9;
