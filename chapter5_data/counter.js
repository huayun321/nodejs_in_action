/**
 * Created by yun on 14-10-23.
 */
var http = require('http');
var counter = 0;

var server = http.createServer(function(req, res) {
    counter++;
    res.write('I have been accessed ' + counter + ' times.');
    res.end();
});

server.listen(3000);