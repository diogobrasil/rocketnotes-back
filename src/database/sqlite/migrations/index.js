const sqliteConnection = require("../../sqlite");

const createUsers = require("./createUsers");

//Função para criar executar queries no banco de dados.
async function migrationsRun () {

  const schemas = [
    createUsers
  ].join('');//Cria os schemas com as tabelas no banco. O join vai juntar essas tabelas em um schema.
  //Conecta com o banco e executa o schema.
  sqliteConnection()
    .then( db => db.exec(schemas))
    .catch( error => console.error(error));

}

module.exports = migrationsRun;
