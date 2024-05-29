class UsersController {

  /**Métodos de um controller:
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */

  create( request, response ) {

    const { name, email, password } = request.body;//Fraguementa o corpo de uma requisição e atribui os valores para os atributos name, email e password do objeto.

    response.json({ name, email, password });//Devolve objeto em formato JSON.
  }
  
}

module.exports = UsersController;
