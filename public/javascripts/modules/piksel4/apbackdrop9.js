
// Supercon logo animation
// 

import Module from '../../lib/module.js'

class APBackdrop9 extends Module {

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

	render() {	
		$.get( "http://localhost:5133/images/piksel/hc-pxl-3.svg", function( data ) {
  			var entry = new XMLSerializer().serializeToString(data)
  			$("#graph").append(entry)
		});
	}

	layer() {
		var p = this.getConfigVal("p", 0.1)
		// var scaleMultiplier = this.getConfigVal("scaleMultiplier", this.params["r1"]/100)
		var scaleMultiplier = this.getConfigVal("scaleMultiplier", 1)
		var delay = this.getConfigVal("delay", 100)
		$("#graph").children().each(function(){
			$(this).children().each(function() {
				if (Math.random() < 0.1) {
					$(this).attr('x', xmax*Math.random())
				} 
				if (Math.random() < p) {
					$(this).attr('x', xmax*Math.random())
					$(this).attr('cx', xmax*Math.random())
					$(this).attr('transform', "translate(" + (-xmax + 2*xmax*Math.random()) + " 0) " + "scale(" + scaleMultiplier + " " + scaleMultiplier + ")")
				} 
			})
		})		
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.layer()
	}

}

export default APBackdrop9;
