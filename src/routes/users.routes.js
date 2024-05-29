//Arquivo com as rotas de usuário.
const { Router } = require("express");//Obtenção do objeto Router.

const usersRouter = Router();//Inicialização do objeto Router.

usersRouter.post("/", (request, response) => {
  
  const { name, email, password } = request.body;//Fraguementa o corpo de uma requisição e atribui os valores para os atributos name, email e password do objeto.

  response.json({ name, email, password });//Devolve objeto em formato JSON.
});

module.exports = usersRouter;//Exportação para que seja possível que outros modulos da api acessem as rotas de usuário.
