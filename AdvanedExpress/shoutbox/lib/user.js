var redis = require('redis');
var bcrypt = require('bcrypt');

var db = redis.createClient();										//Reddis connection

module.exports = User;

function User(obj) {
	for (var key in obj) {											//Iterate keys in object 
		this[key] = obj[key];										//Merge values
	}
}

User.prototype.save = function(fn){
	if(this.id){										//If user exists
		this.update(fn);
	}
	else{												//If user does not exist
		var user = this;
		db.incr('user:ids', function(err, id){			//Create unique ID 
			if(err) return fn(err);
			user.id = id;								//Saving id
			user.hashPassword(function(err){
				if(err) return fn(err);
				user.update(fn);						//Save user's data
			});
		});
	}
};

User.prototype.update = function(fn){
	var user = this;
	var id = user.id;
	db.set('user:id:' + user.name, function(err){							//Index userID by name
		if(err) return fn(err);
		db.hmset('user:' + id, user, function(err){							//Use Redis hash to store data
			fn(err);
		});
	});
}

User.prototype.hashPassword = function(fn){								//Salt -  a salt is random data that is used as an additional input to a one-way function that hashes a password or passphrase.
	var user = this;
	bcrypt.genSalt(12, function(err, salt){								//Generate 12 char salt
		if (err) return fn(err);
		user.salt = salt;												//save salt
		bcrypt.hash(user.pass, salt, function(err, hash){				//Hash
			if (err) return fn(err);
			user.pass = hash;
			fn();
		});
	});
};

var tobi = new User({
	name: 'Tobi',
	pass: 'im a ferret',
	age: '2'
});
tobi.save(function(err){
	if (err) throw err;
	console.log('user id %d', tobi.id);
});