//
// Collection of supercon-related assets
//

class Supercon {

	static test() {
		console.log("test")
	}

	//
	// An airport-style arrow
	//
	static arrow(start, size, color, angle, domID, tm) {
		var delta = size*0.2

		var pathEntries = [
			[start[0], start[1] + size - delta/Math.sqrt(2)], 
			[start[0] + delta/Math.sqrt(2), start[1]+size], 
			[start[0]+size - delta, start[1] + delta + delta/Math.sqrt(2)], 
			[start[0]+size - delta, start[1]+size], 
			[start[0]+size, start[1]+size-delta], 
			[start[0]+size, start[1]], 
			[start[0]+delta, start[1]], 
			[start[0], start[1]+delta], 
			[start[0]+size-delta*(1+1/Math.sqrt(2)), start[1]+delta], 
			[start[0], start[1]+size-delta/Math.sqrt(2)]
			]

		path( {
			d: "M" + pathEntries.map(x => x.join(" ")).join(" L") + "",
			"transform": "rotate(" + angle + " " + (start[0] + size/2) + " " + (start[1] + size/2) + ")",
			style: "fill:" + color + ";stroke:" + color + ";stroke-width:" + 1
		}, domID)

		if (tm == true) {
			drawText([start[0] + size + delta, start[1] + size], "™", delta, "#fff", 100, 0, "Helvetica", domID)			
		}
	}


	//
	// Just another barcode
	//
	static barcode(coord, width, nelements, domID) {
		var offset = 0
		for (var i=0; i<nelements; i++) {
			var height = Math.random()*10
			drawRectangle([coord[0], coord[1] + offset], width, height, "#fff", domID)
			var spacing = Math.random()*10
			offset += height + spacing
		}
	}


	//
	// Bus-style power cable strip
	//
	static cablestrip(start, length, height, width, linecount, domID) {

		for (var i=0; i<linecount; i++) {

			var coords = [start]
			var offset = length*0.1+linecount*1.5*(Math.floor(Math.random()*width))
			
			coords.push([start[0] + offset, start[1]])
			coords.push([start[0] + length*0.2 + offset, start[1]+height])
			coords.push([start[0] + length*0.5 + offset, start[1]+height])
			coords.push([start[0] + length*0.7 + offset, start[1]])
			coords.push([length, start[1]])
			
			// $("defs").append('<mask id="Mask-' + i + '"> <rect id="mask-rect-' + i + '" x="0" y="0" width="300" height="500" fill="red"  /> </mask>')

			//document.getElementsByTagName("defs")[0].appendChild(addSVG("mask", {id: "Mask-" + i})).appendChild(addSVG("rect", { id: "mask-rect-" + i, fill: "red", "x": 0, "y":0, "width": timeSlide(2000, length), "height": 500  }))

			//document.getElementsByTagName("defs")[0].appendChild(addSVG("mask", {id: "Mask-" + i})).appendChild(addSVG("rect", { fill: "red", "x": 0, "y":0, "width": timeSlide(2000, length), "height": 500  }))
			// addMask("Mask-i")

			path( {
			d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
				mask: "url(#Mask-" + i + ")",
				"stroke-linejoin": "round",
				style: "fill:none;stroke:#fff;stroke-width:" + width*Math.random()
			}, domID)

			document.getElementsByTagName("defs")[0].appendChild(addSVG("mask", {id: "Mask-" + i})).appendChild(addSVG("rect", { id: "Mask-rect-" + i, fill: "red", "x": 0, "y":0, "width": timeSlide(2000, length), "height": 500  }))
			$("#Mask-rect-" + i).attr("width",timeSlide(2000, length))				

		}

	}

	static addLinearMask(id, timeConstant, maxWidth, maxHeight) {
		if (maxWidth == null) { maxWidth = xmax } 
		if (maxHeight == null) { maxHeight = ymax }
		document.getElementsByTagName("defs")[0].appendChild(addSVG("mask", {id: "Mask-" + id})).appendChild(addSVG("rect", { id: "Mask-rect-" + id, fill: "red", "x": 0, "y":0, "width": timeSlide(timeConstant, maxWidth), "height": maxHeight  }))		
		$("#Mask-rect-" + id).attr("width",timeSlide(2000, xmax))				
	}

	// render a single pcb trace
	static pcbPath(coords, width, id, domID) {
		path( {
		d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
			mask: "url(#Mask-" + id + ")",
			"stroke-linejoin": "round",
			"marker-end" : "url(#via)",
			style: "fill:none;stroke:#fff;stroke-width:" + width
		}, domID)
		// document.getElementsByTagName("defs")[0].appendChild(addSVG("mask", {id: "Mask-" + id})).appendChild(addSVG("rect", { id: "Mask-rect-" + id, fill: "red", "x": 0, "y":0, "width": timeSlide(2000, xmax), "height": ymax  }))		
		this.addLinearMask(id, 2000)
	}

	// offset path for a given xoffset / yoffset
	static offsetPath(coords, xoffset, yoffset) {
		return coords.map(entry => [entry[0]+xoffset, entry[1]+yoffset])
	}

	// get the sign based on path growth direction
	static growthSign(val, inc, max) {
		if (val + inc > max) {
			return -1
		} else {
			return 1
		}
	}

	static pcbBus(start, domID) {

		// base path
		var coords = [start]
		for (var i=0; i<10; i++) {
			var d = Math.random()*ymax*0.2
			var dice = Math.random() 
			var last = coords.slice(-1)[0]
			if (dice < 0.45) {
				coords.push([last[0], last[1] + d*this.growthSign(start[1],d, ymax)])
			} else if (dice < 0.85) {
				coords.push([last[0]+d*this.growthSign(start[0],d,xmax), last[1]])
			} else {
				coords.push([last[0]+d*0.707*this.growthSign(start[0],d,xmax), last[1]+d*0.707*this.growthSign(start[1],d, ymax)])
			}
		}

		// offsets
		this.pcbPath(coords, 20*Math.random(), "path-0", domID)
		var offset = 20
		for (var i=1; i<Math.ceil(30*Math.random()); i++) {
			this.pcbPath(this.offsetPath(coords,-offset*i*this.growthSign(start[0],xmax,xmax),2*offset*i), 10*Math.random(), "path-" + i, domID)
		}		
	}

	//
	// Render a generative pcb board within the given box
	//
	static pcbBoard(start, width, height, domID) {
		this.pcbBus(start, domID)
		this.pcbBus([xmax,0], domID)
		//drawCircleOutline([xmax/2,ymax/2], 200*Math.random(), "#fff", 10,  domID)
	}


}

export default Supercon;