import express from 'express';
import router from './router/v1Router'; // supondo que seu arquivo de rotas esteja em src/routes/index.ts
import bodyParser from 'body-parser'; // para lidar com JSON

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Usa o roteador principal
app.use('/v1',router); // todas as rotas serão prefixadas com /api

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
