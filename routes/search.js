var express = require('express');
var router = express.Router();
var net = require('net');

// const { spawn } = require('child_process');
// const child = spawn('sh', ['./tools/indexer/bin/search.sh', '/tmp/guardian-index/']);
// child.on('error', function (error) { console.log(`child process returned error: ${error}`); });
// child.on('exit', function (code, signal) { console.log(`child process exited with code ${code} and signal ${signal}`); });

router.get('/', function(req, res, next) {	
	var client = new net.Socket();
	var response = "";

	client.connect(8912, '127.0.0.1', function() {
		var query = ""
		if (req.query["q"]) {
			query = "title:" + req.query['q'];
		} else {
			// query = "q:*:*";
			query = "title:[a* TO z*]";
		}
		if (req.query['year']) {
			query +=  " AND year_num:" + req.query['year'];
		}
		if (req.query['month']) {
			query +=  " AND month_num:" + req.query['month'];	
		}
		if (req.query['section']) {
			query +=  " AND section:" + req.query['section'];	
		}
		client.write(query + "\r\n");
	});

	client.on('data', function(data) {
		response += data;
	});

	client.on('close', function() {
		try {
			response = JSON.parse(response);

			// patchup - complete empty entries
			if (response['facets']) {
				for (var i=0; i<11; i++) {
					year = 2008 + i
					if (!response['facets']['year'][year]) {
						response['facets']['year'][year] = 0;
					}
				}

				for (var month=1; month<=12; month++) {
					if (!response['facets']['month'][month]) {
						response['facets']['month'][month] = 0;
					}
				}
			}
			// patchup end
			res.send(response);
		} catch (e) {
			res.send(e);
		}
	});

	client.on('error', function() {
		console.log("error connecting to the search server");
	});

});

module.exports = router;