//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class GHO2 extends Module {

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

	label = function(coord, content, size, fill,weight, spacing, fontFamily, domID, id, orientation, code) {
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(0 50 100)",
			"id": "label-" + id,
			"code": code,
			"style": "font-size:" + size + ";text-align:start;alignment-baseline:end;text-anchor:" + orientation + ";opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
			// "style": "font-size:" + size + ";text-align:center;alignment-baseline:center;text-anchor:center;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content.toString(), domID); 
	}

	// label2 = function(text, maxWidth, maxLines, lineHeight, params) {
	label2 = function(coord, text, size, fill,weight, spacing, fontFamily, domID, id, orientation, code) {

		var params = { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(0 50 100)",
			"id": "label-" + id,
			"code": code,
			"style": "font-size:" + size + ";text-align:start;alignment-baseline:end;text-anchor:" + orientation + ";opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
			// "style": "font-size:" + size + ";text-align:center;alignment-baseline:center;text-anchor:center;opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}

		var maxWidth = 30
		var maxLines = 5
		var lineHeight = 10

		var parts = splitWords(text, maxWidth, maxLines)

		// generate svg object
		var el = addSVG("text", params);

		for (var i=0; i<parts.length; i++) {
			var span = addSVG("tspan", {
				x: params['x'],
				dy: lineHeight + "px"
			})
			span.appendChild(document.createTextNode(parts[i]))
			el.appendChild(span)
		}
		document.getElementById(this.getDomID()).appendChild(el)
	}


	render() {	

		//this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])
		var domID = this.getDomID()
		var doc = this
		var r = 30
		var angle = 0

		var labelName = "IndicatorName"
		var codeName = "IndicatorCode"
		var angleIncrement = 8

		// var labelName = "Title"
		// var codeName = "Code"

		// $.get("https://ghoapi.azureedge.net/api/Dimension", function( data ) {			
		// $.get("https://ghoapi.azureedge.net/api/Indicator", function( data ) {			
		$.get("https://ghoapi.azureedge.net/api/Indicator?$filter=contains(IndicatorName,%20%27Household%27)", function( data ) {						
			console.log(data)
			
			for (var i=0; i<data.value.length; i++) {


				// console.log(data.value[i])	

				r+=Math.max(1,25-i)
				angle += angleIncrement

				var absAngle = angle%360

				if ((absAngle > 85 && absAngle < 100) || (absAngle > 260 && absAngle < 280)) {
					// angle += 
				}

				var coord = getCircleCoord(xmax*0.3,ymax/2, angle,r)
				
				doc.label2(coord, "- " + data.value[i][labelName], "10px", "#fff", 300, 0, "Roboto Mono", domID, i, "start", data.value[i][codeName])

				var el = $("#label-" + i)

				el.css({"cursor": "pointer"})

				el.click(function() {
					console.log("loading...")
					var code = $(this).attr("code")
					drawRectangle([xmax*0.8, 0], xmax*0.2, ymax, "#000", domID)
					doc.label2([xmax*0.8, ymax*0.1],"loading...", "8px", "#fff", 100, 0, "Roboto Mono", domID)
					$.get("https://ghoapi.azureedge.net/api/" + code, function(vals) {						
						drawRectangle([xmax*0.8, 0], xmax*0.2, ymax, "#000", domID)
						for (var i=0; i<vals.value.length; i++) {							
							var val = vals.value[i]
							var content = ""
							// console.log(val)
							if (val["High"] != null && val["Low"] != null) {	
								content = val["High"].toLocaleString() + " - " + val["Low"].toLocaleString()
							} else {
								var keys = Object.keys(val)
								for (var cnt=0; cnt< keys.length; cnt++) {
									var e = keys[cnt]
									console.log(e)
									if (val[e] != null) {
										content = val[e]	
									}
								}
							}
							doc.label2([xmax*0.8, ymax*0.1 + i*10],content, "8px", "#fff", 100, 0, "Roboto Mono", domID)
						}
						console.log(vals)
					});
				})

				el.hover(function() {
					$(this).css("fill", "red")
				}, function() {
					$(this).css("fill", "#fff")
				}, )

			}

		});


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		// this.clear()
		// this.render()

		$.each($("text"), function() {
			// $(this).attr("cx", xmax*Math.random())
			// $(this).attr("fill", randomPantoneHex())

		})


	}

}

export default GHO2;
