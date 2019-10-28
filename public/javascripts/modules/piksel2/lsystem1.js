//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class LSystem1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.queue = []
		this.counter = 0
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	sidebarLeft() {
		for (var i=0; i<ymax; i+=20) {
			drawLine([0,i], [30,i], "#fff", 10, this.getDomID())
		}
	}

	process(node) {
		// console.log(node)
		var colorA = "#fff"
		var colorB = "#e1185a"
		var nodeLen = 20
		// var nodeLen = (new Date())%50
		drawLine(node["coord"], node["root"], node["axiom"] == "A" ? colorA : colorB, 1 + "px", this.getDomID())
		if (node["axiom"] == "A") {
			drawCircle(node["coord"], node["size"], colorA, this.getDomID())			
			this.queue.push({ 
				"axiom": "A", 
				"coord": getViewport([node["coord"][0] + nodeLen, node["coord"][1] - nodeLen]),
				"root": node["coord"],
				"size": node["size"]
			})
			this.queue.push({ 
				"axiom": "B", 
				"coord": getViewport([node["coord"][0] + nodeLen, node["coord"][1] + nodeLen]),
				"root": node["coord"],
				"size": node["size"] 
			})
		} else if (node["axiom"] == "B") {
			drawCircle(node["coord"], node["size"], colorB, this.getDomID())			
			this.queue.push({ 
				"axiom": "A", 
				"coord": getViewport([node["coord"][0] + 1*nodeLen, node["coord"][1] + 1*nodeLen]),
				"root": node["coord"],
				"size": node["size"]
			})
		}		
	}

	render() {	

		$("body").css({"background-color": "#1e0028"})

		var start = [xmax/2, ymax/2]
		// var start = rndCoordMargin(0.48)

		this.queue.push({
			"axiom": "A",
			"coord": getViewport(start),
			"root": getViewport(start),
			"size": 5
		})

		for (var i=0; i<500; i++) {
			if (this.queue.length > 0) {
				this.process(this.queue.shift())
			}
		}

		//this.sidebarLeft()
		var yOff = ymax*Math.random()
		drawLine([0,yOff], [xmax*0.1,yOff], "#e8b029", 10*Math.random(), this.getDomID())


		var yOff2 = ymax*Math.random()
		drawLine([0.9*xmax,yOff2], [xmax,yOff2], "#e8b029", 50*Math.random(), this.getDomID())

		// drawCircleOutline([xmax/2,ymax/2], xmax*Math.random(), "rgba(255,255,255," + Math.random() + ")", 20*Math.random(), this.getDomID(), "", true)
		// drawCircleOutline([xmax/2,ymax/2], xmax*0.3, "#fff", 20, this.getDomID(), "", true)

	}

	// state update as a result of a midi event
	update(event) {
		if (this.counter++%20 == 0) {
			moveForward()
		}
		rotateLeft()
		this.queue = []
		super.update(event)
		this.clear()
		this.render()
	}

}

export default LSystem1;
