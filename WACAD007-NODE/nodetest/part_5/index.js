const http = require('http');

const server = http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
    res.write("<p>Treinando criar uma pagina com node<p/>");
    res.write("<p> Executado com a propriedade script do package.json");
    res.end();
});

server.listen(8888);