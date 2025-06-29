import express from 'express';
import dotenv from 'dotenv'
import { engine } from 'express-handlebars';
import mainRouter from './router/router';
import path from 'path'


dotenv.config();

const app = express();

// Configuração do motor de templates

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.engine("handlebars", engine({
  helpers: require(`${__dirname}/views/helpers/helpers.ts`),
}));

app.engine('handlebars', engine({
  layoutsDir: `${__dirname}/views/layouts`,
  defaultLayout: 'main',
}))


app.use('/css', [
express.static(`${__dirname}../public/css`)
]);


app.use(express.urlencoded({ extended: false}))

// Usando o roteador principal
app.use(mainRouter);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
