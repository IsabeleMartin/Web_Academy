const http = require('http');
const querystring = require('querystring');
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <form method="POST" action="/">
            <input type="text" name="message" placeholder="Digite algo..." />
            <button type="submit">Enviar</button>
          </form>
        </body>
      </html>
    `);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const message = querystring.parse(body).message;
      const http = require('http');

      const options = {
        hostname: 'back',
        port: 4000,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const backendReq = http.request(options);
      backendReq.write(JSON.stringify({ message }));
      backendReq.end();

      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Front-end server rodando em http://${hostname}:${port}/`);
});
