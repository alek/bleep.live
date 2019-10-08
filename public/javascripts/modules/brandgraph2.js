//
// Simple module demonstration
//

import Module from '../lib/module.js'

class BrandGraph2 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_8", 50],
			"g": ["cc_9", 50],
			"b": ["cc_10", 0],
			"opacity": ["cc_11", 64]
		})
	}

	render() {	

		var rendered = {}
		var locations = {}
		var count = 0
		var lines = 0
		var targetMfg = "Texas Instruments"
		var circleAngle = 0

		for (var email in brandGraph) {
			var userNode = rndcoord()
			drawCircle(userNode, 1, "rgba(255,255,255,0.5)", this.getDomID())
			for (var mfg in brandGraph[email]) {
				if (!rendered[mfg] && count < 50) {
					var coord = rndCoordMargin(0.1)
					// var coord = getCircleCoord(xmax/2, ymax/2, circleAngle, 500)
					// var coord = [(20 + circleAngle*10)%xmax, ymax/2 + (100 - Math.random()*200)]
					circleAngle += 4
					locations[mfg] = coord
					if (mfg == targetMfg) {
						drawCircle(coord, 3, "rgba(204,0,0,1)", this.getDomID())
					} else {
						drawCircle(coord, 3, "#fff", this.getDomID())
					}
					drawText([coord[0], coord[1] - 10], mfg, "8px", "#fff", 500, 0, "Futura", this.getDomID())
					rendered[mfg] = true
					count++
				}
				if (locations[mfg] && lines < 1000) {
					// drawLine(userNode, locations[mfg], "rgba(255,255,255," + (0.01 * brandGraph[email][mfg]) + ")", 1, this.getDomID())
					if (mfg == targetMfg) {
						// drawLine(userNode, locations[mfg], "rgba(255,0,0,0.15)", 1, this.getDomID())
							line({
								x1: userNode[0],
								y1: userNode[1],
								x2: locations[mfg][0],
								y2: locations[mfg][1],
								stroke: "rgba(228,101,104,0.2)",
								"transform": "rotate(0 0 0)",
								"stroke-width": 1
								// "style": "filter: url(#glow)"
							}, this.getDomID());

					} else {
						drawLine(userNode, locations[mfg], "rgba(255,255,255,0.1)", 1, this.getDomID())
						 // drawLine(userNode, locations[mfg], "rgba(255,255,255," + (Math.min(0.02*brandGraph[email][mfg], 0.3)) + ")", 1, this.getDomID())
					}
					lines++
				}
			}
			if (lines > 100) {
				break
			}
		}
	}

	update(event) {
			super.update(event)

			if (event != null) {
				this.setBackgroundColor(getParametricColor(this.params))
			}

			this.clear()
			this.render()
		}

}

export default BrandGraph2;
