//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBiorxivData } from '../../dataset/biorxiv.js'

class Virtual4 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		// this.colors = ["#33c6f0", "#e1185a", "#ecb32a", "#2ab77e", "#490d4a"]
		this.colors = ["#fff"]
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

	getRandomStyle() {
		return {
				"font-family": Math.random() < 0.8 ? "Roboto Mono" : "Helvetica", 
				"font-weight": Math.random() < 0.8 ? 100 : 700,
				"font-size": Math.random() < 0.8 ? "18px" : "80px",
			  	"grid-column": "span " + Math.floor(Math.random()*3),
  			  	"grid-row": "span " + Math.ceil(Math.random()*3),
  			  	"color": this.colors[Math.floor(Math.random()*this.colors.length)]
  			  	// "border-left": (Math.random() < 0.2) ? (10 + "px solid " + this.colors[Math.floor(Math.random()*this.colors.length)]) : 0
  			  	// "border-bottom": (Math.random() < 0.2) ? (5 + "px solid " + this.colors[Math.floor(Math.random()*this.colors.length)]) : 0
			}
	}

	getRandomPhoto() {
		
		// with cache busting
		// return 'https://picsum.photos/' + Math.floor(xmax/6) + '/' + Math.floor(ymax/6) + "?" + Math.random()
		
		// without - one image per page
		// return 'https://picsum.photos/' + Math.floor(xmax/6) + '/' + Math.floor(ymax/6)

		// time based change
		return 'https://picsum.photos/' + Math.floor(xmax/6) + '/' + Math.floor(ymax/6) + "?" + Math.floor((new Date())/2000)

	}


	render() {	

		var data = getBiorxivData()		

		$("svg").remove()
		$("body").css({"color": "#fff", "font-family": "Roboto Mono"})		
		$("body").append($('<div id="container"></div>').css({
			"display": "grid", 
			"grid-template-columns": "repeat(6, 1fr)",
			"grid-template-rows": "repeat(9, 120px)",
			"grid-auto-flow": "dense",
			"height": "500px"
		}))

		var styles = [{
				"font-family": "Helvetica", 
				"font-weight": 700,
				"font-size": "80px"
			},
			{
			  "grid-column": "span 2",
  			  "grid-row": "span 2",
			},
			{
			  "grid-column": "span 3",
  			  "grid-row": "span 1",
			}
		]

		for (var i=0; i<50; i++) {
			if (Math.random() < 0.5) {
				$("#container").append($('<div class="item">' + this.rndAbstract(data) + '</div>').css(this.getRandomStyle()))
			} else {
				$("#container").append($('<div class="item"><img src="' + this.getRandomPhoto() + '"></div>'))
				
				// $("#container").append($('<div class="item">' + this.rndAbstract(data) + '</div>'))
			}
		}	

		$(".item").css({
			"margin": "5px",
			"overflow": "hidden",
			"padding": "5px"
		})

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual4;
