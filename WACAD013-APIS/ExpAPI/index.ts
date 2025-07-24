import express from 'express';
import router from './router/v1Router';
import cookieParser from 'cookie-parser';
import setLangCookies from './middlewares/setLangCookies';
import session from 'express-session';
import { CompraListDto } from './resources/compra/compra.types';
import { v4 as uuidv4 } from 'uuid';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./src/swagger-output.json";

declare module "express-session" {
  interface SessionData {
    uid: string;
    tipoUsuario: string
    carrinho: CompraListDto[] 
  }
}


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(setLangCookies);
app.use(session({
  genid: (req) => uuidv4(),
  secret: 'Hi9cf#mK98',
  resave: true,
  saveUninitialized: true
}));
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Usa o roteador principal
app.use('/v1', router); // todas as rotas serão prefixadas com /api

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
