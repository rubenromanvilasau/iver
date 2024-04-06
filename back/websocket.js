const { Server } = require("socket.io");

let socketIo = null;
let io;
const initSocket = ( server ) => {
    io = new Server( server, {
        cors: {
          origin: "http://localhost" + ( process.env.NODE_ENV === 'production' ? '' : ':5173' ),
          methods: ["GET", "POST"]
        }
      } );

    io.on('connection', (socket) => {
      socketIo = socket;

      let auctionId = null;
      socket.on('join-auction', async(id) => {
        console.log('user connected to room:', id);
        auctionId = id;
        socket.join( auctionId );
        
        
        const numPeopleInAuction = io.sockets.adapter.rooms.get(auctionId).size;
        console.log('io.sockets.adapter.rooms',await io.in(auctionId).allSockets()) 
        // console.log(`THERE ARE ${numPeopleInAuction} persons in this ROOM`);
        io.to(auctionId).emit('viewersAmount', numPeopleInAuction);
      });

      socket.on('newOffer', ({ id, price }) => {
        console.log('newOffer', id, price);
        io.to(auctionId).emit('newOffer', { id, price });
      });

      socket.on('disconnect', async(socket) => {
        console.log('-----user disconnected-----')
        const numPeopleInAuction = io.sockets.adapter.rooms.get(auctionId) 
                                    ? io.sockets.adapter.rooms.get(auctionId).size
                                    : 0;
        console.log('io.sockets.adapter.rooms',await io.in(auctionId).allSockets()) 
        console.log('NEW ROOM SIZE', numPeopleInAuction);
        console.log('-----user disconnected-----')
        io.to(auctionId).emit('viewersAmount', numPeopleInAuction);
      });

    });
    
    return io;
};

const emitToAll = (event, itemId, data) => {
  io.to(itemId).emit(event, data);
};

module.exports = { initSocket, socketIo, io, emitToAll };