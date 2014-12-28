//PUT files in the watch folder, they will be renamed in lowercase and will be moved to the DONE FOLDER\\

function Watcher(watchDir, processedDir) {					//Treated as a class
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

var events = require('events');
var util = require('util');
util.inherits(Watcher, events.EventEmitter);				//Now Watcher class inherits EventEmitter

var fs = require('fs')
, watchDir = './watch'
, processedDir = './done';

Watcher.prototype.watch = function() {
	var watcher = this;										//Store watcher reference, will be used in readdir
	fs.readdir(this.watchDir, function(err, files) {
		if (err) throw err;
		for(var index in files) {							//For every file
			watcher.emit('process', files[index]);			//Emit the file at that index to process listeners
		}
	})
}
Watcher.prototype.start = function() {						//Function to start the processing
	var watcher = this;
	fs.watchFile(watchDir, function() {
		watcher.watch();
	});
}

var watcher = new Watcher(watchDir, processedDir);			//Created new object for  Watcher, and now we can start listening

watcher.on('process', function process(file) {				//The on method was inheritd from event emitter
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir + '/' + file.toLowerCase();
	fs.rename(watchFile, processedFile, function(err) {
		if (err) throw err;
	});
	
});

watcher.start();