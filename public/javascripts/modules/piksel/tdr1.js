//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

class TDR1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	


	normalDensity(x, mean, sigma) {
		return (1/Math.sqrt(2*Math.PI*Math.pow(sigma,2))) * Math.pow(Math.E, - Math.pow(x-mean, 2)/ (2*Math.pow(sigma,2)))
	}


	makeGaussian(amplitude, x0, y0, sigmaX, sigmaY, x, y) {
	        var exponent = -(
	                ( Math.pow(x - x0, 2) / (2 * Math.pow(sigmaX, 2)))
	                + ( Math.pow(y - y0, 2) / (2 * Math.pow(sigmaY, 2)))
	            );
	        return amplitude * Math.pow(Math.E, exponent);
	}

	randomText(length) {

	}

	drawImage(columns, rows) {		
		var start = Date.now()
		var size = Math.min(xmax/columns, ymax/rows)/2
		// var amplitude = 0.8 + Math.random()
		var amplitude = 1 + 0.2*Math.random()
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				var val = this.makeGaussian(amplitude,0,0,columns/1.7*0.2,rows*0.2,Math.abs(i-columns/2),Math.abs(j-rows/2))
				if (val > 0.4) {
					if (Math.random() < Math.sqrt(val)/4) {
						// draw mirrored
						var offset = Math.abs(xmax/2-coord[0])
						drawRectangle([xmax/2+offset, coord[1]], size,  size, randomPantoneHex(), this.getDomID())
						drawRectangle([xmax/2-offset, coord[1]],  size, size, randomPantoneHex(), this.getDomID())
					}
				}
			}
		}
		// console.log("ELAPSED: " + (Date.now() - start)/1000 + " s")
	}

	render() {	
		var rows = 40
		var columns = 1.77*rows
		var size = Math.min(xmax/columns, ymax/rows)
		for (var i=0; i<5; i++) {
			drawText(getGridCoordinates([2,Math.floor(4 + Math.random()*(rows-4) )], columns, rows, xmax, ymax), 
				 "-", 
				 size + "px", "rgba(255,255,255," + Math.random() + ")", 700, 1, "Roboto Mono", this.getDomID())
			drawText(getGridCoordinates([columns-2,Math.floor(4 + Math.random()*(rows-4) )], columns, rows, xmax, ymax), 
				 "-", 
				 size + "px", "rgba(255,255,255," + Math.random() + ")", 700, 1, "Roboto Mono", this.getDomID())
		}

		drawCircleOutline([xmax/2,ymax/2], 1009*Math.random(), randomPantoneHex(), 50*Math.random(), this.getDomID())

		this.drawImage(columns,rows)
		drawText(getGridCoordinates([columns*0.5,rows*0.85], columns, rows, xmax, ymax), 
				 "[ " + Math.random().toString(36).substr(2, 8).toUpperCase() + " ]", 
				 size/2, randomPantoneHex(), 100, 1, "Roboto Mono", this.getDomID())


	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TDR1;
