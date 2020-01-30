//
// Collection of common utils developed for the
// Modular Manifestation 2020 event
//

class MM {

	static screenLines(domID) {
		for (var i=0; i<20; i++) {
			let offset = Math.random()*ymax
			drawLine([0,offset],[xmax,offset], "rgba(255,255,255," + Math.random() + ")", 30*Math.random(), domID, null, Math.random() < 0.9, false, "2 " + 100*Math.random() + "")
		}
	}

}

export default MM;