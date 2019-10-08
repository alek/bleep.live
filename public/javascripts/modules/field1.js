//
// abstract infographics-like viz
//

import Module from '../lib/module.js'

class Field1 extends Module {

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
			"opacity2": ["cc_15", 84],
			"duration": ["cc_9", 100],
			"animate": ["cc_13", 0],
			"width": ["cc_5", 1],
			"count": ["cc_16", 16],
			"vertices": ["cc_6", 6],
			"length": ["cc_7", 25]
		})
		this.counter = 0 
	}

	// initial render
	render() {	

		// this.setBackgroundColor("rgba(255,255,255," + this.params["opacity1"]/100 + ")")
		// this.renderPolygon()

		this.setBackgroundColor(getParametricColor(this.params,2))

		var rowElements = Math.sqrt(this.params["count"])

		for (var i=0; i<rowElements; i++) {

			for (var j=0; j<rowElements; j++) {

				var spacing = 1/(1+rowElements)

				var xoffset = xmax*(spacing*(1+i))
				var yoffset = ymax*(spacing*(1+j))

				var color = randomPantoneHex()
				drawCircle([xoffset, yoffset], 3, "#fff", this.getDomID())

				var el = addSVG("line", {
					x1: xoffset-this.params["length"]*4,
					y1: yoffset,
					x2: xoffset+this.params["length"]*4,
					y2: yoffset,
					stroke: color,
					// fill: randomPantoneHex(),
					// fill: "red",
					style: "stroke-width:" + this.params["width"],
				});

				var startAngle = Math.random()*360

				var transformEl = addSVG("animateTransform", {
						attributeName: "transform",
                        attributeType: "XML",
                        type: "rotate",
                        from: startAngle + " " + xoffset + " " + yoffset,
                        to: (360 + startAngle) + " " + xoffset + " " + yoffset,
                        dur: "10s",
                        repeatCount: "indefinite"
				})

				el.appendChild(transformEl)
				document.getElementById(this.getDomID()).appendChild(el)


			}

		}


		// super.render(el)
	}

	// state update as a result of a midi event
	update(event) {

		// var el = document.getElementById(this.getDomID())
		// // console.log(el.childNodes[0].transform.baseVal)
		// el.childNodes[0].transform.baseVal[0]['angle'] = Math.random()*360
		// console.log(el.childNodes[0].transform.baseVal[0]['angle'])
		// console.log(el.childNodes[0].transform)
		// el["transform"].baseVal[0]["matrix"]["a"] += 0.1;

		// console.log(el)			
		// el.childNodes[0].transform.baseVal[0]["angle"] += 0.01
		// for (var i=0; i<el.childNodes.length; i++) {
		// 	el.childNodes[i].transform.baseVal[0]["matrix"]["a"] += 0.001
		// 	el.childNodes[i].transform.baseVal[0]["matrix"]["d"] += 0.001
		// 	el.childNodes[i].transform.baseVal[0]["matrix"]["b"] += 0.001
		// }

		// // console.log(el.childNodes[0].attributes[0].nodeValue)
		// var nodeValue = el.childNodes[0].attributes[0].nodeValue
		// el.childNodes[0].attributes[0].nodeValue = "rotate(" + this.counter++ + " " + xmax/2 + " " + ymax/2 + ")"
		// // console.log(el.childNodes[0].attributes[0].nodeValue)

		super.update(event)
		
		if ((event != null) && ["cc_10", "cc_11", "cc_12", "cc_15"].includes(event.knob)) {
			this.setBackgroundColor(getParametricColor(this.params,2))
		} else {
			this.clear()
			this.render()
		}
	}

}

export default Field1;
