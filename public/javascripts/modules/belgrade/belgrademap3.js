//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getCitiesData } from '../../dataset/cities.js'
// import { getCitiesData } from '../../dataset/cities_full.js'

class BelgradeMap3 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.labels = []
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

	l2Distance(coord1, coord2) {
		return Math.sqrt(Math.pow(coord2[0] - coord1[0], 2) + Math.pow(coord2[1] - coord1[0], 2))
	}

	renderLabel(offset, text, color) {

		var candidates = [[offset["x"], offset["y"]-20], [offset["x"], offset["y"]+20], [offset["x"] - 20, offset["y"]], [offset["x"] + 20, offset["y"]]]
		
		var minDistances = Array(candidates.length).fill(Infinity)

		for (var i=0; i<candidates.length; i++) {
			for (var j=0; j<this.labels.length; j++) {
				var distance = this.l2Distance(candidates[i], this.labels[j])
				minDistances[i] = Math.min(minDistances[i], distance)
			}
		}

		var maxVal = -Infinity
		var maxIndex = 0
		for (var i=0; i<minDistances; i++) {
			if (minDistances[i] > maxVal) {
				maxVal = minDistances[i]
				maxIndex = i
			}
		}

		drawText(candidates[maxIndex], text, "10px", color, 100, 0, "Helvetica", this.getDomID())

		// drawText(candidates[Math.floor(Math.random()*candidates.length)], text, "10px", color, 100, 0, "Helvetica", this.getDomID())
		// drawText([offset["x"], offset["y"]-20], text, "10px", color, 100, 0, "Helvetica", this.getDomID())

		this.labels.push(candidates[maxIndex])

	}

	render() {	

		drawRectangle([0,0], xmax, ymax, "#1e2225", this.getDomID())

		var data = getCitiesData()

		var belgrade = this.getOffset({
			"lat": 44.8186,
			"lon": 20.4680
		})

		var lastOffset = null

		// var numCities = data.length
		var numCities = 50

		var nearest = Array(numCities).fill(null);
		var traversed = {}

		for (var i=0; i<numCities; i++) {
			var offsetA = this.getOffset(data[i])
			var minDistance = Infinity
			var minOffset = null
			for (var j=0; j<numCities; j++) {
				if (i != j) {
					var offsetB = this.getOffset(data[j])
					var distance = Math.sqrt(Math.pow(offsetB["x"] - offsetA["x"], 2) + Math.pow(offsetB["y"] - offsetA["y"], 2))
					if (distance < minDistance && !traversed[data[j]["city"]]) {
						minDistance = distance
						minOffset = offsetB
					}
				}
			}
			traversed[data[i]["city"]] = true
			nearest[i] = minOffset
		}

		// render
		for (var i=0; i<numCities; i++) {

			if (Math.random() < 1.0) {
				var offset = this.getOffset(data[i])
				var color = randomPantoneHex()

				if (nearest[i]) {
					line({
						x1: nearest[i]["x"],
						y1: nearest[i]["y"],
						x2: offset["x"],
						y2: offset["y"],
						stroke: color,
						"stroke-opacity": Math.random()*0.5,
						// "stroke-dasharray": "2 2",
						"stroke-width": "1px"
					}, this.getDomID());	
				}

			if (data[i]["population"]) {
					var opacity = data[i]["population"]/100000
					circle({
						cx: offset["x"],
						//cx: -xmax*0.5+timeSlide(1000, 2*xmax)+offset["x"],
						cy: offset["y"],
						r: 0.3 + data[i]["population"]/2000000,
						fill: color,
						opacity: opacity,
						"transform": "rotate(0 0 0)",
						style: "stroke-width:0"
						// filter: "url(#f1)"
					}, this.getDomID());	

					this.renderLabel(offset, data[i]["city"], color)					

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

export default BelgradeMap3;
