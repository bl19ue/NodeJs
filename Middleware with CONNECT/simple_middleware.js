var connect = require('connect');
var app = connect();
app.use(logger);
app.use(hello);
app.listen(3001);

function logger(req, res, next){ 					//All the middleware require 3 parameters as each middleware has to 
	console.log('%s %s', req.url, req.method);
	next();
}

function hello(req, res){							//This is our 2nd middleware, the next parameter is not passed
	res.setHeader('Content-Type', 'text/plain');	//because the response is ended here, and so there is no need to pass 
	res.end('hello world');							//next here
}