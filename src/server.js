const { socketServer, serverEvents } = require('./app');
const http = require('http').createServer();

let connections = [];

serverEvents(socketServer(http), connections);

http.listen(3000, () => console.log('Servidor rodando em 3000'));
