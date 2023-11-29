const { Server } = require("socket.io");

let socketIo = null;
let io;
let connectedSockets = [];
const initSocket = ( server ) => {
    io = new Server( server, {
        cors: {
          origin: "http://localhost" + ( process.env.NODE_ENV === 'production' ? '' : ':5173' ),
          methods: ["GET", "POST"]
        }
      } );

    io.on('connection', (socket) => {
      connectedSockets.push(socket); 
      socketIo = socket;
      console.log('socket', socketIo.id);
      socket.emit('viewersAmount', io.engine.clientsCount);
  
      socket.on('newOffer', ({ id, price }) => {
        console.log('newOffer', id, price);
        socket.emit('newOffer', { id, price });
      });
    });
    
    io.on('disconnect', (socket) => {
        socket.emit('viewersAmount', io.engine.clientsCount);
    });

    return io;
};

const emitToAll = (event, data) => {
  connectedSockets.forEach(socket => {
      socket.emit(event, data);
  });
};

module.exports = { initSocket, socketIo, io, emitToAll };