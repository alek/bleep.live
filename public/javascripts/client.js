import { modules, createModule } from './modulelib.js'
import { saveAs } from './external/FileSaver.js';


// pick the last module by default
var moduleQueue = [ new modules[Object.keys(modules)[Object.keys(modules).length - 1]]() ]

var stateUpdateEnabled = true
var recorderEnabled = false

var clockCount = 0
var bc = new BroadcastChannel('piksel_control')

var initQueue = function() {
	// init moduleQueue
	for (var i=0; i<moduleQueue.length; i++) {
		var scale = 1.0
		moduleQueue[i].setConfig({
			"xmax": xmax*scale,
			"ymax": ymax*scale,
			"scale": scale,
			"domID": "graph"
		})
		moduleQueue[i].init();
	}

	for (var i=0; i<moduleQueue.length; i++) {
		moduleQueue[i].render();
	}
}

var updateState = function() {
	if (stateUpdateEnabled) {
		var nextModule = Math.floor(Math.random()*moduleQueue.length)
		moduleQueue[nextModule].update()
	}
}

var handleMidiUpdate = function(data) {
	var midi = MidiController.getInstance();
	if (data["data"]["_type"] == "cc") {
		midi.data[data["data"]["controller"]] = data["data"]["value"]
		data["data"]["knob"] = midi.getReverseMapping()[data["data"]["controller"]]	// add label for virtualmidi compatibility
		for (var i=0; i<moduleQueue.length; i++) {
			if (moduleQueue[i].isActive) {
				var startTime = new Date()
				moduleQueue[i].update(data["data"])
				var elapsedTime = (new Date()-startTime)
				// send elapsed time back to channel
				bc.postMessage(JSON.stringify({'control': 'client-render', 'time': elapsedTime, 'num-objects': document.getElementsByTagName('*').length}))		
			}		
		}
	} else if (data["data"]["_type"] == "clock") {	// clock triggers state update
		if (clockCount++%5 == 0) { // clock divider
 			updateState();
 		}
	}	
}

//
// simple greedy gc
//
// maskCleanup: [true/false] - gc the mask section
//
var garbageCollect = function(maskCleanup) {
	if (maskCleanup == null) {
		maskCleanup = false
	}
	var graphs = $("svg")
	for (var i=0; i<graphs.length; i++) {

		if (graphs[i].id != "svg-config") {	// do not gc the config node
			var children = $(graphs[i]).children()
			if (children.length > 10) {		// do not cleanup if < 10 objects in the dom
				for (var i=0; i<children.length; i++) {
					if (Math.random() < 0.5) {
						$(children[i]).remove()
					}
				}
			}
		} else if (maskCleanup) {	// only clipping paths in the config node
			var children = $(graphs[i]).children().children()
			if (children.length > 10) {
				for (var i=0; i<children.length; i++) {
					if (Math.random() < 0.5 && children[i].tagName == "clipPath") {
						$(children[i]).remove()
					}
				}
			}
		}
	}
}

//
// Client renderer is broadcast channel-driven
//

$( document ).ready(function() {

	bc.onmessage = function (ev) { 

		// console.log(ev.timeStamp) // ev.timeStamp is the key to the recording facility

		if (ev.data == 'master_token') {
			// ignore
		} else {
			var data = JSON.parse(ev.data)
			// midi messages
			if (data['midi'] != null) {
				handleMidiUpdate(data['midi'])
				
				// post-render handlers

				// recorder			
				if (recorderEnabled) {
					var renderedContent = '<svg width="' + xmax + '" height="' + ymax + '">' + $("#graph").html() + '</svg>'
					$.post( "http://localhost:5133/recorder", {"data": renderedContent}, function( data ) {	
  						// console.log(data)
					});
				}

			// control panel commands
			} else if (data['control'] != null) {
				if (data['control'] == 'start-module') {
					for (var i=0; i<moduleQueue.length; i++) {
						moduleQueue[i].setActive(true)
					}
				} else if (data['control'] == 'stop-module') {
					for (var i=0; i<moduleQueue.length; i++) {
						moduleQueue[i].setActive(false)
					}
				} else if (data['control'] == 'clear-canvas') {
					for (var i=0; i<moduleQueue.length; i++) {
						moduleQueue[i].clear()
					}
				} else if (data['control'] == 'refresh-canvas') {
					location.reload()
				} else if (data['control'] == 'export-canvas') {
					var blob = new Blob(['<svg width="' + xmax + '" height="' + ymax + '">' 
										 + $("#graph").html() + '</svg>'], {type: "text/plain;charset=utf-8"});
					saveAs(blob, "bleep.svg");
				} else if (data['control'] == 'set-module') {
					moduleQueue = [ createModule(data['name']) ]
					if (data["config"] != null && Object.keys(data["config"]).length > 0) {
						moduleQueue[0].setConfig(data["config"])
					} 
					initQueue()
				} else if (data['control'] == 'add-module') {
					moduleQueue.push(new modules[data['name']]())
					initQueue()
				} else if (data['control'] == 'garbage-collect') {
					garbageCollect()
				}

			}

		}
	}

	initQueue()


})
