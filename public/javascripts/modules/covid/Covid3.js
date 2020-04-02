//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getCovidData } from '../../dataset/covid.js'

class Covid3 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.scale = ["63,177,159", "244,190,44", "241,121,84", "192,69,116"]
	}

	getColor(intensity) {
		// return "rgba(" + this.scale[Math.min(this.scale.length-1, Math.floor(intensity/1000))] + "," + Math.min(intensity/100,1) + ")"
		// if (intensity < 0) { intensity = 0 }
		// console.log(intensity + "\t" + parseInt(intensity) + "\t" + this.scale[Math.min(this.scale.length-1, Math.floor(intensity/1000))])
		return "rgb(" + this.scale[Math.min(this.scale.length-1, Math.floor(intensity/1000))] + ")"
	}

	getOpacity(intensity) {
		return Math.min(intensity/100,1)
	}

	drawCircle = function(coord, r, fill, domID, id,opacity) {
		circle({
			cx: coord[0],
			cy: coord[1],
			r: r,
			stroke: "#fff",
			fill: fill,
			"transform": "rotate(0 0 0)",
			style: "stroke-width:0",
			opacity: opacity,
			id: (id == null) ? randomID(): id
		}, domID);	
	}

	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, align, angle) {
	if (align == null) {
		align = "middle"
	}
	if (angle == null) {
		angle = 0
	}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(" + angle + " " + coord[0] + " " + coord[1] + ")",
			"style": "font-size:" + size + ";text-align:center;alignment-baseline:" + align + ";text-anchor:" + align + ";opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content.toString(), domID); 
	}
	render() {

		drawRectangle([0,0], xmax, ymax, "#16120F", this.getDomID())
		var data = getCovidData()		
		var xoffset = 150
		var yoffset = 100

		var offsets = {}
		var auxCnt = 0
		var lastCounts  = {}
		var lastDeltas = {}

		for (var i=0; i<data.length; i++) {
			this.drawText([xoffset + i*20, yoffset], data[i]['date'], "9px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), "start", -45)
			var entries = data[i]['entries']
			var counts = {}
			var deltas = {}
			for (var j=0; j<entries.length; j++) {

				// march 23 format change
				if (entries[j]['Country_Region']) {		
					entries[j]['Country/Region'] = entries[j]['Country_Region']
				}

				if (entries[j]['Province_State']) {		
					entries[j]['Province/State'] = entries[j]['Province_State']
				}

				var country = entries[j]['Country/Region']

				if (country == "Mainland China") {
					country = "China"
				}
				if (entries[j]['Province/State'] == "Hong Kong") {
					country = "Hong Kong"
				}
				if (entries[j]['Province/State'] == "Macau") {
					country = "Macau"
				}
				if (entries[j]['Country/Region'] == "Taiwan*") {
					country = "Taiwan"
				}
				if (entries[j]['Country/Region'] == "Korea, South") {
					country = "South Korea"
				}
				if (entries[j]['Country/Region'] == "United Kingdom") {
					country = "UK"
				}
				if (country == "Others" || country == "Ivory Coast") {		// skip "Others"
					continue
				}
				if (!counts[country]) {
					counts[country] = 0
				}
				if (!offsets[country]) {
					offsets[country] = auxCnt++
				}
				if (entries[j]["Confirmed"] != null) {
					counts[country] += parseInt(entries[j]["Confirmed"])
				}
			}

			for (var k in counts) {
				var offset = offsets[k]
				var r = 1 + Math.log(counts[k]+1)*0.6
				if (lastCounts[k] && counts[k]) {
					var delta = counts[k] - lastCounts[k]
					deltas[k] = delta
					this.drawCircle([xoffset + i*20, yoffset+20 + offset*16+6], r,this.getColor(delta), this.getDomID(), null, this.getOpacity(delta))
					//this.drawText([xoffset + i*20, yoffset+20 + offset*16+10], delta, "6px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), "start")		
					//this.drawText([xoffset + i*20, yoffset+20 + offset*16+10], data[i]['date'].split("-")[1], "6px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), "start")		
				}
			}
			if (Object.keys(counts).length > 1 || i < 10) {	// hack
				lastCounts = counts
				lastDeltas = deltas
			}
		}
		var cnt = 0
		for (var k in offsets) {
			// this.drawText([xoffset-20, yoffset+20 + offsets[k]*16+10], k, "12px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), "end")
			// var color = this.getColor(lastDeltas[k])
			var color = "#317E71"
			if (lastDeltas[k]) {
				color = this.getColor(lastDeltas[k])
			}

			// console.log(color)
			// this.drawText([xoffset-20, yoffset+20 + offsets[k]*16+10], cnt++, "8px", "#808080", 100, 0, "Roboto Mono", this.getDomID(), "end")
			this.drawText([xoffset + data.length*20 + 5, yoffset+20 + offsets[k]*16+10], k + " (" + (lastCounts[k] != null ? lastCounts[k].toLocaleString() : "") + ")", "10px", color, 100, 0, "Roboto Mono", this.getDomID(), "start")
		}

	}


	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Covid3;
