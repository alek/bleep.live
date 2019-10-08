//
// Simple module demonstration
//

import Module from '../lib/module.js'

class HighDensity extends Module {

	constructor() {
		super({	// init params mapping
			"f1": ["cc_8", 50],
			"f2": ["cc_9", 50],
			"f3": ["cc_10", 0],
			"f4": ["cc_11", 64]
		})
	}

	fieldMap(entry) {
		return {
			"part": entry[3],
			"description": "",
			"date": entry[0],
			"country": entry[1],
			"type": entry[4],
			"part-class": "",
			"part-category": "",
			"name": "",
			"email": "",
			"company": "",
			"targeting": entry[5]
		}
	}

	getTargetingEntry(entry) {
		// var result = ""
		// var criteria = entry.split(";")
		// for (var i=0; i<criteria.length; i++) {
		// 	var parts = criteria[i].split(":")
		// 	result += '<div class="criteria-title">' + parts[0] + '</div>'
		// }
		var result = ""
		if (entry) {
			var data = JSON.parse(entry)
			for (var i=0; i<data.length; i++) {
				result += '<div class="targeting-type">' + data[i]["targetingType"] + "</div>"
				result += '<div class="targeting-value">' + data[i]["targetingValue"] + "</div>"
			}
		}
		return result
	}


	renderEntry(data) {
			var entry = this.fieldMap(data)

			// $("#event-details").empty()

			$(".date").text(entry["date"])
			$(".country").text(entry["country"])
			$(".type").text(entry["type"])
			$(".part").text(entry["part"])
			$(".description").text(entry["description"])
			$(".part-class").text(entry["part-class"])
			$(".part-category").text(entry["part-category"])
			$(".name").text(entry["name"])
			$(".email").text(entry["email"])
			$(".company").text(entry["company"])

			$//(".type").css("border-left", "5px solid #5ec8e5")
			$(".type").css("border-left", "5px solid " + ((entry[4] == "ModelOpened") ? "#5ec8e5" : "#ecda73"))

			$("#targeting-container").html(this.getTargetingEntry(entry["targeting"]))

			this.updateMinientrySlider(entry)
	}

	updateMinientrySlider(entry) {
		$("#minientry-container").empty()
		var state = StateContainer.getInstance()
		var index = state["currentIndex"]
		if (index > 0) { this.addMiniEntry(state["queue"][index-1]) }
		this.addMiniEntry(state["queue"][index])
		this.addMiniEntry(state["queue"][index+1])
	}

	addMiniEntry(data) {
		if (data == null) {
			return
		}
		var entry = this.fieldMap(data["content"])
		$("#minientry-container").append('<div class="entry-mini" style="border-left:5px solid ' + ((entry[4] == "ModelOpened") ? "#5ec8e5" : "#ecda73") + '"> \
			<div class="event date-mini">' + entry["date"] + '</div> \
            <div class="event country-mini">' + entry["country"] + '</div> \
            <div class="event type-mini">' + entry["type"] + '</div> \
            <div class="event part-mini">' + entry["part"] + '</div> \
            <div class="event description-mini">' + entry["description"] + '</div> \
            <div class="event classcategory-mini"><span class="part-class-mini">' + entry["part-class"] + '</span> <span class="part-category-mini">' + entry["part-category"] + '</span></div> \
            <div class="event name-mini">' + entry["name"] + '</div> \
            <div class="event email-mini">' + entry["email"] + '</div> \
            <div class="event company-mini">' + entry["company"] + '</div> \
            </div>');
	}

	gen() {
		var state = StateContainer.getInstance()		
		if (state["queue"].length < state["currentIndex"]+1) {
			setTimeout(function() { state["module"].gen() }, 10)
		} else {
			var offset = state["currentIndex"]
			var entry = state["queue"][offset]["content"]
			state["module"].renderEntry(entry)
			$(".processed").text(state["currentIndex"].toLocaleString())
			$("#progress-bar").css("width", Math.min(Math.ceil( (state["currentIndex"]/5298)*400), 400) + "px");
			//state["currentIndex"]++
		}		
	}

	// initial render
	render() {	

		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this
		state["queue"] = []
		state["currentIndex"] = 1
		state["motion"] = []
		// state["interactive"] = true
		state["interactive"] = false // not interactive by default

		var socket = io.connect('http://localhost:4000')

		socket.on('server', function (data) {
			socket.emit('client', { time: new Date() })
		})

		socket.on('line', function (data) {
			state["queue"].push(data)
		})

		// throttling
		setInterval(function() {
			socket.emit('control', { action: "pause" })
			setTimeout(function() {
				socket.emit('control', { action: "resume" })
			}, 1000);
		}, 10000);

		this.gen();



		// pause
		$(window).keypress(function(e) {
		    if (e.which === 32) {
		    	state["interactive"] = !state["interactive"]
		    }
		});

		// navigation
		document.onkeydown = function(e) {
			var state = StateContainer.getInstance()
			switch(e.which) {
				case 39:
				case 40:
					state["currentIndex"] += 1
					state["module"].gen()
					break
				case 37:
				case 38:
					state["currentIndex"] -= 1
					state["module"].gen()
					break
			}
		};


		// setInterval(this.gen, 100)

		// this.fetch(function() { state["module"].gen() })

		// $("#master-grid").html('<object data="http://hackaday.com"/>');

		// $( "#master-grid" ).load( "/fetch", function() {
		// 	  console.log("loaded")
		// });

		// this.fetch()

		// window.setInterval(this.fetch, 1000)
		// window.setInterval(this.processQueue, 100)
		// window.setInterval(this.reaper, 100)

		// state["module"].gen()
	}

	update(event) {
		super.update(event)

		var state = StateContainer.getInstance()
		if (!state["interactive"]) {
			return
		}
		
		state["motion"].push(this.params["f1"])

		if (state["motion"].length > 10) {
			state["motion"].shift()
		}

		var increment = getIncrement(state["motion"])

		if (increment < 0) {
			state["currentIndex"] = Math.max(0, state["currentIndex"] += increment)
		} else {
			state["currentIndex"] += increment
		}

		this.gen()
	}

}

export default HighDensity;
