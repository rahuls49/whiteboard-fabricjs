const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('join', ({ username }) => {
      const user = { id: socket.id, username };
      io.emit('users', [user]);
    });

    socket.on('draw', (data) => {
      socket.broadcast.emit('draw', data);
    });

    socket.on('update', (data) => {
      socket.broadcast.emit('update', data);
    });

    socket.on('remove', (data) => {
      socket.broadcast.emit('remove', data);
    });

    socket.on('clear', () => {
      socket.broadcast.emit('clear');
    });

    socket.on('leave', () => {
      console.log('User disconnected');
    });
  });
};