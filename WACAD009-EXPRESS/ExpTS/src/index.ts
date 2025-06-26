import express, { Request, Response} from "express";
import validateEnv from './utils/validateEnv';
import middleFunction  from './midlleware/regiterLogs';
//import morgan from "morgan";    
import dotenv from "dotenv";

dotenv.config();
validateEnv();

const PORT = process.env.PORT || 3333;
const app = express();

// Usado para interceptar qualquer requisição, de qualquer método ou rota.



app.use(middleFunction);

// Usado quando o cliente quer buscar informações do servidor.
app.get("/post", (req, res) => {
    res.send("Hello World atual!");
});

// Usado quando o cliente quer enviar dados para o servidor.
app.post("/usuarios", (req: Request, res: Response) => {
    res.send("usuário criado");
    console.log("Requisição POST no /");
});


app.listen(PORT, () =>{
    console.log(`Express app rodando na porta ${PORT}`);
});