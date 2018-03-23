//instalar o express (facilita a criação do lado servidor)
//sudo npm install express --save


//instalar o ejs (facilita a criação de páginas html + javascript + css)
//sudo npm install ejs --save

//instalar o nodemon ( ele restarta o servido do node, toda vez que há alguma alteração no código... sem ter que parar e subir na mão toda hora)
//sudo npm install -g nodemon

//instalar o mysql
//sudo npm install mysql --save

//instalar o express-load
//ele carrega 
//sudo npm install express-load --save

// instala a biblioteca de teste
// sudo npm install mocha --save-dev;
// essa biblioteca busca uma pasta test na raiz 
// node_modules/mocha/bin/mocha

// sudo npm install supertest --save-dev
// biblioteca que facilita a escrita de testes

// para rodar como no servidor
// npm start

// pra publicar:
// 1 - tem que fazer o commit no git
// git commit -am "mudando configuracao node"
// 2 - tem que fazer o push para o heroku
// git push heroku master

//importando o arquivo express que está na pasta config
var app = require('./config/express')();
// essa linha não é mais necessária, pois quando o express for chamado
// vai carregar (#1) e isso fará o import do require abaixo 
// var rotasProdutos = require('./app/routes/produtos')(app);

//o socket.io espera que seja passado uma variável que consiga gerenciar as 
//conexões, mas que não seja do tipo express, e  que no caso é o http
var http = require('http').Server(app); 
var io = require('socket.io')(http);

app.set('io', io);

// seta a porta da aplicação para a de ambiente ou a 3000
var porta = process.env.PORT || 8000;

//inicializa o servidor para ouvir a porta porta
http.listen(porta, function () {
	console.log('Servidor está rodando')
})
