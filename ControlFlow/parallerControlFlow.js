var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';
function checkIfComplete() {
	completedTasks++;
	if (completedTasks == tasks.length) {
		for (var index in wordCounts) {
			console.log(index +': ' + wordCounts[index]);
		}
	}
}
function countWordsInText(text) {
	var words = text
	.toString()
	.toLowerCase()
	.split(/\W+/)
	.sort();
	for (var index in words) {
		var word = words[index];
		if (word) {
			wordCounts[word] =
				(wordCounts[word]) ? wordCounts[word] + 1 : 1;
		}
	}
}
fs.readdir(filesDir, function(err, files) {								//Starts here with the directory
	if (err) throw err;
	for(var index in files) {											//for each file
		
	/*	(function(parameter))(parameter) */ 							//Auto invoking functions wow!
		//(function(abc, ))(abc, ())
		
		var task = (function(file) {									//Self invoking function for reading all the files
			return function() {
				fs.readFile(file, function(err, text) {					//Read that file
					if (err) throw err;
					countWordsInText(text);								//Count no. of words in that file
					checkIfComplete();									//check if tasks are completed
				});
			}
		})(filesDir + '/' + files[index]);								//paramter for a file to be read
		tasks.push(task);												//Add each task to the array
	}
	for(var task in tasks) {
		tasks[task]();													//Now call all the tasks, as they are async, its all parallel
	}
});