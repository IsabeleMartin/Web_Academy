import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
  info: {
    title: 'API da Loja Virtual',
    description: 'Documentação da API para autenticação e produtos',
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  tags: [
    { name: 'Product', description: 'Rotas relacionadas aos produtos' },
    { name: 'Language', description: 'Rotas relacionadas aos idiomas' },
    { name: 'Usuario', description: 'Rotas relacionadas aos usuários' },
    { name: 'Carrinho', description: 'Rotas relacionadas ao carrinho de compras' },
    { name: 'Auth', description: 'Rotas relacionadas à autenticação' },
  ],
};

const outputFile = './swagger-output.json';
const routes = ['../router/v1Router.ts'];  // Caminho correto para o arquivo de rotas

swaggerAutogen()(outputFile, routes, doc);
