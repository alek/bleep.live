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
// 
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


// radian -> xy
var getCircleCoord = function(xCoord, yCoord, angle, length) {
    length = typeof length !== 'undefined' ? length : 10;
    angle = angle * Math.PI / 180; // if you're using degrees instead of radians
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

var randomOffset = function(max) {
	return max - Math.random()*2*max
}

