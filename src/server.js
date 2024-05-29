const express = require("express");//Obtenção do Express na minha api.

const routes = require("./routes");//Importando as rotas da api.

const app = express();//Instanciação do Express.
app.use(express.json());//Para que minha api devolva a resposta de uma requisição POST em formato JSON.

app.use(routes);//Conexão do server com o routes.

const PORT = 3333;//Porta onde a api vai rodar.
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));//Mensagem para confirmar que a api esta rodando.
