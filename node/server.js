const http = require('http'),
    server = http.createServer((req, res)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('Saludo');
    });
server.listen(3000, res=>{
    console.log("Server ejecutandose en puerto 3000");
});