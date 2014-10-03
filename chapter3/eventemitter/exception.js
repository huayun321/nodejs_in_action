var events = require('events');
var myEmitter = new events.EventEmitter();
//myEmitter.on('error', function (err) {
//   console.log('ERROR:' + err.message);
//});

myEmitter.emit('error', new Error('Something is wrong.'));

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    process.exit(1);
});