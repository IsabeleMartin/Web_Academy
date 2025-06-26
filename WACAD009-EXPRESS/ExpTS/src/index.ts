import express, { Request, Response} from "express";
import validateEnv from './utils/validateEnv';
import dotenv from "dotenv";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send("Hello World atual!");
});

app.listen(PORT, () =>{
    console.log(`Express app rodando na porta ${PORT}`);
});