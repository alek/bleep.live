//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Glove7 extends Module {

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
		// $("body").css({"background-color": "rgba(" + this.params["w1"]*4 + "," + this.params["w2"]*4 + "," + this.params["w3"]*4 + ",1)"})
		// drawCircleOutline([xmax/2,ymax/2], this.params["r1"]*10, "#fff", this.params["w1"], this.getDomID())
		for (var i=0; i<50; i++) {	
			drawEllipse([xmax/2,ymax/2], this.params["r2"]*4*(1+Math.random()*0.2), this.params["r3"]*4*(1+Math.random()*0.2), "rgba(255,255,255," + Math.random()/2 + ")", this.getDomID(), this.params["r4"]*2*Math.random())
			// drawEllipse([xmax/2,ymax/2], this.params["r2"]*4, this.params["r3"]*4, randomPantoneHex(), this.getDomID(), this.params["r4"]*2*Math.random(), Math.random()/2)
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Glove7;
