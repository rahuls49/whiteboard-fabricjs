import io from 'socket.io-client';

const socket = io.connect('/');

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

export const draw = (data) => {
  socket.emit('draw', data);
};

export const update = (data) => {
  socket.emit('update', data);
};

export const remove = (data) => {
  socket.emit('remove', data);
};

export const clear = () => {
  socket.emit('clear');
};

export default socket;