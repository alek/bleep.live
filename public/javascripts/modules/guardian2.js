//
// abstract infographics-like viz
//

import Module from '../lib/module.js'

class Guardian2 extends Module {

	constructor() {
		super({	// init params mapping
			"month": ["cc_8", 0],
			"year": ["cc_9", 0],
			"section": ["cc_10", 0],
			"misc": ["cc_11", 8]
		})
	}

	// initial render
	render() {	

		var obj = this

		var domID = this.getDomID()
		var size = this.params["size"]
		var params = this.params

		$.get(this.getQuery(), function(data) {

			// update facets

			$("#facets").empty()

			if (obj.facets == null) {
				obj.facets = data["facets"]
			}

			for (var facet in data["facets"]) {
				
				var facetVal = "All" 

				if (params[facet] != 0) {
					var keys = Object.keys(data["facets"][facet])
					// TODO: should we read it from active facet or not
					// TODO: do not show non-zero values on the lucene side?
					facetVal = keys[Math.min(params[facet]-1, keys.length-1) ]
				}

				$("#facets").append('<div class="facet-select"><div class="facet-title">' + facet + '</div><div class="selected">' + facetVal + '</div></div>');	

				// var keys = Object.keys(data["facets"][facet])
				// $("#facets").append('<div class="facet-select"><div class="facet-title">' + facet + '</div><div class="selected">' +  keys[Math.floor(Math.random()*keys.length)] + '</div></div>');	
			}


			$("#header-bar").empty()
			$("#header-bar").append('<h1>' +  '1 / ' + data["total"] + '</h1>'
									+ '<div id="progress-bar"></div>')

			$("#master-grid").empty()
			for (var i=0; i<data["results"].length; i++) {

				// $("#master-grid").append('<div class="grid-cell ' + (Math.random() < 0.2 ? obj.randomColor() : "") + '">'
				// $("#master-grid").append('<div class="grid-cell ' + (Math.random() < 0.2 ? obj.randomColor() : "") + '">'
				$("#master-grid").append('<div class="grid-cell ' + (Math.random() < 0.0 ? obj.randomColor() : "") + '">'
										+ '<h1>' + data["results"][i]["title"] + '</h1>'
										+ '<h2>' + data["results"][i]["section"] + '</h2>'
										+ '<h3>' + data["results"][i]["date"] + '</h3>'
										+ "</div>")

			}
		});
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

Guardian2.prototype.getQuery = function() {
	// var query = "/search?q=trump"
	var query = "/search?"
	var facetFields = ["year", "month", "section"]
	var prefix = "&"
	for (var i=0; i<facetFields.length; i++) {
		var facet = facetFields[i]
		if (this.params[facet] > 0) {
			query += prefix
			var keys = Object.keys(this.facets[facet])
			var val = keys[Math.max(0, Math.min(this.params[facet]-1, keys.length-1))]
			query += facet + "=" + encodeURI(val)
			prefix = "&"
		}
	}
	return query
	
}

Guardian2.prototype.randomColor = function() {
	// var colors = ["#d23a39", "#dfb638", "#63bf3a", "#3884cf", "#5a38a9"]
	var colors = ["red", "green", "blue", "yellow", "purple"]
	return colors[Math.floor(Math.random()*colors.length)]
}


export default Guardian2;
