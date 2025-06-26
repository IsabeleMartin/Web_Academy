import express from 'express';
import validateEnv from './utils/validateEnv';
import router from './router/router';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars'

dotenv.config();
validateEnv();

const PORT = process.env.PORT || 3333;
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(router);



app.listen(PORT, () => {
  console.log(`Express app rodando na porta ${PORT}`);
});
