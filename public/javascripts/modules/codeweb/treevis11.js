//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class TreeVis11 extends Module {

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

	label(coord, value, domID) {
		drawText(coord, value, "10px", "#fff", 100, 0, "Roboto Mono", domID)
	}

	render() {
		var domID = this.getDomID()
		var mod = this

		drawRectangle([0,0], xmax, ymax, "#232325", domID)

		// $.get("http://localhost:5133/api/tree?prefix=hack", function( data ) {

		// var filter = "?prefix=vendor"
		// var filter = "?prefix=crypto"
		var filter = ""

		$.get("http://localhost:5133/api/tree" + filter, function( data ) {			
			var tree = data.body
			var root = tree

			var rootName = "/"

			if (filter.length > 0) {
				root = tree[0].children
				rootName = tree[0].value
			}

			var r = 100

			for (var i=0; i<root.length; i++) {
				var l1 = root[i]
				// r = r+10

				// drawCircleOutline([xmax/2,ymax/2], r, "#fff", 10, domID, 'pera', "2 100")
				var circumference = 2*r*Math.PI
				var circumference2 = 6*r*Math.PI

				var circleOffset = i/root.length*circumference
				var circleSegment = circumference/root.length
				var deltaAngle = 360/root.length
				var color = randomPantoneHex()

				circle({
					cx: xmax/2,
					cy: ymax/2,
					r: r,
					stroke: color,
					fill: "none",
					"stroke-dasharray": [0, circleOffset, circleSegment, circumference].join(" "),		
					style: "stroke-width:" + "50px"
				}, domID);	

				var coord = getCircleCoord(xmax/2,ymax/2, i*deltaAngle, r+180)

				var coord2 = getCircleCoord(xmax/2,ymax/2, i*deltaAngle, r*3)

				//drawLine([xmax/2,ymax/2], coord, "#39393B", "0.25px", domID)
				drawLine([xmax/2,ymax/2], coord2, color, "0.25px", domID)

				var angle = (deltaAngle*i > 180) ? 180 + deltaAngle*i : deltaAngle*i

				// drawText(coord, l1.value, "10px", color, 100, 0, "Roboto Mono", domID)
				text( { 
					x: coord[0],
					y: coord[1],
					"fill": color,
					"transform": "rotate(" + angle +  " " + coord[0] + " " + coord[1] + ")",
					"style": "font-size:18px;text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:Roboto Mono;sans-serif;font-weight:100;letter-spacing:0px;"
				}, l1.value, domID); 


				if (l1.is_file) {
					console.log(l1.value + "\t" + l1.is_file)
				} else {
					console.log(l1.value)
					for (var j=0; j<l1.children.length; j++) {
						var l2 = l1.children[j]
						console.log("\t" + l2.value + "\t" + l2.is_file)
		
						circle({
							cx: xmax/2,
							cy: ymax/2,
							r: r*3,
							stroke: color,
							fill: "none",
							"stroke-dasharray": [0, circumference2*i/root.length + j*3 , "1px", circumference2].join(" "),		
							style: "stroke-width:" + "50px"
						}, domID);	
					}
					if (r < 200) {
						r+=50
					} else {
						if (r < 100) {
							r+=50
						} else {
							r-=50
						}
					}
				}
			}

			//drawCircle([xmax/2,ymax/2], 10, "#fff", domID)
			//mod.label([xmax/2,ymax/2 - 20], rootName, domID)
			// mod.label([xmax/2,ymax/2], rootName.toUpperCase(), domID)
			//drawText([xmax/2,ymax/2], rootName.toUpperCase(), "18px", "#fff", 100, 0, "Roboto Mono", domID)

		});

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TreeVis11;
