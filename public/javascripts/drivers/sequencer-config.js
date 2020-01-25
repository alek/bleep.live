
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
				// {t: 0, module: "Timer", config: {"timer": 1000}}, 
				{t: 0, module: "Syn5", config: {}}, 
				{t: 6000, module: "Syn5", config: { "width": 0.2, "angle": 60}}, 
				{t: 7000, module: "Glitch1", config: {}}, 
				{t: 8500, module: "Syn5", config: { "width": 0.3, "angle": 30}}, 
				{t: 8800, module: "Glitch2", config: { "a": 1}}, 
				{t: 10000, module: "TDR1", config: { "a": 1}}, 
				{t: 12000, module: "_repeat"} 
				]
