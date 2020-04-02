//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getCovidData } from '../../dataset/covid.js'

class Covid1 extends Module {

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

		// return "rgba(244,190,44," + intensity/100 + ")"

		// return "rgba(" + this.scale[Math.floor(Math.random()*this.scale.length)] + "," + Math.min(intensity/100,1) + ")"
		return "rgba(" + this.scale[Math.min(this.scale.length-1, Math.floor(intensity/1000))] + "," + Math.min(intensity/100,1) + ")"
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

		for (var i=0; i<data.length; i++) {
			this.drawText([xoffset + i*18, yoffset], data[i]['date'], "8px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), "start", -45)
			var entries = data[i]['entries']
			var counts = {}
			for (var j=0; j<entries.length; j++) {
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
				if (country == "Others") {		// skip "Others"
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
			// console.log(Object.keys(counts).length)
			for (var k in counts) {
				// console.log(k + "\t" + counts[k])
				var offset = offsets[k]
				// this.drawText([xoffset + i*18, yoffset+20 + offset*10], counts[k], "8px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), "start")
				//drawRectangle([xoffset + i*18, yoffset+20 + offset*12], 9,9, "rgba(255,255,255," + counts[k]/50 + ")", this.getDomID())
				// var r = 6*(Math.min(0.2 + counts[k]/1000, 1))
				var r = 1 + Math.log(counts[k]+1)/2
				// console.log(r + "\t" + counts[k] + "\t" + k)
				drawCircle([xoffset + i*18, yoffset+20 + offset*12+6], r,this.getColor(counts[k]), this.getDomID())

				// drawRectangle([xoffset + i*18, yoffset+20 + offset*12], 9,9, randomPantoneHex(), this.getDomID())
			}
		}
		for (var k in offsets) {
			this.drawText([xoffset-20, yoffset+20 + offsets[k]*12+10], k, "8px", "#fff", 100, 0, "Roboto Mono", this.getDomID(), "end")
			// drawLine([xoffset-20, yoffset+20 + offsets[k]*12], [xoffset+xmax, yoffset+20 + offsets[k]*10], "rgba(255,255,255,0.2)", "1px", this.getDomID())
		}

		// console.log(Object.keys(offsets).length)
		// console.log(Object.keys(offsets)
		// for (var i=0; i<offsets.size; i++) {
		// }

	}


	
	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Covid1;
