const config = require("../../../knexfile");
const knex = require("knex");

const connection = knex(config.development);//Fornecendo o kenexfile com as configurações necessárias para realizar a conexão da biblioteca Knex com a base de dados.

module.exports = connection;
