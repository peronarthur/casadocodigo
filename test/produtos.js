// var http = require('http'); 
// var assert = require('assert');

// carrega o express que está na pasta de configuração
// pois ele já sabe como subir o servidor e gerenciar
// e a gente não precisa se preocupar com isso

// NODE_ENV=test node_modules/mocha/bin/mocha
var express = require('../config/express')();
var request = require('supertest')(express);

describe('ProdutosController', function() {

	beforeEach(function(done){
		var conn = express.infra.connectionFactory();
		conn.query('delete from produtos', function(ex, result){
			if(!ex){
				done();
			}
		});
	});

	it('#listagem json', function(done){

		// essas configurações estão encapsuladas dentro do supertest 
		// var configuracoes = {
		// hostname: 'localhost',
		// port: 3000,
		// path: '/produtos',
		// headers: {
		// 	'Accept': 'application/json'
		// 	}
		// };

		// request.get(configuracoes, function(res) {
		// 	assert.equal(res.statusCode, 200);
		// 	assert.equal(res.headers['content-type'],'application/json; charset=utf-8');

		// 	funcaoFinalizacao();
		// });

		// com o superteste, muitas coisas estão prontas
		// e como o express foi importado, só basta passar a rota (/produtos)
		request.get('/produtos')
		.set('Accept' ,'application/json')
		.expect('content-type', /json/)
		.expect(200, done);


	});

	it('#cadastro de produto novo com dados invalidos', function(done){
		request.post('/produtos')
		.send({ titulo: '', descricao: 'novo livro'})
		.expect(400, done);
	});

	it('#cadastro de produto novo com dados  validos', function(done){
		request.post('/produtos')
		.send({ titulo: 'titulo', descricao: 'novo livro', preco: 20.0})
		.expect(302, done);
	});
});








