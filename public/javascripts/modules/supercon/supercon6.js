//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import Piksel from '../piksel/piksel.js'

class Supercon6 extends Module {

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
		$.get( "http://localhost:5133/images/supercon/logo.svg", function( data ) {
  			var entry = new XMLSerializer().serializeToString(data)
  			$("#graph").append(entry)
		});
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)

		$("#graph").children().each(function(){
			// console.log(this)
			$(this).children().each(function() {
				if (Math.random() < 0.1) {
					$(this).hide("slow")
				} 
				if (Math.random() < 0.1) {
					$(this).show("slow")
				} 
			})
		})

	}

}

export default Supercon6;
