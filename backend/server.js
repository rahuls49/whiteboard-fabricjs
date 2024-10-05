const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Ensure this matches your frontend URL
  credentials: true,
}));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173', // Ensure this matches your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw:shape', { data, socketId: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
