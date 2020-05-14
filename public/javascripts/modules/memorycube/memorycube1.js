//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'
import { getBookmarks } from '../../dataset/bookmarks.js'

class MemoryCube1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.startTime = new Date()
		this.palette = this.getPalette(16)

	}

	getPalette(count) {
		var palette = []
		for (var i=0; i<count; i++) {
			palette.push(randomPantoneHex())
		}
		return palette
	}

	getRandomColor() {
		return this.palette[Math.floor(Math.random()*this.palette.length)]
	}

	drawPolygon = function(coords, fill, domID, strokeWidth, id) {
		if (strokeWidth == null) {
			strokeWidth = 0
		}
		polygon( {
			points: coords.join(" "),
			id: id,
			style: "fill:" + fill +";stroke:" + fill + ";stroke-width:" + strokeWidth
		}, domID)
	}

	render() {	
		var bookmarks = getBookmarks()
		var size = 50
		var index = 0
		var xoffset = 50
		var yoffset = 100
		drawText([size, size], "My Bookmarks", "21px", "#fff", 500, 0, "Helvetica", this.getDomID(), "start")
		drawText([size, size+20], "June 20 2019 - April 2 2020", "14px", "#fff", 300, 0, "Helvetica", this.getDomID(), "start")
		for (var y=yoffset+size/2; y<ymax; y+=size) {
			for (var x=xoffset; x<xmax*0.4-size; x+=size) {
				var color = this.getRandomColor()
				this.drawPolygon([[x,y], [x+size,y], [x+size, y+size]], this.getRandomColor(), this.getDomID(), 0, "polygon-" + index)
				if (Math.random() < 0.7) {
					this.drawPolygon([[x,y], [x,y+size], [x+size, y+size]], this.getRandomColor(), this.getDomID(), 0, "polygon-" + index)
				}
				$("#polygon-" + index).attr({"data": JSON.stringify(bookmarks[index]), "color": color})
				$("#polygon-" + index).css("cursor", "pointer")

				var domID = this.getDomID()
				$("#polygon-" + index).hover(function() {
					var entry = JSON.parse($(this).attr("data"))
					drawRectangle([xmax*0.4, 0], xmax*0.6, ymax, "#000", domID)
					drawText([xmax*0.4+20, yoffset+40], entry["title"], "28px", $(this).attr("color"), 700, 0, "Helvetica", domID, "start")
					drawText([xmax*0.4+20, yoffset+60], entry["url"], "14px", "#fff", 100, 0, "Helvetica", domID, "start")
					//console.log(JSON.parse($(this).attr("data"))["title"])
				})
				index++
			}
			if (index > bookmarks.length) {
				break
			}
		}	
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default MemoryCube1;
