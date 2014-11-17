var http = require('http');

http.createServer(function(req, res){
 	console.log('In 8031');
	res.end("wow 8031");
}).listen(8031);

http.createServer(function(req, res){
 	console.log('In 8041');
	res.end("wow 8041");
}).listen(8041);