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

      let auctionId = null;
      socket.on('join-auction', (id) => {
        console.log('socket-auction', id);
        auctionId = id;
        socket.join( id );
        
        
        const numPeopleInAuction = io.sockets.adapter.rooms.get(auctionId).size; 
        console.log(`THERE ARE ${numPeopleInAuction} persons in this ROOM`);
        socket.to(auctionId).emit('viewersAmount', numPeopleInAuction);
      });


  
      socket.on('newOffer', ({ id, price }) => {
        console.log('newOffer', id, price);
        socket.to(auctionId).emit('newOffer', { id, price });
      });

    });
    
    io.on('disconnect', (socket) => {
        socket.emit('viewersAmount', io.engine.clientsCount);
    });

    return io;
};

const emitToAll = (event, itemId, data) => {
  connectedSockets.forEach(socket => {
      socket.to(itemId).emit(event, data);
  });
};

module.exports = { initSocket, socketIo, io, emitToAll };