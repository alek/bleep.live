var StateContainer = (function() {
	var instance; 

	function createInstance() {
		var container = {}
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