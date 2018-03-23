// essa linha pode ser removida, pois as rotas foram carregadas
// var connectionFactory = require('../infra/connectionFactory');

module.exports = function (app) {
	app.get('/produtos', function (req, res, next) {
		// a variável fica disponível pelo caminho das pastas
		var connection = app.infra.connectionFactory();
		// carrega o módulo que trás a query de produtos no banco
		// esse new faz com que o JS crie um novo escopo para o produtosBanco
		// senão ele vai utilizar o contexto inteiro do express dentro da função
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		//no nodejs, o retorno de dados é feito assincrono e através de
		//uma funçao
		produtosDAO.lista(function (erros, resultados) {
			// res.render("produtos/lista", {lista:resultados});
			
			if(erros){
				return next(erros);
			}			

			res.format({
				html: function() {
					res.render("produtos/lista", {lista:resultados});
				},
				json: function () {
					res.json(resultados); 
				}
			});
		});
		connection.end();
	});
	
	app.get('/produtos/form', function(req, res) {
		res.render("produtos/form", {errosValidacao:{}, produto:{}});
	});


	app.post('/produtos', function(req, res) {
		//esses dados vem do body da requisição
		//sudo npm install body-parser --save
		//instalar o componente de faz o parse dos dados no doby 
		var produto = req.body;

		//faz a validação do campo titulo	
		req.assert('titulo', 'Titulo é obrigatório').notEmpty();
		req.assert('preco', 'Formato do preço é inválido').isFloat();
		
		var erros = req.validationErrors();
		if(erros){
			res.format({
				html: function() {
					res.status(400).render('produtos/form', {errosValidacao: erros, produto: produto});
				},
				json: function () {
					res.status(400).json(erros); 
				}
			});	
			return;
		}

		// console.log(produto);
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.salva(produto, function(erros, resultados) {
			// console.log(erros);
			res.redirect('/produtos');
		});
	});


}











