//
// Experiments in HTML/CSS + SVG
//

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class TDR7 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		rotateRight()
		if (Math.random() < 0.5) {	
			moveForward()
		} else {
			moveBackward()
		}
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(getViewport(coord), 2, "#fff", this.getDomID())
				this.arrow(getViewport(coord), (xmax/8)*Math.random(), "rgba(255,255,255,0.9)", Math.floor(Math.random()*8)*90, this.getDomID())
			}
		}
	}	


	arrow(start, size, color, angle, domID) {
		var delta = size*0.2

		var pathEntries = [
			[start[0], start[1] + size - delta/Math.sqrt(2)], 
			[start[0] + delta/Math.sqrt(2), start[1]+size], 
			[start[0]+size - delta, start[1] + delta + delta/Math.sqrt(2)], 
			[start[0]+size - delta, start[1]+size], 
			[start[0]+size, start[1]+size-delta], 
			[start[0]+size, start[1]], 
			[start[0]+delta, start[1]], 
			[start[0], start[1]+delta], 
			[start[0]+size-delta*(1+1/Math.sqrt(2)), start[1]+delta], 
			[start[0], start[1]+size-delta/Math.sqrt(2)]
			]

		path( {
			d: "M" + pathEntries.map(x => x.join(" ")).join(" L") + "",
			"transform": "rotate(" + angle + " " + (start[0] + size/2) + " " + (start[1] + size/2) + ")",
			style: "fill:" + color + ";stroke:" + color + ";stroke-width:" + 1
		}, domID)

		drawText([start[0] + size + delta, start[1] + size], "™", delta/2, "#fff", 100, 0, "Helvetica", this.getDomID())
		// drawText([start[0] + size + delta, start[1]], "™", delta, "#fff", 100, 0, "Helvetica", this.getDomID())

	}


	div(content, className, idName) {
		return $('<div class="' + className + '" id="' + idName + '">' + content + "</div>")
	}

	render() {	

		var data = getBiorxivData()

		$("#graph").css({'position': 'fixed', 'z-index': '-1'})
		$("body").append('<div id="container"></div>')

		var colWidth = xmax/8 
		var rowHeight = ymax/8

		$("#container").css({
			// "background-color": "#131313",
			"font-family": "Helvetica",
			"display": "grid",
			"grid-template-columns": "repeat(8, " + colWidth + "px)",
			"grid-template-rows": "repeat(8, " + rowHeight + "px)",
			"grid-column-gap": "20px",
			"grid-row-gap": "20px",
			"overflow": "hidden"
		})

		$("div").css({"overflow": "hidden"})

		for (var i=0; i<64; i++) {
			if (Math.random() < 0.8) {
				 $("#container").append(this.div(data[Math.floor(Math.random()*data.length)]['title']).css(
					{ "font-weight": 700, "font-size": Math.ceil(60*Math.random()) + "px", "font-kerning": "normal", "letter-spacing": "-1px", "font-smooth": "always", "max-width": "100%", "-webkit-font-smoothing": "subpixel-antialiased", "overflow": "hidden" })
				)
			} else {
				$("#container").append("<div/>")
			}
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR7;
