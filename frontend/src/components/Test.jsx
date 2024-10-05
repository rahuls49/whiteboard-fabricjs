import React, { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';

function Test() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current);
    canvas.isDrawingMode = true;  // Enable free drawing mode

    canvas.setHeight(500);
    canvas.setWidth(800);

    // Optional: Customize brush properties
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = 5;

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Free Drawing App</h1>
        <canvas ref={canvasRef} className="border border-gray-300" />
      </div>
    </div>
  );
}

export default Test;
