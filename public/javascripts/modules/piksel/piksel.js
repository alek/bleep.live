//
// Collection of supercon-related assets
//

import { getBiorxivData } from '../../dataset/biorxiv.js'

class Piksel {

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

	static brackets(center, width, height, len, color, stroke, domID) {

		// clockwise bracket rendering

		drawPath([
			[center[0] - width/2 + len, center[1] - height/2], 
			[center[0] - width/2, center[1] - height/2],
			[center[0] - width/2,  center[1] - height/2 + len]
			], color, stroke, domID)

		drawPath([
			[center[0] + width/2 - len, center[1] - height/2], 
			[center[0] + width/2, center[1] - height/2],
			[center[0] + width/2,  center[1] - height/2 + len]
			], color, stroke, domID)

		drawPath([
			[center[0] + width/2 , center[1] + height/2 - len], 
			[center[0] + width/2, center[1] + height/2],
			[center[0] + width/2 - len,  center[1] + height/2]
			], color, stroke, domID)

		drawPath([
			[center[0] - width/2 + len, center[1] + height/2], 
			[center[0] - width/2, center[1] + height/2],
			[center[0] - width/2,  center[1] + height/2 - len]
			], color, stroke, domID)

	}

	//
	// Render a stylized carbon symbol with a specified number of bonds
	//
	static carbon1(coord, size, bonds, color, strokeWidth, domID) {
		var len = size*Math.random()
	
		drawCircle(coord, 10, color, domID)

		for (var i=0; i<5; i++) {
			for (var j=0; j<3; j++) {
			line({
				x1: coord[0] + len,
				y1: coord[1] + len,
				x2: coord[0] + 3*len,
				y2: coord[1] + 3*len,
				stroke: "#fff",
				"transform": getRotateVal(360*Math.random(), coord),
				"stroke-width": strokeWidth/5*Math.random(),
				// "stroke-dasharray": "4 2",
				"marker-end" : "url(#circle)"
				}, domID);
			}
			line({
				x1: coord[0],
				y1: coord[1],
				x2: coord[0] + len,
				y2: coord[1] + len,
				stroke: color,
				"transform": getRotateVal(360*Math.random(), coord),
				"stroke-width": strokeWidth,
				// "stroke-dasharray": "4 2",
				"marker-end" : "url(#circle)"
				}, domID);

		}
	}

	static tunnel1(coord, size, bonds, color, strokeWidth, domID) {
		circle({
			cx: coord[0],
			cy: coord[1],
			r: size*(1.5 + Math.random()),
			stroke: color,
			fill: "none",
			"stroke-dasharray": Math.random()*xmax*0.5 + " " + Math.random()*xmax*0.05,		
			"transform": "rotate(0 0 0)",
			style: "stroke-width:" + strokeWidth
		}, domID);	
	}

	static randomTitle() {
		var data = getBiorxivData()
		return data[Math.floor(Math.random()*data.length)]["title"]
	}

	// left-aligned title
	static renderTitle(coord, content, size, fill,weight, spacing, fontFamily, domID, anchor) {
		if (anchor == null) {
			anchor = "left"
		}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,
			"transform": "rotate(0 50 100)",
			"style": "font-size:" + size + ";text-align:" + anchor + ";alignment-baseline:middle;text-anchor:" + anchor + ";opacity:1.0;font-family:" + fontFamily + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, content, domID); 
	}

	// time-changing angle grid
	static triangular1(start, size, stroke, lineWidth, domID) {

		var coords = [start]
		var delta = 50

		for (var i=0; i<size/(delta/4); i++) {
			var last = coords.slice(-1)[0]
			coords.push(getCircleCoord(last[0], last[1], 45*Math.ceil(timeSlide(4000, 2))*(Math.floor(Math.random()*8)), delta))
		}

		path( {
			d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
			"stroke-linejoin": "round",
			"marker-end" : "url(#via)",
			"rotate": getRotateVal(0, start),
			style: "fill:none;stroke:" + stroke + ";stroke-width:" + lineWidth
		}, domID)

	} 

	// grid at a specified angle
	static triangular2(start, size, stroke, lineWidth, angle, delta, domID) {

		var coords = [start]

		for (var i=0; i<size/(delta/4); i++) {
			var last = coords.slice(-1)[0]
			coords.push(getViewport(getCircleCoord(last[0], last[1], angle*(Math.floor(Math.random()*8)), delta ) ))
		}

		path( {
			d: "M" + coords.map(x => x.join(" ")).join(" L") + "",
			"stroke-linejoin": "round",
			"marker-end" : "url(#via)",
			"rotate": getRotateVal(0, start),
			style: "fill:none;stroke:" + stroke + ";stroke-width:" + lineWidth
		}, domID)

	} 

	static addCircularClip(clipName, cx, cy, r) {		
		$("#" + clipName).remove()
		if (document.getElementsByTagName("defs")) {
			document.getElementsByTagName("defs")[0].appendChild(addSVG("clipPath", {id: clipName})).appendChild(addSVG("circle", { id: clipName + "-circle", "cx": cx, "cy":cy, "r": r }))		
		} else {
			console.log("ERROR: defs missing")
		}
	}

	static addRectangleClip(clipName, x, y, width, height) {		
		$("#" + clipName).remove()
		if (document.getElementsByTagName("defs")) {
			document.getElementsByTagName("defs")[0].appendChild(addSVG("clipPath", {id: clipName})).appendChild(addSVG("rect", { id: clipName + "-rect", "x": x, "y":y, "width": width, "height": height }))		
		} else {
			console.log("ERROR: defs missing")
		}
	}


	// tdr-style glitch
	static glitch1(r, domID) {		
		noise.seed(Math.random());
		this.addCircularClip("glitchClip", xmax/2, ymax/2, r)
		var delta = 20
		for (var i=0; i<ymax/delta; i++) {
			var dice = Math.random()
			if (dice < 0.7) {
				line({
					x1: 0,
					y1: i*delta,
					// x2: xmax*2*Math.random(),
					x2: 1.2*xmax*noise.simplex2(i,i),
					y2: i*delta,
					stroke: "#fff",
					"clip-path": "url(#glitchClip)",
					"transform": "rotate(0 0 0)",
					"stroke-width": delta*2*noise.simplex2(i,i)
				}, domID);
			} else if (dice < 0.95) {
				var offset = xmax*noise.simplex2(i,i)
				for (var j = offset; j<xmax; j+=delta) {
					rect({
						x: j,
						y: i*delta,
						width: 20*Math.random(),
						height: delta,
						stroke: "#fff",
						fill: "#fff",
						style: "stroke-width:1;",
						"clip-path": "url(#glitchClip)"
					}, domID);	
				}
			} else {
				var offset = xmax*noise.simplex2(i,i)
				rect({
					x: offset,
					y: i*delta,
					width: delta,
					height: delta,
					stroke: "#fff",
					fill: "#fff",
					"clip-path": "url(#glitchClip)"
				}, domID);	
			}
		}			
	}

	// opart-style
	static glitch2(r, color, angle, domID, id) {
		this.addCircularClip("glitchClip" + id, xmax/2, ymax/2, r)
		var delta = ymax*0.1
		for (var i=timeSlide(110,delta); i<ymax; i+=delta) {
			line({ x1: 0, y1: i,
				   x2: xmax, y2: i,
				   fill: "none",
				   stroke: color,
				   "stroke-width": Math.random() < 0.05 ? xmax : delta/2,
				   "transform": "rotate(" + angle + " " + xmax/2 + " " + ymax/2 + ")",
				   "clip-path": "url(#glitchClip" + id + ")"
				}, domID);
		}
	}

	static tdr1(coord, width, angle, id, domID) {
		var cutWidth = width*0.8
		this.addRectangleClip("symbolClip" + id, coord[0]-cutWidth/2, coord[1]-cutWidth/2, cutWidth,cutWidth)
		image( {
			href: "../public/images/piksel/X-45.svg",
			x: coord[0] - width/2,
			y: coord[1] - width/2,
			"transform": "rotate(" + angle + " " + xmax/2 + " " + ymax/2 + ")",
			"clip-path": "url(#symbolClip" + id + ")",
			width: width
		}, domID)

	} 

	static typeWindow(coord, size, color, id, domID) {
		this.addRectangleClip("symbolClip" + id, coord[0]-size/2, coord[1]-size/2, size,size)
			text( { 
				x: coord[0],
				y: coord[1],
				"fill": color,
				"transform": "rotate(0 " + coord[0] + " " + coord[1] + ")",
				"clip-path": "url(#symbolClip" + id + ")",
				"style": "font-size:" + ymax*0.8 + ";text-align:middle;alignment-baseline:middle;text-anchor:middle;opacity:1.0;font-family:Helvetica;sans-serif;font-weight:700;letter-spacing:-10px;"
			}, this.randomTitle(), domID); 

	}

}

export default Piksel;