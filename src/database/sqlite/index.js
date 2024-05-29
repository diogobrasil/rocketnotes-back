const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

//Função que conecta a api com o banco de dados e cria o arquivo do banco caso ele não tenha sido criado.
async function sqliteConnection () {
  const database = await sqlite.open(
    {
      filename : path.resolve(__dirname, "..", "database.db"),//Crição do arquivo na pasta do banco de dados (database).
      driver : sqlite3.Database
    }
  );

  return database;

};

module.exports = sqliteConnection;
