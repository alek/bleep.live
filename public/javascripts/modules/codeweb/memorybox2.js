//
// Simple grid-based module template
// 

import Module from '../../lib/module.js'

class Memorybox2 extends Module {

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

		this.bounds = { width: xmax, height: ymax };
		this.target = { x: this.bounds.width / 2, y: this.bounds.height / 2 };
		// this.containerEl = document.querySelector( '#graph' );
		// references to all circle elements
		this.circleEls = { };

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


	distance(a, b) {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return dx*dx + dy*dy;
    }

    getRandomCoord(xmax,ymax,offset) {
    	let coord = getRandomCoord(xmax,ymax, 50)
    	return { x: coord[0], y: coord[1]}
    }

	test() {

		// var tree = new kdTree(points, distance, dimensions);
		let tree = new kdTree([], distance, ["x", "y"]);
		let queue = []
		for (let i=0; i<64; i++) {
			let pos = this.getRandomCoord(xmax,ymax,50)
			let conn = tree.nearest(pos, 1)
			if (conn.length > 0) {
				let target = conn[0][0] 
				drawLine([target.x, target.y], [pos.x, pos.y], "#3F3F3F", 1, this.getDomID())
			}		
			queue.push([pos.x, pos.y])	
			tree.insert(pos)		
		}
		for (let i=0; i<queue.length; i++) {
			drawCircle(queue[i], 2+6*Math.random(), randomPantoneHex(), this.getDomID())
		}

	}

	// create circle dom object, return circle data
	createCircle ( x, y, radius ) {

		radius = radius || this.random( 10, 40 );
		x = x || this.random( radius, this.bounds.width - radius );
		y = y || this.random( radius, this.bounds.height - radius );

		var diameter = radius * 2;
		var circleEl = document.createElement( 'div' );
		
		// need some sort of unique id...
		var id = 'circle-' + this.random( 0, 1000, true ) + '-' + Date.now();

		var circle =  {
			id: id,
			radius: radius,
			position: {
				x: this.random( radius, this.bounds.width - radius ),
				y: this.random( radius, this.bounds.height - radius )
			}
		};

		// console.log(circle.position)

		drawCircle([circle.position.x, circle.position.y], circle.radius, randomPantoneHex(), "graph", id)


		// create circle element
		// circleEl.id = id;
		// circleEl.style.width = diameter + 'px';
		// circleEl.style.height = diameter + 'px';
		// circleEl.style.borderRadius = diameter + 'px';
		// circleEl.classList.add( 'circle' );
			
		// this.containerEl.appendChild( circleEl );

		this.circleEls[id] = circleEl;

		return circle;
	}

	random ( min, max, intResult ) {
		if ( typeof min !== 'number' && typeof max !== 'number' ) {
			min = 0;
			max = 1;
		}

		if ( typeof max !== 'number' ) {
			max = min;
			min = 0;
		}

		var result = min + Math.random() * ( max - min );

		if ( intResult ) {
			result = parseInt( result, 10 );
		}

		return result;
	}	

	render() {

		var circles = [
			this.createCircle(),
			this.createCircle(),
			this.createCircle(),
			this.createCircle(),
			this.createCircle()
		];

		var packer = new CirclePacker( {
			bounds: this.bounds,
			target: this.target,
			circles: circles,
			onMove: null,
			continuousMode: false,
			collisionPasses: 5,
			centeringPasses: 200
		} );

		packer.update()

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear() 
		this.render()
	}

}

export default Memorybox2;
