import express from 'express';
import validateEnv from './utils/validateEnv';
import router from './router/router';
import dotenv from 'dotenv';

dotenv.config();
validateEnv();

const PORT = process.env.PORT || 3333;
const app = express();

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app rodando na porta ${PORT}`);
});
