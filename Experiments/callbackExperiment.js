function sayHello(seconds){
	console.log("hello");
	setTimeout(function(){
		console.log("World");
	}, seconds * 1000);
	
	console.log("damn");
}

sayHello(5);