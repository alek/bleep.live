//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'
import { getCNYData } from '../../dataset/cny_class.js'

class CNY1 extends Module {

	constructor() {
		super({	// init params mapping
			"r1": ["cc_6", 20]			// right hand 1. finger (thumb)     
		})
		this.palette = ["#9BABBB", "#B18EB9", "#FADE85", "#F9D857", "#4CB560", "#CCDB1F", "#009B8C", "#0084BD",     "#EE819F", "#F56733", "#D94F70", "#CD212A"]		
		// this.palette = ["#B856AB", "#7AAAD5", "#9BD56B", "#BBFF04", "#E0C003", "#FF8202", "#FF4146", "#FF018A"]
	}

	// get color from the percentage value
	getColor(val) {
		return this.palette[Math.min(Math.floor(Math.abs(val)/32), this.palette.length-1)]
		// return "#fff"
		// var alpha = Math.min(Math.abs(val)/300, 1)
		// return "rgba(200,200,200," + alpha + ")"
	}

	render() {	

		// drawRectangle([0,0], xmax, ymax, "#1D1D1B", this.getDomID())
		
		var data = getCNYData()		
		var keys = Object.keys(data[0])

		// sort & filter keys
		keys = keys.sort()
		keys = keys.filter(function(val) {
			return val != "Unknown" && val != "RC Networks"
		})

		// calculate 2020 jumps & sort by it

		var jumps = {}
		for (var i=0; i<keys.length; i++) {
			var last = data.slice(-1)[0][keys[i]]
			var preLast = data.slice(-2)[0][keys[i]]
			var jump = (last/preLast)*100 - 100
			jumps[keys[i]] = jump
		}

		keys = keys.sort(function(a,b) {
			return jumps[b] - jumps[a]
		})

		var xoffset = 250
		var yoffset = 150

		// draw labels
		var labels = ["2018 drop", "2018 jump", "", "2019 drop", "2019 jump", "", "2020 drop", "2020 jump", ""]
		//var labels = ["2018 before", "2018 during", "2018 after", "2019 before", "2019 during", "2019 after", "2020 before", "2020 during", "2020 after"]

		for (var i=0; i<labels.length; i++) {
			drawText([xoffset + 20 + (i)*60, yoffset-40], labels[i], "8px", "#fff", 100, 0, "JetBrains Mono", this.getDomID(), "start")					
		}

		// draw legend
		drawText([xoffset + 20, ymax*0.8 - 20], "LEGEND", "10px", "#808080", 100, 4, "JetBrains Mono", this.getDomID(), "start")

		for (var i=0; i<this.palette.length; i++) {
		
			var ydelta = 0
			if (i < this.palette.length/2) {
				ydelta = 25
			} 

			drawCircle([xoffset + 20 + (i%6)*90, ymax*0.83 - ydelta], 5, this.palette[i], this.getDomID())
			drawText([xoffset + 15 + (i%6)*90 + 20, ymax*0.83+3 - ydelta], i*32 + "% " + ((i < this.palette.length -1) ? " - " + (i+1)*32 + "%" : " +"), "8px", "#fff", 100, 0, "JetBrains Mono", this.getDomID(), "start")
		}

		for (var i=0; i<keys.length; i++) {
			var key = keys[i]
			var cc = "#fff"
			// drawText([xoffset, yoffset+i*20], key, "12px", "#fff", 100, 0, "JetBrains Mono", this.getDomID(), "end")
			for (var j=0; j<data.length; j++) {
				// var val = data[j][key]
				// drawText([xoffset + 20 + j*60, yoffset+i*20], val, "12px", randomPantoneHex(), 100, 0, "JetBrains Mono", this.getDomID(), "start")
				if (((j+1)% 3) == 0) {

					// render stats for a given year
					var drop = (data[j-1][key]/data[j-2][key])*100 - 100
					var jump = (data[j][key]/data[j-1][key])*100 - 100

					// // render chart
					var baseOffset = [xoffset + 20 + (j)*60, yoffset+i*20]

					// drawText(baseOffset, "A", "12px", "#fff", 100, 0, "JetBrains Mono", this.getDomID(), "start")					
					var path = [ [baseOffset[0],  baseOffset[1]],
								 [baseOffset[0]+20,  baseOffset[1] - drop/20],
								 [baseOffset[0]+40,  baseOffset[1] - Math.min(jump/20,20)]
					]


					// drawPath(path.slice(0,2), "#fff", "1px", this.getDomID())
					for (var c = 0; c < path.length; c++) {
						var circleColor = "#fff"
						if (c == 1) {
							circleColor = this.getColor(drop)
							drawPath(path.slice(0,2), circleColor, "1px", this.getDomID())
						} else if (c == 2) {
							circleColor = this.getColor(jump)
							drawPath(path.slice(1,3), circleColor, "1px", this.getDomID())
						}
						drawCircle(path[c], 2, circleColor, this.getDomID())
					}



					// var path = [data[j-2][key], data[j-1][key], data[j][key]]
					// console.log(path)
					
					drawText([xoffset + 20 + (j-2)*60, yoffset+i*20], drop.toFixed(2), "12px", this.getColor(drop), 100, 0, "JetBrains Mono", this.getDomID(), "start")					
					drawText([xoffset + 20 + (j-1)*60, yoffset+i*20], jump.toFixed(2), "12px", this.getColor(jump), 100, 0, "JetBrains Mono", this.getDomID(), "start")



					// drawText([xoffset + 20 + (j-2)*60, yoffset+i*20], data[j-2][key], "12px", "#fff", 100, 0, "JetBrains Mono", this.getDomID(), "start")					
					// drawText([xoffset + 20 + (j-1)*60, yoffset+i*20], data[j-1][key], "12px", "#fff", 100, 0, "JetBrains Mono", this.getDomID(), "start")
					// drawText([xoffset + 20 + (j)*60, yoffset+i*20], data[j][key], "12px", "#fff", 100, 0, "JetBrains Mono", this.getDomID(), "start")

					// console.log(j)
					cc = this.getColor(jump)
				}
			}
			drawText([xoffset, yoffset+i*20], key, "12px", cc, 100, 0, "JetBrains Mono", this.getDomID(), "end")
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default CNY1;
