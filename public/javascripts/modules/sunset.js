//
// Sunset
// pulsating gradient circle with outliers
//

import Module from '../lib/module.js'

class Sunset extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 15],
			"r1": ["cc_2", 85],
			"g1": ["cc_3", 29],
			"b1": ["cc_4", 65],
			"r2": ["cc_10", 4],
			"g2": ["cc_11", 24],
			"b2": ["cc_12", 91],
			"duration": ["cc_9", 100],
			"animate_1": ["cc_13", 0],
			"animate_2": ["cc_14", 0],
			"width": ["cc_5", 1],
			"opacity": ["cc_6", 0],
		})
	}

	// initial render
	render() {	

		setupParametricGradient("grad2", this.getDomID(), this.params)
		this.setBackgroundColor("rgba(255,255,255," + this.params["opacity"]/100 + ")")

		// main circle

		var el = addSVG("circle", {
			cx: xmax/2,
			cy: ymax/2,
			r: this.params["r"]*(xmax/128),
			stroke: "none",
			fill: "url(#grad2)",
			style: "stroke-width:0",
		});

		document.getElementById(this.getDomID()).appendChild(el)
		
		if (this.params["animate_1"] != 0) {
			el.appendChild(addSVG("animate", {
				attributeName: 'r',
				attributeType: 'XML',
				from: this.params["r"],
				to: this.params["r"]*(xmax/128)*1.3,
				dur: this.params["duration"]*400 + 'ms',
				repeatCount: 'indefinite'
			}));
		}

		// outer rings

		for (var i=0; i<10; i++) {

			var rVal = this.params["r"]*(xmax/128)*(1.138+i*0.1)

			el = addSVG("circle", {
				cx: xmax/2,
				cy: ymax/2,
				r: rVal,
				stroke: "url(#grad2)",
				fill: "none",
				style: "stroke-width:" + this.params["width"],
			});

			if (this.params["animate_2"] != 0) {
				el.appendChild(addSVG("animate", {
					attributeName: 'r',
					attributeType: 'XML',
					from: rVal,
					to: rVal*2,
					dur: this.params["duration"]*400 + 'ms',
					repeatCount: 'indefinite'
				}));
			}
			document.getElementById(this.getDomID()).appendChild(el)

		}


		// super.render(el)

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()

		// var knob = event['knob']
		// var paramName = this.wiring[knob]
		// var el = document.getElementById(this.getDomID())
		// el.childNodes[0][paramName]['baseVal']['value'] = event['value']
	}

}

export default Sunset;
