//
// Simple processing-style animations
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'
import MM from './modmanifest.js'
import { getSearchQueries } from '../../dataset/search_queries.js'

class Process5 extends Module {

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

	drawCircle = function(coord, r, fill, domID, id) {
			circle({
				cx: coord[0],
				cy: coord[1],
				r: r,
				stroke: "#fff",
				fill: fill,
				"transform": "rotate(0 0 0)",
				style: "stroke-width:0",
				id: (id == null) ? randomID(): id
			}, domID);	
	}

	randomQuery() {
		return this.queries[Math.floor(Math.random()*this.queries.length)]
	}


	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())
		
		var color = randomPantoneHex()
		var rgbColor = hexToRgb(color)

		//drawRectangle([0,0], xmax, ymax, rgbToRgba(darkenRgb(rgbColor,100),1.0), this.getDomID())
		
		var size = ymax*0.1

		// for (var i=0; i<xmax; i+=size) {
		// 	for (var j=0; j<ymax; j+=size) {
		// 		// Piksel.arrow([i,j], (timeSlide(2000,40) + (i+j)/50)%40, "#fff", Math.floor(Math.random()*4)*45, this.getDomID())		
		// 		Piksel.arrow([i,j], (timeSlide(2000,size*0.8) + (i+j)/size)%(size*0.8), "#fff", 90, this.getDomID())		
		// 	}
		// }

		// var r = 100

		var start = 0
		var lastCircle = null
		for (var r = 0; r<ymax; r+= (10 + ymax*0.3*Math.random())) {
			//start += 2
			var coords = []
			for (var theta = start; theta <= 360; theta+=10) {
				coords.push([xmax/2 + r*Math.cos(deg2rad(theta)), ymax/2 + r*Math.sin(deg2rad(theta))])
			}
			var circleSize = 30*Math.random()
			for (var i=0; i<coords.length; i++) {
				var target = (i+1)%coords.length
				if (Math.random() < 0.8) {
					drawCircle(coords[i], circleSize, "#fff", this.getDomID())
					drawCircle(coords[target], circleSize, "#fff", this.getDomID())
					drawLine(coords[i], coords[target], "#fff", 1, this.getDomID())
				}
			}

			for (var i=0; i<10; i++) {
				let offset = Math.floor(Math.random()*coords.length)
				if (lastCircle != null && r > ymax*0.3) {
					drawLine(lastCircle[offset], coords[offset], "rgba(255,255,255," + Math.random() + ")", 1, this.getDomID())
				}
			}

			lastCircle = coords
		}

		//MM.screenLines(this.getDomID())

		// for(var i=0; i<10; i++) {
		// 	drawCircleOutline([xmax/2,ymax/2], timeRamp(400+i*1000,2*ymax), "rgba(255,255,255," + (0.5+Math.random()/2) + ")", 30*Math.random(), this.getDomID())
		// }


		// var start = 0
		// for (var r = 0; r<ymax; r+= 20) {
		// 	// start += 1
		// 	for (var theta = start; theta <= 360; theta+=7) {
		// 		let coord = [xmax/2 + r*Math.cos(deg2rad(theta)), ymax/2 + r*Math.sin(deg2rad(theta))]
		// 		// if (Math.random() < 0.5) {
		// 			this.drawCircle(coord, 5*Math.random(), "#fff", this.getDomID())
		// 		// }
		// 	}
		// }


		// for (var i=0; i<xmax; i+=25) {
		// 	for (var j=0; j<ymax; j+=25) {
		// 		Piksel.arrow([i,j], timeSlide(2000,10) + ((i+j)/50)%10, "#fff", 0, this.getDomID())		
		// 	}
		// }

		// drawRectangle([0,0], xmax, ymax*0.2, "#000", this.getDomID())
		// drawRectangle([0,ymax*0.8], xmax, ymax*0.2, "#000", this.getDomID())

		//drawText([xmax/2, ymax/2], capitalize(this.randomQuery()["term"]), ymax*0.05 + "px", "#fff", 100, 1, "JetBrains Mono", this.getDomID())


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Process5;
