//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getCovidPapers } from '../../dataset/covidpapers.js'

class CovidPapers1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	render() {	
		var data = getCovidPapers()
		var keywords = {}

		for (var i=0; i<data.length; i++) {
			// console.log(data[i])
			var tokens = data[i]["title"].split(" ")
			for (var j=0; j<tokens.length; j++) {
				let token = tokens[j]
				if (!keywords[token]) {
					keywords[token] = 0
				}
				keywords[token]++
			}

			// drawText([40, 30*i], data[i]["title"], "21px", "#fff", 300, 0, "Helvetica", this.getDomID(), "start")
		}
		// console.log(keywords)
		var keys = Object.keys(keywords)
		keys = keys.sort(function(first, second) { 
			return keywords[second] - keywords[first]
		})

		for (var i=0; i<Math.min(keys.length,40); i++) {
			if (keys[i].length > 3) {	
				var coord = getRandomCoord(xmax,ymax,xmax*0.1)
				drawText(coord, keys[i], "24px", "#fff", 700, 0, "Helvetica", this.getDomID(), "start")
				drawText([coord[0], coord[1]+20], data[i]["title"].substring(0,20).toUpperCase(), "14px", "#fff", 300, 0, "Helvetica", this.getDomID(), "start")
				drawText([coord[0], coord[1]+35], data[i]["title"].substring(20,40).toUpperCase(), "14px", "#fff", 300, 0, "Helvetica", this.getDomID(), "start")
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

export default CovidPapers1;
