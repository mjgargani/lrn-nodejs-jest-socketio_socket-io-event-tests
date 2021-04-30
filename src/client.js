const newId = Date.now();

const io = require('socket.io-client');

const socketClient = (id) => io.connect("http://localhost:3000", { query: `id=${id}` });

const clientEvents = (io, id) => {
  const socket = io(id);
  socket.on('message', (message) => {
    console.log(message);
    socket.emit('confirm', `${id} confirmado`);
  });
};

clientEvents(socketClient, newId);

module.exports = { socketClient, clientEvents };
