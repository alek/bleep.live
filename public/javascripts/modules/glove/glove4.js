//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Glove4 extends Module {

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

		drawPolygon([
			[xmax*this.params["r5"]/128, ymax*this.params["w1"]/32],
			[xmax*this.params["r3"]/128, ymax*this.params["r4"]/255],
			[xmax*this.params["r1"]/128, ymax*this.params["r2"]/255],
			[xmax*this.params["w2"]/64, ymax*this.params["w3"]/64]
		], "gray", this.getDomID())

		drawPolygon([
			[xmax*this.params["r1"]/128, ymax*this.params["r2"]/255],
			[xmax*this.params["r3"]/255, ymax*this.params["r4"]/255],
			[xmax*this.params["r5"]/255, ymax*this.params["w1"]/64],
			[xmax*this.params["w2"]/64, ymax*this.params["w3"]/64]
		], "#fff", this.getDomID())

		polygon( {
			points: [
			[xmax*this.params["r1"]/128, ymax*this.params["r2"]/255],
			[xmax*this.params["r3"]/128, ymax*this.params["r4"]/255],
			[xmax*this.params["r5"]/255, ymax*this.params["w1"]/64]
			[xmax*this.params["r3"]/128, ymax*this.params["r4"]/255],
			[xmax*this.params["w2"]/64, ymax*this.params["w3"]/64]
			].join(" "),
			style: "fill:none;stroke:#fff;stroke-width:1"
		}, this.getDomID())

		// $("body").css({"background-color": "rgba(0,0,0," +  (0.1 + this.params["w1"]/64) + ")"})
		// drawCircleOutline([xmax/2,ymax/2], this.params["r1"]*10, "#fff", this.params["w1"], this.getDomID())
		
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Glove4;
