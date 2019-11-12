
//
// Sequence config
//

// var sequence = [
// 				{t: 0, module: "Glitch2", config: { "a": 1}}, 
// 				{t: 3000, module: "Bitfilter1", config: { "a": 1}}, 
// 				{t: 5000, module: "Glitch1", config: { "a": 1}}, 
// 				{t: 8000, module: "Glitch2", config: { "a": 1}}, 
// 				{t: 10000, module: "TDR1", config: { "a": 1}}, 
// 				{t: 12000, module: "_repeat"} 
// 				]


var sequence = [
				{t: 0, module: "Syn5", config: {}}, 
				{t: 3000, module: "Syn5", config: { "width": 0.2, "angle": 60}}, 
				{t: 5000, module: "Glitch1", config: { "a": 1}}, 
				{t: 8000, module: "Glitch2", config: { "a": 1}}, 
				{t: 10000, module: "TDR1", config: { "a": 1}}, 
				{t: 12000, module: "_repeat"} 
				]
