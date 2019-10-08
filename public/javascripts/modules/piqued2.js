//
// Simple grid-based typographic randomization
//

import Module from '../lib/module.js'

class Piqued1 extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 20],
			"r1": ["cc_2", 255],
			"g1": ["cc_3", 255],
			"b1": ["cc_4", 255],
			"size": ["cc_5", 72/4],
			"weight": ["cc_6", 20],
			"grid_columns": ["cc_7", 24],
			"grid_rows": ["cc_8", 14],
			"pantone": ["cc_9", 0],
			"r2": ["cc_10", 38/2],
			"g2": ["cc_11", 39/2],
			"b2": ["cc_12", 37/2],
			"animate": ["cc_13", 0],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"count": ["cc_16", 16]
		})
	}

	animatedCircle(params) {
		var el = addSVG("circle", params);
		if (this.params["animate"] > 0) {
			el.appendChild(addSVG("animate", {
				attributeName: 'r',
				attributeType: 'XML',
				from: params['r'],
				transform: "rotate(0 50 100)",
				to: params['r']*2,
				dur: '10s',
				repeatCount: 'indefinite'
			}));
		}
		document.getElementById(this.getDomID()).appendChild(el);	
	}


	renderGrid() {
		for (var i=0; i<this.params["grid_columns"]; i++) {
			for (var j=0; j<this.params["grid_rows"]; j++) {
				var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}		

	renderCircle(xpos, fill) {
		this.animatedCircle({
			cx: xpos,
			cy: ymax/2,
			r: 40,
			stroke: fill,
			fill: "none",
			style: "stroke-width:" + this.params["weight"] + ";opacity:" + 1.0
		});	
	}


	render() {	
		this.setBackgroundColor(getParametricColor(this.params,2))		
		this.renderCircle(xmax*0.618, "rgba(253,225,202," + 1 + ")")
		this.renderCircle(xmax*0.382, "rgba(0,174,239," + 1 + ")")
		// this.renderGrid()
		// this.renderObjects()
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.renderCircle(xmax*Math.random(), randomPantoneHex())
			this.setBackgroundColor(getParametricColor(this.params,2))
		} else if ((event!=null) && event.knob == "cc_6") {
			// find a circle = update
			var circles = document.getElementsByTagName('circle');
		 	for (var i=0; i<circles.length; i++) {
				circles[i]["r"].baseVal.value = this.params["weight"]
		 	}
		} else if ((event!=null) && event.knob == "cc_13") {
			this.clear()
			this.render()
		} else {
			// this.clear()
			// this.render()
			var circles = document.getElementsByTagName('circle');
		 	for (var i=0; i<circles.length; i++) {
		 		var val = circles[i]["r"].baseVal.value
				circles[i]["r"].baseVal.value = (val + Math.random()*100)%255
		 	}
		}
	}

}

export default Piqued1;
