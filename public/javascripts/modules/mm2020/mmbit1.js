//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class MMBit1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.queries = getSearchQueries()
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

		// finally - center around a given point
		for (var i=0; i<n; i++) {
			points[i] = [points[i][0] + center[0] - width, points[i][1] + center[1] - height]
		}

		return points
	}

	renderBox = function(center, width, height) {
		var color = "rgba(255,255,255,0.1)"
		rect({
				x: center[0]-width/2,
				y: center[1]-height/2,
				width: width,
				height: height,
				stroke: color,
				fill: "none",
				style: "stroke-width:1;"
			}, this.getDomID());	
		var numCells = 8*8*Math.random()
		for (var x=center[0]-width/2; x<center[0]+width/2; x+= width/numCells) {
			drawLine([x, center[1]-height/2], [x, center[1]+height/2], color, "1px", this.getDomID())
		}
		for (var y=center[1]-height/2; y<center[1]+height/2; y+= height/numCells) {
			drawLine([center[0]-width/2, y], [center[0]+width/2, y], color, "1px", this.getDomID())
		}
	}

	// draw graph by connecting random polygon edges
	drawGraph(polygon, color) {
		for (var i=0; i<polygon.length*10; i++) {
			let start = polygon[Math.floor(Math.random()*polygon.length)],
				end = polygon[Math.floor(Math.random()*polygon.length)]
			drawLine(start, end, color, Math.random()/2 + "px", this.getDomID())
		}
	}

	gen() {
		drawRectangle([0,0], xmax, ymax, "rgba(255,255,255," + Math.random()/8 + ")", this.getDomID())
		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		
		var entry = this.randomQuery()
		

		this.renderBox([xmax/2,ymax/2], xmax, ymax)

		for (var i=0; i<10; i++) {
			var polygon = this.randomPolygon(6, xmax/3,ymax/3, [xmax/2,ymax/2]) 
			var op = Math.random()/2
			// drawPolygon(polygon, "rgba(255,255,255," + op + ")", this.getDomID())
			this.drawGraph(polygon, "rgba(255,255,255," + (0.5 - op) + ")")
		}

		drawText([xmax/2, ymax/2], entry["term"], "48px", "#fff", 300, 0, "JetBrains Mono", this.getDomID())
	}

	render() {	
		this.gen()		

		// var polygon = this.randomPolygon(6, xmax/3,ymax/3, [xmax/2,ymax/2]) 

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default MMBit1;
