import express from 'express';
import clienteRouter from './src/routes/compraRoutes'; // Caminho relativo correto

const app = express();

app.use(express.json());
app.use('/clientes', clienteRouter); // Aqui é o ponto com erro se não for uma função

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
