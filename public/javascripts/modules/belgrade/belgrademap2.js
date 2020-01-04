//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getCitiesData } from '../../dataset/cities.js'

class BelgradeMap2 extends Module {

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

	getOffset(data, minE, maxE, minN, maxN) {
		return {
			"e": Math.floor(data["utm_e"]/maxE * xmax),
			"n": Math.floor(data["utm_n"]/maxN * ymax)
		}
	}

	render() {	

		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		var data = getCitiesData()

		var belgrade = this.getOffset({
			"lat": 44.8186,
			"lon": 20.4680
		})

		// calculate boundaries

		var minE = Infinity
		var maxE = -Infinity
		var minN = Infinity
		var maxN = -Infinity

		for (var i=0; i<data.length; i++) {
			minE = Math.min(minE, data[i]["utm_e"])
			maxE = Math.max(maxE, data[i]["utm_e"])
			minN = Math.min(minN, data[i]["utm_n"])
			maxN = Math.max(maxN, data[i]["utm_n"])
		}

		var eRange = maxE - minE
		var nRange = maxN - minN

		console.log("E: " + minE + "\t" + maxE)
		console.log("N: " + minN + "\t" + maxN)

		console.log("WINDOW: " + xmax + "\t" + ymax)
		console.log("RANGE: " + eRange + "\t" + nRange)

		var lastOffset = null

		// render
		// for (var i=0; i<data.length; i++) {
		for (var i=0; i<10; i++) {
			if (Math.random() < 1.0) {
				var offset = this.getOffset(data[i], minE, maxE, minN, maxN)
				console.log(data[i])

				if (lastOffset != null) {
					// drawLine([lastOffset["lon"], lastOffset["lat"]], [offset["lon"], offset["lat"]], "rgba(255,255,255," + Math.random()*0.1 + ")", "1px", this.getDomID())
					// drawLine([belgrade["lon"], belgrade["lat"]], [offset["lon"], offset["lat"]], "rgba(255,255,255," + Math.random()*0.05 + ")", "1px", this.getDomID())
				}

				//console.log(offset)
				// drawCircle([offset["e"], offset["n"]], 2*Math.random(), randomPantoneHex(), this.getDomID())
				drawCircle([offset["n"], offset["e"]], 1, "#fff", this.getDomID())
				drawText([offset["n"], offset["e"]], data[i]["city"], "10px", "#fff", 100, 0, "Helvetica", this.getDomID())
				lastOffset = offset
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

export default BelgradeMap2;
