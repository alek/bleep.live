//
// send a random midi control message
//
var driverFunction = function(bc) {
	var eventEntry = {
		"data": {
			"_type": "cc",
			"controller": (Math.random() < 0.5) ? 74 : ((Math.random() < 0.5) ? 71 : 10),
			"value": Math.floor(Math.random()*65), 
			"knob": "cc_1",
			"meta": "clock"
		}
	}
	bc.postMessage(JSON.stringify({'midi': eventEntry }))		
}

//
// bus driver control message handling
//
self.addEventListener('message', function(e) {
	var bc = new BroadcastChannel('piksel_control')
	var interval = 100	
	if (e.data['control'] === 'start') {				// start the driver with the default frequency
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