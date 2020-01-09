//
// Visual Module superclass
//
class Module {

	constructor(midiMappings) {
		this.config = {}
		this.midi = MidiController.getInstance()
		this.midi.getReverseMapping()
		this.midiMappings = midiMappings
		this.params = {}
		this.wiring = {}
		this.intervals = []
		this.isActive = true
		this.updateParamValues()
	}

	updateParamValues() {
		for (var key in this.midiMappings) {
			this.params[key] = this.getMidiValue(this.midiMappings[key][0], this.midiMappings[key][1])
			this.wiring[this.midiMappings[key][0]] = key
		}
		$("#active-params").html(this.getHtmlParamLine())	
	}

	getParamNameFromCC(knob) { 
		for (var key in this.midiMappings) {
			if (knob == this.midiMappings[key][0]) {
				return key
			}
		}
		return null
	}

	getHtmlParamLine() {
		var result = '<div class="params-line">'
		for (var param in this.params) {
			result += '<div class="param-val"><b>' + param + ':</b>' + this.params[param] + "</div>"
		}
		result += '</div>'
		return result
	}

	//
	// Set module config
	// 
	setConfig(configData) {
		for (var el in configData) {
			this.config[el] = configData[el]
		}
	}

	getConfig() {
		return this.config
	}

	getConfigVal(paramName, defaultValue) {
		return (this.config[paramName] != null) ? this.config[paramName] : defaultValue
	}

	setActive(status) {
		this.isActive = status
	}

	//
	// Setters for individual parameters
	//

	setDimension(xmax, ymax) {
		this.config["xmax"] = xmax;
		this.config["ymax"] = ymax;
	}

	setDomID(domID) {
		this.config["domID"] = domID
	}

	setBackgroundColor(color) {
		$("#" + this.getDomID()).css("background-color", color)
	}

	//
	// Getters for individual parameters
	//

	// max width of the animation
	getXmax() {
		return (this.config["xmax"] != null) ? this.config["xmax"] : window.innerWidth
	}

	// max height of the animation
	getYmax() {
		return (this.config["ymax"] != null) ? this.config["ymax"] : window.innerHeight
	}

	// animation render scale factor
	getScale() {
		return (this.config["scale"] != null) ? this.config["scale"] : 1.0	
	}

	// dom element that the animation will be rendered to 
	getDomID() {
		return (this.config["domID"] != null) ? this.config["domID"] : "results"	
	}

	// helper functions
	getMidiValue(name, defaultVal) {
		return this.midi.getValue(name, defaultVal)
	}

	setDomID(domID) {
		this.domID = domID
	}

	getParams() {
		return this.params
	}

	setupCanvas() {
		$('body').append($('<canvas id="' + this.getDomID() + "-canvas" + '" width="' + xmax + '" height="' + ymax + '"</canvas>'))	
	}

	getCanvas() {
		return document.getElementById(this.getDomID() + "-canvas");
	}

	getCanvasContext() {
		return this.getCanvas().getContext("2d");
	}

	//
	// DOM element init
	//

	init() {

		var xmax = this.getXmax()
		var ymax = this.getYmax()
		var nodeID = this.getDomID()
		var scale = this.getScale()

		if($('#' + nodeID).length!==0) {	// if a node of the same name already exists - remove it
			$('#' + nodeID).remove()	
		}
		$('body').append($('<svg id="' + nodeID + '" width="' + xmax + '" height="' + ymax + '" viewBox="0 0 ' + xmax/scale + ' ' + ymax/scale + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'))	
	}

	// update object state
	update(event) {
		this.updateParamValues()
	}

	// clear the canvas
	clear() {
		// disable any running interval times
		for (var i=0; i<this.intervals.length; i++) {
			clearInterval(this.intervals[i])
		}
		// empty canvas
		$("#" + this.getDomID()).empty();
		// empty additional svgs
		$.each($("svg"), function() {
			if ($(this).attr("id") != "svg-config") {
				$(this).empty()
			}
		})
		// empty non-svg elements
		$("div").remove()
		// reset background to black
		$("body").css({"background-color": "#000"})
	
	}

	// append element
	render(el) {
		// $("#" + this.getDomID()).empty();
		document.getElementById(this.getDomID()).appendChild(el);	
	}

}

export default Module;
