import React, { useState } from 'react';
import { fabric } from 'fabric';
import socket from '../utils/socket';

function Toolbar() {
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  const handleDrawingModeChange = () => {
    setIsDrawingMode((prevIsDrawingMode) => !prevIsDrawingMode);
  };

  const handleBrushColorChange = (event) => {
    setBrushColor(event.target.value);
  };

  const handleBrushSizeChange = (event) => {
    setBrushSize(parseInt(event.target.value, 10));
  };

  const handleClearCanvas = () => {
    socket.emit('clear');
  };

  return (
    <div className="flex items-center p-4">
      <button
        className={`px-2 py-1 mr-2 ${isDrawingMode ? 'bg-gray-300' : ''}`}
        onClick={handleDrawingModeChange}
      >
        Draw
      </button>
      <input
        type="color"
        value={brushColor}
        onChange={handleBrushColorChange}
        className="w-8 h-8 mr-2"
      />
      <input
        type="range"
        min="1"
        max="50"
        value={brushSize}
        onChange={handleBrushSizeChange}
        className="w-32 mr-2"
      />
      <button className="px-2 py-1" onClick={handleClearCanvas}>
        Clear
      </button>
    </div>
  );
}

export default Toolbar;