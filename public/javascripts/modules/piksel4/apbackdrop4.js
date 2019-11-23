
// Supercon logo animation
// 

import Module from '../../lib/module.js'

class APBackdrop4 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
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
		$.get( "http://localhost:5133/images/piksel/piksel-alt.svg", function( data ) {
  			var entry = new XMLSerializer().serializeToString(data)
  			$("#graph").append(entry)
		});
	}

	layer() {
		var delay = this.getConfigVal("delay", 100)
		$("#graph").children().each(function(){
			// console.log(this)
			$(this).children().each(function() {
				if (Math.random() < 0.1) {
					$(this).attr('x', xmax*Math.random())
					// $(this).hide(delay + delay/2*Math.random())
				} 
				if (Math.random() < 0.1) {
					$(this).attr('x', xmax*Math.random())
					$(this).attr('cx', xmax*Math.random())
					$(this).attr('transform', "translate(" + (-xmax + 2*xmax*Math.random()) + " 0) ")
					// $(this).attr('transform', "scale(" + rnd + " " + rnd + ")")
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

export default APBackdrop4;
