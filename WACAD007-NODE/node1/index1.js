const http = require("http")
const fs = require("fs")



const server = http.createServer(function(req,res){
    fs.readdir("WACAD007-NODE",(err,files)=>{
        files.array.forEach(element => {
            if(err) console.log(err);
            else{
                res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
                res.write(element);
                res.end();
            }
        });
    })
});

server.listen(3333);

