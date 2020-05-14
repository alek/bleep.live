//
// Simulate dependency graph rendering
// 

import Module from '../../lib/module.js'

class DepGraph2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.palette = this.getPalette(16)
	}

	getPalette(size) {
		let result = []
		for(let i=0; i<size; i++) {
			result.push(randomPantoneHex())
		}
		return result
	}

	getColor() {
		return this.palette[Math.floor(Math.random()*this.palette.length)]
	}


	render() {	


		let startNode = [xmax/2,ymax/2]
		let depCount = 30
		for (var i=0; i<360; i+=(360/depCount)) {
			let node = getCircleCoord(startNode[0], startNode[1], i, (Math.random() < 0.5 ? 75 : 150))
			let color = this.getColor()
			drawLine(startNode, node, color, "1px", this.getDomID())
			let secondLevel = 30
			if (i == 0) {
				for (var angle = i-30; angle < i+30; angle+=(60/secondLevel)) {
					if (Math.random() < 0.5) {
						let child = getCircleCoord(node[0], node[1], angle, 150)
						drawLine(node, child, color, "1px", this.getDomID())
						drawCircle(child, 3, color, this.getDomID())				
					}
				}
			}
			drawCircle(node, 3, color, this.getDomID())	
		}
		drawCircle(startNode, 5, "#fff", this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default DepGraph2;
