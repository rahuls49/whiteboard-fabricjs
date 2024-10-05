import React, { useEffect, useState } from 'react'
import * as fabric from 'fabric'
import { io } from 'socket.io-client';

const RectanglePractice = () => {
    const [canvas, setCanvas] = useState();
    let rectangle;
    let drawing;
    const [btnVisible, setBtnVisible] = useState(false);
    const socket = io('http://localhost:5000'); // Use HTTP if your backend isn't using HTTPS

    const handleDrawRectangle = () => {
        canvas.on('mouse:down', captureInitalPoint);
        canvas.on('mouse:move', captureDraggingPoint);
        canvas.on('mouse:up', captureEndingPoint);
    }

    const captureInitalPoint = (o) => {
        drawing = true;
        rectangle = new fabric.Rect({
            left: o.pointer.x,
            top: o.pointer.y,
            fill: 'red',
        });
        canvas.add(rectangle);
        canvas.requestRenderAll();
    }

    const captureDraggingPoint = (o) => {
        if (drawing) {
            rectangle.set({
                width: (o.pointer.x - rectangle.left),
                height: (o.pointer.y - rectangle.top)
            });
            canvas.requestRenderAll();
        }
    }

    const captureEndingPoint = (o) => {
        drawing = false;
        canvas.off('mouse:down', captureInitalPoint);
        canvas.off('mouse:move', captureDraggingPoint);
        canvas.off('mouse:up', captureEndingPoint);
        socket.emit('draw', rectangle); // Convert fabric object to plain object
    }

    useEffect(() => {
        const tempCanvas = new fabric.Canvas('myCanvas', {
            height: 1000,
            width: 1000,
            backgroundColor: 'white',
        });

        const rectangle = new fabric.Rect({
            height: 200,
            width: 200,
            fill: 'blue',
            top: 100,
            left: 100
        });

        tempCanvas.add(rectangle);
        setCanvas(tempCanvas);

        const handleDrawShape = ({ data, socketId }) => {
            if (socketId !== socket.id) {
                const rect = new fabric.Rect(data); // Recreate fabric object from plain object
                tempCanvas.add(rect);
                tempCanvas.requestRenderAll();
            }
        }

        socket.on('draw:shape', handleDrawShape);

        return () => {
            tempCanvas.dispose();
            setCanvas(null);
            socket.off('draw:shape', handleDrawShape);
            socket.disconnect();
        }
    }, []);

    return (
        <div className='bg-slate-300'>
            <div className='p-3 sticky top-0 bg-slate-500 z-10'>
                <button className='p-3 bg-white' onClick={handleDrawRectangle}>Draw Rectangle</button>
                <div className="relative">
                    <button onClick={() => setBtnVisible(!btnVisible)}>Show Buttons</button>
                    {btnVisible && <div className='absolute'>
                        <button>btn1</button>
                    </div>}
                </div>
            </div>
            <canvas id='myCanvas'></canvas>
        </div>
    )
}

export default RectanglePractice;