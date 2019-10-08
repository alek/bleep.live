/**
	Main controller - list modules, receive midi events, dispatch broadcast channel
*/

var stateUpdateEnabled = true
var clockCount = 0

//
// virtual midi: update state based on keyboard event
//
var setupVirtualMidiUpdateHandler = function(channel) {
	$("body").keydown(function(e) {
		if (isMaster) {
			channel.postMessage(JSON.stringify({'virtualmidi': e.keyCode})) 	// + send to broadcast channel
		}
	});
}

//
// Bootstrap
//
$( document ).ready(function() {

	var bc = new BroadcastChannel('modular_manifestation')
	bc.postMessage('master_token')	

	// TODO: add socket disconnect logic

	// websocket setup
	var socket = io.connect('http://localhost:3000')
	
	socket.on('server', function (data) {
		socket.emit('client', { time: new Date() })
		// setupMidiStateUpdate(socket, bc)
	})

	// control change handling
	socket.on('control', function(data) {

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

		// $("#event-queue").append(data['data']['value'])
		// $("#event-queue").append(JSON.stringify(data))
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
		$(this).css("background-color", "gray")
		$(".start-button").css("background-color", "#fff")
		$(".status-text").text("stopped")
	});

	// stop / play button
	$(".start-button").click(function() {
		bc.postMessage(JSON.stringify({'control': 'start-module'}))
		$(this).css("background-color", "gray")
		$(".stop-button").css("background-color", "#fff")
		$(".status-text").text("running")
	});

	//bc.postMessage(JSON.stringify({'control': 'set-module', 'name': 'BrandGraph2'}))

})
