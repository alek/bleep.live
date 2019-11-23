//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'
import { getTwitterData } from '../../dataset/twitterfirehose.js'

class APBackdrop2 extends Module {

	constructor() {
		super({	// init params mapping
			"r1": ["cc_6", 20],			// right hand 1. finger (thumb)     
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
			 "l1": ["cc_1", 10],		// left hand 1. finger (little)     
			 "l2": ["cc_2", 10],		// left hand 2. finger (index)     
			 "l3": ["cc_3", 50],		// left hand 3. finger (middle)    
			 "l4": ["cc_4", 50],		// left hand 4. finger (ring)      
			 "l5": ["cc_5", 10],		// left hand 5. finger (thumb)    
			 "m1": ["cc_11", 50],		// left hand accelerometer X axis  
			 "m2": ["cc_12", 50],		// left hand accelerometer Y axis  
			 "m3": ["cc_13", 50],		// left hand accelerometer Z axis  
			 "k1": ["cc_14", 50],		// left hand gyroscope X axis      
			 "k2": ["cc_15", 50],		// left hand gyroscope Y axis      
			 "k3": ["cc_16", 50]		// left hand gyroscope Z axis      			 
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
	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}

	renderSegment(nSegments, r, width) {
			var coords = []
			for (var i=0; i<=nSegments; i++) {
				coords.push(getCircleCoord(xmax/2,ymax/2, i*360/nSegments, r))
			}
			coords.push(getCircleCoord(xmax/2,ymax/2, 0, r))
			for (var i=0; i<coords.length; i++) {
				coords[i] = getViewport(coords[i])
			}

			path( {
				d: "M" + coords.map(x => x.join(" ")).join(" L") + " Z",
				style: "fill:none;stroke:#fff;stroke-width:" + width
			}, this.getDomID())
	}

	render() {	

		// moveBackward()
		rotateLeft()
		for (var i=0; i<20; i++) {
			this.renderSegment(i+this.getConfigVal("segments",20), this.getConfigVal("r",50)*i, ymax*this.getConfigVal("widthMultiplier",0.03)*Math.random()) // todo: modulate angle and width!
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default APBackdrop2;
