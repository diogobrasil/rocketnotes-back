const { hash } = require("bcryptjs");//Método para criptografar senha de usuário.
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

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    response.status(201).json();//Devolve objeto em formato JSON.
  }

  async update( request, response ) {

    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [ id ]);

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso!");
    }

    user.name = name;
    user.email = email;

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = ?`,
      [user.name, user.email, new Date(), id ]);

    return response.json();
  }
}

module.exports = UsersController;
