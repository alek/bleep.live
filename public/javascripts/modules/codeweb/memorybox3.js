//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Memorybox3 extends Module {

	constructor() {
		super({
			"module_name": "Memorybox3"
		})
	}

	render() {
		let layout = new CircleLayoutEngine()
		for (let i=0; i<100; i++) {
			layout.add({r: 25 + 100*Math.random()})
		}
		layout.render("graph")
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear() 
		this.render()
	}

}

export default Memorybox3;
