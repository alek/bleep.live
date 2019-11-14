//
// Line-based op art inspired by
// https://www.instagram.com/p/B0Ak5dTBIVj/
//

import Module from '../../lib/module.js'

class Semiotik2 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 2],
			"max_width": ["cc_2", 10],
			"width": ["cc_3", 10],
			"gap": ["cc_4", 127/2],
			"size": ["cc_5", 32/4],
			"weight": ["cc_6", 100/7],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"letter_spacing": ["cc_9", 4],
			"r2": ["cc_10", 0],
			"g2": ["cc_11", 0],
			"b2": ["cc_12", 0],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"count2": ["cc_16", 16]
		})
	}

	renderGrid() {
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				drawCircle(coord, this.params["r"], "#fff", this.getDomID())
			}
		}
	}		

	renderTypo(pos) {
		var coord = getGridCoordinates(pos, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		var text = tractatus[Math.floor(Math.random()*tractatus.length)]
		var cellWidth = (xmax/this.params["grid_rows"])
		var fontSize = this.params["size"]*4
		var maxChars = (cellWidth/fontSize)*4	// max 5 grid cells per line
		var maxLines = 5
		var node = getTextLayoutNode(text, maxChars, maxLines, this.params["size"]*4, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "Neue Haas Grotesk Display Pro",
			"font-size": this.params["size"]*4 + "px",
			"font-weight": this.params["weight"]*7,
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)
	}

	renderCircle(pos) {
		var coord = getGridCoordinates(pos, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		var cellWidth = (xmax/this.params["grid_rows"])
		var cellHeight = (ymax/this.params["grid_columns"])
		var target = [coord[0] + cellWidth/2, coord[1] + cellHeight/2]
		drawCircle(target, (0.5 + Math.random()*0.5)*cellWidth/2, "#fff", this.getDomID())
	}


	render() {	

		this.setBackgroundColor(getParametricColor(this.params,2))
		// var coord = getGridCoordinates(pos, this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 

		// this.renderGrid()
		this.renderTypo([2,2])
		this.renderTypo([8,2])
		this.renderCircle([2, 10])
		this.renderCircle([4, 10])
		this.renderCircle([8, 10])
		this.renderCircle([16, 10])

		this.renderCircle([2, 8])
		this.renderCircle([4, 8])
		this.renderCircle([8, 8])
		this.renderCircle([16, 8])
		
		// this.renderPattern1()
		// this.renderPattern2()
		// this.renderPattern3()
		// this.renderPattern4()
		// this.renderPattern5()
		// this.renderPattern6()


		// var nCircles = this.params["count"]
		// var maxR = this.params["r"]*10

		// for (var i=0; i<nCircles; i++) {
		// 	var r = maxR*(i/nCircles)
		// 	var segLen = r*Math.PI/2 
		// 	circle({
		// 		cx: xmax/2,
		// 		cy: ymax/2,
		// 		r: r,
		// 		stroke: "#fff",	
		// 		"stroke-dasharray": segLen + " " + segLen*this.params["gap"]/127,
		// 		fill: "none",
		// 		"transform": "rotate(" + Math.random()*360 + " " + xmax/2 + " " + ymax/2 + ")",
		// 		style: "stroke-width:" + this.params["width"]
		// 	}, this.getDomID());	
		// }

		// this.renderGrid()
		// this.renderTitle([3,4])
		// this.renderBody([3,9])
		// this.renderBody([6,9])
		// this.renderBody([9,9])
		// this.renderBody([12,9])


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.setBackgroundColor(getParametricColor(this.params,2))
		} else {
			this.clear()
			this.render()
		}
	}

}

export default Semiotik2;
