//Arquivo com as rotas de usuário.
const { Router } = require("express");//Obtenção do objeto Router.
const multer = require("multer");//Biblioteca para uploads de arquivos.
const uploadConfig = require("../config/upload");//Configurações de upload.

const usersRouter = Router();//Inicialização do objeto Router.
const upload = multer(uploadConfig.MULTER);

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersController = new UsersController();//Instaciação da classe UsersController.
const userAvatarController = new UserAvatarController();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);//upload.single() faz o upload de um único arquivo.

module.exports = usersRouter;//Exportação para que seja possível que outros modulos da api acessem as rotas de usuário.
