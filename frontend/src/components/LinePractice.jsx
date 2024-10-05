import React, { useEffect, useState } from 'react'
import * as fabric from 'fabric';
// import { Canvas } from 'fabric';

const LinePractice = () => {
  const [canvas, setCanvas] = useState();
  // const [drawing, setDrawing] = useState(false);
  let drawing = false;
  const [line, setLine] = useState();

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas('my-canvas', {
      // height: 800,
      // width: 800,
      // preserveObjectStacking: true,
      backgroundColor: 'white',
    });
    fabricCanvas.setWidth(window.innerWidth);
    fabricCanvas.setHeight(window.innerHeight);
    const rect = new fabric.Rect({
      height:200,
      width:200,
      fill: 'blue',
      left: 100,
      top: 100,
      // selectable: false,
    })

    const circle = new fabric.Circle({
      radius: 50,
      fill: 'green',
      left: 300,
      top: 100,
      // selectable: false,
    })
    setCanvas(fabricCanvas);
    fabricCanvas.add(rect);
    fabricCanvas.add(circle);

    // fabricCanvas.bringObjectToFront(rect)
    // const line = new fabric.Line([20, 20, 100, 100], 
    //   { stroke: 'black', strokeWidth: 2 });
    // canvas.add(line);
    return () => fabricCanvas.dispose() // Clean up on unmount to prevent memory leaks
  }, []);
  let new_line;
  const startAddingLine = (o) => {
    // setDrawing(true);
    drawing = true;
    const pointer = canvas.getPointer(o.e);
    // console.log(pointer.x, pointer.y);
    new_line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      stroke:'red',
      strokeWidth: 3,
      // selectable:false
    }) // x1, y1, x2, y2
    canvas.add(new_line);
    setLine(new_line);
    // console.log("this is done", canvas)
    canvas.requestRenderAll();
  }

  const startDrawingLine = (o) => {
    if (drawing){
    const pointer = canvas.getPointer(o.e);
    // console.log(pointer.x, pointer.y);
    new_line.set({ x2: pointer.x, y2: pointer.y });
    // line.set({ x2: pointer.x, y2: pointer.y });
    canvas.requestRenderAll();
    }
  }
  const stopDrawingLine = () => {
    console.log(new_line)
    new_line.setCoords();
    drawing = false;
    canvas.selection = true;
    // setDrawing(false);
    canvas.off('mouse:down', startAddingLine);
    canvas.off('mouse:move', startDrawingLine);
    canvas.off('mouse:up', stopDrawingLine);
    // line.set({ x2: line.get('x1'), y2: line.get('y1') });
    // canvas.requestRenderAll();
  }
  const handleAddLine = () => {
    canvas.selection=false;
    // canvas.hoverCursor = 'auto';
    canvas.on('mouse:down', startAddingLine);
    canvas.on('mouse:move', startDrawingLine);
    canvas.on('mouse:up', stopDrawingLine);
  }

  
  return (
    <div className='bg-black h-screen w-screen'>
      <div className='w-full bg-green-700 flex items-center'>
        <h1 className='text-white text-center p-4'>Line Practice</h1>
        <button className='bg-green-200 p-2' onClick={handleAddLine}>add line</button>
      </div>
      <canvas id='my-canvas'></canvas>
    </div>
  )
}

export default LinePractice
