//
// Simulate dependency graph rendering
// 

import Module from '../../lib/module.js'

class DepGraph1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}


	render() {	
		let startNode = [xmax/2,ymax/2]
		drawCircle(startNode, 5, "#fff", this.getDomID())
		for (var i=0; i<360; i+=10) {
			let node = getCircleCoord(startNode[0], startNode[1], i, 100+i)
			drawLine(startNode, node, "#fff", "1px", this.getDomID())
			drawCircle(node, 5, "#fff", this.getDomID())
			for (var angle = i-20; angle < i+20; angle+=5) {
				let child = getCircleCoord(node[0], node[1], angle, 50+i)
				drawLine(node, child, "#fff", "1px", this.getDomID())
				drawCircle(child, 5, "#fff", this.getDomID())				
				if (Math.random() < 0.2) {
					break
				}
			}
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default DepGraph1;
