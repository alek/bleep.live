//
// Inspired by Bunne's chapter on Bioinformatics
// Metabolism pathway-style finite automata generator
//

import Module from '../../lib/module.js'

// graph objects

class GeneProduct {

	constructor(fontSize, content, domID, rounded) {
		this.fontSize = fontSize
		this.content = content
		this.domID = domID
		this.width = (this.content.length + 1)* Math.floor(this.fontSize/2)
		this.height = Math.ceil(this.fontSize*1.4)
		this.rounded = rounded
	}

	setCoord(coord) {
		this.coord = coord
	}

	render() {
		rect({
			x: this.coord[0] - this.width/2,
			y: this.coord[1] - this.height/2,
			width: this.width,
			height: this.height,
			stroke: "#fff",
			fill: "none",
			rx: this.rounded ? "10" : "0",
			style: "stroke-width:1"
		}, this.domID);	
		text( { 
			x: this.coord[0] - this.width/2 + this.fontSize/2,
			y: this.coord[1] - this.height/2 + this.fontSize + 1,
			"fill": "#fff",
			"style": "font-size:" + this.fontSize + ";font-family:Helvetica;sans-serif;font-weight:100;letter-spacing:0px;"
		}, this.content, this.domID); 
	}

	getCenter() {
		return this.coord
	}

	getBoundingBox() {
		return {
			left: { x : this.coord[0] - this.width/2, y : this.coord[1] - this.height/2 },
			right: { x : this.coord[0] + this.width/2, y : this.coord[1] + this.height/2 }
		}
	}

	getConnectionNodes() {
		return [ { x: this.coord[0], y: this.coord[1] - this.height/2},
				 { x: this.coord[0], y: this.coord[1] + this.height/2}
			   ]
	}

}


class ChemicalCompound {
	constructor(domID) {
		this.domID = domID
		this.radius = 4
		this.border = 2
	}

	setCoord(coord) {
		this.coord = coord
	}

	render() {
		circle({
			cx: this.coord[0],
			cy: this.coord[1],
			r: this.radius,
			stroke: "#fff",
			fill: "none",
			style: "stroke-width:" + this.border
		}, this.domID);	
	}

	getCenter() {
		return this.coord
	}

	getBoundingBox() {
		return {
			left: { x : this.coord[0] - this.radius/2,  y : this.coord[1] - this.radius/2 },
			right: { x : this.coord[0] - this.radius/2, y : this.coord[1] + this.radius/2 }
		}
	}

	getConnectionNodes() {
		return [ { x : this.coord[0], y : this.coord[1] - this.radius/2 - this.border },
				 { x : this.coord[0] + this.radius/2 + this.border, y : this.coord[1] },
				 { x : this.coord[0], y : this.coord[1]  + this.radius/2 + this.border},
				 { x : this.coord[0] - this.radius/2 - this.border, y : this.coord[1] }
		]
	}
}


class Bunnie1 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_10", 50],
			"angle": ["cc_11", 0]
		})
		this.objects = []		
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	


	rectOverlap(rectA, rectB) {
		if (rectA.left.x >= rectB.right.x || rectB.left.x >= rectA.right.x) {
			return false
		}
		if (rectA.left.y >= rectB.right.y || rectB.left.y >= rectA.right.y) {
			return false
		}

		return true
	}

	connectObjects(objA, objB) {

		var n1 = objA.getConnectionNodes()
		var n2 = objB.getConnectionNodes()

		var minD = Number.MAX_SAFE_INTEGER
		var bestMatch = []

		for (var i=0; i<n1.length; i++) {
			for (var j=0; j<n2.length; j++) {
				var d = Math.sqrt(Math.pow(n2[j].x - n1[i].x,2) + Math.pow(n2[j].y - n1[i].y,2))
				if (d < minD) {
					minD = d
					bestMatch = [i,j]
				}
			}
		}
		this.connectPoints(n1[bestMatch[0]], n2[bestMatch[1]])
	}

	connectPoints(p1, p2) {
		// var target = 
		var overlapCount = 0
		for (var i=0; i<this.objects.length; i++) {
			if (this.rectOverlap({left: p1, right: { x: p1.x, y: p2.y}}, this.objects[i].getBoundingBox())
				|| this.rectOverlap({left: { x: p1.x, y: p2.y}, right: p2}, this.objects[i].getBoundingBox())) {
				overlapCount++
			} 
		}

		if (overlapCount == 0) {
			drawLine([p1.x, p1.y], [p1.x, p2.y], "#fff", "1px", this.getDomID(), "")
			drawLine([p1.x, p2.y], [p2.x, p2.y], "#fff", "1px", this.getDomID(), "")
			// drawLine([p1.x, p1.y], [p2.x, p2.y], "#fff", "1px", this.getDomID(), "")
		}

	}


	connect(objA, objB, dashed) {

		// this.connectPoints(n1[0], n2[1])
		//this.connectPoints(getNearestNodes(n1, n2))
		this.connectObjects(objA, objB)

		// drawLine(n1[0], n2[1], "#fff", "1px", this.getDomID())
		// var dashed = (Math.random() < 0.2) ? true : false


		// console.log(rectOverlap({left: n1[0], rigth:  }))

		// drawLine([n1[0].x, n1[0].y], [n1[0].x, n2[1].y], "#fff", "1px", this.getDomID(), "", dashed)
		// drawLine([n1[0].x, n2[1].y], [n2[1].x, n2[1].y], "#fff", "1px", this.getDomID(), "", dashed)
	}

	// getFreeLayoutSlot(el) {
	// 	var box = el.getBoundingBox()
	// 	for (var i=0; i<10; i++) { // max 10 attempts
	// 		var coord = getRandomCoord(xmax, ymax, 100)

	// 	}
	// }


	layout(elements) {
		// render elements
		for (var i=0; i<elements.length; i++) {
			// elements[i].setCoord(getRandomCoord(xmax,ymax, 100))
			elements[i].setCoord(getGridCoordinates(getRandomCoord(20,20,2), 20, 20, xmax, ymax))
			elements[i].render()
			this.objects.push(elements[i])
		}
		// draw connections
		for (var i=0; i<elements.length-1; i++) {
			this.connect(elements[i], elements[i+1])
		}
	}


	render() {	

		// var gp = new GeneProduct(14, "3.5.4.25", this.getDomID())

		// gp.setCoord([200,200])
		// gp.render()

		// var cc = new ChemicalCompound(this.getDomID())
		// cc.setCoord([225,100])
		// cc.render()

		// this.connect(gp, cc)


		this.layout([new ChemicalCompound(this.getDomID()),
		   			 new GeneProduct(14, "3.5.4.25", this.getDomID()),
					 new ChemicalCompound(this.getDomID()),
					 new GeneProduct(14, "Purine metabolism", this.getDomID(), true),
					 new ChemicalCompound(this.getDomID()),
					 new GeneProduct(14, "3.5.4.12", this.getDomID()),
					 new ChemicalCompound(this.getDomID()),
					 new GeneProduct(14, "RIB2 ", this.getDomID()),
					 new GeneProduct(14, "1.1.1.193", this.getDomID())

			])

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default Bunnie1;
