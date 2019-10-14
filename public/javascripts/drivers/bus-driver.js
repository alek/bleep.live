self.addEventListener('message', function(e) {
	if (e.data === 'start') {
		var bc = new BroadcastChannel('piksel_control')
		bc.onmessage = function (ev) { 
			self.postMessage(ev.data)
		}
	}
});