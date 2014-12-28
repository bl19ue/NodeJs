var connect = require('connect');

connect()
	.use(logger)
	.use('/admin', restrict)
	.use('/admin', admin)
	.use(hello)
	.listen(3001);

function logger(req, res, next){ 					//All the middleware require 3 parameters as each middleware has to 
	console.log('%s %s', req.url, req.method);
	next();
}

function restrict(req, res, next){
	var authorization = req.headers.authorization;
	console.log('auth:' + authorization);
	
	if(!authorization) return next(new Error('Unauthorized'));
	
	var parts = authorization.split(' ');
	var userpass = parts[0];
	console.log('parts %s %s %s:', parts[0], parts[1], parts[2]);
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	
	checkDB(user, pass, function(err){
		if(err) {
			console.log('oo error');
			return next(err);
		}
		
		next();														//No param, so no error and go to next middleware
	});
				
}

function checkDB(user, pass, fn){
	if(user != 'sumit' || pass != 'lala'){
		console.log('err');
		return fn(new Error('no user found'));
	}
	else
		fn(null);
}

function admin(req, res, next){
	switch (req.url) {
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			console.log('user displayed');
			res.end(JSON.stringify(['tobi', 'loki', 'jane', 'sumit']));
			break;
	}
}

function hello(req, res){							
	res.setHeader('Content-Type', 'text/plain');	
	res.end('hello world');							
}

