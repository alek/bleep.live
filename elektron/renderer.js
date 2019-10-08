// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


var addSVG = function(tag, attrs) {
	var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs) {
		el.setAttribute(k, attrs[k]);
	}
	return el;
}

circle = function(params, domID) {
	document.getElementById(domID).appendChild(addSVG("circle", params));
}

drawCircle = function(coord, r, fill, domID, id) {
		circle({
			cx: coord[0],
			cy: coord[1],
			r: r,
			stroke: "#fff",
			fill: fill,
			"transform": "rotate(0 0 0)",
			style: "stroke-width:0",
			id: (id == null) ? 1: id
		}, domID);	
}

clear = function() {
	var div = document.getElementById('results');
	while(div.firstChild){
    	div.removeChild(div.firstChild);
	}
}

render = function() {
	for (var i=0; i<1000; i++) {
		drawCircle([Math.random()*1000, Math.random()*1000], Math.random()*50, "rgba(" + i%255 + ",255,255," + Math.random() + ")", "results")
	}
}

// setInterval(function() { clear(); render(); }, 1)
render()
