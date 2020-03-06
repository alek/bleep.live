//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class TreeVis7 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	// label(coord, value, domID) {
	// 	drawText(coord, value, "10px", "#fff", 100, 0, "Roboto Mono", domID)
	// }

	label(coord, value, domID,size, weight, spacing, fill) {
		// drawText(coord, value, "10px", "#fff", 100, 0, "Roboto Mono", domID)
		if (fill == null) {
			fill = "#fff"
		}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,			
			"style": "font-size:" + size + "px" + ";text-align:left;alignment-baseline:left;text-anchor:left;opacity:1.0;font-family:" + "Roboto Mono" + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, value.toString(), domID); 

	}

	old() {	

		var domID = this.getDomID()
		var mod = this

		drawRectangle([0,0], xmax, ymax, "#1E2445", domID)

		// $.get("http://localhost:5133/api/tree?prefix=hack", function( data ) {

		var filter = "?prefix=vendor"
		// var filter = ""

		$.get("http://localhost:5133/api/tree" + filter, function( data ) {			
			var tree = data.body

			var root = tree
			var rootName = "/"

			if (filter.length > 0) {
				root = tree[0].children
				rootName = tree[0].value
			}
			var labelQueue = []

			var radius1 = 200
			var radius2 = 330
			var deltaAngle = 15

			// drawCircleOutline([xmax/2,ymax/2], radius1, "#fff", "0.5px", domID)
			// drawCircleOutline([xmax/2,ymax/2], radius2, "#fff", "0.5px", domID)

			for (var i=0; i<root.length; i++) {
				var l1 = root[i]

				var coord = getCircleCoord(xmax/2,ymax/2, i*deltaAngle, radius1)
				drawLine([xmax/2,ymax/2], coord, "#574799", "1px", domID)
				// drawCircleOutline(coord, 100, "#8B8E9F", "0.5px", domID)

				if (l1.is_file) {
					// console.log(l1.value + "\t" + l1.is_file)
				} else {
					// console.log(l1.value)
					var increment = deltaAngle/l1.children.length
					for (var j=0; j<l1.children.length; j++) {

						var l2 = l1.children[j]
						if (l2.is_file) {
							continue
						}

						// var c2 = getCircleCoord(coord[0],coord[1], j*27, 100) 
						var c2 = getCircleCoord(xmax/2,ymax/2, i*deltaAngle - Math.ceil(deltaAngle/2) + j*increment, radius2)
						
						drawLine(coord, c2, "#574799", "1px", domID)
						drawCircle(c2, 2, "#F25C8B", domID)
						// mod.label([c2[0],c2[1] - 10], l2.value, domID)
						if (l1.children.length < 20) {
							labelQueue.push({coord: [c2[0],c2[1] - 10], val: l2.value})
						}

						console.log("\t" + l2.value + "\t" + l2.is_file)
					}
				}

				// if (!l1.is_file) {
					labelQueue.push({coord: [coord[0],coord[1] - 18], val: l1.value, is_file: l1.is_file})
					drawCircle(coord, 2+5*Math.random(), "#7DA4FF", domID)
				// }

			}

			drawCircle([xmax/2,ymax/2], 10, "#fff", domID)
			mod.label([xmax/2,ymax/2 - 20], rootName, domID)

			for (var i=0; i<labelQueue.length; i++) {
				if (labelQueue[i].is_file) {
					drawText([labelQueue[i].coord[0],labelQueue[i].coord[1]+9] , labelQueue[i].val, "6px", "#fff", 100, 0, "Roboto Mono", domID)
				} else { 
					mod.label(labelQueue[i].coord, labelQueue[i].val, domID)				
				}
			}

		});

	}


	iterateTree() {
		var domID = this.getDomID()
		var mod = this

		drawRectangle([0,0], xmax, ymax, "#232325", domID)

		// $.get("http://localhost:5133/api/tree?prefix=hack", function( data ) {

		var filter = "?prefix=vendor"
		// var filter = ""

		$.get("http://localhost:5133/api/tree" + filter, function( data ) {			
			var tree = data.body
			var root = tree

			var rootName = "/"

			if (filter.length > 0) {
				root = tree[0].children
				rootName = tree[0].value
			}

			for (var i=0; i<root.length; i++) {
				var l1 = root[i]
				if (l1.is_file) {
					console.log(l1.value + "\t" + l1.is_file)
				} else {
					console.log(l1.value)
					for (var j=0; j<l1.children.length; j++) {
						var l2 = l1.children[j]
						console.log("\t" + l2.value + "\t" + l2.is_file)
					}
				}
			}

			//drawCircle([xmax/2,ymax/2], 10, "#fff", domID)
			//mod.label([xmax/2,ymax/2 - 20], rootName, domID)
			mod.label([xmax/2,ymax/2], rootName.toUpperCase(), domID)

		});

	}


	// "M" + coords.map(x => x.join(" ")).join(" L") + ""

	bezier = function(start, end, stroke, weight, domID) {
		var pathString = "M " + start[0] + " " + start[1] + " C " + (start[0] + 80) + " " + start[1] + " " + end[0] + " " + (end[1] + 80) + " " + end[0] + " " + end[1]
		// console.log(pathString)
		path( {
			d: pathString,
			style: "fill:none;stroke:" + stroke + ";stroke-width:" + weight
		}, domID)
	}

	render() {
		var domID = this.getDomID()
		var mod = this
		var palette = new Array(5).fill(0).map(x => randomPantoneHex());

		drawRectangle([0,0], xmax, ymax, "#232325", domID)

		// $.get("http://localhost:5133/api/tree?prefix=hack", function( data ) {

		var filter = "?prefix=vendor"
		var layout = new CircleLayout([xmax/2,ymax/2], ymax/2)
		//drawCircleOutline([xmax/2,ymax/2], ymax/2, "#fff", "1px", domID)
		// var filter = ""

		$.get("http://localhost:5133/api/tree" + filter, function( data ) {			
			var tree = data.body
			var root = tree

			var rootName = "/"

			if (filter.length > 0) {
				root = tree[0].children
				rootName = tree[0].value
			}

			for (var i=0; i<root.length; i++) {
				var l1 = root[i]
				if (l1.is_file) {
					console.log(l1.value + "\t" + l1.is_file)
				} else {
					console.log(l1.value)
					var maxRad = Math.min(20 + l1.children.length*5, ymax*0.1)
					var entry = layout.add(maxRad, 0)
					var subLayout = null

					if (entry != null) {
						// entry.outline(domID)
						// entry.color = randomPantoneHex()
						// entry.draw(domID)
						mod.label([entry.coord[0]- 25 - 10*(Math.ceil(Math.log10(1 + l1.children.length))), entry.coord[1]+entry.r], l1.children.length, domID, 16, 400, -1)
						mod.label([entry.coord[0] - 20, entry.coord[1]+entry.r-6], l1.value, domID, 8, 100, 0, palette[0])
						mod.label([entry.coord[0]- 20, entry.coord[1]+entry.r+2], Math.floor(Math.random()*10) + " commits", domID, 6, 100, 0)
						subLayout = new CircleLayout(entry.coord, maxRad)
					}
					// drawCircleOutline([xmax*Math.random(),ymax*Math.random()], ymax*0.15*Math.random(), "#fff", "1px", domID)
					
					for (var j=0; j<l1.children.length; j++) {
						var l2 = l1.children[j]
						if (subLayout != null) {
							var e = subLayout.add(4+4*Math.random(), 20)
							if (e != null) {
								e.color = palette[Math.floor(Math.random()*palette.length)]
								e.draw(domID)
							}
						}
						console.log("\t" + l2.value + "\t" + l2.is_file)
					}
				}
			}

			//drawCircle([xmax/2,ymax/2], 10, "#fff", domID)
			//mod.label([xmax/2,ymax/2 - 20], rootName, domID)
			//mod.label([xmax/2,ymax/2], rootName.toUpperCase(), domID)

		});

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TreeVis7;
