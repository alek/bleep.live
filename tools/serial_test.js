var KalmanFilter = require('kalmanjs')

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("/dev/tty.usbserial-DN04K3IC", { baudRate: 38400 })
const kf = new KalmanFilter();

const parser = new Readline()
port.pipe(parser)

// parser.on('data', line => console.log(`> ${line}`))
parser.on('data', function(data) {
	var parts = data.trim().split(" ")
	// parts = parts.map(parseInt)
	parts = parts.map(function(a) {
		var val = parseInt(a)
		val = Math.floor(kf.filter(val))
		return val
	}) 
	console.log(parts.join("\t"))

})
// port.write('ROBOT POWER ON\n')
//> ROBOT ONLINE