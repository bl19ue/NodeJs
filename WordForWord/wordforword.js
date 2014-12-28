var fs = require('fs');
var fileDir = './Folder/';
var i = 0;
var buffer_size = 5120; //5MB buffer size
var storeWord = {};
var finalWordStore = {};
var notFound = [];
function readFile(){									//Called first to cache dictionary
	var filename = fileDir + 'dictionary';
	var filesize = getFilesizeInBytes(filename);
	var sizeleft = filesize;
	var stream;
	
	//stream = fs.createReadStream(filename);			//We could use this ReadStream, but for now readFile works
	
	fs.readFile(filename, function(err, buffer){		//Reading the file
		var dictionary = buffer.toString();		
		writeMyDictionary(dictionary);					//Check for dictionary 
	});
	
	/*for(var i=0; i<filesize;){
		console.log("sizeleft = " + sizeleft + "\n");
		if(sizeleft >= buffer_size){
			stream = fs.createReadStream(filename, {start:i, end:i + buffer_size});	
			sizeleft -= buffer_size;
		} else{
			stream = fs.createReadStream(filename, {start:i, end:i + sizeleft});	
		}
		//stream.emit('data', stream);
		i += buffer_size + 1;
		console.log("i=" + i + "\n");
	}
	
	*/
	/*
	stream.on('data', function(buffer){
		//console.log("Buffer " + i++ + "-" + "\n");
		var dictionary = buffer.toString();
		writeMyDictionary(dictionary);
		//console.log(dictionary);
	});
	
	stream.on('end', function(){
		console.log("Ended");
		//console.log("ii="+i);
	});
	*/
}

function readMyFile(){									//User's file to be checked for word in dictionary
	var filename = fileDir + 'file1';
	var tmp = 0;
	fs.readFile(filename, function(err, file){
		var words = file
					.toString()
					.toLowerCase()
					.split(/\W+/)
					.sort();							//Splits whitespaces, sort them, lowerCase them and store in words
		for (var index in words) {						//for each word in words
			var word = words[index];
			if(word){									//If there is any word
				
				storeWord[word] = (storeWord[word]) ? '<>' : word;			//store it if its new, if it repeats store <>
				if(storeWord[word] != '<>'){								//So now if its not <>
					finalWordStore[tmp] = storeWord[word];					//Store those words finally without multiple occurances
					//console.log(finalWordStore[tmp]);
					++tmp;
				}
			}

		}

	});
	
}
/*
function extractWords(file){
	//if(err) return  hadError(err);
	var words = file
					.toString()
					.toLowerCase()
					.split(/\W+/)
					.sort();
	for (var index in words) {
		var word = words[index];
		if(word){
			storeWord[word] = (storeWord[word]) ? storeWord[word] : "1";
		}
		//console.log("\nword="+word);
	}
	console.log(wordCounts);
}
*/
function getFilesizeInBytes(filename) {
	var stats = fs.statSync(filename);
	var fileSizeInBytes = stats["size"];
	return fileSizeInBytes;
}

function hadError(err){
	console.log(err);
}

function writeMyDictionary(dictionary)											//Generates meaning for all the words in the user's file
{
	var multiliner = dictionary.toString().toLowerCase().split('\n');			//split line by line
	
	//getMeaning(multiliner, storeWord[])
	//console.log("yo"+finalWordStore.length);
	for(var index in finalWordStore){
		var meaning = getMeaning(multiliner, finalWordStore[index]);
		if(meaning) 															//If the meaning was found, show
			console.log("word:"+finalWordStore[index]+"|||meaning = "+ meaning + "\n");
		else {
			notFound.push(finalWordStore[index]);								//If not found, cache those words
			//showNotFound(notFound);	
		}
		
		//console.log("Not found:" + finalWordStore[index] + "\n");
			
		//console.log(finalWordStore[index]);
	}
	showNotFound(notFound);														//Ultimately call showNotFound();
		
	
		/*Regex replacing*/
		/*
		//{
			 //var re = new RegExp("a-z");
			 //firstword[0] = firstword[0].replaceAll("[0-9]","");
		//}
		*/
	
}

function getMeaning(multiliner, userword)
{
	for(var line=0;line<multiliner.length;line++){							//for every line
		var firstline = multiliner[line];
		var firstword = firstline.toString().toLowerCase().split(' ');		//split whitespaces
		//console.log(firstword[0] + " ");									//get first word
		if(firstword[0] == userword)
			return firstline;
	}
}

function showNotFound(notFound)
{
	/*notFound.forEach(function(word){
		console.log("word");
	});*/
	console.log("not found = " + notFound);
}

readFile();
readMyFile();
//showNotFound(notFound);
//writeMyDictionary();

//file1 -> text -> words -> sortedWord -> 
//file2 -> text -> words -> sortedWord ->

