//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class SatNOGS1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 1],
			"grid_rows": ["cc_9", 5],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.colorPalette = ["#33c6f0", "#e1185a", "#ecb32a", "#2ab77e", "#490d4a"]
	}

	rndColor = function() {
		return this.colorPalette[Math.floor(Math.random()*this.colorPalette.length)]
	}

	// overrides of svg methods

	drawCircleOutline = function(coord, r, fill, width, domID, id, dashed, opacity) {
		if (dashed == null) {
			dashed = false
		}
		circle({
			cx: coord[0],
			cy: coord[1],
			r: r,
			stroke: fill,
			fill: "none",
			"stroke-dasharray": dashed ? "8 2" : "0",		
			"transform": "rotate(45 0 0)",
			"stroke-opacity": opacity,
			style: "stroke-width:" + width,
			id: (id == null) ? randomID(): id
		}, domID);	
	}

	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, angle, opacity) {
		if (angle == null) {
			angle = 0
		}
		if (opacity == null) {
			opacity = 1.0
		}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"fill-opacity": opacity,
			"transform": "rotate(" + angle + " " + coord[0] + " " + coord[1] + ")",
			"style": "font-size:" + size + ";text-align:left;alignment-baseline:left;text-anchor:left;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}

	drawLine = function(start, end, stroke, width, domID, id, dashed, arrow, opacity) {
		if (width == null) {
			width = 1
		}
		if (arrow == null) {
			arrow = false
		}
		if (dashed == null) {
			dashed = false
		}
		if (opacity== null) {
			opacity = 1.0
		}
		line({
			x1: start[0],
			y1: start[1],
			x2: end[0],
			y2: end[1],
			stroke: stroke,
			"transform": "rotate(0 0 0)",
			"stroke-width": width,
			"stroke-opacity": opacity,
			"stroke-dasharray": dashed ? "1 1" : "0",
			"marker-end" : arrow ? "url(#arrow)" : "none",
			id: (id == null) ? randomID(): id
		}, domID);
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				for (var z=0; z<10; z++) {
					this.drawCircleOutline(coord, 50*Math.random() + 150*Math.random(), this.rndColor(), 1*Math.random(), this.getDomID(), "", false, Math.random()*0.62)
				}
			}
		}
	}	

	sat1() {

	}

	render() {	

		var text1 = "Ever since the early days of the space race, people have been fascinated with satellites. And rightly so; the artificial moons we've sent into space are engineering marvels, built to do a difficult job while withstanding the harshest possible environment. But while most people are content to just know that satellites are up there providing weather forecasts and digital television, some of us want a little more."

		drawRectangle([0,0], xmax, ymax, "#0e0e0e", this.getDomID())

		for (var i=0; i<10; i++) {	
			var yOff = Math.random()*ymax
			this.drawLine([0, yOff], [xmax-50, yOff], this.rndColor(), 200*Math.random(), this.getDomID(), "", true, false, 0.5)
		}

		this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		this.drawCircleOutline([xmax/3,ymax/3], xmax/2, "#fff", 1, this.getDomID(), "", false, 0.2)
		this.drawCircleOutline([xmax/3,2*ymax/3], xmax/2, "#fff", 1, this.getDomID(), "", false, 0.2)
		this.drawCircleOutline([2*xmax/3,2*ymax/3], xmax/2, "#fff", 1, this.getDomID(), "", false, 0.2)
		this.drawCircleOutline([2*xmax/3,ymax/3], xmax/2, "#fff", 1, this.getDomID(), "", false, 0.2)

		if (Math.random() < 0.5) {
			drawText([xmax/2,ymax/2], "Do you know where your satellite is?".toUpperCase(), "14px", "#fff", 100, 5,"Roboto Mono", this.getDomID())
		}

		//drawText([xmax/2,ymax/2], xmax + "\t" + ymax, "14px", "#fff", 100, 5,"Roboto Mono", this.getDomID())

		var lh = 5
		for (var i=0; i<ymax; i+=lh*1.4) {
			this.drawLine([xmax,i], [xmax-20,i], this.rndColor(), lh*Math.random(), this.getDomID(), "", false, false, Math.random())
		}

		var coord = [xmax-42, ymax -20]

		var node = getTextLayoutNode(text1.toUpperCase(), 200, 2, 8, {
			x: coord[0],
			y: coord[1],
			"fill": "#fff",
			"font-family": "Roboto Mono",
			"font-size": 6 + "px",
			"font-weight": 100,
			"style": "letter-spacing:2px",
			"transform": "rotate(" + -90 + " " + coord[0] + " " + coord[1] + ")",
			// "transform": "rotate(" + -90 + " " + coord[0] + " " + coord[1] + ")",
			"dy": 0
		})
		document.getElementById(this.getDomID()).appendChild(node)

		var color = this.rndColor()
		drawRectangleOutline([20,ymax-120], 40, 80, color, this.getDomID(), 5, 0.7)
		this.drawLine([30,ymax-80], [50,ymax-80], color, 5, this.getDomID(), "", false,false, 0.7)
		this.drawText([28,ymax-90], "10", "21px", color, 700, -2,"Helvetica", this.getDomID(), 0, 0.7)
		this.drawText([28,ymax-54], "30", "21px", color, 700, 0,"Helvetica", this.getDomID(), 0, 0.7)

		this.drawText([80,ymax-85], "Pierros Papadeas", "21px", color, 700, -1,"Helvetica", this.getDomID(), 0,  0.8)
		this.drawText([80,ymax-60], "SatNOGS Project", "18px", color, 300, 0,"Helvetica", this.getDomID(), 0, 0.7)

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default SatNOGS1;
