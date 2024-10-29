import { createServer } from 'node:http';
const server = createServer((req, res) => {
    res.whiteHead(200, { 'content-type':'text/plain'});
    res.end("olá mundo!\n")
});

server.listen(3000, '127.0.0.1', () => {
    console.log('listening iniciado');
});