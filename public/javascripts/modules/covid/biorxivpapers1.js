//
// COVID-19 BioRxiv Papers x Word2Vec 
// visualization example
// 

import Module from '../../lib/module.js'

class BiorxivPapers1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}


	div(content, className, idName) {
		className = "entry"
		idName = Math.random()
		return $('<div class="' + className + '" id="' + idName + '">' + content + "</div>")
	}

	render() {	
		
		var domID = this.getDomID()
		var mod = this

		$("#graph").css({'position': 'fixed', 'z-index': '-1'})
		$("body").append('<div id="container"></div>')

		$("#container").css({
			// "background-color": "#131313",
			"font-family": "Helvetica",
			// "display": "grid",
			// "grid-template-columns": "repeat(8, " + 128 + "px)",
			// "grid-template-rows": "repeat(8, " + 128 + "px)",
			// "grid-column-gap": "20px",
			// "grid-row-gap": "20px"
			// "overflow": "hidden"
		})

		$.get("http://localhost:7035/", function( data ) {			
			let vocab = JSON.parse(data["vocab"])
			for (var i=0; i<vocab.length; i++) {
				 $("#container").append(mod.div(vocab[i]).css(
					{ "font-weight": 700, "font-size": 12+32*Math.random() + "px", "font-kerning": "normal", "letter-spacing": "-1px", "font-smooth": "always","-webkit-font-smoothing": "subpixel-antialiased", "display": "inline-block", "margin-right": "5px"}
				))
			}
		})

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default BiorxivPapers1;
