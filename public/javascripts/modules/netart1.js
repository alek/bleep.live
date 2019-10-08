//
// Simple module demonstration
//

import Module from '../lib/module.js'

class NetArt1 extends Module {

	constructor() {
		super({	// init params mapping
			"amp0": ["cc_1", 50],
			"amp1": ["cc_2", 50],
			"amp2": ["cc_3", 50],
			"amp3": ["cc_4", 0],
			"opacity": ["cc_5", 64]
		})
	}


	gen() {
		console.log("gen!")
		console.log(document.getElementsByTagName("a"))
		console.log("no")
		// var data = $('<div/>').html($("object")).find('a').html();
		// console.log(data)


	}

	// initial render
	render() {	

		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this

		// $("#master-grid").html('<object data="http://hackaday.com"/>');

		// $( "#master-grid" ).load( "/fetch", function() {
		// 	  console.log("loaded")
		// });

		$.get("/fetch", function(data) {
			// console.log(data)
			$("#master-grid").html(data)
		});

		// state["module"].gen()
	}

	update(event) {
		super.update(event)
	}

}

export default NetArt1;
