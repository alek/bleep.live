//
// Simple module demonstration
//

import Module from '../../lib/module.js'

class NetArt2 extends Module {

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
		// console.log("gen!")
		// console.log(document.getElementsByTagName("a"))
		// console.log("no")
		// var data = $('<div/>').html($("object")).find('a').html();
		// console.log(data)
	}

	fetch() {
		var state = StateContainer.getInstance()
		$.get("https://api.github.com/events", function(data) {
			for (var i=0; i<data.length; i++) {
				// console.log(data[i])
				state["queue"].push(data[i])
			}
		});
	}

	processQueue() {
		var state = StateContainer.getInstance()
		var rendered = 0
		while (state["queue"].length > 0) {
			var entry = state["queue"].shift()
			var content = '<div class="git-entry">'
						  + '<h5>' + entry["type"] + '</h5>'
						  + '<h1 style="font-size:180px">' + entry["repo"]["name"] + '</h1>'
						  + '<h6>' + entry["actor"]["display_login"] + '</h6>'
						  + '<h4>' + entry["created_at"] + '</h4>'
						  // + (data[i]["payload"]["commits"].length > 0) ? '<h3>' + data[i]["payload"]["commits"][0]["message"] + '</h3>' : ""
						  + '</div>'
			$("#master-grid").append(content)
			if (rendered++ > 8) {
				break;
			}
		}
	}

	reaper() {
		var el = document.getElementsByClassName("git-entry")
		// for (var i=0; i<el.length/5; i++) {
		// 	el[i].remove()
		// }		
		if (el.length > 40) {
			el[0].remove()
		}
	}

	// initial render
	render() {	

		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this
		state["queue"] = []

		// $("#master-grid").html('<object data="http://hackaday.com"/>');

		// $( "#master-grid" ).load( "/fetch", function() {
		// 	  console.log("loaded")
		// });

		// this.fetch()

		window.setInterval(this.fetch, 1000)
		window.setInterval(this.processQueue, 100)
		window.setInterval(this.reaper, 100)

		// state["module"].gen()
	}

	update(event) {
		super.update(event)
	}

}

export default NetArt2;
