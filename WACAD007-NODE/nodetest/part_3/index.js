const { clear } = require('console');
const http = require('http');

// acessa os argumentos da linha de comando
process.argv.forEach((val, index)=>{
                //índice :  valor
    console.log(`${index}:${val}`);
});

const server = http.createServer(function(req, res){
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
    res.write("Meus primeiros passos em javascript");
    res.end();
});



server.listen(8888);