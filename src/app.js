const socketServer = (server) => require('socket.io')(server);

let connections = [];

const serverEvents = (io) => io
  .on('connection', (socket) => {
    const { handshake: { query: { id } } } = socket;
    connections = connections.filter(el => el !== id);
    connections.push(id);
    console.log({ connections });
    socket.emit('message', `${id} está conectado`);

    socket.on('disconnect', () => {
      connections = connections.filter(el => el !== id);
      console.log({ connections });
    });

    socket.on('confirm', console.log);
  });

module.exports = { socketServer, serverEvents }
