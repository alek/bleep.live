//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Glove11 extends Module {

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
			 "g3": ["cc_22", 50],		// right hand gyroscope Z axis      
			 "l1": ["cc_1", 10],		// left hand 1. finger (thumb)     
			 "l2": ["cc_2", 50],		// left hand 2. finger (index)     
			 "l3": ["cc_3", 50],		// left hand 3. finger (middle)    
			 "l4": ["cc_4", 50],		// left hand 4. finger (ring)      
			 "l5": ["cc_5", 50],		// left hand 5. finger (little)    
			 "m1": ["cc_11", 50],		// left hand accelerometer X axis  
			 "m2": ["cc_12", 50],		// left hand accelerometer Y axis  
			 "m3": ["cc_13", 50],		// left hand accelerometer Z axis  
			 "k1": ["cc_14", 50],		// left hand gyroscope X axis      
			 "k2": ["cc_15", 50],		// left hand gyroscope Y axis      
			 "k3": ["cc_16", 50]		// left hand gyroscope Z axis      			 
		})
	}



	render() {	


		for (var i=0; i<2; i++) {
			var xoffset = Math.random()*xmax
			line({
				x1: xoffset,
				y1: 0,
				x2: xoffset,
				y2: ymax,
				stroke: "rgba(255,255,255,0.4)",
				"transform": "rotate(0 0 0)",
				"stroke-width": this.params["l4"]*this.params["l5"],
				"stroke-dasharray": "1 2"
			}, this.getDomID());
		}

		for (var i=0; i<10+this.params["r1"]/2; i++) {
			circle({
				cx: xmax/2,
				cy: ymax/2,
				r: this.params["r2"]*i/2 + timeRamp(10000, this.params["r2"]/2),
				stroke: "#fff",
				fill: "none",
				"transform": "rotate(" + this.params["w1"]*6 + " " + xmax/2 + " " + ymax/2 + ")",
				"stroke-dasharray": this.params["r3"] + " " + this.params["r4"],
				style: "stroke-width:" + timeRamp(1000,this.params["r5"]*5),
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

export default Glove11;
