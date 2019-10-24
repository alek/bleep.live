self.addEventListener('message', function(e) {
	var bc = new BroadcastChannel('piksel_control')
	if (e.data === 'start') {
		intervalController = setInterval(function() {
			var eventEntry = {
				"data": {
					"_type": "cc",
					"controller": (Math.random() < 0.5) ? 74 : ((Math.random() < 0.5) ? 71 : 10),
					"value": Math.floor(Math.random()*65), 
					"knob": "cc_1"
				}
			}
			bc.postMessage(JSON.stringify({'midi': eventEntry }))		
		}, 10);
		self.postMessage('starting')
	} else if (e.data == 'stop') {
		clearInterval(intervalController)
	}
});