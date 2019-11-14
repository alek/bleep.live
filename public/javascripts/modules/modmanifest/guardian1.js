//
// abstract infographics-like viz
//

import Module from '../../lib/module.js'

class Guardian1 extends Module {

	constructor() {
		super({	// init params mapping
			"size": ["cc_1", 10],
			"rot1": ["cc_2", 64],
			"rot2": ["cc_3", 50],
			"rot3": ["cc_4", 100],
			"month": ["cc_5", 0],
			"year": ["cc_6", 0],
			"section": ["cc_7", 0],
			"opacity1": ["cc_8", 100],
			"opacity2": ["cc_9", 100],
			"duration": ["cc_10", 100],
			"animate": ["cc_11", 0],
			"width": ["cc_12", 1],
			"count": ["cc_13", 6],
			"vertices": ["cc_14", 6],
			"fontsize": ["cc_15", 8]
		})
	}

	// initial render
	render() {	


		// for (var i=0; i<3; i++) {
			drawCircle([xmax/2,ymax/2], this.params["size"]*4, "red", this.getDomID())
		// }

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
					facetVal = keys[Math.min(params[facet], keys.length-1) ]
				}

				$("#facets").append('<div class="facet-select"><div class="facet-title">' + facet + '</div><div class="selected">' + facetVal + '</div></div>');	

				console.log(data["facets"][facet])
				// var keys = Object.keys(data["facets"][facet])
				// $("#facets").append('<div class="facet-select"><div class="facet-title">' + facet + '</div><div class="selected">' +  keys[Math.floor(Math.random()*keys.length)] + '</div></div>');	
			}

			for (var i=0; i<data["results"].length; i++) {
				var pos = [xmax*Math.random(), ymax*Math.random()]
				text( { 
					x: pos[0],
					y: pos[1],
					"fill": "#fff",
					// "transform": "rotate(" + (64-obj.params["rot1"]) + " " + obj.params["rot2"]*10 + " " + obj.params["rot3"]*10 + ")",
					"transform": "skewX(" + (64-obj.params["rot1"]) + ")",
					"transform": "skewY(" + (64-obj.params["rot2"]) + ")",
					// "transform": "scale(" + obj.params["rot3"]/20 + ")",
					"transform": "scale(" + (0.5 + Math.random()*3) + ")",
					"style": "font-size:" + size + "px" + ";text-align:left;alignment-baseline:middle;text-anchor:left;opacity:1.0;font-family:Avenir;sans-serif;font-weight:" + 100 + ";letter-spacing:" + 0 + "px;"
				}, data["results"][i]["title"], domID); 

				drawCircle([pos[0]-10, pos[1]-Math.sqrt(size)], Math.sqrt(size), "#fff", domID);
			}
		});

		// this.setBackgroundColor("rgba(255,255,255," + this.params["opacity1"]/100 + ")")
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

Guardian1.prototype.getQuery = function() {
	var query = "/search?q=all"
	var facetFields = ["month", "year", "section"]
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
	// if (params[""])
	console.log(query)
	return query
	
}

export default Guardian1;
