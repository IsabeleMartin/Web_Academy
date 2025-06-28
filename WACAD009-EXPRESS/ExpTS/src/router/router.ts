import { Router } from "express";
import express, { Request, Response } from "express";
import middleFunction from '../middleware/regiterLogs';
import loremmiddleware from '../middleware/generateLorem';
const router = Router();
const publicPath = `${process.cwd()}/public`; 

// Teste de possibilidades de get
router.get("/post", (req, res) => {
    res.send("Hello World atual!");
});
router.get("/sobre",(req,res) => {
    res.send("Bem-vindo à página sobre!")
});

// Serve arquivos estáticos de CSS, JS e imagens
router.use('/css', express.static(`${publicPath}/css`));
router.use('/js', express.static(`${publicPath}/js`));
router.use('/img', express.static(`${publicPath}/img`));


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

router.use(middleFunction);

// Rota POST para criação de usuário
router.post("/usuarios", (req: Request, res: Response) => {
    res.send("usuário criado");
    console.log("Requisição POST no /");
});


// Rotas para o exercício 7 de express
router.get('/hb1', (req, res) => {
    res.render('hb1',{
        mensagem: 'Olá, você está aprendendo Express + HBS!',
        layout: false,
    });
});

router.get('/hb2', (req, res) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
});

router.get('/hb3', (req, res) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb3', { profes, layout: false });
});

router.get('/hb4', function (req, res) {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb4', { profes, layout: false });
});


// Rota para a página hb5 do exercício 8
router.get('/hb5', function (req, res){
    const teches = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('hb5', { teches, layout: false });
});

export default router;