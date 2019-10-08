var easymidi = require('easymidi');
var input = new easymidi.Input('Arturia BeatStep Pro Arturia BeatStepPro'); // to do: scan and use the first one or prompt

input.on('message', function (msg) {
    console.log(JSON.stringify(msg))
    console.log(msg)
});
