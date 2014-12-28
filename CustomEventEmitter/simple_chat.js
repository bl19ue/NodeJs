var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();						//Custom event emitter
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function(id, client) {						//Custom 'join' listener
	this.clients[id] = client;									//save new client
	this.subscriptions[id] = function(senderId, message) {
		console.log("sender id & message = " + senderId + " " + message);
		if (id != senderId) {									//Ignore if already broadcasted to that user
			this.clients[id].write(message);
		}
	}
	this.on('broadcast', this.subscriptions[id]);
});
var server = net.createServer(function (client) {
	console.log("Up");
	var id = client.remoteAddress + ':' + client.remotePort;
	console.log(client.remoteAddress + ':' + client.remotePort);
	client.on('connect', function() {
		console.log("connected");
		channel.emit('join', id, client);
	});
	client.on('data', function(data) {
		data = data.toString();
		channel.emit('broadcast', id, data);
	});
});
server.listen(8888);