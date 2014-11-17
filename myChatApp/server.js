//A server file
var http = require('http'); //http functionality
var fs = require('fs'); //file system
var path = require('path'); //path related functionalities
var mime = require('mime'); //check file mime types
var cache = {}; //for chaching data

//For resources that are not available
function error404(response){
	response.writeHead(404, {'Content-Type':'text/plain'});
	response.write('Error 404 : resource not available');
	response.end();
}

//writes http headers and sends contents to files
function sendFile(response, filePath, fileContents) {
	//console.log('filePath=' + filePath);
	response.writeHead(200,{"content-type": mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

//Accessing RAM is faster than accessing disks, this caching function provides
//a way to cache static files, only reading them from disk once, 
function cacheStatic(response, cache, absPath){
	if (cache[absPath]) {											//Checks if file is cached in memory
		sendFile(response, absPath, cache[absPath]);				//If it is, it sends it to the browser
	}else {
		fs.exists(absPath, function(exists) {						//Check if file exists
			if (exists) {
				fs.readFile(absPath, function(err, data) {			//Read file from disk
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);			//Serve the file just read from the disk
					}
				});
			} else {
				error404(response);									//Send http error
			}
		});
	}
}

var server = http.createServer(function(request, response) {
	var filePath = false;
	if (request.url == '/') {
		filePath = 'public/index.html';								//Default html file
	} else {
		filePath = 'public' + request.url;							//Translate URL path to file path		
	}
	var absPath = './' + filePath;
	//console.log("%j", cache);
	cacheStatic(response, cache, absPath);							//for static file
});

server.listen(3000, function() {
	console.log("Server listening on port 3000.");
});

//the Chat server
var chatServer = require('./lib/chat_server');
chatServer.listen(server);

