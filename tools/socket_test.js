const io = require('socket.io-client')
var socket = io.connect('http://localhost:4000')

socket.on('server', function (data) {
	console.log("connected")
	socket.emit('client', { time: new Date() })
})

socket.on('line', function (data) {
	console.log(data)
	process.exit(1);
})

