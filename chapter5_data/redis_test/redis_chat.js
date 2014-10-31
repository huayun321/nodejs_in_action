//redis超越了数据存储的传统职责，它提供的信道是无价之宝。
//信道使数据传递机制，提供了发布/预订功能
//对于聊天和游戏来说，他们很实用
//redis客户端可以向任一给定的信道预订或发布消息。
//预订一个信道意味着你会收到所有发送给它的信息
//发布给信道的消息会发送给所有预订了那个信道的客户端

var net = require('net');
var redis = require('redis');

var server = net.createServer(function(socket) {
    var subsciber;
    var publisher;

    socket.on('connect', function() {
        subsciber = redis.createClient();
        subsciber.subscribe('main_chat_room');

        subsciber.on('message', function(channel, message) {
           socket.write('Channel ', channel + ': ' + message);
        });

        publisher = redis.createClient();
    });

    socket.on('data', function(data) {
        publisher.publish('main_chat_room', data);
    });

    socket.on('end', function() {
        subsciber.unsubscribe('main_chat_room');
        subsciber.end();
        publisher.end();
    });
});

server.listen(3000);