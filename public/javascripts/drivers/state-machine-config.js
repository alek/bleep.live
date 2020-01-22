
//
// Configuration of active modules used by the state machine worker
//

var activeModule = "Bitfilter1"	// start / currently active module 

//
// sparse transition matrix encoding
//
// var transition = {
// 	"Glitch1": [ {"Glitch1": { "p": 0.1, "config": {}}}, {"Bitfilter1": { "p": 0.9, "config": {}}} ],
// 	"Bitfilter3": [ {"Bitfilter1": { "p": 0.1, "config": {}}}, {"Bitfilter2": { "p": 0.9, "config": {}}} ],
// 	"Bitfilter2": [ {"Glitch1": { "p": 0.5, "config": {}}}, {"Bitfilter3": { "p": 0.9, "config": {}}} ]
// }

var transition = {
	"Bitfilter1": [ {"Bitfilter1": { "p": 0.5, "config": {"a": 1}}}, {"Glitch1": { "p": 0.25, "config": {}}}, {"OnePoint1": { "p": 0.25, "config": {}}} ],
	"OnePoint1": [ {"Bitfilter1": { "p": 0.75, "config": {"a": 1}}}, {"Glitch1": { "p": 0.75, "config": {}}} ],
	"Glitch1": [ {"Glitch1": { "p": 0.5, "config": {}}}, {"Bitfilter1": { "p": 0.5, "config": {}}} ]
}