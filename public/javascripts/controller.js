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

	// TODO: add socket disconnect logic

	var socket = io.connect('http://localhost:3000')
	
	socket.on('server', function (data) {
		socket.emit('client', { time: new Date() })
	})

	// control change handling
	socket.on('control', function(data) {
		updateEventBox(data)
		bc.postMessage(JSON.stringify({'midi': data}))		
	});	

	// command message handling
	socket.on('command', function (data) {
		if (data["input"] == "virtualmidi") {
			setupVirtualMidiUpdateHandler(bc)
		}
	})

	// stop / play button
	$(".stop-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'stop-module'}))
		$(this).css("background-color", "#f19d38")
		$(".start-button").css("background-color", "gray")
		$(".status-text").text("stopped")
	});

	// stop / play button
	$(".start-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'start-module'}))
		$(this).css("background-color", "#f19d38")
		$(".stop-button").css("background-color", "gray")
		$(".status-text").text("running")
	});

	// list available modules
	for (var moduleName in modules) {
		$("#module-list").append('<li><span class="module-select">' + moduleName + '</span><span class="add-module">+</span></li>')
	}

	// append module to the active list
	$(".add-module").click(function() {
		bc.postMessage(JSON.stringify({'control': 'add-module', 'name': $(this).prev().text() }))		
		$(".active-module-name").append(" + " + $(this).prev().text())
	});

	// module switch handler
	$(".module-select").click(function() {
		bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
		bc.postMessage(JSON.stringify({'control': 'set-module', 'name': $(this).text()}))		
		$(".active-module-name").text($(this).text())
	});

	// flush handler
	$(".reset-button").click(function() {
		$(".active-module-name").empty()
		bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
	});

	$(".refresh-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'refresh-canvas'}))		
	});

	// init driver

	var midiDriver = new Worker('../public/javascripts/drivers/midi-driver.js')
	midiDriver.addEventListener('message', function(e) {
	  // console.log('started: ' + e.data)
	});
	midiDriver.postMessage('start');

	var busDriver = new Worker('../public/javascripts/drivers/bus-driver.js')

	var busCounter = 0
	busDriver.addEventListener('message', function(ev) {
		var entry = JSON.parse(ev.data)
		for (var i=0; i<4; i++) {
			$("#bus-event-" + i).text($("#bus-event-" + (i+1)).text())
		}
		$("#bus-event-4").text(JSON.stringify(entry["midi"]["data"]))
	});

	busDriver.postMessage('start')

})
