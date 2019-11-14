//
// Sunset etc.
//

import Module from '../../lib/module.js'

class VectorSpace extends Module {

	constructor() {
		super({	// init params mapping
			"x1": ["cc_1", 50],
			"y1": ["cc_2", 50],
			"x2": ["cc_3", 100],
			"y2": ["cc_4", 100],
			"count": ["cc_5", 10],
			"width": ["cc_6", 20],
			"duration1": ["cc_7", 2],
			"duration2": ["cc_8", 3],
		})
	}

	// initial render
	render() {	

		for (var i = 0; i< this.params["count"]; i++) {

			var el = addSVG("line", {
				x1: xmax*Math.random() + this.params["x1"],
				y1: ymax*Math.random() + this.params["y1"],
				x2: xmax*Math.random() + this.params["x2"],
				y2: ymax*Math.random() + this.params["y2"],
				style: "stroke:rgb(255,255,255);stroke-width:" + this.params["width"]
			});

			var x1 = el['x1']['baseVal']['value'];
			var x2 = el['x2']['baseVal']['value'];
			var y1 = el['y1']['baseVal']['value'];
			var y2 = el['y2']['baseVal']['value'];

			el.appendChild(addSVG("animate", {
				attributeName: 'x1',
				attributeType: 'XML',
				from: x1,
				to: x2,
				dur: this.params["duration1"] + 's',
				repeatCount: 'indefinite'
			}));
			el.appendChild(addSVG("animate", {
				attributeName: 'y1',
				attributeType: 'XML',
				from: y1,
				to: y2,
				dur: this.params["duration2"] + 's',
				repeatCount: 'indefinite'
			}));

			document.getElementById(this.getDomID()).appendChild(el);	

		// super.render(el)

		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
		// var knob = event['knob']
		// var paramName = this.wiring[knob]
		// var el = document.getElementById(this.getDomID())
		// if (el.childNodes[0][paramName] != null) {
		// 	el.childNodes[0][paramName]['baseVal']['value'] = event['value']
		// }
	}

}

export default VectorSpace;
