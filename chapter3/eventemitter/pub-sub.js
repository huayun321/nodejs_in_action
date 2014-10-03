var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
    //get listener length
    var welcome = "Welcome!\n"
        + 'Guests online ' + this.listeners('broadcast').length;
    client.write(welcome + "\n");
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    };
    //add listener on every client when broadcast emit
    this.on('broadcast', this.subscriptions[id]);
});

//add listener remove some client's broadcast listener
// when some client leave
channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + ' has left the chat.\n');
});

//add listener remove all clients' broadcast listener
//when some client type shutdown
channel('shutdown', function () {
    channel.emit('broadcast', '', "Chat has chut down.\n");
    channel.removeAllListeners('broadcast');
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function () {
        channel.emit('join', id, client);
    });
    client.on('data', function (data) {
        data = data.toString();
        //when data is shutdown emit shutdown
        if (data == "shutdown\r\n") {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });

    //when client close emit leave event
    client.on('close', function () {
        channel.emit('leave', id);
    });

});

server.listen(8888);