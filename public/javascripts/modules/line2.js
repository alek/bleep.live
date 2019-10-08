//
// Simple module demonstration
//

import Module from '../lib/module.js'

class Line2 extends Module {

	constructor() {
		super({	// init params mapping
			"p": ["cc_1", 20],
			"opacity": ["cc_2", 127],
			"grid_rows": ["cc_3", 40],
			"count": ["cc_4", 200]
		})
	}


	scheduler() {

		var timer = TimeContainer.getInstance()

	    // while(timer["nextTimerClock"] < timer["context"].currentTime + 0.1) {
	    //     timer["nextTimerClock"] += 0.5;
	    // }	    

	    // add logic here
	    // console.log(Math.random())


	}

	// renderGrid() {
	// 	var start = null
	// 	var target = null
	// 	var count = 0
	// 	for (var i=0; i<this.params["grid_columns"]; i++) {
	// 		for (var j=0; j<this.params["grid_rows"]; j++) {
	// 			var coord = getGridCoordinates([i,j], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
	// 			start = coord
	// 			// drawCircle(coord, 2, "#fff", this.getDomID())
	// 			var fill = "none"
	// 			rect({
	// 				x: coord[0],
	// 				y: coord[1],
	// 				width: 1,
	// 				height: 1,
	// 				stroke: "#fff",
	// 				fill: fill,
	// 				style: "stroke-width:1"
	// 			}, this.getDomID()
	// 			);	
	// 		}
	// 	}
	// }		

	gen() {
		// var nrows = parseInt(this.params["grid_rows"])
		// var ncols = parseInt(this.params["grid_columns"])
		// var coord = getGridCoordinates([Math.floor(nrows/5),Math.floor(nrows/2)], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		// drawText(coord, "schematic-file-converter", 36, "#fff", 700, 0, "Helvetica", this.getDomID())

		// coord = getGridCoordinates([Math.floor(nrows/2),Math.floor(nrows/2)], this.params["grid_columns"], this.params["grid_rows"], xmax, ymax) 
		// drawText(coord, "schematic-file-converter", 36, "#fff", 400, 0, "Helvetica", this.getDomID())

		var state = StateContainer.getInstance()
		state["count"] = state["count"] + 10
		// console.log(state["count"])

		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var image = ctx.getImageData(0, 0, xmax, ymax);
		var imageData = image.data;

		// for (var x=state["count"]; x<state["count"]+Math.floor(100*Math.random()); x++) {
		// 	var start = Math.floor(ymax*Math.random())
		// 	var end = Math.min(start + 50, ymax)
		// 	var opacity = Math.floor(Math.random()*255)
		// 	console.log(start)
		// 	for (var y=start; y<end; y++) {
		// 	    var index = (x + y * xmax) * 4;
		// 	    imageData[index] = 255;
		// 	    imageData[index+1] = opacity;
		// 	    imageData[index+2] = Math.floor(255*Math.random());
	 //    		imageData[index+3] = opacity;
		// 	}
		// }

		// console.log(state["count"])


		// var opacity = Math.floor(255*Math.random())
		var rCol = Math.floor(255*Math.random())
		var opacity = state["module"].params["opacity"]*2

		for (var x=state["count"]; x<state["count"]+100; x++) {

			// var yoffset = ymax/2 + Math.floor(Math.random()*state["count"] - state["count"]/2)
			var yoffset = ymax/2 + state["module"].params["p"]*5
			var opacity = state["module"].params["opacity"]

		    var index = (x - xmax + yoffset * xmax) * 4;
		    imageData[index] = 255;
		    imageData[index+1] = 255;
		    imageData[index+2] = 255;
    		imageData[index+3] = opacity;
		}
		
		ctx.putImageData(image, 0, 0);

	}


	// initial render
	render() {	

		// this.scheduler();
		// window.setInterval(this.scheduler, 50.0);

		var canv = document.createElement('canvas');
		canv.id = 'canvas';
		canv.setAttribute("width", xmax);
		canv.setAttribute("height", ymax);
		document.getElementById('master-grid').appendChild(canv);

		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var image = ctx.createImageData(xmax, ymax);
		
		var state = StateContainer.getInstance()
		state["count"] = 0
		state["module"] = this

		window.setInterval(this.gen, 50)

		// for (var i=0; i<1000; i++) {
		// 	setPixel(image, Math.random()*xmax, Math.random()*ymax, 0, 0, 0, 255);
		// }


		// for (var i=0; i<10000; i++) {
		// 	console.log(i + " -> " + this.audioContext.currentTime);
		// }

		// var el = addSVG("circle", {
		// 	cx: xmax/2,
		// 	cy: ymax/2,
		// 	r: parseInt(this.params["radius"])*10,
		// 	stroke: "none",
		// 	fill: "rgb(" + this.params["r"] + "," + this.params["g"] + "," + this.params["b"] + ")",
		// 	// fill: "red",
		// 	style: "stroke-width:0",
		// });

		// super.render(el)
		//this.renderGrid()	
		// this.gen()

	}

	// state update as a result of a midi event
	// update(event) {
	// 	var knob = event['knob']
	// 	var paramName = this.wiring[knob]
	// 	var el = document.getElementById(this.getDomID())
	// 	// el.childNodes[0][paramName]['baseVal']['value'] = event['value']
	// }

	update(event) {
		super.update(event)
		// this.clear()
		// this.render()
	}

}

export default Line2;
