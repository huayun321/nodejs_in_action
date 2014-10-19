/**
 * Created by yun on 14-10-19.
 */
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req, res) {
   var url = parse(req.url);
    var path = join(root, url.pathname);
    var stream = fs.createReadStream(path);
//    stream.on('data', function(chuck) {
//       res.write(chuck);
//    });
//    stream.on('end', function() {
//        res.end();
//    });
    stream.pipe(res);
    //when file not exists
    stream.on('error', function(err) {
       res.statusCode = 500;
        res.end('Internal Server Error');
    });
});

server.listen(3000);