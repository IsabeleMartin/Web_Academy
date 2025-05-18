const fs = require('fs');
const http = require('http');
const dotenv = require('dotenv');
const file2Link = require('./util');

dotenv.config({path: `.env.${process.env.NODE_ENV}`});

const PORT = process.env.PORT;

let dir_name =process.argv[2]; // ./diretorio_test

const server = http.createServer(function(req,res){
    fs.readdir(dir_name,'utf8',function(err,arqsFromDir){

        res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
        
        if(err){
            throw new Error("erro ao ler diretório");
            res.write("Erro na leitura de diretório");
        } 
            

        res.write("arquivos de um diretório");
        res.write("<p> atualizando com nodemon</p>");
        res.write("<p> rodando o ambiente de desenvolvimento </p>");


        arqsFromDir.forEach(arq=>{
            res.write(file2Link.createLink(arq));
        });


        res.end(); // se não houver o end o navegador fica esperando mais coisa.
    });
});

fs.readFile('.env.development','utf8',function(err,arqEnv){
    if(err) throw new Error("<p>erro ao ler arquivo .env</p>");
    console.log(arqEnv);   
});

server.listen(PORT);
