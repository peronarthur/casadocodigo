function ProdutosDAO(connection) {
	//recebe o argumento e guarda na classe
	this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback) {
	// esse callback é a função que vai ser rodada após voltar
	this._connection.query('select * from produtos',callback);
}

ProdutosDAO.prototype.salva = function(produto, callback) {
	// faz a inserção do objeto, passando ele inteiro para a tabela
	// e como está em JSON, ele consegue reconhecer a propriedade e o valor
	this._connection.query('insert into produtos set ?',produto,callback)
	// pode ser feito dessa forma
	// {
	// 	titulo : '',
	// 	preco : '',
	// 	descricao : ''
	// }
}

module.exports = function() {
	return ProdutosDAO;
}

// desse jeito é muito mais trabalhoso pra se fazer
// do jeito à cima, basta criar um protótipo para a classe e pronto
// faz a mesma coisa que o abaixo

// module.exports = function() {
// 	//esse método externo foi criado para que quando o express carregue o 
// 	// módulo, ele não dispare a função abaixo e dê erro
// 	return function(connection) {
// 		//esse método fica acessível se fizer produtosBanco.lista()
// 		this.lista = function (callback) {
// 			// esse callback é a função que vai ser rodada após voltar
// 			connection.query('select * from produtos',callback);
// 		}
// 		return this;
// 	}
// }