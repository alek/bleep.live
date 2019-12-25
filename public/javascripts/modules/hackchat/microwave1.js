//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class MicrowaveWorld1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	staticNoise() {
		for (var base = 0; base < ymax; base+= ymax*0.01) {
			var coords = [[0,base]]

			for (var i=0; i<xmax; i+= 10) {
				coords.push([i, base+Math.random()*ymax*0.005])
			}

			path( {
				d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
				style: "fill:none;stroke:#fff;stroke-width:" + "1px;stroke-opacity:" + (0.6+Math.random()/2)
			}, this.getDomID())
		}
	}

	render() {	
		
		this.staticNoise()

		var offset = 0
		for (var base = 0; base < ymax; base+= ymax*0.05) {

			var coords = [[0,base]]
			var amp = 2
			var period = 50

			for (var i=-xmax; i<2*xmax; i+= 1) {
				// coords.push([i, base+Math.sin((2*Math.PI/xmax*amp)*i)*(period)])
				// coords.push([i, base+Math.atan((2*Math.PI/xmax*amp)*i)*(period)])
				// coords.push([i, base+Math.sin(i)])
				coords.push([offset+i, base+Math.tan(i)*amp])
			}
			offset+=20-40*Math.random()
			// offset += ymax*Math.random()

			path( {
				d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
				style: "fill:none;stroke:" + "#fff" + ";stroke-width:" + "1px;stroke-opacity:" + Math.random()*0.6
				//style: "fill:none;stroke:" + "rgba(255,255,255," + 1 + ")" + ";stroke-width:" + "1px"
				// style: "fill:none;stroke:" + "rgba(255,255,255," + Math.random()*0.6 + ")" + ";stroke-width:" + "1px"
				// style: "fill:none;stroke:" + "rgba(255,255,255," + Math.random()/3 + ")" + ";stroke-width:" + Math.floor(Math.random()*10) + "px"
				// style: "fill:none;stroke:" + "url(#grad1)" + ";stroke-width:" + "1px"

			}, this.getDomID())
		}
		
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default MicrowaveWorld1;
