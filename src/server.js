require("express-async-errors");

const AppError = require("./utils/AppError");

const express = require("express");//Obtenção do Express na minha api.

const routes = require("./routes");//Importando as rotas da api.

const app = express();//Instanciação do Express.

app.use(express.json());//Para que minha api devolva a resposta de uma requisição POST em formato JSON.

app.use(routes);//Conexão do server com o routes.

app.use(( error, request, response, next ) => {

  if ( error instanceof AppError ) {
    return response.status(error.statusCode).json(
      {
        status : "error",
        message : error.message
      }
    );
  }

  console.error(error);

  return response.status(500).json(
    {
      status : "error",
      message : "Internal server error."
    }
  )

});

const PORT = 3333;//Porta onde a api vai rodar.
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));//Mensagem para confirmar que a api esta rodando.
