import { modules } from './modulelib.js'

// pick the last module by default
var moduleQueue = [ new modules[Object.keys(modules)[Object.keys(modules).length - 1]]() ]

var stateUpdateEnabled = true
var clockCount = 0

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

	// activeModule.render();
}

var updateState = function() {
	if (stateUpdateEnabled) {
		var nextModule = Math.floor(Math.random()*moduleQueue.length)
		moduleQueue[nextModule].update()
		// activeModule = moduleQueue[nextModule]
	}
}

var handleMidiUpdate = function(data) {
	var midi = MidiController.getInstance();
	if (data["data"]["_type"] == "cc") {
		midi.data[data["data"]["controller"]] = data["data"]["value"]
		data["data"]["knob"] = midi.getReverseMapping()[data["data"]["controller"]]	// add label for virtualmidi compatibility
		for (var i=0; i<moduleQueue.length; i++) {
			if (moduleQueue[i].isActive) {
				moduleQueue[i].update(data["data"])
			}		
		}
		// if (activeModule.isActive) {
		// 	activeModule.update(data["data"])
		// }
		// activeModule.render()
	} else if (data["data"]["_type"] == "clock") {	// clock triggers state update
		if (clockCount++%5 == 0) { // clock divider
 			updateState();
 		}
	}	
}

var handleVirtualMidiEvent = function(keyCode) {
	// console.log(keyCode)
	var midi = MidiController.getInstance();
	var valueMap = midi.getKeyboardMap();
	if (keyCode in valueMap) {
		var knob = valueMap[keyCode][0]
		var direction = valueMap[keyCode][1]
		if (midi.getValue(knob) == null) {
			midi.setValue(knob, 1)
		} else {
			if (direction == "up") {
				midi.setValue(knob, Math.min(midi.getValue(knob) + 1, 128))	
			} else {
				midi.setValue(knob, Math.max(midi.getValue(knob) - 1, 0))	
			}
		}
		// activeModule.update({ controller: midi.getMidiChannel(knob), value: midi.getValue(knob, 0), knob: knob})
		for (var i=0; i<moduleQueue.length; i++) {
			moduleQueue[i].update({ controller: midi.getMidiChannel(knob), value: midi.getValue(knob, 0), knob: knob})
		}
	}
}

//
// Client renderer is broadcast channel-driven
//

$( document ).ready(function() {

	var bc = new BroadcastChannel('modular_manifestation')

	bc.onmessage = function (ev) { 
		if (ev.data == 'master_token') {
			// ignore
		} else {
			var data = JSON.parse(ev.data)
			if (data['midi'] != null) {
				handleMidiUpdate(data['midi'])
			} else if (data['virtualmidi'] != null) {
				handleVirtualMidiEvent(data['virtualmidi'])
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
				} else if (data['control'] == 'set-module') {
					moduleQueue = [ new modules[data['name']]() ]
					initQueue()
				} else if (data['control'] == 'add-module') {
					moduleQueue.push(new modules[data['name']]())
					initQueue()
				}

			}

		}
	}

	initQueue()


})
