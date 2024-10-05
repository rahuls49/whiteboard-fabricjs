import React, { useEffect, useState } from 'react';
import { Canvas, Rect, Triangle, IText, Group, FabricImage } from 'fabric';
// import { fabric } from 'fabric';
import * as fabric from 'fabric'

const Whiteboard = () => {
  const [canvas, setCanvas] = useState(null);
  const [drawingRect, setDrawingRect] = useState(false);
  const [rect, setRect] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [fillColor, setFillColor] = useState('#000000');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [outlineWidth, setOutlineWidth] = useState(0);
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [xposition, setXposition] = useState(10)
  const [yposition, setYposition] = useState(10)
  // var _clipboard;
  const [clipboard, setClipboard] = useState(null);
  const initCanvas = () => {
    const fabricCanvas = new Canvas('canvas', {
      backgroundColor: 'white',
    });

    // Set canvas size to full window size
    fabricCanvas.setWidth(window.innerWidth);
    fabricCanvas.setHeight(window.innerHeight);

    return fabricCanvas;
  };

  const addRect = () => {
    // setDrawingRect(true);
    if(canvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        fill: fillColor,
        stroke: outlineColor,
        strokeWidth: outlineWidth,
      });
      canvas.add(rect);
    }
  };

  const addTriangle = () => {
    if (canvas) {
      const triangle = new Triangle({
        left: 100,
        top: 100,
        width: 200,
        height: 100,
        fill: fillColor,
        stroke: outlineColor,
        strokeWidth: outlineWidth,
      });
      canvas.add(triangle);
    }
  };

  const addText = () => {
    if (canvas) {
      const text = new IText('Hello, World!', {
        left: 100,
        top: 200,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fill: fillColor,
      });
      canvas.add(text);
    }
  };

  const handleResize = () => {
    if (canvas) {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    }
  };

const handleDrawing = () => {
  if (canvas) {
    // console.log(StaticCanvasDOMManager)
    console.log(canvas)
    canvas.isDrawingMode = !canvas.isDrawingMode;
    const drawingModeButton = document.getElementById('drawingModeEl');
    // if (drawingModeButton) {
    //   if (canvas.isDrawingMode) {
    //     drawingModeButton.innerHTML = 'Cancel drawing mode';
    //     document.getElementById('drawingOptionsEl').style.display = '';
    //     canvas.freeDrawingBrush = new fabric.PencilBrush(canvas, {
    //       width: outlineWidth,
    //       color: fillColor,
    //     });
    //   } else {
    //     drawingModeButton.innerHTML = 'Enter drawing mode';
    //     if (document.getElementById('drawingOptionsEl')) {
    //       document.getElementById('drawingOptionsEl').style.display = 'none';
    //     }
    //     canvas.freeDrawingBrush = null;
    //   }
    // }
  }
};

  const handleSelection = (event) => {
    if (event.selected.length > 0) {
      const selection = event.selected[0];
      setSelectedObject(selection);
      setFillColor(selection.fill);
      setXposition(selection.left);
      setYposition(selection.top);
      // if(selectedObject[0].type === 'triangle') {
      //   setXposition(selectedObject[0].left)
      // }
      // console.log(event.selected[0].left)
      // setXposition(event.selected[0].left)
      if(selectedObject.type === 'itext') {
        setFontFamily('Times');
      }
    } else {
      setSelectedObject(null);
      setXposition(0);
    }
  };

  const handleGroup = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      console.log(activeObject)
      // if (activeObject && activeObject.type === 'activeSelection') {
      //   activeObject.toGroup();
      //   canvas.requestRenderAll();
      // }
      const group = new Group(activeObject._objects)
      canvas.add(group);
      canvas.requestRenderAll();
    }
  };

  const handleUngroup = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === 'group') {
        activeObject.toActiveSelection();
        canvas.requestRenderAll();
      }
    }
  };

  function handleCopy() {
  canvas.getActiveObject().clone().then((cloned) => {
    // console.log(cloned);
    // _clipboard = cloned;
    setClipboard(cloned);
  });
  }
async function handlePaste() {
  // clone again, so you can do multiple copies.
  // console.log(_clipboard.clone)
  
  const clonedObj = await clipboard.clone();
  canvas.discardActiveObject();
  clonedObj.set({
    left: clonedObj.left + 10,
    top: clonedObj.top + 10,
    evented: true,
  });
  if (clonedObj.type === 'activeSelection') {
    // active selection needs a reference to the canvas.
    clonedObj.canvas = canvas;
    clonedObj.forEachObject(function(obj) {
      canvas.add(obj);
    });
    // this should solve the unselectability
    clonedObj.setCoords();
  } else {
    canvas.add(clonedObj);
  }
  // clipboard.top += 10;
  // setClipboard(clipboard.top + 10)
  // setClipboard(clipboard.left + 10)
  // clipboard.left += 10;
  canvas.setActiveObject(clonedObj);
  canvas.requestRenderAll();
}
  const getSelectedObjectInfo = () => {
    const activeObject = canvas.getActiveObject();
    console.log(activeObject)
    if (activeObject) {
      const { type, left, top, width, height, fill, text } = activeObject;

      return {
        type,
        left,
        top,
        width,
        height,
        fill,
        text,
      };
    }

    return null;
  };

  const startDrawingRect = (options) => {
    if (drawingRect) {
      const { e } = options;
      const pointer = canvas.getPointer(e);
      const newRect = new Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        fill: fillColor,
        stroke: outlineColor,
        strokeWidth: outlineWidth,
      });
      setRect(newRect);
      canvas.add(newRect);
    }
  };

  const updateDrawingRect = (options) => {
    if (drawingRect && rect) {
      const { e } = options;
      const pointer = canvas.getPointer(e);
      const newWidth = pointer.x - rect.left;
      const newHeight = pointer.y - rect.top;
      rect.set({
        width: newWidth,
        height: newHeight,
      });
      canvas.renderAll();
    }
  };

  const finishDrawingRect = () => {
    if (drawingRect) {
      setDrawingRect(false);
      setRect(null);
    }
  };

  const changeColor = (color) => {
    if (selectedObject) {
      selectedObject.set('fill', color);
      canvas.renderAll();
    }
    setFillColor(color);
  };

  

  const changeOutlineColor = (color) => {
    if (selectedObject) {
      selectedObject.set('stroke', color);
      canvas.renderAll();
    }
    setOutlineColor(color);
  };

  const changeOutlineWidth = (width) => {
    if (selectedObject) {
      selectedObject.set('strokeWidth', width);
      canvas.renderAll();
    }
    setOutlineWidth(width);
  };

  const changeFontSize = (size) => {
    if (selectedObject && selectedObject.type === 'i-text') {
      setFontSize(selectedObject.fontSize);
      selectedObject.set('fontSize', size);
      canvas.renderAll();
    }
    setFontSize(size);
  };

  const changeFontFamily = (font) => {
    if (selectedObject && selectedObject.type === 'i-text') {
      setFontFamily(selectedObject.fontFamily);
      selectedObject.set('fontFamily', font);
      canvas.renderAll();
    }
    setFontFamily(font);
  };

  const handleChangeX = (cord) => {
    if (selectedObject ) {
      // console.log(cord)
      setXposition(selectedObject.left);
      selectedObject.set('left', cord);
      canvas.renderAll();
    }
    setXposition(cord);
  };
  const handleChangeY = (cord) => {
    if (selectedObject ) {
      // console.log(cord)
      setYposition(selectedObject.top);
      selectedObject.set('top', cord);
      canvas.renderAll();
    }
    setYposition(cord);
  };

  const handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === 'c') {
      handleCopy();
    }
  };
  const handleResetAll = () => {
    setSelectedObject(null);
    setXposition(0);
    setYposition(0);
    setFontFamily('Arial');
    setOutlineColor('#ffffff');
    setFillColor('#ffffff')
  };

  useEffect(() => {
    let fabricCanvas;
    if(!canvas){
      fabricCanvas = initCanvas();
      setCanvas(fabricCanvas);
    }
    // if(canvas){
    window.addEventListener('resize', handleResize);
    document.getElementById('drawingModeEl').addEventListener('click', handleDrawing);

    // Add event listeners for object selection
    fabricCanvas.on('selection:created', handleSelection);
    fabricCanvas.on('selection:updated', handleSelection);
    fabricCanvas.on('selection:cleared', handleResetAll)

    // Add event listeners for drawing rectangle
    fabricCanvas.on('mouse:down', (options) => {
      startDrawingRect(options);
    });
    fabricCanvas.on('mouse:move', (options) => {
      updateDrawingRect(options);
    });
    fabricCanvas.on('mouse:up', finishDrawingRect);
    
    window.addEventListener('keydown', handleKeyPress);
    // }
    // Cleanup function to dispose of the canvas and remove event listener
    return () => {
      fabricCanvas.dispose();
      window.removeEventListener('resize', handleResize);
      document.getElementById('drawingModeEl').removeEventListener('click', handleDrawing);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event)
      if (event.ctrlKey && event.key === 'c') {
        handleCopy();
      }
    };

    if (canvas) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (canvas) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    fabric.Image.fromURL('image.jpg', function(oImg) {
      // scale image down, and flip it, before adding it onto canvas
      oImg.scale(0.5).set('flipX', true);
      canvas.add(oImg);
      // canvas.selectedObject(oImg)
      // setSelectedObject(oImg);
      console.log(oImg)
      canvas.requestRenderAll();
    });
  };

  const handleOrderObject = (order) => { 
    // selectedObject.bringObjectToFront();
    console.log(order)
    if(selectedObject) {
      if(order === "bring-to-front")
        canvas.bringObjectToFront(selectedObject);
      if(order === "send-to-back")
        canvas.sendObjectToBack(selectedObject);
      if(order === "bring-to-forward")
        canvas.bringObjectForwardSend(selectedObject);
      if(order === "sent-to-backward")
        canvas.sendObjectBackwards(selectedObject);
    }
  }

  return (
    <div className='bg-gray-200 h-screen w-screen flex flex-col text-sm'>
      <div className='sticky top-0 bg-gray-200 z-10'>
  <button className='bg-black text-white p-2 m-2' onClick={addRect}>Draw Rectangle</button>
  <button className='bg-black text-white p-2 m-2' onClick={addTriangle}>Add Triangle</button>
  <button className='bg-black text-white p-2 m-2' onClick={addText}>Add Text</button>
  <button className='bg-black text-white p-2 m-2' onClick={handleDrawing} id='drawingModeEl'>Draw</button>
  <button className='bg-black text-white p-2 m-2' onClick={handleGroup}>Group</button>
  <button className='bg-black text-white p-2 m-2' onClick={handleUngroup}>Ungroup</button>
  <button className='bg-black text-white p-2 m-2' onClick={getSelectedObjectInfo}>Get Selected Object Info</button>
</div>
      <div className='flex-grow'>
        <canvas id='canvas'></canvas>
      </div>
      <div className='fixed bottom-0 bg-red-300  w-full p-2 flex flex-col items-center'>
        <div className='flex items-center mb-2'>
          <label htmlFor='colorPicker' className='mr-2'>Fill Color:</label>
          <input
            type='color'
            id='colorPicker'
            value={fillColor}
            onChange={(e) => changeColor(e.target.value)}
          />
          <label htmlFor='outlineColorPicker' className='mr-2 ml-4'>Outline Color:</label>
          <input
            type='color'
            id='outlineColorPicker'
            value={outlineColor}
            onChange={(e) => changeOutlineColor(e.target.value)}
          />
          <label htmlFor='outlineWidth' className='mx-2'>Outline Width:</label>
          <input
            type='number'
            id='outlineWidth'
            value={outlineWidth}
            onChange={(e) => changeOutlineWidth(parseInt(e.target.value))}
          />
        </div>
        
        <div className='flex items-center mb-2'>
          <label htmlFor='fontSize' className='mr-2'>Font Size:</label>
          <input
            type='number'
            id='fontSize'
            value={fontSize}
            // className='p-1'
            onChange={(e) => changeFontSize(parseInt(e.target.value))}
          />
          <label htmlFor='fontFamily' className='mr-2 ml-4'>Font Family:</label>
          <select
            id='fontFamily'
            value={fontFamily}
            onChange={(e) => changeFontFamily(e.target.value)}
          >
            <option value='Arial'>Arial</option>
            <option value='Courier New'>Courier New</option>
            <option value='Georgia'>Georgia</option>
            <option value='Times New Roman'>Times New Roman</option>
            <option value='Verdana'>Verdana</option>
            <option value='Calibri'>Calibri</option>
            <option value='Freehand521 BT'>Freehand</option>
          </select>
        </div>
        <div className='flex items-center mb-2'>
          
        </div>
        <div className='flex items-center mb-2'>
          <label htmlFor='xpos' className='mr-2'>X :</label>
          <input
            type='number'
            id='xpos'
            value={xposition}
            onChange={event => handleChangeX(parseInt(event.target.value))}
          />
          <label htmlFor='xpos' className='mx-2'>Y :</label>
          <input
            type='number'
            id='ypos'
            value={yposition}
            onChange={event => handleChangeY(parseInt(event.target.value))}
          />
        </div>
        <div>
          <button onClick={handleCopy} className='p-2 rounded bg-white'>Copy</button>
          <button onClick={handlePaste} className='p-2 rounded bg-white ml-2'>Paste</button>
          <button onClick={() => handleOrderObject('bring-to-front')} className='p-2 rounded bg-white ml-2'>Bring to Front</button>
          <button onClick={() => handleOrderObject('send-to-back')} className='p-2 rounded bg-white ml-2'>Send to Back</button>
          <button onClick={() => handleOrderObject('bring-to-forward')} className='p-2 rounded bg-white ml-2'>Bring to Forward</button>
          <button onClick={() => handleOrderObject('sent-to-backward')} className='p-2 rounded bg-white ml-2'>Send to Backward</button>
        </div>
        <button onClick={handleSubmit}>Img</button>
      </div>
    </div>
  );
};

export default Whiteboard;
