//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Memorybox1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		// var start = getRandomCoord(xmax,ymax,100)
		// var current = null
		// this.coord = [xmax/2,ymax/2]
		this.coord = [8,8]
		this.data = math.zeros(16,16)		
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	// drawMatrix()
	drawMatrix(data, xdelta, ydelta) {
		let dim = data.size()
		for (let i=0; i<dim[0]; i++) {
			for (let j=0; j<dim[1]; j++) {
				let entry = data.get([i,j])
				drawCircle([xdelta*0.33 + i*xdelta, ydelta*0.33 + j*ydelta], entry, randomPantoneHex(), this.getDomID())	
			}
		}
	}

	randomMatrixCoord(dim) {
		return [Math.floor(Math.random()*dim[0]), Math.floor(Math.random()*dim[1])]
	}

	randomEmpty(matrix) {
		for (var i=0; i<10; i++) {
			var pos = this.randomMatrixCoord(matrix.size())
			if (matrix.get(pos) == 0) {
				return pos
			}
		}
		return [0,0]
	}

	render() {

		const nrows = 16
		const ncolumns = 16

		// random fill
		// for (let i=0; i<nrows; i++) {
		// 	for (let j=0; j<ncolumns; j++) {
		// 		if (Math.random() < 0.5) {
		// 			data.set([i,j], 25*Math.random())
		// 		}
		// 	}
		// }


		// growth process
		
		//for (let i=0; i<128; i++) {
			
			// var offset = 2-Math.ceil(3*Math.random())
			var offset = Math.random() < 0.5 ? 1 : -1

			if (Math.random() < 0.5) {
				let next = [Math.max((this.coord[0]+offset)%nrows, 0), this.coord[1]]
				if (this.data.get(next) == 0) {
					this.data.set(this.coord, 15+10*Math.random())
					this.coord = next
				} else {
					this.coord = this.randomEmpty(this.data)
				}
			} else {
				let next = [this.coord[0], Math.max((this.coord[1]+offset)%ncolumns, 0)]				
				if (this.data.get(next) == 0) {
					this.data.set(this.coord, 15+10*Math.random())
					this.coord = next
				} else {
					this.coord = this.randomEmpty(this.data)
					// console.log("already set: " + next)
				}
			}
		//}

		this.drawMatrix(this.data, xmax/nrows, ymax/ncolumns)


		// console.log(data.get([0,7]))

		// for (var i=0; i<10; i++) {
		// 	drawCircle(getRandomCoord(xmax,ymax,0), 50*Math.random(), randomPantoneHex(), this.getDomID())
		// }

		// for (var i=0; i<xmax; i+=50) {
		// 	for (var j=0; j<ymax; j+=50) {
		// 		drawCircle([i,j], 10*Math.random(), randomPantoneHex(), this.getDomID())				
		// 	}
		// }

		// var coord = [xmax/2,ymax/2]
		
		// for (var i=0; i<100; i++) {
		// 	drawCircle(this.coord, 5+50*Math.random(), randomPantoneHex(), this.getDomID())				
		// 	// coord = [(coord[0]+xmax*0.02)%xmax, (coord[1]+ymax*0.19)%ymax]
		// 	this.coord = [(this.coord[0]+700)%xmax, (this.coord[1]+50)%ymax]
		// }

		// console.log(xmax + "\t" + ymax)
	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		//this.clear() 
		this.render()
	}

}

export default Memorybox1;
