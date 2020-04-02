//
// Amateur Radio Homebrewing HackChat
// 

import Module from '../../lib/module.js'

class Radio1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	render() {	
		for (var offset = ymax/2; offset < ymax; offset += 20) {
			var path = [[0,ymax/2]]
			var angle = 0
			for (var i=0; i<xmax; i++) {
				path.push([i,offset+20*Math.sin(deg2rad(i*offset%200))])
			}
			drawPath(path, "#fff", "1px", this.getDomID())
		}


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Radio1;
