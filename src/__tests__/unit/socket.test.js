const { 
  socketServer,
  serverEvents
} = require('../../app');

const { socketClient, clientEvents } = require('../../client');

const httpServer = require('http');

let http;
let server;
let client;

beforeEach((done)=>{
  http = httpServer.createServer().listen(3000);
  done();
})

afterEach(async (done) => {
  http && http.close && http.close();
  server && server.close && server.close();
  client && client.close && client.close();
  done();
});

it('O cliente deve receber a mensagem correta para o após sua conexão', (done) => {
  const newId = Date.now();

  server = socketServer(http);
  serverEvents(server);

  client = socketClient(newId);

  client.on('message', (content) => {
    expect(content).toBeDefined();
    expect(content).toBe(`${newId} está conectado`);
    done();
  });
});

it('O servidor deve receber o id do cliente correto na hora de sua conexão', (done) => {
  const newId = Date.now();

  server = socketServer(http);
  server.on('connection', ({ handshake: { query: { id } } }) => {
    expect(id).toBeDefined();
    expect(id).toBe(String(newId));
    done();
  });

  clientEvents(socketClient, newId);
});
