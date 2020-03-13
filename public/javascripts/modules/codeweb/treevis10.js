//
// Bubble browser 
// 

import Module from '../../lib/module.js'

class TreeVis10 extends Module {

	constructor() {
		super({	// init params mapping
			"grid_columns": ["cc_8", 24],
			"grid_rows": ["cc_9", 14],
			"r": ["cc_2", 50],
			"angle": ["cc_1", 60]
		})
		// this.path = "vendor"
		this.path = ""
	}

	renderGrid(columns, rows) {
		for (var i=0; i<=columns; i++) {
			for (var j=0; j<=rows; j++) {
				var coord = getGridCoordinates([i,j], columns, rows, xmax, ymax) 
				drawCircle(coord, 2, "#fff", this.getDomID())
			}
		}
	}	

	label(coord, value, domID,size, weight, spacing, fill, id) {
		// drawText(coord, value, "10px", "#fff", 100, 0, "Roboto Mono", domID)
		if (fill == null) {
			fill = "#fff"
		}
		text( { 
			x: coord[0],
			y: coord[1],
			"fill": fill,			
			"id": id,
			"style": "font-size:" + size + "px" + ";text-align:left;alignment-baseline:left;text-anchor:left;opacity:1.0;font-family:" + "Roboto Mono" + ";sans-serif;font-weight:" + weight + ";letter-spacing:" + spacing + "px;"
		}, value.toString(), domID); 

	}

	render() {
		var domID = this.getDomID()
		var mod = this
		var palette = new Array(5).fill(0).map(x => randomPantoneHex());

		drawRectangle([0,0], xmax, ymax, "#232325", domID)

		var filter = ""
		if (this.path.length > 0) {
			filter = "?prefix=" + this.path
		}

		console.log("FILTER: " + filter)

		var layout = new CircleLayout([xmax/2,ymax/2], ymax/2)
		
		drawCircleOutline([xmax/2,ymax/2], ymax/2, "rgba(255,255,255,0.2)", "1px", domID)
		drawCircleOutline([xmax/2,ymax/2], ymax*0.47, "rgba(255,255,255,0.4)", "1px", domID)

		$.get("http://localhost:5133/api/tree" + filter, function( data ) {			
			var tree = data.body
			var root = tree

			var rootName = "/"

			// mod.label([xmax/2, ymax*0.1], mod.path, domID, 24, 100, 0, "#fff")
			drawCircle([xmax/2,ymax/2], 5, "#fff", domID, "back-button")			
			$("circle[id=back-button]" ).css("cursor", "pointer").click(function() {
				if (mod.path.length > 0) {
					var parts = mod.path.split("/")
					mod.path = parts.slice(0, Math.max(0, parts.length-1)).join("/")
					mod.render()
				}
			})

			if (filter.length > 0) {
				root = tree[0].children
				rootName = tree[0].value
			}

			for (var i=0; i<root.length; i++) {
				var l1 = root[i]
				if (l1.is_file) {
					//console.log(l1.value + "\t" + l1.is_file)
				} else {
					// console.log(l1.value)
					var maxRad = Math.min(20 + l1.children.length*5, ymax*0.1)
					var entry = layout.add(maxRad, 0)
					var subLayout = null

					if (entry != null) {
						// entry.outline(domID)
						// entry.color = randomPantoneHex()
						// entry.draw(domID)
						// mod.label([entry.coord[0]- 25 - 10*(Math.ceil(Math.log10(1 + l1.children.length))), entry.coord[1]+entry.r], l1.children.length, domID, 16, 400, -1, palette[0])

						var nodeid = l1.value.replace(/\./g,'_dot_')
						// console.log(l1.value + "\t" + nodeid)
						mod.label([entry.coord[0] - 22, entry.coord[1]+entry.r-6], l1.value, domID, 12, 100, 0, "#fff", nodeid)
						
						$("text[id=" + nodeid + "]" ).css("cursor", "pointer").click(function() {
							// console.log("KLIK " + $(this).attr("id"))
							mod.path = mod.path + (mod.path.length > 0 ? "/" : "") + $(this).attr("id").replace(/_dot_/g,'\.')
							mod.render()
						})

						mod.label([entry.coord[0]- 22, entry.coord[1]+entry.r+2], Math.floor(Math.random()*10) + " commits", domID, 6, 100, 0)
						subLayout = new CircleLayout(entry.coord, maxRad)
					}
					//drawCircleOutline([xmax*Math.random(),ymax*Math.random()], ymax*0.15*Math.random(), "#fff", "1px", domID)
					
					for (var j=0; j<l1.children.length; j++) {
						var l2 = l1.children[j]
						if (subLayout != null) {
							var e = subLayout.add(4+4*Math.random(), 20)
							if (e != null) {
								e.color = palette[Math.floor(Math.random()*palette.length)]
								e.draw(domID)
							}
						}
						// console.log("\t" + l2.value + "\t" + l2.is_file)
					}
				}
			}

			//drawCircle([xmax/2,ymax/2], 10, "#fff", domID)
			//mod.label([xmax/2,ymax/2 - 20], rootName, domID)
			//mod.label([xmax/2,ymax/2], rootName.toUpperCase(), domID)

		});

	}

	// state update as a result of a midi event
	update(event) {
		super.update(event)
		this.clear()
		this.render()
	}

}

export default TreeVis10;
