var net = require('net');

var server = net.createServer(function(socket) {
//    socket.on('data', function (data) {
//        socket.write(data);
//    });
    //响应一次事件
    socket.once('data', function (data) {
       socket.write(data);
    });
});

server.listen(8888);