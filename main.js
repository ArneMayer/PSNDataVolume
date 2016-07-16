var http = require('http');

var port = 8080;

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	var userIp = request.headers['x-forwarded-for'] || 
				 request.connection.remoteAddress || 
				 request.socket.remoteAddress ||
				 request.connection.socket.remoteAddress;
	
	response.write('user ip: ' + userIp);
	response.end('Hello World\n');
}).listen(port);

console.log('Server running on port ' + port);