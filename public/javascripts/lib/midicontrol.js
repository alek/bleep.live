// 
// Maintains state of the midi controller used
// TODO: add keyboard fallback if no midi present
// 

var MidiController = (function() {
	
	var instance;

	var midiMapping = {	// mapings for Arturia Beatstep Pro
				"cc_1": 10,
				"cc_2": 74,
				"cc_3": 71,
				"cc_4": 76,
				"cc_5": 77,
				"cc_6": 93,
				"cc_7": 73,
				"cc_8": 75,
				"cc_9": 114,
				"cc_10": 18,
				"cc_11": 19,
				"cc_12": 16,
				"cc_13": 17,
				"cc_14": 91,
				"cc_15": 79,
				"cc_16": 72
			}

	var gloveMappingReverse = { // glove 2.0 reverse mapping
		  10: "cc_1",
		  74: "cc_2",
		  71: "cc_3",
		  76: "cc_4",
		  77: "cc_5",
		  101: "cc_6",
		  102: "cc_7",
		  103: "cc_8",
		  104: "cc_9",
		  105: "cc_10",
		  106: "cc_11",
		  93: "cc_12",
		  73: "cc_13",
		  75: "cc_14",
		  114: "cc_15",
		  18: "cc_16",
		  107: "cc_17",
		  108: "cc_18",
		  109: "cc_19",
		  110: "cc_20",
		  111: "cc_21",
		  112: "cc_22"
		}

	// virtual midi via keyboard
	var keyboardMap = {
			81: ["cc_1", "up"],
			65: ["cc_1", "down"],
			87: ["cc_2", "up"],
			83: ["cc_2", "down"],
			69: ["cc_3", "up"],
			68: ["cc_3", "down"],
			82: ["cc_4", "up"],
			70: ["cc_4", "down"],
			84: ["cc_5", "up"],
			71: ["cc_5", "down"],
			89: ["cc_6", "up"],
			72: ["cc_6", "down"],
			85: ["cc_7", "up"],
			74: ["cc_7", "down"],
			73: ["cc_8", "up"],
			75: ["cc_8", "down"],
			79: ["cc_9", "up"],
			76: ["cc_9", "down"],
			80: ["cc_10", "up"],
			59: ["cc_10", "down"]
	}

	function createInstance() {
		var object = {
			data: new Object(),
			getValue: function(paramName, defaultValue) {
				if (paramName in midiMapping && this.data[midiMapping[paramName]] != null) {
					return this.data[midiMapping[paramName]]
				} else {
					// this.data[midiMapping[paramName]] = defaultValue  // lazy value set before returning
					return defaultValue
				}
			},
			setValue: function(paramName, paramValue) {
				if (paramName in midiMapping) {
					this.data[midiMapping[paramName]] = paramValue
				}
			},
			getReverseMapping: function() {
				var result = {}
				for (var key in midiMapping) { result[midiMapping[key]] = key }
				return result
			},
			getKeyboardMap: function() { return keyboardMap },
			getGloveMap: function() { return gloveMappingReverse },
			getMidiChannel: function(knob) { return midiMapping[knob] }
		};
		// do we need defaults?

		// for (param in midiMapping) {
		// 	object.data[midiMapping[param]] = 0
		// }
		return object;
	}

	return {
		getInstance: function() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	}

})();