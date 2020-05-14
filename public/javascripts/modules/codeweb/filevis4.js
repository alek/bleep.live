//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class FileVis4 extends Module {

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
		this.monthLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

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

	drawCircleOutline = function(coord, r, fill, width, domID, id, dashed, dashSpacing) {
		if (dashed == null) {
			dashed = false
		}
		if (dashSpacing == null) {
			dashSpacing = "4 2"
		}
		circle({
			cx: coord[0],
			cy: coord[1],
			r: r,
			stroke: fill,
			fill: "none",
			"stroke-dasharray": dashed ? dashSpacing : "0",		
			"transform": "rotate(-90 " + coord[0] + " " + coord[1] + ")",
			style: "stroke-width:" + width,
			id: (id == null) ? randomID(): id
		}, domID);	
	}

	render() {
		var domID = this.getDomID()
		var doc = this
		var yoffset = 50

		$.get("http://localhost:4567/file", function( data ) {			

			var results = JSON.parse(data)
			var histogram = results["time_histogram"]


			var hourly = results["hourly_activity"]
			var xoffset = 50
			var yoffset = ymax*0.08

			drawText([xoffset, yoffset-60], "Nginx Hourly Log Activity", "24px", "#fff", 600, 0, "Helvetica", domID, "start")
			drawText([xoffset, yoffset-35], "IP Filter: 149.28.89.169", "14px", "#fff", 300, 0, "Helvetica", domID, "start")

			let lastMonth = null
			for (let key in hourly) {
				for (let i=0; i<24; i++) {
					drawCircle([xoffset, yoffset+i*15], Math.min(hourly[key][i]/10, 8), "#fff", domID)
				}
				xoffset+=15
				let currentMonth = key.split("-")[1]
				if (!lastMonth) {
					lastMonth = currentMonth
				}
				if (currentMonth != lastMonth) {
					let label = doc.monthLabels[parseInt(currentMonth)-1]
					drawText([xoffset, yoffset+24*15+20], label, "14px", "rgba(255,255,255,0.5)", 300, 0, "Helvetica", domID, "start")
					lastMonth = currentMonth
				}
			}

			yoffset += 500
			drawText([50, yoffset-60], "Log Sample", "24px", "#fff", 300, 0, "Helvetica", domID, "start")
			drawText([50, yoffset-35], "Date Filter: 06/Apr/2020", "14px", "#fff", 100, 0, "Helvetica", domID, "start")


			drawText([xmax*0.62, yoffset-60], "Aggregate Statistics", "24px", "#fff", 300, 0, "Helvetica", domID, "start")
			drawText([xmax*0.62, yoffset-35], "Date Filter: 06/Apr/2020", "14px", "#fff", 100, 0, "Helvetica", domID, "start")

			var content = results["content"]
			for (var i=0; i<content.length; i++) {
				drawText([50, yoffset + i*14+5], content[i]["line"] , "12px", "#fff", 300, 0, "JetBrains Mono", domID, "start")
			}

			doc.drawCircleOutline([xmax*0.62 + 50, ymax*0.45], 50, "#fff", 20, domID, null, true, "200 200")
			doc.drawCircleOutline([xmax*0.62 + 50, ymax*0.45], 25, "#fff", 10, domID, null, true, "0 100 100 20")
			// drawCircle([xmax*0.62 + 50, ymax*0.5], 15, "#fff", domID)


			drawText([xmax*0.62 + 200, ymax*0.45-40], "Source Distribution", "18px", "#fff", 300, 0, "Helvetica", domID, "start")
			drawText([xmax*0.62 + 200, ymax*0.45], "67% us-lax-1w-web-01", "14px", "#fff", 300, 0, "JetBrains Mono", domID, "start")
			drawText([xmax*0.62 + 200, ymax*0.45+20], "33% us-lax-1w-web-01", "14px", "#fff", 300, 0, "JetBrains Mono", domID, "start")

			drawText([xmax*0.62, ymax*0.7], "Response Times", "24px", "#fff", 300, 0, "Helvetica", domID, "start")
			drawText([xmax*0.62, ymax*0.7+25], "Date Filter: 06/Apr/2020", "14px", "#fff", 100, 0, "Helvetica", domID, "start")




		})

	}
	
	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default FileVis4;
