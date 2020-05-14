//
// Get MIDI-parametrized rgba color
//
// params - midi controller param state
// id - index of a given color instance
//
var getParametricColor = function(params, id) {
	if (id == null) {
		id = ""
	}
	return "rgba(" + params["r" + id]*2 + "," + params["g" + id]*2 + "," + params["b" + id]*2 + "," + params["opacity" + id]/128 + ")"
}

var materialPalette = ["#F44336", "#E91E63", "#374046", "#9C27B0", "#673AB7", 
					   "#3F51B5", "#2196F3", "#02A9F4", "#00BCD4", "#009688", 
					   "#4BAF50", "#8BC34A", "#CDDC3A", "#FFEB3C", "#FFC10A",
					   "#FD9702", "#FF5722", "#795548", "#9E9E9E", "#607D8B"]

// 
// Create a parametric gradient 
//
// gradientID - id of a newly created gradient
// domID - id of the parent node
// params - mapped midi params 
//
var setupParametricGradient = function(gradientID, domID, params) {
		// setup gradient
		var el = addSVG("defs", {})
		var sub = addSVG("linearGradient", {
			id: gradientID,
			x1: "0%",
			y1: "0%",
			x2: "0%",
			y2: "100%"
		})
		sub.appendChild(addSVG("stop", {
			offset:"0%",
			style:"stop-color:rgb(" + params["r1"]*2 + "," + params["g1"]*2 + "," + params["b1"] + ");stop-opacity:1"
		}))
		sub.appendChild(addSVG("stop", {
			offset:"100%",
			style:"stop-color:rgb(" + params["r2"]*2 + "," + params["g2"]*2 + "," + params["b2"] + ");stop-opacity:1"
		}))
		el.appendChild(sub)
		document.getElementById(domID).appendChild(el)
}


// get a random color from the material palette
var randomMaterialColor = function() {
	return materialPalette[Math.floor(Math.random()*materialPalette.length)]
}

// get [x,y] coordinates for a given [row, column] grid element
var getGridCoordinates = function(gridCoord, nrows, ncolumns, xmax, ymax) {
	var rowWidth = xmax/nrows
	var columnHeight = ymax/ncolumns
	return [gridCoord[0]*rowWidth, gridCoord[1]*columnHeight]
}

// get [x,y] coordinates for a given [row, column] grid element
var getGridCoordinatesCenter = function(gridCoord, nrows, ncolumns, xmax, ymax) {
	var rowWidth = xmax/nrows
	var columnHeight = ymax/ncolumns
	return [gridCoord[0]*rowWidth+rowWidth/2, gridCoord[1]*columnHeight+columnHeight/2]
}

// get a random [x,y] coordinate pair
var getRandomCoord = function(xmax, ymax, border) {
	if (!border) { border = 0 }
	return [border + Math.floor(Math.random()*(xmax-border*2)), border + Math.floor(Math.random()*(ymax-border*2))]
}

// get a random vector of [x,y] coordinates
var getRandomCoordinateVector = function(length, xmax, ymax) {
	var result = []
	for (var i=0; i<length; i++) {
		result.push(getRandomCoord(xmax,ymax))
	}
	return result
}

var getRandomString = function(alphabet, length) {
	var result = ""
	for (var i=0; i<length; i++) {
		result += alphabet.charAt(Math.floor(Math.random()*alphabet.length))
	}
	return result
}


// simple array sum
var sum = function(array) {
	return array.reduce(function(a, b) { return a + b; }, 0);
}

//
// generate uniform partition of a number
//
var uniformPartition = function(num, partitionCount) {
	var result = Array(partitionCount).fill(0)
	var increment = num/(partitionCount*100)	// max 100 iterations
	var count = 0
	while (sum(result) < num) {
		result[count++%partitionCount] += increment
	}
	return result
}

//
// generate random partition of a number
//
var randomPartition = function(num, partitionCount) {
	var result = Array(partitionCount).fill(0)
	var increment = num/(partitionCount*100)	// max 100 iterations
	while (sum(result) < num) {
		result[Math.floor(Math.random()*result.length)] += increment
	}
	return result
}

//
// slit string into an array, each consisting of not more 
// than maxWidth characters
//
var splitString = function(text, maxWidth) {
	var pattern = ".{1," + maxWidth + "}"
	var re = new RegExp(pattern, 'g')
	return text.match(re)
}

//
//  get substring of up to maxChars characters
//  keeping the words in the string intact
//
var subWords = function(text, maxChars) {
	var parts = text.split(" ")
	var result = ""
	var prefix = ""
	for (var i=0; i<parts.length; i++) {
		result += prefix + parts[i]
		if (result.length >= maxChars) {
			return result
		}
		prefix = " "
	}
	return result
}

//
// slit string into an array, each consisting of not more 
// than maxWidth characters, keeping the words whole
//
var splitWords = function(text, maxWidth, maxLines) {
	// break text into lines
	var parts = []
	if (text == null) {
		return parts
	}
	var words = text.split(" ")
	var term = ""

	for (var i=0; i<words.length; i++) {
		if (term.length < maxWidth) {
			term += words[i] + " "
		} else {
			parts.push(term)
			term = words[i]
		}
	}
	parts.push(term)

	// force limit
	parts = parts.slice(0,maxLines)
	return parts

}

//
// generate text layout
//
var getTextLayoutNode = function(text, maxWidth, maxLines, lineHeight, params) {
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
	return el
}


// get array delta
var getArrayDelta = function(arr) {
	var delta = []
	for (var i=1; i<arr.length; i++) {
		delta.push(arr[i] - arr[i-1])
	}
	return delta
}


var getIncrement = function(motion) {

	// first handle the edge cases
	var avg = motion.reduce((previous, current) => current += previous)/motion.length;
	if (avg > 110) {
		return 1
	} else if (avg < 25) {
		return -1
	}

	// then the direction
	var delta = getArrayDelta(motion)
	var result = 0
	for (var i=0; i<delta.length; i++) {
		if (delta[i] < 0) {
			result += -1
		} else if (delta[i] > 0) {
			result += 1
		}
	}
	if (result < -1) {
		return -1
	} else if (result > 1) {
		return 1
	} else {
		return 0
	}
}


//
// polar coordinate resolution
// 
var getCircleCoord = function(xCoord, yCoord, angle, length) {
    length = typeof length !== 'undefined' ? length : 0;
    angle = angle * Math.PI / 180; 
    return [length * Math.cos(angle) + xCoord, length * Math.sin(angle) + yCoord]
}

// create div string
var div = function(content, className, idName) {
	return $('<div class="' + className + '" id="' + idName + '">' + content + "</div>")
}

// render airport-style arrow
var arrow = function(start, size, color, angle, domID) {
	
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

	drawText([start[0] + size + delta, start[1] + size], "™", delta/2, "#fff", 100, 0, "Helvetica", domID)
}

var deg2rad = function(deg) {
	return deg*Math.PI/180
}

var rad2deg = function(rad) {
  return rad*180/Math.PI;
}

var randomOffset = function(max) {
	return max - Math.random()*2*max
}

// https://github.com/electron/electron/issues/2288
var isElectron =function() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

var getAssetPath = function(file) {
	return (isElectron() ? "../public" : "") + file
}

var timeSlide = function(timeConst, maxVal) {
	return ((new Date())%timeConst)/timeConst * maxVal
}

var timeRamp = function(timeConst, maxVal) {
	var val = timeSlide(timeConst, maxVal)
	if (val > maxVal/2) {
		return maxVal - val
	} else {
		return val
	}
}

var getRotateVal = function(angle, coord) {
	return "rotate(" + angle + " " + coord[0] + " " + coord[1] + ")"
}

var sigmoid = function(x) {
	return 1 / (1 + Math.pow(Math.E, -x))
}

var capitalize = function(text) {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

// 
// Eucledian distance between two coordinates
//
var distance = function(coord1, coord2) {
	return Math.sqrt(Math.pow(coord2[0] - coord1[0], 2) + Math.pow(coord2[1] - coord1[1], 2))
}

// 
// Check if circles overlap
//
var circlesOverlap = function(coord1, r1, coord2, r2) {
	return distance(coord1, coord2) < (r1 + r2)
}

// get random coordinate within a given circle
var randomCircleCoord = function(center, radius) {
	var a = Math.random() * 2 * Math.PI
	var r = radius * Math.sqrt(Math.random())
	return [center[0] + r * Math.cos(a), center[1] + r * Math.sin(a)]
}

// circle packing layout tools

class Circle {
	constructor(coord, r) {
		this.coord = coord
		this.r = r
		this.color = "#fff"
	}
	overlaps(circle) {
		return circlesOverlap(this.coord, this.r, circle.coord, circle.r)
	}
	outline(domID) {
		drawCircleOutline(this.coord, this.r, this.color, "1px", domID)
	}
	draw(domID) {
		drawCircle(this.coord, this.r, this.color, domID)
	}
	area() {
		return Math.pow(this.r,2)*Math.PI
	}
	circumference() {
		return 2*this.r*Math.PI
	}
}

class CircleLayout {
	
	constructor(center, radius) {
		this.center = center
		this.radius = radius
		this.elements = []
		this.totalArea = Math.pow(this.radius,2)*Math.PI
		this.areaOccupied = 0
	}
	
	areaAvailable() {
		return this.totalArea - this.areaOccupied
	}
	
	add(radius, margin) {
		if (margin == null) {
			margin = 0
		}
		if (Math.pow(radius,2)*Math.PI < this.areaAvailable()*0.8) {
			for (var i=0; i<40; i++) { 	// max 20 attempts
				// var coord = getRandomCoord(this.xmax, this.ymax, this.ymax*0.1)
				var coord = randomCircleCoord(this.center, this.radius - radius*2 - margin)
				
				var available = true
				var circle = new Circle(coord, radius)

				for (var j=0; j<this.elements.length; j++) {
					if (this.elements[j].overlaps(circle)) {
						available = false
					}
				}
				if (available) {
					this.elements.push(circle)
					this.areaOccupied += circle.area()
					return circle
				}
			}
		} 
		return null
	}
}


// render circle segments via polygon interpolation
class CircleSegment {
	constructor(center, startAngle, endAngle, radius, height, color) {
		this.center = center
		this.radius = radius
		this.startAngle = startAngle
		this.endAngle = endAngle
		this.height = height
		this.color = (color == null) ? "#fff" : color
	}

	draw(domID) {
		if (Math.abs(this.startAngle - this.endAngle) < 2) {	// straight up single polygon
			var c1 = getCircleCoord(this.center[0], this.center[1], this.startAngle, this.radius)
			var c2 = getCircleCoord(this.center[0], this.center[1], this.startAngle, this.radius + this.height)
			var c3 = getCircleCoord(this.center[0], this.center[1], this.endAngle, this.radius + this.height)
			var c4 = getCircleCoord(this.center[0], this.center[1], this.endAngle, this.radius )
			drawPolygon([c1, c2, c3, c4], this.color, domID)
		} else {	// multiple polygons
			for (var i=0; i<(this.endAngle - this.startAngle); i++) {
				var c1 = getCircleCoord(this.center[0], this.center[1], this.startAngle+i, this.radius)
				var c2 = getCircleCoord(this.center[0], this.center[1], this.startAngle+i, this.radius + this.height)
				var c3 = getCircleCoord(this.center[0], this.center[1], this.startAngle+i+1, this.radius + this.height)
				var c4 = getCircleCoord(this.center[0], this.center[1], this.startAngle+i+1, this.radius )
				drawPolygon([c1, c2, c3, c4], this.color, domID)
			}
		}
	}
}

class TreeMap {
	constructor(coord, width, height, color, label) {
		this.coord = coord
		this.width = width
		this.height = height
		this.color = (color != null) ? color : "#fff"
		this.next = coord
		this.label = label
		this.palette = new Array(4).fill(0).map(x => randomPantoneHex());
	}

	add(width, height, label, delta) {
		var res = new TreeMap(this.next, width, height, this.palette[Math.floor(Math.random()*this.palette.length)], label)
		if ((this.next[0] - this.coord[0]) + width < this.width - delta - 30) {
			this.next = [this.next[0] + width + delta, this.next[1]]
		} else if ((this.next[1] - this.coord[1]) + height < this.height - delta) {
			this.next = [this.coord[0], this.next[1] + height + delta]
		} else {
			console.log(this.coord[0] + "\t" + this.coord[1] + "\t" + width + "\t" + height)
			return null
		} 
		return res
	}

	draw(domID, drawBg) {
		if (drawBg) {
			drawRectangle(this.coord, this.width, this.height, this.color, domID)
		} else {
			drawRectangleOutline(this.coord, this.width, this.height, this.color, domID)
		}
		if (this.label) {
			drawText([this.coord[0] + 5, this.coord[1]+this.height - 10], this.label, "10px", this.palette[0], 100, 0, "Roboto Mono", domID, "left")
		}
	}
}

// some essential prototype extensions

// XOR two strings
String.prototype.xor = function(text) {
	
	let len = Math.max(this.length, text.length)

	let source = this.pad(len)
	text = text.pad(len)
	let result = ""

	for (let i=0; i<len; i++) {
		result += String.fromCharCode(source.charCodeAt(i) ^ text.charCodeAt(i))
	}
	return result
}

// pad the string to a given length
String.prototype.pad = function(length) {
	if (this.length == length) {
		return this.toString()
	} else if (this.length > length) {
		return this.substring(0,length)
	} else {
		return this.padEnd(length)
	}
}

// get a binary array representation 
String.prototype.toBinaryArray = function(length) {
	return Array.from(this).map((each)=>each.charCodeAt(0).toString(2)).join("").split("").map((each)=>parseInt(each))
}

String.prototype.hash1 = function() {
	let result = ""
	let sum = 1
	for (let i=0; i<this.length; i++) {
		sum = sum*this.charCodeAt(i) % 239
		result += String.fromCharCode(sum)
	}
	return result
}