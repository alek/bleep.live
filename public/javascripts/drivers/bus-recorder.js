//
// A tap device recording & playing back bus events
//

self.addEventListener('message', function(e) {
	if (e.data === 'start') {
		var bc = new BroadcastChannel('piksel_control')
		var events = []
		bc.onmessage = function (ev) { 
			events.push({timestamp: Date.now(), data: ev.data})
		}
	} else if (e.data === 'stop') {
		self.postMessage(ev.data)
	}
});