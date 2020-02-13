//
// Josef Muller Brockman-style logo generator
// 

import Module from '../../lib/module.js'

class Constructive2 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		this.foo = 0.0001
		this.inc = 0.00005
	}

	getBorderColor() {
		return "rgba(255,255,255," + (0.1 + Math.random()*0.3) + ")"
	}

	render() {	

		drawRectangle([0,0], xmax, ymax, "#000", this.getDomID())
		
		var sqSize = ymax*0.075

		var dim = ymax*0.8
		var mainDiagonal = dim*Math.sqrt(2)
		var cornerDiagonal = dim/Math.sqrt(2)

		var center = [xmax/2,ymax/2]
		var border = [[center[0]-dim/2, center[1]-dim/2], [center[0]+dim/2, center[1]-dim/2], [center[0]+dim/2, center[1]+dim/2], [center[0]-dim/2, center[1]+dim/2] ]

		var delta = dim/16

		if (true) {

			drawPolygonOutline(border, this.getBorderColor(), this.getDomID())
			drawLine(border[0], border[2], this.getBorderColor(), 1, this.getDomID())
			drawLine(border[1], border[3], this.getBorderColor(), 1, this.getDomID())
			drawCircleOutline(center, mainDiagonal/4, this.getBorderColor(), 1, this.getDomID())

			rect({
				x: center[0]-cornerDiagonal/2,
				y: center[1]-cornerDiagonal/2,
				width: cornerDiagonal,
				height: cornerDiagonal,
				stroke: this.getBorderColor(),
				fill: "none",
				"transform": "rotate(45 " + center[0] + " " + center[1] + ")",
				style: "stroke-width:1;"
			}, this.getDomID());	

			for (var i=0; i<9; i++) {
				var off = center[0] - dim/4 + i*delta
				drawLine([off, 0], [off, ymax], this.getBorderColor(), 1, this.getDomID())
			}

			for (var i=0; i<9; i++) {
				var off = center[1] - dim/4 + i*delta
				drawLine([0, off], [xmax, off], this.getBorderColor(), 1, this.getDomID())
			}

			drawLine([center[0] - dim/4, 0], [center[0] - dim/4, ymax], this.getBorderColor(), 1, this.getDomID())
		}

		for (var x=0; x<16; x++) {
			for (var y=0; y< 16; y++) {
				var xoff = 7-x
				var yoff = 7-y
				this.foo += this.inc
				if (this.foo > 4) {
					// this.foo = 0.1
					this.inc = -0.00005
				} else if (this.foo < 0.0001) {
					this.inc = 0.00005
				}
				if (Math.pow(xoff,2) + Math.pow(yoff,2) <= Math.ceil(mainDiagonal/delta)*this.foo) {
					if (Math.random() < 0.25) {
						// drawSquare([border[0][0] + dim/4 + x*delta, border[0][1] + dim/4 + y*delta], delta, "#fff", this.getDomID())
						drawPolygon([
							[border[0][0] + x*delta, border[0][1] + y*delta],
							[border[0][0] + (x+1)*delta, border[0][1] + y*delta],
							[border[0][0] + (x+1)*delta, border[0][1] + (y+1)*delta]
							], 
							"#fff", this.getDomID(), 1)
					}
					if (Math.random() < 0.25) {
						// drawSquare([border[0][0] + dim/4 + x*delta, border[0][1] + dim/4 + y*delta], delta, "#fff", this.getDomID())
						drawPolygon([
							[border[0][0] + x*delta, border[0][1] + y*delta],
							[border[0][0] + x*delta, border[0][1] + (y+1)*delta],
							[border[0][0] + (x+1)*delta, border[0][1] + (y+1)*delta]
							], 
							"#fff", this.getDomID(), 1)
					}
				}
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

export default Constructive2;
