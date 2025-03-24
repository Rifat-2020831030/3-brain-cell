const socketIo = require('socket.io');
let io;

module.exports = {
  init: (server, corsOptions) => {
    io = socketIo(server, { cors: corsOptions });
    io.on('connection', (socket) => {
      console.log('A user connected: ', socket.id);
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};
