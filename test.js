const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("/dev/ttys004", { baudRate: 38400 })

const parser = new Readline()
port.pipe(parser)

parser.on('data', line => console.log(`> ${line}`))