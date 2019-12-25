
// Supercon logo animation
// 

import Module from '../../lib/module.js'

class APBackdrop6 extends Module {

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
		$.get( "http://localhost:5133/images/piksel/piksel2.svg", function( data ) {
  			var entry = new XMLSerializer().serializeToString(data)
  			$("#graph").append(entry)
		});
	}

	layer() {
		var p = this.getConfigVal("p", 0.1)
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

export default APBackdrop6;
