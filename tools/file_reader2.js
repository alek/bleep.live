// var fs = require('fs'),
//     readline = require('readline'),
//     stream = require('stream'),
//     LineByLineReader = require('line-by-line'),
//     http = http = require('http'),
// 	app = require('../app'),
// 	port = 4000;


// app.set('port', port);

// var server = http.createServer(app);
// server.listen(port);

// var io = require('socket.io')(server);


const server = require('http').createServer();
var LineByLineReader = require('line-by-line');

var pause = false
var counter = 0
var firstLine = true

var timeout = function(lr) {
	if (!pause) {
		lr.resume();
	} else {
		setTimeout(function() { timeout(lr) }, 100);
	}
}

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(4000);

var numLines = 23043;

io.on('connection', function(client) {

	// handshake 

	client.emit('server', { hello: new Date() }); // init()

	// file parsing

	var lr = new LineByLineReader('/Data/dataset/supplyframe/samacsys/pricing/new/model_full_clean.tsv');
	//var lr = new LineByLineReader('/Data/dataset/supplyframe/samacsys/pricing/new/model_us.tsv');
	// var lr = new LineByLineReader('/Data/dataset/supplyframe/samacsys/pricing/new/ti_down.tsv');
	

	// var lr = new LineByLineReader('/Data/dataset/supplyframe/samacsys/pricing/samacsys_activity_through_2019-09-16.tsv');
	// var lr = new LineByLineReader('/Data/dataset/hackadayio/viz/projects.tsv');

	lr.on('error', function (err) {
		console.log(err);
	});

	lr.on('line', function(line) {
		// console.log( counter++ + "\t" + line)
		if (firstLine) {
			firstLine = false
		} else {
			client.emit('line', { content: line.trim().split("\t"), total: numLines }); // init()
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
