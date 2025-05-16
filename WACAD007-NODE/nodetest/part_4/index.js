const http = require('http');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT;



const server = http.createServer(function(req, res) {
    
    fs.readFile(".env","utf8",function(err,arqFromDotenv){
        if(err)throw err;
        res.writeHead(200,{'content-type':'text/http;charset=utf-8'});
        res.write("Trabalhando com dotenv");
        res.write(`${arqFromDotenv}`);
        res.end();
    });
});

server.listen(PORT);