//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Virtual12 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		// this.colors = ["#33c6f0", "#e1185a", "#ecb32a", "#2ab77e", "#490d4a"]
		this.colors = ["#f7d8a1"]
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	


	rndColor() {
		return this.colors[Math.floor(Math.random()*this.colors.length)]
	}

	hexToRgbA(hex, alpha){
	    var c;
	    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
	        c= hex.substring(1).split('');
	        if(c.length== 3){
	            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
	        }
	        c= '0x'+c.join('');
	        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + alpha + ')';
	    }
	    throw new Error('Bad Hex');
	}


	render() {	
		// this.renderGrid(this.params["grid_rows"],this.params["grid_rows"])

		// drawImage([xmax/2,ymax/2], "../public/images/microbia1.png", 500, 500, this.getDomID())

		//$("svg").remove()
		// $("#graph").css({"position": "fixed"})
		// $("body").append($('<img src="../public/images/microbia1.png">').css({"position": "fixed"}))
		$("body").css({"background-image": "url(../public/images/microbia" + Math.floor(Math.random()*3) + ".png)", "background-position": "center"})


		for (var i=xmax*0; i<xmax*1.0; i+=50) {
			for (var j=ymax*0.2; j<ymax*0.8; j+= 50) {
				if (Math.random() < 0.3) {	
					drawCircle([i,j], 20, this.hexToRgbA(this.rndColor(), Math.random()), this.getDomID())
					drawCircleOutline([i,j], 18 + Math.random()*5, this.hexToRgbA(this.rndColor(), Math.random()), 3*Math.random(), this.getDomID())
				}
			}
		}
		//drawCircle([xmax/2,ymax/2], 200*Math.random(), "#fff", this.getDomID())
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Virtual12;
