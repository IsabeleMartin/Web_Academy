// ########## Criando um servidor web básico com Node.js ##########

// Embarcando o módulo 'http', que permite criar servidores web
const http = require('http');

// Cria um servidor HTTP que responde a requisições com uma mensagem simples
const server = http.createServer(function (req, res) {
    // Define o cabeçalho da resposta com status 200 (OK)
    // e informa ao navegador que o conteúdo é HTML codificado em UTF-8
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    // Envia uma resposta simples ao navegador
    res.write("Icomp Faculdade");

    // Finaliza a resposta
    res.end();
});

// Faz o servidor escutar na porta 8888
// Acesse pelo navegador: http://localhost:8888
server.listen(8888, () => {
    console.log("Servidor rodando em http://localhost:8888");
});
