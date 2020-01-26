
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
				{t: 0, module: "Timer", config: {"timer": 1000}}, 
				{t: 1000, module: "DryErase2", config: { "width": 0.2, "angle": 60}}, 
				{t: 3000, module: "DryErase3", config: {}}, 				
				{t: 4800, module: "Glitch1", config: {}}, 
				{t: 6600, module: "TDR1", config: { "a": 1}}, 
				{t: 8400, module: "Glitch2", config: { "a": 1}}, 
				{t: 10200, module: "DryErase1", config: { "a": 1}}, 
				{t: 12000, module: "_repeat"} 
				]
