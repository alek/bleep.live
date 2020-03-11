//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class FileVis1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.start = 0
		this.limit = 100
		this.colorMap = {}
		this.freqCount = {}
		
		this.header = null
		this.content = null

		var mod = this
		
		document.onkeydown = function (e) {
  		  e = e || window.event;
    		switch(e.keyCode) {
    			case 40:
    			case 39:
    				mod.start = mod.start + mod.limit
    				// mod.clear()
    				mod.render()
    				break
    			case 37:
    			case 38:
    				mod.start = Math.max(mod.start - mod.limit, 0)
    				// mod.clear()
    				mod.render()
    				break
    		}	
		};
	}

	inc(val) {
		if (!this.freqCount[val]) {
			this.freqCount[val] = 0
		}
		this.freqCount[val]++
	}

	// local overrides

	drawRectangle = function(coord, width, height, fill, domID, id) {
		rect({
			x: coord[0],
			y: coord[1],
			width: width,
			height: height,
			stroke: fill,
			fill: fill,
			id: id,
			style: "stroke-width:1;"
		}, domID);	
	}

	drawText = function(coord, content, size, fill,weight, spacing, fontFamily, domID, align, id) {
		if (align == null) {
			align = "middle"
		}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			id: id,
			"transform": "rotate(0 50 100)",
			"style": "font-size:" + size + ";text-align:center;alignment-baseline:" + align + ";text-anchor:" + align + ";opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, (content != null) ? content.toString() : "", domID); 
	}

	// prep the screen
	prep = function() {
		$.each($("svg"), function() {
			if ($(this).attr("id") != "svg-config") {
				$(this).empty()
			}
		})
	}

	renderDetails(content, header, topOffset, leftOffset, colorMap, domID) {
		drawRectangle([xmax/2,0], xmax/2, ymax, "#232325", domID)
		for (var j=0; j<content.length; j+=2) {
			var v1 = (content[j] && content[j].length > 0) ? content[j] : "-"
			this.drawText([xmax*0.5+50,topOffset+j*20+5], header[j], 8, "#fff", 100, 0, "Roboto Mono", domID, "start", "label-1")
			this.drawText([xmax*0.5+50,topOffset+j*20+20], v1 , 14, colorMap[content[j]], 300, 0, "Roboto Mono", domID, "start", "label-1")

			var v2 = (content[j] && content[j].length > 0) ? content[j+1] : "-"
			this.drawText([xmax*0.5+200,topOffset+j*20+5], header[j+1], 8, "#fff", 100, 0, "Roboto Mono", domID, "start", "label-1")
			this.drawText([xmax*0.5+200,topOffset+j*20+20], v2, 14, colorMap[content[j+1]], 300, 0, "Roboto Mono", domID, "start", "label-1")
		}
	}


	render() {

		var domID = this.getDomID()
		var mod = this
		var topOffset = ymax*0.08
		var leftOffset = xmax*0.02

		
		var filter = "?start=" + this.start + "&limit=" + this.limit
		$.get("http://localhost:5133/api/file" + filter, function( data ) {			
			var res = data.body
			var header = res['header']
			var content = res['content']

			mod.header = header
			mod.content = content

			var len = header.length

			var width = ymax/header.length

			mod.prep()
			drawRectangle([0,0], xmax, ymax, "#232325", domID)

			mod.drawText([40,topOffset-30], "File Structure Analysis", 12, "#fff", 100, 0, "Roboto Mono", domID, "start", "label-1")

			for (var i=0; i<content.length; i++) {

				mod.drawText([leftOffset + 20,topOffset+(i+1)*8], mod.start+i, 6, "#fff", 100, 0, "Roboto Mono", domID, "end", "label-1")
				for (var j=0; j<content[i].length; j++) {
					var value = content[i][j]
					if (!mod.colorMap[value]) {
						mod.colorMap[value] = randomPantoneHex()
					}
					mod.inc(value)
					var id = "rect-" + i + "-" + j
					mod.drawRectangle([leftOffset + 30 + j*8,topOffset+i*8], 6, 6, mod.colorMap[value], domID, id)

					document.getElementById(id).addEventListener('mouseover', function(e) {
					    var parts = this.id.split("-")
					    if (parts.length == 3 && parts[0] == "rect") {
					    	var i = parts[1]
					    	var j = parts[2]
					    	mod.renderDetails(mod.content[i], mod.header, topOffset, leftOffset, mod.colorMap, domID)
					    }
					});					

				}

				if (i == 0) {
					mod.renderDetails(content[0], header, topOffset, leftOffset, mod.colorMap, domID)
				}

			}

			// draw legend
			var colors = Object.keys(mod.colorMap)
			var topTerms = []
			colors.sort(function(a, b) { return mod.freqCount[a] - mod.freqCount[b]})

			for (var i=0; i<colors.length; i++) {
				if (mod.freqCount[colors[i]] > 10) {
					topTerms.push(colors[i])
					if (topTerms.length == 32) {
						break
					}
  				}
			}

			mod.drawText([leftOffset + 30,topOffset+8*content.length + 30], "LEGEND", 8, "rgba(255,255,255,0.8)", 100, 2, "Roboto Mono", domID, "start")

			var coord = [30,topOffset+8*content.length + 50]

			for (var i=0; i<topTerms.length; i++) {
				
				mod.drawRectangle([leftOffset + coord[0], coord[1]], 6, 6, mod.colorMap[topTerms[i]], domID)
				mod.drawText([leftOffset + coord[0] + 10, coord[1] + 6], topTerms[i].substring(0,10), 8, "rgba(255,255,255,0.8)", 100, 2, "Roboto Mono", domID, "start")

				if (i%4 == 0) {
					coord = [30, coord[1] + 12]
				} else {
					coord = [coord[0] + 100, coord[1]]
				}
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

export default FileVis1;
