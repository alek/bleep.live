
//
// Configuration of active modules used by the state machine worker
//

var activeModule = "Glitch1"

var transition = {
	"Glitch1": [ {"Bitfilter2": 0.9}, {"Bitfilter3": 0.5}  ],
	"Bitfilter3": [ {"Bitfilter2": 0.01}, {"Glitch1": 0.2}  ],	
	"Bitfilter2": [ {"Bitfilter1": 0.01}, {"Glitch1": 0.2}  ]		
}