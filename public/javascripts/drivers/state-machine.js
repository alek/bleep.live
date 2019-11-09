//
// apply the transition matrix to obtain the next module
//
var nextModule = function() {
	var candidates = transition[activeModule]
	var dice = Math.random()
	var idx = Math.floor(Math.random()*transition[activeModule].length)
	var nextModule = Object.keys(transition[activeModule][idx])[0]
	if (transition[activeModule][idx][nextModule] < dice) {
		activeModule = nextModule
		return nextModule
	} else {
		return activeModule
	}
}

//
// pull dynamically list of modules from the config file
//
var driverFunction = function(bc) {
	importScripts('state-machine-config.js')
	bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
	bc.postMessage(JSON.stringify({'control': 'set-module', 'name': nextModule()}))		
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