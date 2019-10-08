var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream'),
    LineByLineReader = require('line-by-line'),
    http = http = require('http'),
	app = require('../app'),
	port = 4000;

var timeout = function(lr) {
	if (!pause) {
		lr.resume();
	} else {
		setTimeout(function() { timeout(lr) }, 100);
	}
}

app.set('port', port);

var server = http.createServer(app);
server.listen(port);

var io = require('socket.io')(server);
var pause = false
var counter = 0
var firstLine = true

io.on('connection', function(client) {

	// handshake 

	client.emit('server', { hello: new Date() }); // init()

	// file parsing

	// var lr = new LineByLineReader('/Data/dataset/supplyframe/samacsys/pricing/samacsys_activity_through_2019-09-16.tsv');
	// var lr = new LineByLineReader('/Data/dataset/hackadayio/viz/projects.tsv');

	// var lr = new LineByLineReader('/Data/dataset/supplyframe/hackadayio/projects_new.tsv');
	// var lr = new LineByLineReader('/Data/git/bleep.hdi/data/wiki_sample.tsv');
	var lr = new LineByLineReader('/Data/dataset/twitter/mydata/twitter_ads_2.tsv');

	lr.on('error', function (err) {
		console.log(err);
	});

	lr.on('line', function(line) {
		// console.log( counter++ + "\t" + line)
		if (firstLine) {
			firstLine = false
		} else {
			client.emit('line', { content: line.trim().split("\t") }); // init()
		}
		lr.pause();
		setTimeout(function() { timeout(lr) }, 10);
	});

	lr.on('end', function () {	
	});


	// client control
	client.on('control', function(command) {
		if (command['action'] == "pause") {
			pause = true
		} else {
			pause = false
		}
	});

});
