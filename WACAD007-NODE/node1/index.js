
const fs = require('fs');
const http = require('http');

let dir_name =process.argv[2]; // ./diretorio_test

const server = http.createServer(function(req,res){
    
    fs.readdir(dir_name,'utf8',function(err,arqsFromDir){
        if(err) throw err;
        res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
        arqsFromDir.forEach(arq=>{
            res.write(`<p>${arq}</p>`);
        })
        res.end();
    })
});

server.listen(7777);
