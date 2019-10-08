//
// abstract infographics-like viz
//

import Module from '../lib/module.js'

class Abstract1 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 50],
			"r1": ["cc_2", 85],
			"g1": ["cc_3", 29],
			"b1": ["cc_4", 65],
			"r2": ["cc_10", 0],
			"g2": ["cc_11", 24],
			"b2": ["cc_12", 24],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"duration": ["cc_9", 100],
			"animate": ["cc_13", 0],
			"width": ["cc_5", 1],
			"count": ["cc_16", 6],
			"vertices": ["cc_6", 6],
			"fontsize": ["cc_7", 8]
		})
	}

	renderPolygon() {

		var vertices = this.params["vertices"]			// number of polygon vertices
		var radius = this.params['r']*10*Math.random() 	// polygon radius

		var coords = []									// polygon coordinates
		var angles = randomPartition(1.0, vertices)		// polygon angles

		// generate polygon

		for (var i=0; i<vertices; i++) {
			var angle = sum(angles.slice(0,i))*Math.PI*2
			var x = xmax/2 + Math.cos(angle)*radius
			var y = ymax/2 + Math.sin(angle)*radius
			coords.push([x,y])
		}

		// var rootVector = getRandomCoordinateVector(this.params["count"], xmax, ymax)
		// var color = getParametricColor(this.params,1)
		this.setBackgroundColor(getParametricColor(this.params,2))
		
		var color = "#262b2f"
		// this.setBackgroundColor("#dce0d6")
	
		// generate base polygon		
		var rootEl = addSVG("polygon", {
			points: coords.map(x => x.join(",")).join(" "),
			style: Math.random() < 0.5 ? "fill:" + color + ";stroke:none;stroke-width:0" : "fill:none;stroke:#262b2e;stroke-width:" + this.params["width"]
		})

		document.getElementById(this.getDomID()).appendChild(rootEl)


		for (var i=0; i<coords.length; i++) {
			// drawCircle(coords[i], 10, color, this.getDomID())
			// drawText(coords[i], i.toString(), "8px", "#fff", 500, 0, this.getDomID())
			drawText(coords[i], tractatus[Math.floor(Math.random()*20)], this.params["fontsize"] + "px", "#fff", 100, "6px", "Avenir", this.getDomID())
			var angle = (sum(angles.slice(0,i)) + Math.random()*0.5) *Math.PI*2
			var x = xmax/2 + Math.cos(angle)*radius*3
			var y = ymax/2 + Math.sin(angle)*radius*3

			// drawPolygon([coords[i], getRandomCoord(xmax,ymax), coords[i+1]], "#13f", this.getDomID());
			drawPolygon([coords[i], [x,y], coords[i+1]], getParametricColor(this.params,1), this.getDomID());
		}

	}

	// initial render
	render() {	
		this.setBackgroundColor("rgba(255,255,255," + this.params["opacity1"]/100 + ")")
		this.renderPolygon()
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Abstract1;
