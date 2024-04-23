const http = require('http'),
    server = http.createServer((req, res)=>{
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('Hola Mundo');
    });
server.listen(3000, res=>{
    console.log("Server ejecutandose en puerto 3000");
});