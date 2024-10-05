import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import User from './User';
import socket from '../utils/socket';

function Board() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Join the room and get the list of connected users
    socket.emit('join', { username });
    socket.on('users', (users) => {
      setUsers(users);
    });

    // Clean up when the component unmounts
    return () => {
      socket.emit('leave');
    };
  }, [username]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Toolbar />
        <Canvas />
      </div>
      <div className="w-64 flex flex-col">
        <User users={users} />
      </div>
    </div>
  );
}

export default Board;