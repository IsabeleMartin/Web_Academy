const http = require('http');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT ?? 8888;

const server = http.createServer(function(req,res){

    fs.readFile('.env','utf8',function(err,arqEnv){
        if(err) throw err;
        res.writeHead(200,{"content-type":"text/http;charset=utf-8"});
        res.write(`${arqEnv}`);
        res.end();
    });
});

server.listen(PORT);