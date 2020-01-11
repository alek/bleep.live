//
// EU Grid - Now with more Canvas! :)
// 

import Module from '../../lib/module.js'
// import { getCitiesData } from '../../dataset/cities.js'
import { getCitiesData } from '../../dataset/cities_full.js'
// import { getEUPoints } from '../../dataset/eu_cities.js'

// import { getSphericalMercator } from '../../external/sphericalmercator.js'
import { SphericalMercator } from '../../external/sphericalmercator.js'

class BelgradeMap8 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.labels = []
		this.cityColor = {}
		this.merc = new SphericalMercator({
    		size: ymax
		});
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

	mercLatlonToPix(data, scale) {
		return this.merc.px([data["lon"], data["lat"]], scale)
	}

	getOffset(data) {
		var scale = 2.9
		var coord = this.mercLatlonToPix(data, scale)
		var anchor = this.mercLatlonToPix({"lat": "63.0","lon": "-20"}, scale)
		return {
			"x": coord[0] - anchor[0],
			"y": coord[1]-anchor[1]
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

		drawText(candidates[maxIndex], text.toUpperCase(), "8px", color, 100, 0, "PT Mono", this.getDomID())
		this.labels.push(candidates[maxIndex])

	}

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
				// var color = randomPantoneHex()
				var color = "rgba(255,255,255,0.3)"

				line({
					x1: offset["x"],
					y1: offset["y"],
					x2: root["x"],
					y2: root["y"],
					stroke: color,
					// "stroke-opacity": 1,
					// "stroke-opacity": 0.01*Math.random(),
					"stroke-opacity": 0.1 + 0.4*Math.random(),
					// "stroke-dasharray": "2 2",
					// "stroke-width": 1*Math.random() + "px"
					"stroke-width": 0.2 + 0.5*Math.random() + "px"
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
		this.setupCanvas();
		var ctx = this.getCanvasContext();

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
		var numCities = 1000

		this.spanningTree(belgrade, data.slice(0,numCities), 0, {})

		// render all cities as dots
		for (var i=0; i<data.length; i++) {
			var offset = this.getOffset(data[i])	
			// var color = randomPantoneHex()
			var opacity = data[i]["population"]/500000

			// add canvas circle
			ctx.beginPath();
			ctx.arc(offset["x"], offset["y"], 0.1 + data[i]["population"]/1500000, 0, 2 * Math.PI, false);
			// ctx.fillStyle = this.cityColor[data[i]["city"]] ? this.cityColor[data[i]["city"]] : "#fff";
			ctx.fillStyle = "rgba(231, 177, 47, 1)"
			// ctx.fillStyle = "rgba(12,42," + Math.random()*65 + ",1)";
			// ctx.fillStyle = (Math.random() > 0.1) ? "rgba(252,185,6,1)" : "#cc0100";
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgba(231, 177, 47, " + Math.random() + ")"
      		// ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      		ctx.stroke();

      		// this.renderLabel(offset, data[i]["city"], "#fff")

		}
	
		// this.renderLabel(belgrade, "Belgrade", "#fff")
		// this.renderLabel(belgrade, "[44.78,20.45]", "#fff")

		// this.spanningTree(belgrade, data.sort((a, b) => a["population"] - b["population"]).slice(0,100), 0, {})

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default BelgradeMap8;
