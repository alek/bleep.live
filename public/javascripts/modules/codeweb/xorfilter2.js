//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class XORFilter2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}


	testPattern(domID, sqSize) {

		let word = "farnsworth's parabox"

		for (var y=0; y<ymax; y+=sqSize) {
			let secretkey = getRandomString("thequickbrownfoxjumpsoverlazydog", 32)
			let encoded = word.xor(secretkey)
			let vector = encoded.toBinaryArray()
			for (var x=0; x<xmax; x+=sqSize) {
					if (vector[x/sqSize]) {
						drawRectangle([400+x,y], sqSize, sqSize, "#fff", domID)	
					}
			}
			drawText([400-sqSize, y], encoded, sqSize + "px", "#fff", 300, 0, "JetBrains Mono", domID, "end")
		}
	}

	render() {	
		let start = new Date()
		this.testPattern(this.getDomID(), 12)
		console.log("elapsed: " + (new Date() - start) + " ms")
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default XORFilter2;
