var mysql = require('mysql');

var connection =  mysql.createPool({
  	host : 'localhost',
  	user : 'root',
  	password: 'root',
	database: "sakila",
	connectTimeout: 3000;
	
  });
  //connection.connect();
  //connection.query("use sakila");
  connection.getConnection(function(err, connection){
	connection.query( "select * from actor",  function(err, rows){
  	if(err)	
	{
  		throw err;
  	}
	else{
  		call(rows);
  	}
  });
  
  connection.query( "select * from country",  function(err, rows){
  	if(err)	
	{
  		throw err;
  	}
	else{
  		call(rows);
  	}
  });
  connection.query( "select * from customer",  function(err, rows){
  	if(err)	
	{
  		throw err;
  	}
	else{
  		call(rows);
  	}
  });
  connection.query( "select * from film",  function(err, rows){
  	if(err)	
	{
  		throw err;
  	}
	else{
  		call(rows);
  	}
  });
  connection.release();
});

  function call(rows)
  {
	console.log(rows);
	//connection.destroy();
  }
  