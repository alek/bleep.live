//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class XORFilter3 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	testPattern() {
		console.log("pera mika lazas".hash1())
		console.log("pera mika lazas".hash1())


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

export default XORFilter3;
