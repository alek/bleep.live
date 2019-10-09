//
// Simple benchmark thing
//

import Module from '../../lib/module.js'

class Benchmark extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_1", 24],
			"grid_rows": ["cc_2", 14],
			"line_count": ["cc_3", 50]
		})
	}


	render() {	
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Benchmark;
