var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
	getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
	fs.readFile('./title.json', function (err, data) {			//We could also use return early, if we dont want many if and else
		if (err) {												//For example, if(err) return hadError(err, res);
			hadError(err, res);									//			   getTemplate(...);
		}
		else {
			getTemplate(JSON.parse(data.toString()), res);
		}
	})
}
function getTemplate(titles, res) {
	fs.readFile('./template.html', function (err, data) {
		if (err) {
			hadError(err, res);
		}
		else {
			formatHtml(titles, data.toString(), res);
		}
	})
}

function formatHtml(titles, tmpl, res) {
	var html = tmpl.replace('%', titles.join('</li><li>'));
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(html);
}

function hadError(err, res) {
	console.error(err);
	res.end('Server Error');
}