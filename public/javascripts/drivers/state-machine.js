//
// apply the transition matrix to obtain the next module
//
var nextModule = function() {
	var candidates = transition[activeModule]
	var dice = Math.random()
	var idx = Math.floor(Math.random()*transition[activeModule].length)
	var switchMod = Object.keys(transition[activeModule][idx])[0]
	if (transition[activeModule][idx][switchMod]["p"] < dice) {
		var config = transition[activeModule][idx][switchMod]["config"]
		activeModule = switchMod
		self.postMessage(switchMod)
		return {"name": switchMod, "switch": true, "config": config}
	} else {
		return {"name": activeModule, "switch": false }
	}
}

//
// pull dynamically list of modules from the config file
//
var driverFunction = function(bc) {
	importScripts('state-machine-config.js')
	var switchMod = nextModule()
	if (switchMod["switch"]) {
		bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
		bc.postMessage(JSON.stringify({'control': 'set-module', 'name': switchMod["name"], 'config': switchMod["config"]}))		
		bc.postMessage(JSON.stringify({'control': 'start-module'}))	
	}
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