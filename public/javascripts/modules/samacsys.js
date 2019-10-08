//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Samacsys extends Module {

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
			"date": new Date(entry[0]*1),
			"country": isoCountries[entry[3]],
			"type": entry[4],
			"part": entry[6],
			"manufacturer": entry[7],
			"description": entry[9],
			"part-class": entry[10],
			"part-category": entry[11],
			"name": entry[14],
			"email": entry[15],
			"company": entry[16],
			"confirmed": entry[17],
			"fc_name": entry[18],
			"fc_company": entry[19], 
			"fc_title": entry[20],
			"fc_linkedin": entry[21],
			"audit": entry[23]
		}
	}

	getEmailScoreSnippet(email) {
		var res = ""
		var entry = emailScore[email]
		if (entry != null) {
			return '<span id="email-score-val">' + entry["score"] 
					+ '</span><span id="free-email-flag">' 
					+ ((entry["free"] == true) ? " free email host" : "") +'</span>'
		} else {
			return ""
		}
	}

	renderEntry(data) {
			var entry = this.fieldMap(data)

			// dispatch queries first

			// $.get("https://apilayer.net/api/check?access_key=19b3f49f9ab4ba722c15ae0f3ea25c67&email=" + entry["email"] + "&smtp=1&format=1", function(data) {
			// 	console.log(data);
			// });

			// $("#event-details").empty()

			$(".date").text(entry["date"])
			$(".country").text(entry["country"])
			$(".type").text(entry["type"])
			$(".part").text(entry["part"])
			$(".description").text(entry["description"])
			$(".manufacturer").text(entry["manufacturer"])
			$(".part-class").text(entry["part-class"])
			$(".part-category").text(entry["part-category"])
			$(".name").text(entry["name"])
			$(".email").text(entry["email"])
			$(".email-score").html(this.getEmailScoreSnippet(entry["email"]))
			$(".company").text(entry["company"])
			$(".title").text(entry["fc_title"])

			$//(".type").css("border-left", "5px solid #5ec8e5")
			$(".type").css("border-left", "5px solid " + ((entry["manufacturer"] == "Texas Instruments") ? "#5ec8e5" : "#ecda73"))

			var volEstimate = getVolumeEstimate(entry["part-class"], entry["part-category"])

			$("#order-range").empty()
			$("#volume-graph").empty()
			
			if (volEstimate != null) {
				$("#vol-range").text(Math.ceil(volEstimate["distribution"][0]).toLocaleString() + " - " + Math.ceil(volEstimate["distribution"][4]).toLocaleString())
				$("#vol-median").text(Math.ceil(volEstimate["distribution"][2]))

				if (false) {	// disable live api call

					$.get("/fetch?part=" + entry["part"], function(data) {
						entry = JSON.parse(data)
						if (entry["response"] != null && entry["response"].length > 0) {
							var prices = entry["response"][0]["parts"][0]["price"]
							if (prices != null && prices.length > 0) {
								var median = prices[Math.floor(prices.length/2)]
								$("#pricing-data").html(median["price"] + " " + median["currency"])
								$("#order-total").html((parseFloat(median["price"])*Math.ceil(volEstimate["distribution"][2])).toFixed(2) + " " + median["currency"])
							}
						}
					});

				} else {
					if (partPrices[entry["part"]]) {
						var unitPrice = partPrices[entry["part"]] 
						var volDistribution = volEstimate["distribution"]
						$("#pricing-data").html(unitPrice + " USD")
						if (volDistribution.length > 4) {
							$("#order-total").html((unitPrice*volDistribution[2]).toFixed(2) + " USD")
							$("#order-range").html((unitPrice*volDistribution[0]).toFixed(2) + " - " + Math.floor(unitPrice*volDistribution[4]).toLocaleString() + " USD")
						}
						// console.log(volDistribution)
						var graph = "<div>"
						for (var i=0; i<5; i++) {
							graph += '<span class="graph-bar">' + Math.floor(volDistribution[i]).toLocaleString() + '</span>'
						}
						graph += "</div>"
						$("#volume-graph").html(graph)
						// $("#volume-graph").text(volDistribution)

					} else {
						$("#pricing-data").empty()
						$("#order-total").empty()
						$("#order-range").empty()
					}
				}

			} else {
				$("#vol-range").empty()
				$("#vol-median").empty()
				$("#pricing-data").empty()
				$("#order-total").empty()
			}

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
		$("#minientry-container").append('<div class="entry-mini" style="border-left:5px solid ' + ((entry["manufacturer"] == "Texas Instruments") ? "#5ec8e5" : "#ecda73") + '"> \
			<div class="event date-mini">' + entry["date"] + '</div> \
            <div class="event country-mini">' + entry["country"] + '</div> \
            <div class="event type-mini">' + entry["type"] + '</div> \
            <div class="event part-mini">' + entry["part"] + '</div> \
            <div class="event description-mini">' + entry["description"] + '</div> \
            <div class="event classcategory-mini"><span class="part-class-mini">' + entry["part-class"] + '</span> | <span class="part-category-mini">' + entry["part-category"] + '</span></div> \
            <div class="event name-mini">' + entry["name"] + '</div> \
            <div class="event email-mini">' + entry["email"] + '</div> \
            <div class="event company-mini">' + entry["company"] + '</div> \
            </div>');
	}

	gen() {
		var state = StateContainer.getInstance()		
		if (state["queue"].length < state["currentIndex"]+1) {
			setTimeout(function() { state["module"].gen() }, 5)
		} else {
			var offset = state["currentIndex"]
			var entry = state["queue"][offset]["content"]
			// $("#total-entries").text(state["queue"][offset]["total"] + " a")
			state["module"].renderEntry(entry)
			$(".processed").text(state["currentIndex"].toLocaleString())
			$("#progress-bar").css("width", Math.min(Math.ceil( (state["currentIndex"]/50000)*400), 400) + "px");
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

export default Samacsys;
