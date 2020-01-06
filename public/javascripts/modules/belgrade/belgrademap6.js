//
// EU Grid
// 

import Module from '../../lib/module.js'
// import { getCitiesData } from '../../dataset/cities.js'
import { getCitiesData } from '../../dataset/cities_full.js'
// import { getEUPoints } from '../../dataset/eu_cities.js'

class BelgradeMap6 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.labels = []
		this.cityColor = {}
	}

	encode(data) {
		var result = ""
		for (var i=0; i<data.length; i++) {
			result += data.charCodeAt(i)
		}
		return result.substring(0,8)
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

		var x = (data["lon"]+180)*(xmax*2.5/360)
		var latRad = data["lat"]*Math.PI/180
		var mercN = Math.log(Math.tan(Math.PI/4 + latRad/2))
		var y = ymax*2.5/2-(xmax*2.5*mercN/(Math.PI*2))

		return {
			"x": xmax*0.3 + x,
			"y": y
		}
	}

	l2Distance(coord1, coord2) {
		return Math.sqrt(Math.pow(coord2[0] - coord1[0], 2) + Math.pow(coord2[1] - coord1[0], 2))
	}

	renderLabel(offset, text, color) {

		var candidates = [
						  [offset["x"], offset["y"]-15], 
						  [offset["x"], offset["y"]+15], 
						  [offset["x"] - 5 - text.length*2, offset["y"]], [offset["x"] - 10 - text.length*2, offset["y"]], 
						  [offset["x"] + 5 + text.length*2, offset["y"]], [offset["x"] + 10 + text.length*2, offset["y"]]
						  ]
		
		var minDistances = Array(candidates.length).fill(Infinity)

		for (var i=0; i<candidates.length; i++) {
			for (var j=0; j<this.labels.length; j++) {
				var distance = this.l2Distance(candidates[i], this.labels[j])
				minDistances[i] = Math.min(minDistances[i], distance)
			}
		}

		var maxVal = -Infinity
		var maxIndex = 0
		for (var i=0; i<minDistances.length; i++) {
			if (minDistances[i] > maxVal) {
				maxVal = minDistances[i]
				maxIndex = i
			}
		}

		drawText(candidates[maxIndex], text, "8px", color, 100, 0, "Helvetica", this.getDomID())
		this.labels.push(candidates[maxIndex])

	}

	// getNearest() {
	// 	// compute nearest neighbors
	// 	var nearest = Array(numCities).fill(Array(5));
	// 	var traversed = {}

	// 	for (var i=0; i<numCities; i++) {
	// 		var offsetA = this.getOffset(data[i])
	// 		var minDistance = Infinity
	// 		var minOffset = null
	// 		var minOffsetCity = null
	// 		for (var j=0; j<numCities; j++) {
	// 			if (i != j) {
	// 				var offsetB = this.getOffset(data[j])
	// 				var distance = Math.sqrt(Math.pow(offsetB["x"] - offsetA["x"], 2) + Math.pow(offsetB["y"] - offsetA["y"], 2))
	// 				//var distance = Math.sqrt(Math.pow(offsetB["x"] - offsetA["x"], 2) + Math.pow(offsetB["y"] - offsetA["y"], 2))  - 10*Math.log(data[j]["population"])
	// 				if (distance < minDistance && (!traversed[data[j]["city"]] || data[j]["population"] > 1000000)) {
	// 				// if (distance < minDistance) {
	// 					minDistance = distance
	// 					minOffset = offsetB
	// 					minOffsetCity = data[j]["city"]
	// 				}
	// 			}
	// 		}
	// 		traversed[data[i]["city"]] = true
	// 		nearest[i] = minOffset
	// 		console.log(minDistance)
	// 		if (minOffset != null) {
	// 			// console.log(data[i]["city"] + " <- " + minOffsetCity)
	// 		}
	// 	}
	// }


	getNearest(coord, cities, count) {
		// compute distances -> pick shortest from the sorted array
		var distances = []
		for (var i=0; i<cities.length; i++) {
			var offsetB = this.getOffset(cities[i])
			var distance = Math.sqrt(Math.pow(offsetB["x"] - coord["x"], 2) + Math.pow(offsetB["y"] - coord["y"], 2))
			//var distance = Math.sqrt(Math.pow(offsetB["x"] - coord["x"], 2) + Math.pow(offsetB["y"] - coord["y"], 2)) - 2*Math.log(cities[i]["population"])
			// var distance = Math.sqrt(Math.pow(offsetB["x"] - coord["x"], 2) + Math.pow(offsetB["y"] - coord["y"], 2)) - (20 - cities[i]["lat"])
			if (distance != 0) {
				distances.push({"entry": cities[i], "distance": distance})
			}
		}
		distances = distances.sort((a, b) => a["distance"] - b["distance"]);
		// console.log(distances.sort())
		// for (var i=0; i<10; i++) {
		// 	console.log(distances[i]["entry"]["city"] + "\t" + distances[i]["distance"])
		// }
		return distances.slice(0,count)
	}

	spanningTree(root, data, depth, visited) {
		var nearest = this.getNearest(root, data, 20)
		for (var i=0; i<nearest.length; i++) {
			var offset = this.getOffset(nearest[i]["entry"])
			var city = nearest[i]["entry"]["city"]
			if (!visited[city] || Math.random() < 0.1) {
			// if (!visited[city]) {
				//console.log('render')
				var color = randomPantoneHex()

				line({
					x1: offset["x"],
					y1: offset["y"],
					x2: root["x"],
					y2: root["y"],
					stroke: color,
					// "stroke-opacity": 1,
					// "stroke-opacity": 0.01*Math.random(),
					"stroke-opacity": 0.5 + 0.4*Math.random(),
					// "stroke-dasharray": "2 2",
					// "stroke-width": 1*Math.random() + "px"
					"stroke-width": 0.5 + 0.5*Math.random() + "px"
					// "stroke-width": "1px"
				}, this.getDomID());	

				// alt layout

				// 	line({
				// 		x1: offset["x"],
				// 		y1: offset["y"],
				// 		x2: offset["x"],
				// 		y2: root["y"],
				// 		stroke: color,
				// 		// "stroke-opacity": 1,
				// 		// "stroke-opacity": 0.01*Math.random(),
				// 		"stroke-opacity": 0.4*Math.random(),
				// 		// "stroke-dasharray": "2 2",
				// 		// "stroke-width": 1*Math.random() + "px"
				// 		"stroke-width": 0.5*Math.random() + "px"
				// 		// "stroke-width": "1px"
				// 	}, this.getDomID());	

				// 	line({
				// 		x1: offset["x"],
				// 		y1: root["y"],
				// 		x2: root["x"],
				// 		y2: root["y"],
				// 		stroke: color,
				// 		// "stroke-opacity": 1,
				// 		// "stroke-opacity": 0.01*Math.random(),
				// 		"stroke-opacity": 0.4*Math.random(),
				// 		// "stroke-dasharray": "2 2",
				// 		// "stroke-width": 1*Math.random() + "px"
				// 		"stroke-width": 0.5*Math.random() + "px"
				// 		// "stroke-width": "1px"
				// 	}, this.getDomID());	

				visited[city] = true
				this.cityColor[city] = color
				// this.renderLabel(offset, this.encode(city), color)
				// this.renderLabel(offset, city, color)

				if (depth < 10) {
					this.spanningTree(offset, data, depth+1, visited)
				}

			}

		}

	}

	render() {	

		drawRectangle([0,0], xmax, ymax, "#1e2225", this.getDomID())

		var data = getCitiesData()
		// var data = getEUPoints()

		var belgrade = this.getOffset({
			"lat": "44.8186",
			"lon": "20.4680"
		})

		var lastOffset = null

		// filter cities to eu only
		var reducedMap = []

		for (var i=0; i<data.length; i++) {
			if (data[i]["lat"] > 34 && data[i]["lat"] < 60 && data[i]["lon"] > -10 && data[i]["lon"] < 40 && data[i]["country"] != "Kosovo") {
				reducedMap.push(data[i])
			}
		}

		data = reducedMap

		// var numCities = data.length
		var numCities = 100

		this.spanningTree(belgrade, data.slice(0,numCities), 0, {})

		// render all cities as dots
		for (var i=0; i<data.length; i++) {
			var offset = this.getOffset(data[i])
			var color = randomPantoneHex()
			var opacity = data[i]["population"]/500000
			circle({
				cx: offset["x"],
				//cx: -xmax*0.5+timeSlide(1000, 2*xmax)+offset["x"],
				cy: offset["y"],
				r: 1 + data[i]["population"]/1500000,
				// r: 0.9 + 0.2*Math.random(),
				fill: this.cityColor[data[i]["city"]] ? this.cityColor[data[i]["city"]] : randomPantoneHex(),
				opacity: opacity,
				"transform": "rotate(0 0 0)",
				style: "stroke-width:0"
				// filter: "url(#f1)"
			}, this.getDomID());	
		}
	

		//this.renderLabel(belgrade, "Belgrade", "#fff")

		// this.spanningTree(belgrade, data.sort((a, b) => a["population"] - b["population"]).slice(0,100), 0, {})

		// // preseed random belgrade paths
		// for (var i=0; i<20; i++) {
		// 	var offset = this.getOffset(data[i])
		// 		line({
		// 			x1: offset["x"],
		// 			y1: offset["y"],
		// 			x2: belgrade["x"],
		// 			y2: belgrade["y"],
		// 			stroke: randomPantoneHex(),
		// 			// "stroke-opacity": 1,
		// 			"stroke-opacity": 0.5*Math.random(),
		// 			// "stroke-dasharray": "2 2",
		// 			"stroke-width": "1px"
		// 		}, this.getDomID());	
		// }

		// // render travel path
		// for (var i=0; i<Math.min(numCities, data.length); i++) {

		// 	if (Math.random() < 1.0) {
		// 		var offset = this.getOffset(data[i])
		// 		var color = randomPantoneHex()

		// 		if (nearest[i]) {
		// 			line({
		// 				x1: nearest[i]["x"],
		// 				y1: nearest[i]["y"],
		// 				x2: offset["x"],
		// 				y2: offset["y"],
		// 				stroke: color,
		// 				// "stroke-opacity": 1,
		// 				"stroke-opacity": 1*Math.random(),
		// 				// "stroke-dasharray": "2 2",
		// 				"stroke-width": "1px"
		// 			}, this.getDomID());	
		// 		} 

		// 	if (data[i]["population"]) {
		// 			var opacity = data[i]["population"]/100000
		// 			circle({
		// 				cx: offset["x"],
		// 				//cx: -xmax*0.5+timeSlide(1000, 2*xmax)+offset["x"],
		// 				cy: offset["y"],
		// 				r: 0.8 + data[i]["population"]/800000,
		// 				fill: color,
		// 				opacity: opacity,
		// 				"transform": "rotate(0 0 0)",
		// 				style: "stroke-width:0"
		// 				// filter: "url(#f1)"
		// 			}, this.getDomID());	

		// 			this.renderLabel(offset, data[i]["city"], color)					

		// 			lastOffset = offset
		// 		}
		// 	}
		// }


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default BelgradeMap6;
