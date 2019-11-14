//
// Simple module demonstration
//

import Module from '../../lib/module.js'

class Glove1 extends Module {

	constructor() {
		super({	// init params mapping
			"radius": ["cc_8", 100],
			"r": ["cc_9", 0],
			"g": ["cc_10", 0],
			"b": ["cc_11", 0]
		})
	}

	// initial render
	render() {	

		var el = addSVG("circle", {
			cx: xmax/2,
			cy: ymax/2,
			r: parseInt(this.params["radius"])*10,
			stroke: "none",
			fill: "rgb(" + this.params["r"] + "," + this.params["g"] + "," + this.params["b"] + ")",
			// fill: "red",
			style: "stroke-width:0",
		});

		// el.appendChild(addSVG("animate", {
		// 	attributeName: 'r',
		// 	attributeType: 'XML',
		// 	from: this.params["r"],
		// 	to: this.params['r']*3,
		// 	dur: 2000 + 'ms',
		// 	repeatCount: 'indefinite'
		// }));

		super.render(el)

	}

	// state update as a result of a midi event
	// update(event) {
	// 	var knob = event['knob']
	// 	var paramName = this.wiring[knob]
	// 	var el = document.getElementById(this.getDomID())
	// 	// el.childNodes[0][paramName]['baseVal']['value'] = event['value']
	// }

	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Glove1;
