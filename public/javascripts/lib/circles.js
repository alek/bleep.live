//
// Simple circle layout management library
//

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.CircleLayoutEngine = factory());
}(this, (function() {
    'use strict';

    class Circle {

    	constructor(x, y, r) {
    		this.x = x
    		this.y = y
    		this.r = r
    	}

    	overlaps(circle) {
    		let d = Math.sqrt(Math.pow(circle.x - this.x, 2) + Math.pow(circle.y - this.y, 2))
    		return (d <= this.r + circle.r) ? true : false
    	}

		isWithinBounds(topLeft, bottomRight) {
			return this.x - this.r > topLeft.x
				&& this.y - this.r > topLeft.y
				&& this.x + this.r < bottomRight.x
				&& this.y + this.r < bottomRight.y
		}    	

    	getCoord() {
    		return {
    			x: this.x,
    			y: this.y,
    			r: this.r
    		}
    	}

    	draw(domID) {
    		drawCircle([this.x, this.y], this.r*0.95, randomPantoneHex(), domID)
    	}

    }

    var getRandomCoord = function(topLeft, bottomRight) {
    	return {
    		x: topLeft.x + (bottomRight.x - topLeft.x)*Math.random(),
    		y: topLeft.y + (bottomRight.y - topLeft.y)*Math.random()
    	}
    }

	var CircleLayoutEngine = function CircleLayoutEngine(params) {
		if (params === void 0) params = {};
		this.entries = []
	}

	CircleLayoutEngine.prototype.add = function add(params) {
		if (!this.coord) {							// always start at the center
			this.coord = {x: xmax/2, y:ymax/2, r: params.r}		
		} else {
			let startEntry = this.entries[Math.floor(Math.random()*this.entries.length)]
			let c = getCircleCoord(startEntry.x, startEntry.y, 360*Math.random(), startEntry.r + params.r)
			this.coord = {x: c[0], y: c[1], r: params.r}
		}

		let circle = new Circle(this.coord.x, this.coord.y, params.r)
		let overlaps = false
		this.entries.forEach((el) =>  {
			if (el.overlaps(circle)) {
				overlaps = true
			}
		})
		if (!overlaps && circle.isWithinBounds({x: 100, y:100}, {x: xmax-100, y:ymax-100})) {
			this.entries.push(circle)
		}
	}	

	CircleLayoutEngine.prototype.render = function update(domID) {
		this.entries.forEach(circle => circle.draw(domID))
	}

	return CircleLayoutEngine;

})));