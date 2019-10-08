var TimeContainer = (function() {
	var instance; 

	function createInstance() {
		var container = {}
		var audioContext = new AudioContext()
		container = {
			"context": audioContext, 
			"nextTimerClock": audioContext.currentTime
		}
		return container
	}

	return {
		getInstance: function() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	}
}) ();