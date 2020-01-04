//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getCitiesData } from '../../dataset/cities.js'
// import { getCitiesData } from '../../dataset/cities_full.js'

class BelgradeMap1 extends Module {

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

	getOffset(data) {

		var x = (data["lon"]+180)*(xmax/360)
		var latRad = data["lat"]*Math.PI/180
		var mercN = Math.log(Math.tan(Math.PI/4 + latRad/2))
		var y = ymax/2-(xmax*mercN/(Math.PI*2))

		return {
			"x": xmax/2 + x,
			"y": y
		}
	}

	render() {	

		drawRectangle([0,0], xmax, ymax, "#1e2225", this.getDomID())

		var data = getCitiesData()

		var belgrade = this.getOffset({
			"lat": 44.8186,
			"lon": 20.4680
		})

		// calculate boundaries

		var minLat = Infinity
		var maxLat = -Infinity
		var minLon = Infinity
		var maxLon = -Infinity

		for (var i=0; i<data.length; i++) {
			minLat = Math.min(minLat, data[i]["lat"])
			maxLat = Math.max(maxLat, data[i]["lat"])
			minLon = Math.min(minLon, data[i]["lon"])
			maxLon = Math.max(maxLon, data[i]["lon"])
		}

		var latRange = maxLat - minLat
		var lonRange = maxLon - minLon

		console.log("LAT: " + maxLat + "\t" + minLat)
		console.log("LON: " + maxLon + "\t" + minLon)

		console.log("WINDOW: " + xmax + "\t" + ymax)
		console.log("RANGE: " + latRange + "\t" + lonRange)

		var lastOffset = null

		// render
		for (var i=0; i<50; i++) {

			if (Math.random() < 1.0) {
				var offset = this.getOffset(data[i])
				var color = randomPantoneHex()

				if (lastOffset != null) {
					// if (Math.random() < 0.1) {
					line({
						x1: lastOffset["x"],
						y1: lastOffset["y"],
						x2: offset["x"],
						y2: offset["y"],
						stroke: color,
						"stroke-opacity": Math.random()*0.3,
						"stroke-dasharray": "2 2",
						"stroke-width": "1px"
					}, this.getDomID());	
					// }				

					// drawLine([lastOffset["x"], lastOffset["y"]], [offset["x"], offset["y"]], "rgba(255,255,255," + Math.random()*0.01 + ")", "1px", this.getDomID())
					// drawLine([belgrade["lon"], belgrade["lat"]], [offset["lon"], offset["lat"]], "rgba(255,255,255," + Math.random()*0.05 + ")", "1px", this.getDomID())
				}

				// drawCircle([xmax/2+offset["x"], offset["y"]], 1*Math.random(), randomPantoneHex(), this.getDomID())
				if (data[i]["population"]) {
					// var opacity = Math.sqrt(Math.log(data[i]["population"])) - 2.8
					var opacity = data[i]["population"]/100000
					// var opacity = Math.random()
					// console.log(opacity)
					circle({
						cx: offset["x"],
						//cx: -xmax*0.5+timeSlide(1000, 2*xmax)+offset["x"],
						cy: offset["y"],
						// r: 1*Math.random(),
						r: 0.3 + data[i]["population"]/2000000,
						// fill: "#fff",
						fill: color,
						opacity: opacity,
						"transform": "rotate(0 0 0)",
						style: "stroke-width:0"
						// filter: "url(#f1)"
					}, this.getDomID());	

					drawText([offset["x"], offset["y"]-20], data[i]["city"], "10px", color, 100, 0, "Helvetica", this.getDomID())

					// drawCircle([xmax/2+offset["x"], offset["y"]], 1*Math.random(), "rgba(255,255,255," + opacity + ")", this.getDomID())
					lastOffset = offset
				}
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

export default BelgradeMap1;
