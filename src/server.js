const { socketServer, serverEvents } = require('./app');
const http = require('http').createServer();

serverEvents(socketServer(http));

http.listen(3000, () => console.log('Servidor rodando em 3000'));
