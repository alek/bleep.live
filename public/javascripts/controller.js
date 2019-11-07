/**
	Main controller - list modules, receive midi events, dispatch broadcast channel
*/

import { modules } from './modulelib.js'

var stateUpdateEnabled = true
var clockCount = 0

//
// virtual midi: update state based on keyboard event
//
var setupVirtualMidiUpdateHandler = function(channel) {
	$("body").keydown(function(e) {
		handleVirtualMidiEvent(e.keyCode, channel)
	});
}

var handleVirtualMidiEvent = function(keyCode, bc) {
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
		var eventEntry = {
			"data": {
				"_type": "cc",
				"controller": midi.getMidiChannel(knob),
				"value": midi.getValue(knob, 0), 
				"knob": knob
			}
		}

		bc.postMessage(JSON.stringify({'midi': eventEntry }))		
		updateEventBox(eventEntry)
	}
}

var updateEventBox = function(data) {

	var key = 'event-' + data['data']['channel'] + '-' + data['data']['controller']
	
	if ($("#" + key).length) {
		$("#" + key).html('<div>channel ' + data['data']['controller'] + '</div>' + '<h1>' +  data['data']['value'] + '</h1>')
	} else {
		$('<div/>', {
		    id: key,
		    "class": 'event-entry',
		    html: '<div>channel ' + data['data']['controller'] + '</div>' + '<h1>' +  data['data']['value'] + '</h1>'
		}).appendTo('#event-queue');
	}	

}

//
// Bootstrap
//
$( document ).ready(function() {

	var bc = new BroadcastChannel('piksel_control')
	bc.postMessage('master_token')	

	$(".active-module-name").text(Object.keys(modules)[Object.keys(modules).length - 1])

	// handle return messages
	bc.onmessage = function (ev) { 
		var data = JSON.parse(ev.data)
		if (data['control'] == 'client-render') {
			//console.log(data['time'])
			$("#speedometer-render").html(' //  render: <span class="hl">' + (1000/data['time']).toFixed() + "</span>/sec")
		}
	}

	// TODO: add socket disconnect logic

	var socket = io.connect('http://localhost:3000')
	
	socket.on('server', function (data) {
		socket.emit('client', { time: new Date() })
	})

	//
	// control change handling
	//

	socket.on('control', function(data) {
		updateEventBox(data)
		bc.postMessage(JSON.stringify({'midi': data}))		
	});	

	//
	// command message handling
	//

	socket.on('command', function (data) {
		if (data["input"] == "virtualmidi") {
			setupVirtualMidiUpdateHandler(bc)
		}
	})

	//
	// stop / play button
	//

	$(".stop-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'stop-module'}))
		$(this).css("background-color", "#f19d38")
		$(".start-button").css("background-color", "gray")
		$(".status-text").text("stopped")
	});

	//
	// start / play button
	//

	$(".start-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'start-module'}))
		$(this).css("background-color", "#f19d38")
		$(".stop-button").css("background-color", "gray")
		$(".status-text").text("running")
	});

	//
	// list available modules
	//

	for (var moduleName in modules) {
		$("#module-list").append('<li><span class="module-select">' + moduleName + '</span><span class="add-module">+</span></li>')
	}

	//
	// append module to the active list
	//

	$(".add-module").click(function() {
		bc.postMessage(JSON.stringify({'control': 'add-module', 'name': $(this).prev().text() }))		
		$(".active-module-name").append(" + " + $(this).prev().text())
	});

	//
	// module switch handler
	//

	$(".module-select").click(function() {
		bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
		bc.postMessage(JSON.stringify({'control': 'set-module', 'name': $(this).text()}))		
		$(".active-module-name").text($(this).text())
	});

	//
	// flush handler
	//

	$(".reset-button").click(function() {
		$(".active-module-name").empty()
		bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
	});

	$(".refresh-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'refresh-canvas'}))				
	});

	$(".export-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'export-canvas'}))		
	});

	$(".gc-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'garbage-collect'}))		
	});

	//
	// init midi driver
	//

	var midiDriver = new Worker(getAssetPath('/javascripts/drivers/midi-driver.js'))
	midiDriver.addEventListener('message', function(e) {
	  // console.log('started: ' + e.data)
	});

	//
	// driver start/stop handling
	//

	var midiDriverRunning = false
	$(".driver-control").click(function() {
		if (!midiDriverRunning) {
 			midiDriver.postMessage({'control' : 'start'});
 			midiDriverRunning = true
 			$(this).css("background-color", "blue")
 			$("#driver-status").text("running")
		} else {
			midiDriver.postMessage({'control' : 'stop'});
			midiDriverRunning = false
			$(this).css("background-color", "#ea346b")
			$("#driver-status").text("stopped")
		}
	})

	//
	// state machine control
	//

	var stateMachineDriver = new Worker(getAssetPath('/javascripts/drivers/state-machine.js'))
	stateMachineDriver.addEventListener('message', function(e) {
	  // console.log('started: ' + e.data)
	});

	//
	// driver start/stop handling
	//

	var stateMachineDriverRunning = false
	$(".state-machine-control").click(function() {
		if (!stateMachineDriverRunning) {
 			stateMachineDriver.postMessage({'control' : 'start'});
 			stateMachineDriverRunning = true
 			$(this).css("background-color", "blue") 
 			$("#statemachine-status").text("running")
		} else {
			stateMachineDriver.postMessage({'control' : 'stop'});
			stateMachineDriverRunning = false
			$(this).css("background-color", "#e6a04e")
 			$("#statemachine-status").text("stopped")			
		}
	})


	//
	// driver frequency update handling
	//

	$("#driver-frequency").change(function() {
		midiDriver.postMessage({'control': 'update-frequency', 'frequency': $(this).val()});
	})

	// init bus driver

	var busDriver = new Worker(getAssetPath("/javascripts/drivers/bus-driver.js"))
	var updateTimes = new Array(5).fill(null)
	var lastUpdate = null

	busDriver.addEventListener('message', function(ev) {

		// update bus event queue

		var entry = JSON.parse(ev.data)

		if (entry['midi']) {	// only render outbound midi events

			for (var i=0; i<4; i++) {
				$("#bus-event-" + i).text($("#bus-event-" + (i+1)).text())
			}
			if (entry["midi"]) {
				$("#bus-event-4").text(JSON.stringify(entry["midi"]["data"]))

				var speed = 1000/(new Date() - lastUpdate)
				$("#speedometer-send").html('send: <span class="hl">'  + speed.toFixed(2) + '</span>/sec ')
				lastUpdate = new Date()

			}
		
		}

	});

	busDriver.postMessage('start')

	// start bus recorder

	$(".record-button").click(function() {
		if (!$(this).data('active')) {
			$(this).css("background-color", "gray")

			var midiDriver = new Worker(getAssetPath("/javascripts/drivers/bus-recorder.js"))
			// midiDriver.addEventListener('message', function(e) {
		 //  		// console.log('started: ' + e.data)
			// });
			midiDriver.postMessage('start');
		} else {
			$(this).css("background-color", "red")
		}
	});


})
