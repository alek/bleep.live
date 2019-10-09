self.addEventListener('message', function(e) {
	var bc = new BroadcastChannel('piksel_control')
	if (e.data === 'start') {
		self.postMessage('starting')
		setInterval(function() {
			var eventEntry = {
				"data": {
					"_type": "cc",
					"controller": (Math.random() < 0.5) ? 74 : ((Math.random() < 0.5) ? 71 : 10),
					"value": Math.floor(Math.random()*65), 
					"knob": "cc_1"
				}
			}
			bc.postMessage(JSON.stringify({'midi': eventEntry }))		
		}, 100);
	}
});