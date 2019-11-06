//
// pull dynamically list of modules from the config file
//
var driverFunction = function(bc) {

	importScripts('state-machine-config.js')
	bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
	bc.postMessage(JSON.stringify({'control': 'set-module', 'name': modules[Math.floor(Math.random()*modules.length)]}))		
	bc.postMessage(JSON.stringify({'control': 'start-module'}))	
}

//
// bus driver control message handling
//
self.addEventListener('message', function(e) {
	var bc = new BroadcastChannel('piksel_control')
	var interval = 1000	
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