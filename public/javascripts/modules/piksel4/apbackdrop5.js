//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'
import { getTwitterData } from '../../dataset/twitterfirehose.js'

class APBackdrop5 extends Module {

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

	renderSegment(start,width,maxX, color) {
			var coords = [start]
			for (var i=0; i<ymax*2; i+=ymax*0.1) {
				var last = coords[coords.length-1]
				if (Math.random() < 0.5) {
					coords.push([last[0],last[1]+ymax*0.1])					
				} else if (Math.random() < 0.5) {
					coords.push([last[0]+Math.random()*maxX, last[1]])
				} else {
					coords.push([start[0],start[1]+i])
				}
			}
			for (var i=0; i<coords.length; i++) {
				coords[i] = getViewport(coords[i])
			}
			path( {
				d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
				//style: "fill:none;stroke:rgba(255,255,255," + Math.random() + ");stroke-width:" + width
				// style: "fill:none;stroke:#fff;stroke-width:" + width
				style: "fill:none;stroke:" + color + ";stroke-width:" + width
			}, this.getDomID())
	}

	render() {	
			for (var i=0; i<xmax; i+=(3+10*Math.random())) {		// some levers for the glove here
			var rnd = Math.random()
			this.renderSegment([i,0], (rnd < 0.005 ? xmax*0.1 : 1), xmax*0.03, this.getConfigVal("color", randomPantoneHex()))
		}
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default APBackdrop5;
