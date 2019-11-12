
//
// Sequence config
//

var sequence = [
				{t: 0, module: "Glitch2", config: { "a": 1}}, 
				{t: 3000, module: "Bitfilter1", config: { "a": 1}}, 
				{t: 5000, module: "Glitch1", config: { "a": 1}}, 
				{t: 8000, module: "Glitch2", config: { "a": 1}}, 
				{t: 10000, module: "TDR1", config: { "a": 1}}, 
				{t: 12000, module: "_repeat"} 
				]