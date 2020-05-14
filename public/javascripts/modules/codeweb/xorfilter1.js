//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class XORFilter1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	testPattern(domID, sqSize) {

		for (var y=0; y<ymax; y+=sqSize) {
			let word = randomTractatus().split(" ")[3]
			let vector = this.getBinaryArray(word)
			for (var x=0; x<xmax; x+=sqSize) {
				if (vector.pop()) {
					drawRectangle([400+x,y], sqSize, sqSize, "#fff", domID)
				}
			}
			drawText([400-sqSize, y], word, sqSize + "px", "#fff", 300, 0, "JetBrains Mono", domID, "end")
		}
	}

	getBinaryArray(string) {
		return Array.from(string).map((each)=>each.charCodeAt(0).toString(2)).join("").split("").map((each)=>parseInt(each))
	}

	render() {	
		this.testPattern(this.getDomID(), 12)
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default XORFilter1;
