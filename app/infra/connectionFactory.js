// /usr/local/mysql/bin/mysql -u root -p casadocodigo_nodejs
// acessar o mysql
// select * from produtos;

// rodar os testes utilizando a variavel de testes 
// NODE_ENV=test node_modules/mocha/bin/mocha

// banco clearDB
// CLEARDB_DATABASE_URL => mysql://[username]:[password]@[host]/[database name]?reconnect=true
//mysql://be573c045277af:665ad8ec@us-cdbr-iron-east-05.cleardb.net/heroku_e62467cf7eacde6?reconnect=true

var mysql = require('mysql')
function connectMYSQL() {

	// console.log(NODE_ENV);
	//retorna a conexão do banco 
	if(!process.env.NODE_ENV)
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'senha',
			database : 'casadocodigo_nodejs'
		});

	// criar um banco de testes para não sujar o banco de dev
	if(process.env.NODE_ENV == 'test')
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'senha',
			database : 'casadocodigo_nodejs_test'
		});

	if(process.env.NODE_ENV == 'production')
		var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
		//regex para não precisar passar a url inteira
		//var grupos = urlDeConexao.match('mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true');
		// var grupos = urlDeConexao.match(/mysql:\/\/[1]:[2]@[3]\/[4]\?reconnect=true);
		 
		// return mysql.createConnection({
		// 	host : grupos[3],
		// 	user : grupos[1],
		// 	password : grupos[2],
		// 	database : grupos[4]
		// });

		return mysql.createConnection({
			host : 'us-cdbr-iron-east-05.cleardb.net',
			user : 'be573c045277af',
			password : '665ad8ec',
			database : 'heroku_e62467cf7eacde6'
		});
}

module.exports = function () {
	return connectMYSQL;
}