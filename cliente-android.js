
var http = require('http');

var configuracoes = {
	hostname: 'localhost',
	port: 3000,
	path: '/produtos',
	headers: {
		// assim, essa rota devolve em html
		// 'Accept': 'text/html'
		// assim, essa rota devolve em JSON
		'Accept': 'application/JSON'
	}
}

http.get(configuracoes, function(res) {
	console.log(res.statusCode);
	res.on('data', function (body) {
		console.log('Corpo: ' + body);
	});
});