const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {

  /**Métodos de um controller:
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */

  async create( request, response ) {

    const { name, email, password } = request.body;//Fraguementa o corpo de uma requisição e atribui os valores para os atributos name, email e password do objeto.

    const database = await sqliteConnection();
    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if ( checkUsersExists ) {

      throw new AppError("Este e-mail já está em uso!");
      
    }

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

    response.status(201).json({ name, email, password });//Devolve objeto em formato JSON.
  }

}

module.exports = UsersController;
