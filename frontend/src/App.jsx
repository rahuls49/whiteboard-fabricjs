import React, { useState, useEffect } from 'react';
// import socket from './utils/socket';
// import { Line } from 'fabric';
import Test from './components/Test';
import Whiteboard from './components/Whiteboard';
// import Toolbar from './components/Toolbar';
// import User from './components/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LinePractice from './components/LinePractice';
import RectanglePractice from './components/RectanglePractice';

function App() {  
  // const [username, setUsername] = useState('');
  // const [users, setUsers] = useState([]);

  

  return (
    <BrowserRouter>
    <Routes>
      <Route
      path="/"
      element={
    <div className="flex h-screen">
        <Whiteboard /> 
    </div>
      }
    />
      <Route path='/test' element={<Test/>}/>
      <Route path='/line' element={<LinePractice/>}/>
      <Route path='/rect' element={<RectanglePractice/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;