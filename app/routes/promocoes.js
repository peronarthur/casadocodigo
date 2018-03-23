module.exports = function (app ) {
	app.get("/promocoes/form", function (req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista(function (erros, resultados) {
			res.render('promocoes/form', {lista:resultados}); 
		});
		connection.end();
	});

	app.post("/promocoes", function (req, res) {
		var promocao = req .body;
		//essa variável está no app.js
		//e é o objeto do socket.io server 
		app.get('io').emit('novaPromocao', promocao);
		res.redirect('/promocoes/form');
	});
}

 