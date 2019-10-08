// list and maping of modules should be done here
// import * as Test from './modules/test.js'

import Sample from './modules/sample.js'
import DNA from './modules/dna.js'
import Picelj from './modules/picelj.js'
import VectorSpace from './modules/vectorspace.js'
import Sunset from './modules/sunset.js'
import Grid1 from './modules/grid1.js'
import Bounce from './modules/bounce.js'
import Abstract1 from './modules/abstract1.js'
import Abstract2 from './modules/abstract2.js'
import Abstract3 from './modules/abstract3.js'
import Abstract4 from './modules/abstract4.js'
import Field1 from './modules/field1.js'
import International1 from './modules/international1.js'
import International2 from './modules/international2.js'
import International3 from './modules/international3.js'
import Minimal1 from './modules/minimal1.js'
import Minimal2 from './modules/minimal2.js'
import Minimal3 from './modules/minimal3.js'
import Piqued1 from './modules/piqued1.js'
import Piqued2 from './modules/piqued2.js'
import Lines1 from './modules/lines1.js'
import Lines2 from './modules/lines2.js'
import Semiotik1 from './modules/semiotik1.js'
import Semiotik2 from './modules/semiotik2.js'
import Semiotik3 from './modules/semiotik3.js'
import Semiotik4 from './modules/semiotik4.js'
import Semiotik5 from './modules/semiotik5.js'
import Semiotik6 from './modules/semiotik6.js'
import Semiotik7 from './modules/semiotik7.js'
import MMLogo from './modules/mm_logo.js'
import Github1 from './modules/github1.js'
import Guardian1 from './modules/guardian1.js'
import Guardian2 from './modules/guardian2.js'
import Glove1 from './modules/glove1.js'
import Adafruit1 from './modules/adafruit1.js'
import Book1 from './modules/book1.js'
import Tree1 from './modules/tree1.js'
import Line1 from './modules/line1.js'
import Line2 from './modules/line2.js'
import Line3 from './modules/line3.js'
import Line4 from './modules/line4.js'
import Line5 from './modules/line5.js'
import Line6 from './modules/line6.js'
import Line7 from './modules/line7.js'
import Line8 from './modules/line8.js'
import Line9 from './modules/line9.js'
import Line10 from './modules/line10.js'
import Line11 from './modules/line11.js'
import Line12 from './modules/line12.js'
import Line13 from './modules/line13.js'
import NetArt1 from './modules/netart1.js'
import NetArt2 from './modules/netart2.js'
import NetArt3 from './modules/netart3.js'
import Deconstruction1 from './modules/deconstruction1.js'
import Deconstruction2 from './modules/deconstruction2.js'
import Deconstruction3 from './modules/deconstruction3.js'
import HDI1 from './modules/hdi1.js'
import HDI2 from './modules/hdi2.js'
import HDI3 from './modules/hdi3.js'
import Hackadayio from './modules/hackadayio.js'
import Samacsys from './modules/samacsys.js'
import Wikipedia from './modules/wikipedia.js'
import Twitter from './modules/twitter.js'
import HighDensity from './modules/highdensity.js'
import BrandGraph from './modules/brandgraph.js'
import BrandGraph2 from './modules/brandgraph2.js'

const modules = ["DNA", "VectorSpace", "Sunset","Bounce", "Abstract1", "Abstract2", "Abstract3", "Abstract4", 
				 "Field1", "International1", "International2", "International3", "Minimal1", "Minimal2", "Minimal3", "Piqued1", "Piqued2",
				 "Lines1", "Lines2"]

var moduleQueue = [new BrandGraph()]

var stateUpdateEnabled = true
var clockCount = 0
var activeModule = moduleQueue[0]

var isMaster = false

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

	activeModule.render();
}

var updateState = function() {
	if (stateUpdateEnabled) {
		var nextModule = Math.floor(Math.random()*moduleQueue.length)
		moduleQueue[nextModule].update()
		// modules[nextModule].render()
		activeModule = moduleQueue[nextModule]
	}
}

//
// handle midi event received via websocket
//
var setupMidiStateUpdate = function(socket, channel) {
	socket.on('control', function(data) {
		if (isMaster) {
			handleMidiUpdate(data)
			channel.postMessage(JSON.stringify({'midi': data}))		
		}
	});
}

var handleMidiUpdate = function(data) {
	
	var midi = MidiController.getInstance();
	if (data["data"]["_type"] == "cc") {
		midi.data[data["data"]["controller"]] = data["data"]["value"]
		data["data"]["knob"] = midi.getReverseMapping()[data["data"]["controller"]]	// add label for virtualmidi compatibility
		activeModule.update(data["data"])
		// activeModule.render()
	} else if (data["data"]["_type"] == "clock") {	// clock triggers state update
		if (clockCount++%5 == 0) { // clock divider
 			updateState();
 		}
	}	
}

//
// virtual midi: update state based on keyboard event
//
var setupVirtualMidiUpdateHandler = function(channel) {
	$("body").keydown(function(e) {
		if (isMaster) {
			handleVirtualMidiEvent(e.keyCode)	// render directly
			channel.postMessage(JSON.stringify({'virtualmidi': e.keyCode})) 	// + send to broadcast channel
		}
	});
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
		activeModule.update({ controller: midi.getMidiChannel(knob), value: midi.getValue(knob, 0), knob: knob})
	}
}

var toggleSlave = function() {
	isMaster = false
	// slave screens should be cleared out
	$(".sidebar").remove()
	$(".footer").remove()
}

document.currentScript = document.currentScript || (function() {
  var scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
})();

//
// Bootstrap
//
$( document ).ready(function() {

	// isMaster = $("#master-toggle").is(":checked")
	isMaster = true

	$("#filters").remove();	// hide by default - show only when needed

	$('#master-force').on('change', 'input[type=checkbox]', function(e) {
        if (this.checked) {
        	isMaster = true						// set node as master
        	bc.postMessage('master_token')		// broadcast a token that moves others to slave mode

        	// broadcast the reset token at regular interval
        	// to deauth new masters on the channel
        	setInterval(function() {
        		bc.postMessage('master_token')
        	}, 1000);
        }
    });

	// setup a broadcast channel + master selection

	// console.log(activeModule.midiMappings)

	// render midi mappings for current module

	for (var knob in activeModule.midiMappings) {
		var mapping = activeModule.midiMappings[knob]
		$("#midi-mapping").append("<li class='module-select'><h3>" + knob +  "</h3>" + " " + mapping[0] + "</li>")
	}


	// render available mmodules	

	// for (var i=0; i<modules.length; i++) {
	// 	$("#module-list").append("<li class='module-select'><a href='#'>" + modules[i] + "</a></li>")
	// }


 //    $('.module-select').click(function(a) {
 //    	var instance = eval("new " + this.textContent + "()");
 //    	moduleQueue = []
 //    	moduleQueue.push(instance)
 //    	// moduleQueue = [new Abstract1()]
 //    	initQueue()
 //    })

 	console.log("ROLE: " + document.currentScript.getAttribute('role'))

	var bc = new BroadcastChannel('modular_manifestation')
	if (isMaster) {
		bc.postMessage('master_token')	
	}

	bc.onmessage = function (ev) { 
		console.log("MSG!" + ev)
		if (ev.data == 'master_token') {
			toggleSlave()
		} else {
			var data = JSON.parse(ev.data)
			if (data['midi'] != null) {
				handleMidiUpdate(data['midi'])
			} else if (data['virtualmidi'] != null) {
				handleVirtualMidiEvent(data['virtualmidi'])
			}

		}
	}

	// websocket setup
	var socket = io.connect('http://localhost:3000')
	
	socket.on('server', function (data) {
		socket.emit('client', { time: new Date() })
		setupMidiStateUpdate(socket, bc)
	})

	// command message thing
	socket.on('command', function (data) {
		if (data["input"] == "virtualmidi") {
			setupVirtualMidiUpdateHandler(bc)
		}
	})

	// midi events
	// socket.on()

	initQueue()


})
