//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class Virtual2 extends Module {

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


	rndTitle(data) {
		return data[Math.floor(Math.random()*data.length)]["title"]
	}


	rndAbstract(data) {
		return data[Math.floor(Math.random()*data.length)]["abstract"]
	}


	render() {	

		var data = getBiorxivData()		

		$("svg").remove()
		$("body").css({"color": "#fff", "font-family": "Roboto Mono"})		
		$("body").append($('<div id="container"></div>').css({
			"display": "grid", 
			"grid-template-columns": "1fr 1fr 1fr 1fr 1fr",
			"grid-template-rows": "120px 120px 120px 120px 120px 120px 120px 120px 120px",
			"grid-auto-flow": "dense",
			"height": "500px"
		}))

		var styles = [{
				"font-family": "Helvetica", 
				"font-weight": 700,
				"font-size": "" +  this.getConfigVal("font-size", 80) + "px"
			},
			{
			  "grid-column": "span 2",
  			  "grid-row": "span 2",
			},
			{
			  "grid-column": "span 3",
  			  "grid-row": "span 1",
			}

		// ,{
		// 	  "grid-column": 2,
  // 			  "grid-row": "1 / 5",
  // 			  "font-family": "Helvetica",
  // 			  "font-weight": 700,
  // 			  "font-size": "21px"
		// },{
		// 	  "grid-column": 1,
  // 			  "grid-row": "1 / 5",
  // 			  "font-family": "Helvetica",
  // 			  "font-weight": 700,
  // 			  "font-size": "21px"
		// },{
		// 	  "grid-column": 5,
  // 			  "grid-row": "5 / 5",
  // 			  "overflow": "hidden"
		// }
		]

		for (var i=0; i<50; i++) {
			var style = styles[Math.floor(Math.random()*styles.length*this.getConfigVal("penalty",1))]
			$("#container").append($('<div class="item">' + this.rndAbstract(data) + '</div>').css(style));
		}	

		$(".item").css({
			"margin": "5px",
			"overflow": "hidden",
			"padding": "5px"
			// "border": "10px solid #fff"
		})

		// for (var i=0; i<4; i++) {
		// 	$(".item-" + i).text(this.rndAbstract(data))			
		// }


		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual2;
