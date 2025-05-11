const https = require("https");

cont dotenv = require("dotenv");
dotenv.config()

cont PORT = process.env.PORT;

const server = https.createServer((req, res) => {
    res.writeHead(200, {'content-type': "text/html;charset-utf-8"})
    res.write("Webacademy")
    res.write("Icomp")
    res.end()


});

server.listen(PORT, () => {
    console.log()
})