//seta a engine que vai renderizar as paginas, no formato ejs

// sudo npm install express-validator 
// adiciona o validator de dados no express
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//esse módulo é rodado quando é chamado por um require
module.exports = function () {
	var app = express();

	app.use(express.static('./app/public')); 

	app.set('view engine','ejs');
	//como movemos a pasta de views para dentro da pasta app, é necessário
	//informar onde que essa pasta está localizada
	app.set('views','./app/views')

	// faz com que o bodyparser seja utilizado pelo express
	app.use(bodyParser.urlencoded({extended:true}));
	// bodyparser começa a reconhecer JSON também 
	app.use(bodyParser.json());
	// declara que o expressa validator vai ser utilizado 
	app.use(expressValidator());

	//carrega pra dentro do app, tudo que está dentro das rotas
	// (#1)carregará essa linha \/
	// carregar as rotas, a partir da pasta app
	load('routes', {cwd: 'app'})
		.then('infra')
	.into(app);

	// validação de erro deve ser a ultima coisa a ser utilizada 
	app.use(function(req, res, next){
		res.status(404).render('erros/404');
		next();
	});

	//para simular o ambiente de produção, rodar assim:
	// NODE_ENV=production nodemon app.js
	app.use(function(error,req, res, next){
		if(process.env.NODE_ENV == 'production'){
			res.status(500).render('erros/500');
			return;
		}
		next(error);
	});
	return app;
}