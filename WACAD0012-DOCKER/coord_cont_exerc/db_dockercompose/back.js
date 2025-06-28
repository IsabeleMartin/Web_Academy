const http = require('http');
const hostname = '0.0.0.0';
const port = 4000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { message } = JSON.parse(body);
      console.log('Mensagem recebida:', message);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Mensagem recebida com sucesso');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Back-end server rodando em http://${hostname}:${port}/`);
});
