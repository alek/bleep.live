//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Glove5 extends Module {

	constructor() {
		super({	// init params mapping
			"r1": ["cc_6", 50],			// right hand 1. finger (thumb)     
			"r2": ["cc_7", 50],			// right hand 2. finger (index)     
			"r3": ["cc_8", 50],			// right hand 3. finger (middle)    
			"r4": ["cc_9", 50],			// right hand 4. finger (ring)      
			 "r5": ["cc_10", 50],		// right hand 5. finger (little)    
			 "w1": ["cc_17", 50],		// right hand accelerometer X axis  
			 "w2": ["cc_18", 50],		// right hand accelerometer Y axis  
			 "w3": ["cc_19", 50],		// right hand accelerometer Z axis  
			 "g1": ["cc_20", 50],		// right hand gyroscope X axis      
			 "g2": ["cc_21", 50],		// right hand gyroscope Y axis      
			 "g3": ["cc_22", 50]		// right hand gyroscope Z axis      
		})

		this.counter = []
		this.segments = 100
		this.delta = xmax/this.segments
		this.paths = {}
		this.offsets = {}

		var offset = 1
		for (var param in this.getParams()) {
			this.paths[param] = []
			for (var i=0; i<this.segments; i++) {
				this.paths[param].push([i*this.delta, offset*ymax/12])
			}
			this.offsets[param] = offset*ymax/11
			offset++
		}
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	render() {	
		for (var param in this.paths) {
			path( {
				d: "M" + this.paths[param].map(x => x.join(" ")).join(" L") + "",
				style: "fill:none;stroke:" + randomPantoneHex() + ";stroke-width:2px",
				"marker-mid" : "url(#via)",
				id: "path-line-" + param
			}, this.getDomID())
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		var offset = Math.floor(timeSlide(1000,this.segments))
		if (event._type == "cc") {
			var key = this.getParamNameFromCC(event.knob)
			if (this.paths[key]) {
				this.paths[key][offset] = [offset*this.delta, this.offsets[key] - event.value/2]
				$("#path-line-" + key).attr("d", "M" + this.paths[key].map(x => x.join(" ")).join(" L") + "")
			}
		}
		// this.clear()
		// this.render()
	}

}

export default Glove5;
