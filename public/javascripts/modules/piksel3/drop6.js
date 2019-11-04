//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Drop6 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.coords = []
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	drawPath = function(coords, stroke, weight, domID) {
		path( {
			d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
			"marker-start" : "url(#circle)",
			"marker-mid" : "url(#circle)",
			"marker-end" : "url(#circle)",
			style: "fill:none;stroke:" + stroke + ";stroke-width:" + weight
		}, domID)
	}

	take1 = function() {
		// var coords = [[100,100], [100,200], [300,200], [300, 500], [800,500]]
		// moveBackwards()
		rotateLeft()
		if (this.coords.length == 0) {
			this.coords = [[xmax/2,ymax/2]]		
			for (var i=0; i<100; i++) {
				if (i%2 == 0) {
					this.coords.push(getViewport([this.coords[this.coords.length-1][0], Math.random()*ymax]))
				} else {
					this.coords.push(getViewport([Math.random()*xmax, this.coords[this.coords.length-1][1]]))
				}			
			}
		} else {
			for (var i=0; i<this.coords.length; i++) {
				this.coords[i] = getViewport(this.coords[i])
			}
		}

		this.drawPath(this.coords, "#fff", 2, this.getDomID())

	}

	take2 = function() {
		for (var it = 0 ; it<50; it++) {
			var delta = 10
			var coords = [[0, 0]]
			for (var i=0; i<20; i++) {
				var last = coords[coords.length - 1]
				coords.push( [ last[0]+Math.floor(Math.random()*i)*delta, last[1]+Math.floor(Math.random()*i)*delta   ])
			}
			this.drawPath(coords, "rgba(255,255,255," + Math.random() + ")", 2, this.getDomID())
		}
	}

	withinCircle = function(el, center, radius) {
		return Math.sqrt(Math.pow(el[0] - center[0],2) + Math.pow(el[1] - center[1],2)) < radius
	}


	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		// drawCircle([xmax/2,ymax/2], 200, "#fff", this.getDomID())

		// this.take1()

		var coords = []
		// this.coords = [[xmax/2,ymax/2]]		

		// for (var i=0; i<100; i++) {
		// 	if (i%2 == 0) {
		// 		this.coords.push(getViewport([this.coords[this.coords.length-1][0], Math.random()*ymax]))
		// 	} else {
		// 		this.coords.push(getViewport([Math.random()*xmax, this.coords[this.coords.length-1][1]]))
		// 	}			
		// }
		// moveForward()
		rotateLeft()

		$("body").css({"background-color": "#1f2326"})

		// for (var it = 0; it<10; it++) {
			var delta = 200
			var coords = [getViewport([xmax/2, ymax/2])]
			for (var i=0; i<2000; i++) {
				var last = coords[coords.length - 1]
				var next = []
				// coords.push( [ last[0]+Math.floor(1-Math.random()*i)*delta,  last[1]+Math.floor(1-Math.random()*i)*delta   ])
				if (Math.random() < 0.5) {
					// coords.push( [ last[0]+(0.5-Math.random())*delta,  last[1]+(0.5-Math.random()*delta) ])
					next =  getViewport([ last[0]+(0.5-Math.random())*delta,  last[1] ])
				} else {
					next = getViewport([ last[0],  last[1]+(0.5-Math.random())*delta ])
				}
				if (this.withinCircle(next, [xmax/2,ymax/2], 500)) {
					coords.push(next)
				}

			}
			this.drawPath(coords, "#fff", 1, this.getDomID())
		// }

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Drop6;
