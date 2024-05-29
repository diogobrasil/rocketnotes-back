//Arquivo com as rotas de usuário.
const { Router } = require("express");//Obtenção do objeto Router.

const usersRouter = Router();//Inicialização do objeto Router.

const UsersController = require("../controllers/UsersController");

const usersController = new UsersController();//Instaciação da classe UsersController.

usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);

module.exports = usersRouter;//Exportação para que seja possível que outros modulos da api acessem as rotas de usuário.
