//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Sample extends Module {

	constructor() {
		super({	// init params mapping
			"r": ["cc_1", 50]
		})
	}

	// initial render
	render() {	

		var el = addSVG("circle", {
			cx: xmax/2,
			cy: ymax/2,
			r: this.params["r"],
			stroke: "none",
			fill: randomPantoneHex(),
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
	update(event) {
		var knob = event['knob']
		var paramName = this.wiring[knob]
		var el = document.getElementById(this.getDomID())
		// el.childNodes[0][paramName]['baseVal']['value'] = event['value']
	}

}

export default Sample;
