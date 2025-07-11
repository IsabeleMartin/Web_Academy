import { capturarExcecoes } from "@/infraestrutura/middlewares/capturarExcecoes";
import { capturarErro404 } from "@/infraestrutura/middlewares/capturarErro404";
import { imprimirLogRequisicoes } from "@/infraestrutura/middlewares/imprimirLogRequisicoes";
import { rotas } from "@/infraestrutura/rotas";

import cors from "cors";
import express from "express";

const app = express();

// Configurando o middleware de formatação
// de entradas JSON, no formato 'application/json'...
app.use(express.json());

// Configurando o middleware de liberação 
// de cabeçalho Cross Origin Resource 
// Sharing (CORS) da aplicação...
app.use(cors());

// Configurando o middleware customizado de
// log das requisições da aplicação...
app.use(imprimirLogRequisicoes);

// Configuração das rotas da aplicação. Todas as
// rotas responderão a partir de '/api'...
app.use("/api", rotas);

// Configuração de middlewares customizados
// de captura de erros da aplicação...
app.use(capturarExcecoes);
app.use(capturarErro404);

export { app };
