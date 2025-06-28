import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import mainRouter from './router/router';

const app = express();

// Configuração do motor de templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Usando o roteador principal
app.use(mainRouter);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
