import { Router } from "express";
import express, { Request, Response } from "express";
import middleFunction from '../middleware/regiterLogs';
import loremmiddleware from '../middleware/generateLorem';
const router = Router();
const publicPath = `${process.cwd()}/public`; // Correção no template string

// Teste de possibilidades de get
router.get("/post", (req, res) => {
    res.send("Hello World atual!");
});
router.get("/sobre",(req,res) => {
    res.send("Bem-vindo à página sobre!")
});
router.get( /^\/(api|rest)\/.+$/, (req, res) => {
    res.send("Envio de dados da API!");
});
router.get("/bemvindo/:nome", (req, res) => {
    res.send(`Seja bem vindo ${req.params.nome}`);
});

// router para o exercício 5 de Express
router.get('/lorem/:num', (req,res) =>{
    const num = Number(req.params.num);
    const text = loremmiddleware(num); 
    res.send(text);
})

// Serve arquivos estáticos de CSS, JS e imagens
router.use('/css', express.static(`${publicPath}/css`));
router.use('/js', express.static(`${publicPath}/js`));
router.use('/img', express.static(`${publicPath}/img`));

router.use(middleFunction);

// Rota POST para criação de usuário
router.post("/usuarios", (req: Request, res: Response) => {
    res.send("usuário criado");
    console.log("Requisição POST no /");
});



export default router;