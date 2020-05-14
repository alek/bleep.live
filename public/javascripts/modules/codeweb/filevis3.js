//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class FileVis3 extends Module {

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

	trim = function(text) {
		return (text != null) ? text.substring(0,16) : ""
	}

	renderDetails(content, header, topOffset, leftOffset, colorMap, domID) {
		drawRectangle([xmax/2,0], xmax/2, ymax, "#232325", domID)
		for (var j=0; j<content.length; j+=2) {
			var v1 = (content[j] && content[j].length > 0) ? this.trim(content[j]) : "-"
			this.drawText([xmax*0.5+50,topOffset+j*20+5], header[j], 8, "#fff", 100, 0, "Roboto Mono", domID, "start", "label-1")
			this.drawText([xmax*0.5+50,topOffset+j*20+20], v1 , 14, colorMap[content[j]], 300, 0, "Roboto Mono", domID, "start", "label-1")

			var v2 = (content[j] && content[j].length > 0) ? this.trim(content[j+1]) : "-"
			this.drawText([xmax*0.5+200,topOffset+j*20+5], header[j+1], 8, "#fff", 100, 0, "Roboto Mono", domID, "start", "label-1")
			this.drawText([xmax*0.5+200,topOffset+j*20+20], v2, 14, colorMap[content[j+1]], 300, 0, "Roboto Mono", domID, "start", "label-1")
		}
	}

	render() {
		var domID = this.getDomID()
		var yoffset = 50
		$.get("http://localhost:4567/file", function( data ) {			
			var results = JSON.parse(data)
			var histogram = results["time_histogram"]
			for (var i=0; i<histogram.length; i++) {
				drawText([75, yoffset + i*10+5], histogram[i]["date"], "8px", "#fff", 300, 0, "JetBrains Mono", domID, "end")
				drawRectangle([85, yoffset + i*10], Math.min(5 + histogram[i]["count"]/10, xmax*0.2), 5, "#fff", domID )
			}

			var content = results["content"]
			var lastTime = null
			for (var i=0; i<content.length; i++) {
				let time = Date.parse(content[i]["timestamp"])
				if (lastTime) {
					let delta = time - lastTime
					if (delta > 200000) {
						yoffset += 10
					}
				}
				drawText([xmax*0.3, yoffset + i*12+5], content[i]["line"] , "10px", "#fff", 300, 0, "JetBrains Mono", domID, "start")
				lastTime = time
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

export default FileVis3;
