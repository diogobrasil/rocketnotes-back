const { hash, compare } = require("bcryptjs");//Método para criptografar senha de usuário.
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

    const { name, email, password, old_password } = request.body;
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

    user.name = name ?? user.name;//O valor só será atualizado se o valor que estiver sendo passado não for vazio.
    user.email = email ?? user.email;

    if ( password && !old_password ) {

      throw new AppError("Você precisa informar a senha antiga para definir a nova senha");

    }

    if ( password && old_password ) {

      const checkOldPassword = await compare(old_password, user.password);

      if ( !checkOldPassword ) {

        throw new AppError("A senha antiga não confere.");

      }

      user.password = await hash(password, 8);

    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id ]);

    return response.json();
  }
}

module.exports = UsersController;
