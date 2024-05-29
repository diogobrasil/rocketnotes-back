//Arquivo onde vão estar disponíveis as rotas da api.
const { Router } = require("express");

const usersRouter = require("./users.routes");

const routes = Router();

routes.use("/users", usersRouter);

module.exports = routes;
