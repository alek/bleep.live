//
// sequential timeline driver
//

var driverFunction = function(bc) {
	importScripts('sequencer-config.js')

	var elapsed = (new Date()).getTime() - self.initTime

	var marker = 0
	var offset = 0
	var last = sequence[0]
	for (var i=0; i<sequence.length; i++) {
		marker+=sequence[i].t
		if (elapsed > marker) {
			last = sequence[i]
			offset = i
		}
	}

	if (last.module == "_repeat") {
		offset = 0
		last = sequence[0]
		self.initTime = (new Date()).getTime()
	}

	if (offset != self.lastOffset || self.lastOffset == null) {
		bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
		bc.postMessage(JSON.stringify({'control': 'set-module', 'name': last.module, 'config': last.config}))		
		bc.postMessage(JSON.stringify({'control': 'start-module'}))	
		self.lastOffset = offset
	}

	self.postMessage(offset + " / " + elapsed.toLocaleString())

}

//
// bus driver control message handling
//
self.addEventListener('message', function(e) {
	var bc = new BroadcastChannel('piksel_control')
	var interval = 1000	
	if (e.data['control'] === 'start') {				// start the driver with the default frequency
		self.initTime = (new Date()).getTime()
		intervalController = setInterval(function() { driverFunction(bc) } , interval);
		self.postMessage('starting')
	} else if (e.data['control'] === 'stop') {			// stop the driver
		clearInterval(intervalController)
	} else if (e.data['control'] === 'update-frequency') {		// update driver frequency
		try {
			clearInterval(intervalController)
			intervalController = setInterval(function() { driverFunction(bc) } , parseInt(e.data['frequency']));
		} catch (error) { }
	} 
});