//
// DNA Flow Module
//

import Module from '../../lib/module.js'

class DNA extends Module {

	constructor() {
		super({	// init params mapping
			"lineCount": ["cc_9", 50],
			"maxWidth": ["cc_2", 50],
			"maxLineWeight": ["cc_3", 2]
		})
		this.tMatrix = [[0,1,1], [1,0,0], [1,0,0]] // 0 = straight | 1 = up | 2 = down
	}

	getNextState(currentState) {
		var pos = Math.floor(Math.random()*this.tMatrix[currentState].length)
		if (this.tMatrix[currentState][pos] == 1) {
			return pos
		} else {
			return this.getNextState(currentState)
		}
	}

	// initial render
	render() {	
		this.clear()
		for (var line = 0; line < this.params["lineCount"]; line++) {
			var state = 0
			var path = [[0, ymax/2]]
			for (var i=0; i<50; i++) {
				var last = path.slice(-1)[0] 
				var length = 50 + Math.random()*this.params["maxWidth"]
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
			drawPath(path, "#fff", this.params["maxLineWeight"]*Math.random(), this.getDomID())
		}

		// super.render(el)

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.render()
		// console.log(evente)
		// var knob = event['knob']
		// var paramName = this.wiring[knob]
		// var el = document.getElementById(this.getDomID())
		// el.childNodes[0][paramName]['baseVal']['value'] = event['value']
	}

}

export default DNA;