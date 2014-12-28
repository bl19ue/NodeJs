var http = require('http');
var mysql = require('mysql');
var track = require('./lib/timetrack');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'timetrack'
});

var server = http.createServer(function(req, res){
	switch(req.method){
		case 'POST':
			switch(req.url){
				case '/':
					track.add(db, req, res);
					break;
				case '/archive':
					track.archive(db, req, res);
					break;
				case '/delete':
					track.delete(db, req, res);
					break;
			}
			break;
		case 'GET':
			switch(req.url){
				case '/':
					track.show(db, res);
					break;
				case '/archive':
					track.showArchived(db, res);
					break;
			}
			break;
	}
});

db.query(
	"CREATE TABLE IF NOT EXISTS work ("
	+ "id INT(10) NOT NULL AUTO_INCREMENT, "
	+ "hours DECIMAL(5,2) DEFAULT 0, "
	+ "date DATE, "
	+ "archived INT(1) DEFAULT 0, "
	+ "description LONGTEXT,"
	+ "PRIMARY KEY(id))",
	function(err) {
		if (err) throw err;
		console.log('Server started...');
		server.listen(3001, '127.0.0.1');
	}
);