//
// Experiments in HTML/CSS + SVG
//

import Module from '../../lib/module.js'

class CSSMix1 extends Module {

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

		// drawText([start[0] + size + delta, start[1] + size], "™", delta, "#fff", 100, 0, "Helvetica", this.getDomID())
		// drawText([start[0] + size + delta, start[1]], "™", delta, "#fff", 100, 0, "Helvetica", this.getDomID())

	}


	div(content, className, idName) {
		return $('<div class="' + className + '" id="' + idName + '">' + content + "</div>")
	}

	render() {	

		// $("#graph").remove()
		// $("svg").remove()

		$("#graph").css({"position": "fixed"})

		this.renderGrid(10,19)

		$("body").css({
			"background-color": "#131313",
			"font-family": "Helvetica",
			"display": "grid",
			"grid-template-columns": "repeat(8, 200px)",
			"grid-template-rows": "repeat(8, 200px)",
			"grid-column-gap": "0px",
			"grid-row-gap": "0px"
		})

		var content = ["New & Used", "Used & New", "& Used & New"]

		// $("body").append(this.div(content.join(" ")).css(
		// 	{ "font-weight": 700, "font-size": "80px", "letter-spacing": "-4px", "max-width": "100%" })
		// )

		// $("body").append(this.div(content.join(" ")).css(
		// 	{ "font-weight": 700, "font-size": "40px", "letter-spacing": "-4px", "max-width": "100%" })
		// )

		// $("body").append(this.div(content.join(" ")).css(
		// 	{ "font-weight": 700, "font-size": "80px", "letter-spacing": "-10px", "line-height": "40px", "max-width": "100%" })
		// )

		// $("body").append(this.div("Z", "pera", "pera"))

		// createSVGContainer("pera")
		
		// drawCircle([0,300], 20, "#fff", "pera")
		// drawCircle([50,150], 40, "#fff", "pera")
		// drawCircle([200,200], 20, "#fff", "pera")


		// createSVGContainer("pera1")
		
		// drawCircle([0,300], 20, "#fff", "pera1")
		// drawCircle([50,150], 40, "#fff", "pera1")
		// drawCircle([200,200], 20, "#fff", "pera1")

		// $("svg").css("overflow", "hidden")

		for (var i=0; i<32; i++) {
			createSVGContainer("pera" + i)
			// drawCircle([100,100], 80*Math.random(), "#fff", "pera" + i)
			this.arrow([0,0], 100, "#fff", 45*Math.floor(Math.random()*8), "pera"+i)
		}




	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default CSSMix1;
