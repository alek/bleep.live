//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Glove10 extends Module {

	constructor() {
		super({	// init params mapping
			"r1": ["cc_6", 10],			// right hand 1. finger (thumb)     
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
	}

	render() {	
		for (var i=0; i<xmax+50; i+=(10 + timeRamp(1500,this.params["r2"]))) {
			line({
				x1: -50 + timeRamp(1000,this.params["w1"]) + i,
				y1: 0,
				x2: -50 + timeRamp(1000,this.params["w1"]) + i,
				y2: ymax,
				stroke: "rgba(255,255,255," + 1.0 + ")",
				"transform": "rotate(" + 0 + " " + xmax/2 + " " + ymax/2 + ")",
				"stroke-width": timeRamp(500,this.params["r2"]),
				"stroke-dasharray": this.params["r4"] + " " + (this.params["r5"]/2 - 20)
			}, this.getDomID());
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Glove10;
