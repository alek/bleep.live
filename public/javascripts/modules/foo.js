import Module from './module.js'

class Foo extends Module {
	render() {	

		var lineCount = this.getMidiValue("cc_1", 50)
		var maxWidth = this.getMidiValue("cc_2", 50)
		var maxLineWeight = this.getMidiValue("cc_3", 2)
		var dashArray = this.getMidiValue("cc_4", 20)
		var animationDuration = this.getMidiValue("cc_5", 20)
		var dashOffsetMax = this.getMidiValue("cc_6", 100)

		for (var line = 0; line < lineCount; line++) {
			var state = 0
			var path = [[0, this.getYmax()/2]]
			for (var i=0; i<50; i++) {
				var last = path.slice(-1)[0] 
				var length = 50 + Math.random()*maxWidth
				switch(state) {
					case 0:
						path.push([last[0] + length, last[1]])
						break;
					case 1:
						path.push([last[0] + length, last[1] - length])
						break;
					case 2:
						path.push([last[0] + length, last[1] + length])
				}
				state = this.getNextState(state)
			}
			var el = addSVG("path", {
				d: "M" + path.map(x => x.join(" ")).join(" L") + "",
				"stroke-dasharray": dashArray,
				style: "fill:none;stroke:" + randomPantoneHex() + ";stroke-width:" + maxLineWeight*Math.random()
			})

			el.appendChild(addSVG("animate", {
				attributeName: 'stroke-dashoffset',
				attributeType: 'XML',
				from: dashOffsetMax*20,
				to: 0,
				dur: animationDuration*2000 + 'ms',
				"animation-timing-function": "ease-in",
				"animation-fill-mode": "forwards",
				repeatCount: 'indefinite'
			}));

			// el.appendChild(addSVG("animate", {
			// 	attributeName: 'd',
			// 	attributeType: 'XML',
			// 	// from: "M 100 100 200 400 30 1 0 600 200 300 100 45 0 1 -300 200",
			// 	from: "M" + path.slice(0,20).map(x => x.join(" ")).join(" L") + "",
			// 	// to: "M 300 600 300 400 -20 1 0 400 200 200 600 -50 0 1 100 400",
			// 	to: "M" + path.map(x => x.join(" ")).join(" L") + "",
			// 	dur: "2s",
			// 	repeatCount: 'indefinite',
			// 	fill: "freeze"
			// }));

			// drawPath(path, "#fff", maxLineWeight*Math.random())

			super.render(el)

		}

	}
}

export default Foo;
