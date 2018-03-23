
var http = require('http');

var configuracoes = {
	hostname: 'localhost',
	port: 3000,
	method: 'post',
	path: '/produtos',
	headers: {
		// assim, essa rota devolve em html
		// 'Accept': 'text/html'
		// assim, essa rota devolve em JSON
		'Accept': 'application/JSON',
		// informa que eu vou mandar os dados em json
		'Content-type': 'application/JSON'
	}
}

var client =  http.request(configuracoes, function(res) {
	console.log(res.statusCode);
	res.on('data', function (body) {
		console.log('Corpo: ' + body);
	});
});

var produto = {
	titulo: '',
	descricao: 'descricao vindo do terminal',
	preco: 100 
}

client.end(JSON.stringify(produto));
// console.log(JSON.stringify(produto));