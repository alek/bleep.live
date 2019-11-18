//
// cell-like slow moving system
//

import Module from '../../lib/module.js'

class Bounce extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 1],
			"r1": ["cc_2", 0],
			"g1": ["cc_3", 0],
			"b1": ["cc_4", 0],
			"r2": ["cc_10", 255],
			"g2": ["cc_11", 255],
			"b2": ["cc_12", 255],
			"opacity1": ["cc_14", 100],
			"opacity2": ["cc_15", 100],
			"duration": ["cc_9", 100],
			"animate": ["cc_13", 0],
			"width": ["cc_5", 1],
			"count": ["cc_16", 100],
		})
	}

	renderCircle(xoffset, yoffset, id) {
		var el = addSVG("circle", {
			cx: xoffset,
			cy: yoffset,
			r: this.params["r"]*(xmax/128),
			stroke: "none",
			fill: getParametricColor(this.params, id),
			style: "stroke-width:0",
		});

		document.getElementById(this.getDomID()).appendChild(el)
		
		if (this.params["animate"] != 0) {
			el.appendChild(addSVG("animate", {
				attributeName: 'cx',
				attributeType: 'XML',
				from: xoffset,
				to: xoffset*3*Math.random(),
				dur: this.params["duration"]*400 + 'ms',
				repeatCount: 'indefinite'
			}));
		}
	}

	// initial render
	render() {	
		for (var i=0; i<this.params["count"]*3; i++) {
			this.renderCircle(xmax*Math.random(), ymax*Math.random(), Math.ceil(Math.random()*2))
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

export default Bounce;
