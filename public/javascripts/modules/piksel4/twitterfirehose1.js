//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'
import { getTwitterData } from '../../dataset/twitterfirehose.js'

class TwitterFirehose1 extends Module {

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

		for (var i=-10; i<20; i++) {
			var entry = data[Math.floor(timeSlide(10000,data.length))+i]
			// drawRectangle([0,i*ymax*0.1], xmax, ymax*0.1, Math.random() < 0.2 ? randomPantoneHex(): "#000", this.getDomID())
			text( { 
				x: -xmax*0.2,
				y: i*ymax*0.1,
				"fill": randomPantoneHex(),
				"transform": "rotate(" + -30 + " " + xmax/2 + " " + ymax/2 + ")",
				"style": "font-size:" + this.getConfigVal("fontSize", ymax/10)*(Math.random() < 0.3 ? 1 : 1) + "px;text-align:left;alignment-baseline:left;text-anchor:left;opacity:1.0;font-family:" + "Helvetica" + ";sans-serif;font-weight:" + 700 + ";letter-spacing:" + "-2px;"
			}, (entry["text"] == null) ? "" : entry["text"], this.getDomID()); 
		}
 

		// var data = getTwitterData()
		// var widthScale = this.getConfigVal("widthScale", 0.1)

		// for (var slice = 0; slice < 10; slice++) {

		// 	var radius = ymax - slice*ymax*widthScale

		// 	for (var it=0; it<5; it++) {
				
		// 		Piksel.addCircularClip("glitchClip" + slice + "-" + it, xmax/2, ymax/2, radius)
		// 		//Piksel.addSlantClip("glitchClip-" + it, [0, 0], xmax, ymax)
		// 		//Piksel.addSlantClipReverse("glitchClip" + slice + "-" + it, [-xmax*0.75 + slice*ymax*0.5, 0], xmax, ymax, ymax*0.17)

		// 		if (this.getConfigVal("render-lines", false)) {
		// 			for (var i=0; i<Math.floor(this.params["r4"]/3); i++) {
		// 				var start = xmax*Math.random()
		// 				line({
		// 						x1: start,
		// 						y1: 0,
		// 						x2: start,
		// 						y2: ymax,
		// 						stroke: "rgba(255,255,255," + Math.random() + ")",
		// 						// "filter": "url(#f1)",
		// 						"clip-path": "url(#glitchClip" + slice + "-" + it + ")",
		// 						"transform": "rotate(" + 0 + " " + xmax/2 + " " + ymax/2 + ")",
		// 						// "transform": "rotate(" + 45*Math.floor(Math.random()*4) + " " + xmax/2 + " " + ymax/2 + ")",
		// 						"stroke-width": xmax*0.2*Math.random(),
		// 						"stroke-dasharray": Math.ceil(this.params["l5"]*Math.random()) + " " + Math.ceil(this.params["l4"]*Math.random())
		// 				}, this.getDomID());
		// 			}
		// 			drawCircle([xmax/2,ymax/2], ymax*0.5*(10-it)*widthScale*0.9, "#000", this.getDomID()) // <- key dial
		// 		}
		// 	}

		// 	for (var i=0; i<ymax*1.1; i+=ymax*widthScale) {
		// 		text( { 
		// 			x: xmax/2,
		// 			y: i,
		// 			"fill": Math.random() < 0.2 ? randomPantoneHex() : "#fff",
		// 			"clip-path": "url(#glitchClip" + slice + "-" + 0 + ")",
		// 			"transform": "rotate(0 50 100)",
		// 			"style": "font-size:" + this.getConfigVal("fontSize", ymax/10) + "px;text-align:center;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:" + "Helvetica" + ";sans-serif;font-weight:" + 700 + ";letter-spacing:" + "-2px;"
		// 		}, data[Math.floor(Math.random()*data.length)]["text"], this.getDomID()); 
		// 	}

		// 	drawCircle([xmax/2,ymax/2], radius-ymax*widthScale*Math.random(), "#000", this.getDomID()) // <- key dial
		// }

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TwitterFirehose1;
