//
// abstract infographics-like viz
//

import Module from '../lib/module.js'

class Abstract3 extends Module {

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
			"count": ["cc_16", 1],
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
			// "stroke-dasharray": "100 100",
			style: "fill:none;stroke:#fff;stroke-width:" + this.params["width"]
		})

		document.getElementById(this.getDomID()).appendChild(rootEl)

	}

	// initial render
	render() {	
		this.setBackgroundColor("rgba(255,255,255," + this.params["opacity1"]/100 + ")")
		for (var i=0; i<this.params["count"]; i++) {
		this.renderPolygon()
		this.renderPolygon()
	}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		// this.clear()
		// this.render()
		var polygons = document.getElementsByTagName('polygon');
		var circles = document.getElementsByTagName('circle');
		for (var z=0; z<circles.length; z++) {
			circles[z].remove();
		}
		for (var i=0; i<polygons.length; i++) {
			for (var j=0; j<polygons[i].points.length; j++) {
				// console.log(polygons[i].points[j].x)
				// if (Math.random() < 0.9) {
					polygons[i].points[j].x += (0.5-Math.random())*100
					polygons[i].points[j].y += (0.5-Math.random())*100
					drawCircle([polygons[i].points[j].x, polygons[i].points[j].y], 4, "#fff", this.getDomID())
				// }
			}
			// var val = parseInt(lines[i].attributes["stroke-width"].value)
		 // 	lines[i].attributes["stroke-width"].value = this.params["weight"]
		}
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.setBackgroundColor(getParametricColor(this.params,2))
		}

		if ((event != null) && (event.knob == "cc_5" || event.knob == "cc_16" )) {
			this.clear();
			this.render();
		}

	}

}

export default Abstract3;
