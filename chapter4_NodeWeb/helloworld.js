var http = require('http');

var server = http.createServer(function (req, res) {
//    res.write('hello world!');
//    res.end();
        res.end('hello world');
});

server.listen(3000);