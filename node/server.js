const { Console } = require('console');

const http = require('http'),
    server = http.createServer((req, res)=>{
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('Hola Mundo');
    });
server.listen(3000, res=>{
    Console.log("Server ejecutandose en puerto 3000");
});