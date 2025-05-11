/*console.log("hello");



#########  EXEMPLO DE COMO O CÓDIGO É PERCORRIDO #########
    É preciso prestar atenção na assincronicidade do código na hora de programar


const fs = require("fs");

console.log("A");

fs.rename("./text1.txt", "./text2.txt", (err) =>{
    if(err) console.error(err)
        console.log("arquivo renomeado")
})

console.log("B")*/

/* Cara que fica escutando as requisições e respondendo cada uma delas*/
const http = require('http');
                    /*só recebe uma função(requisição, resposta que vou enviar para o cliente) */
const server = http.createServer(function(req,res){

              /* SÓDIGOS COM SIGNIFICADOS*/
res.writeHead(200,{"content-type":"text/html;charset=utf-8"}); /*Cabeçalho da resposta*/
res.write("Instituto de Computação");
res.end();
});
server.listen(8899);
/* Para acessar na pagina web "localhost:número da porta"*/