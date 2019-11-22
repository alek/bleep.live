//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'
import { getTwitterData } from '../../dataset/twitterads.js'

class TwitterAds2 extends Module {

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

	render() {	
		var data = getTwitterData()

		for (var slice = 0; slice < 8; slice++) {

			for (var it=0; it<5; it++) {
				
				//Piksel.addCircularClip("glitchClip-" + it, xmax/2, ymax/2, ymax*0.5*(10-it)*0.1)
				//Piksel.addSlantClip("glitchClip-" + it, [0, 0], xmax, ymax)
				Piksel.addSlantClipReverse("glitchClip" + slice + "-" + it, [-xmax*0.75 + slice*ymax*0.5, 0], xmax, ymax, ymax*0.17)

				if (this.getConfigVal("render-lines", false)) {
					for (var i=0; i<Math.floor(this.params["r4"]/3); i++) {
						var start = xmax*Math.random()
						line({
								x1: start,
								y1: 0,
								x2: start,
								y2: ymax,
								stroke: "rgba(255,255,255," + Math.random() + ")",
								// "filter": "url(#f1)",
								"clip-path": "url(#glitchClip" + slice + "-" + it + ")",
								"transform": "rotate(" + 0 + " " + xmax/2 + " " + ymax/2 + ")",
								// "transform": "rotate(" + 45*Math.floor(Math.random()*4) + " " + xmax/2 + " " + ymax/2 + ")",
								"stroke-width": xmax*0.2*Math.random(),
								"stroke-dasharray": Math.ceil(this.params["l5"]*Math.random()) + " " + Math.ceil(this.params["l4"]*Math.random())
						}, this.getDomID());
					}
					drawCircle([xmax/2,ymax/2], ymax*0.5*(10-it)*0.1*0.9, "#000", this.getDomID()) // <- key dial
				}
			}

			for (var i=0; i<ymax*1.1; i+=ymax*0.1) {
				text( { 
					x: xmax/2,
					y: i,
					"fill": Math.random() < 0.2 ? randomPantoneHex() : "#fff",
					"clip-path": "url(#glitchClip" + slice + "-" + 0 + ")",
					"transform": "rotate(0 50 100)",
					"style": "font-size:" + ymax/10 + "px;text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:" + "Helvetica" + ";sans-serif;font-weight:" + 700 + ";letter-spacing:" + "-2px;"
				}, data[Math.floor(Math.random()*data.length)]["text"], this.getDomID()); 
			}
		}

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TwitterAds2;
