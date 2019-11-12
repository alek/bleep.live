//
// keyboard module switcher
//

var handleEvent = function(event, bc) {
	importScripts('switcher-config.js')
	var knob = event.midi.data.knob
	var idx = parseInt(knob.split("_")[1])
	var newModule = switcherLineup[idx%switcherLineup.length]

	// activate new module
	bc.postMessage(JSON.stringify({'control': 'clear-canvas'}))		
	bc.postMessage(JSON.stringify({'control': 'set-module', 'name': newModule.module, 'config': newModule.config}))		
	bc.postMessage(JSON.stringify({'control': 'start-module'}))	
	self.postMessage(idx + " / " + newModule.module)
}

//
// bus driver control message handling
//
self.addEventListener('message', function(e) {
	var bc = new BroadcastChannel('piksel_control')
	bc.onmessage = function (ev) { 
		data = JSON.parse(ev.data)
		if (self.enabled && data["midi"] && data["midi"].data.knob.startsWith("switch_")) {
			handleEvent(data, bc)
		}
	}
	if (e.data['control'] === 'start') {				// start the driver with the default frequency
		self.enabled = true
		self.postMessage('on')
	} else if (e.data['control'] === 'stop') {			// stop the driver
		self.enabled = false
	}

});