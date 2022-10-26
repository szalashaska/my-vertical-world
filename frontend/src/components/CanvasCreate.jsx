import React, { useRef, useState, useEffect } from "react";
import { StyledCanvas } from "./styled/Canvas.styled";

const CanvasCreate = ({ height, width, url, setPath }) => {
  const observer = useRef(null);
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [canvasRect, setCanvasRect] = useState({
    deltaX: 0,
    deltaY: 0,
  });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [userIsDrawing, setUserIsDrawing] = useState(false);
  const [userPath, setUserPath] = useState([]);

  const ratio = height / width;

  const drawLine = (x, y) => {
    if (userIsDrawing) {
      contextRef.current.beginPath();
      contextRef.current.strokeStyle = "red";
      contextRef.current.lineWidth = 8;
      contextRef.current.lineJoin = "round";
      contextRef.current.moveTo(position.x, position.y);
      contextRef.current.lineTo(x, y);
      contextRef.current.closePath();
      contextRef.current.stroke();

      setPosition({ x, y });
    }
  };

  const recordLine = (x, y) => {
    if (userIsDrawing) {
      setUserPath([
        ...userPath,
        {
          x: ((x * 100) / canvasRef.current.width).toFixed(4),
          y: ((y * 100) / canvasRef.current.height).toFixed(4),
        },
      ]);
    }
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      contextRef.current.canvas.width,
      contextRef.current.canvas.height
    );
    setUserPath([]);
  };

  const handleMouseDown = (e) => {
    // Clear canvas and reset user path
    clearCanvas();
    setUserPath([]);
    setUserIsDrawing(true);

    setPosition({
      x: e.pageX - canvasRect.deltaX,
      y: e.pageY - canvasRect.deltaY,
    });
  };

  const handleMouseMove = (e) => {
    if (userIsDrawing) {
      drawLine(e.pageX - canvasRect.deltaX, e.pageY - canvasRect.deltaY);
      recordLine(e.pageX - canvasRect.deltaX, e.pageY - canvasRect.deltaY);
    }
  };

  const handleMouseUp = () => {
    setUserIsDrawing(false);
    if (userPath.length > 0) setPath(userPath);
  };

  const handleMouseLeave = () => {
    setUserIsDrawing(false);
  };

  // For touchscreen devices //
  const handleTouchStart = (e) => {
    // Clear canvas and reset user path
    clearCanvas();
    setUserPath([]);
    setUserIsDrawing(true);

    setPosition({
      x: e.changedTouches[0].pageX - canvasRect.deltaX,
      y: e.changedTouches[0].pageY - canvasRect.deltaY,
    });
  };

  const handleTouchMove = (e) => {
    // console.log(e.changedTouches[0].pageX);

    drawLine(
      e.changedTouches[0].pageX - canvasRect.deltaX,
      e.changedTouches[0].pageY - canvasRect.deltaY
    );
    recordLine(
      e.changedTouches[0].pageX - canvasRect.deltaX,
      e.changedTouches[0].pageY - canvasRect.deltaY
    );
  };

  const handleTouchEndAndCancel = () => {
    setUserIsDrawing(false);
    if (userPath.length > 0) setPath(userPath);
  };

  const updateCanvasDimensions = (width) => {
    canvasRef.current.width = width;
    canvasRef.current.height = width * ratio;
  };

  const updateCanvasCoordinates = () => {
    // Updates Canvas coordinates, allows user to scroll and zoom image

    const boundingRect = canvasRef.current.getBoundingClientRect();
    let x;
    let y;
    // Image was not scorlled Y direction
    if (window.pageYOffset === 0) {
      y = boundingRect.top;
      // If Image was scrolled down
    } else {
      y = boundingRect.top + Math.round(window.pageYOffset);
    }
    // Image was not scorlled X direction
    if (window.pageXOffset === 0) {
      x = boundingRect.left;
      // If Image was scrolled aside
    } else {
      x = boundingRect.left + Math.round(window.pageXOffset);
    }

    setCanvasRect({
      deltaX: x,
      deltaY: y,
    });
  };

  const handleDynamicDrawingOnCanvas = () => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");

      // Set canvas width according to parent container
      updateCanvasDimensions(canvasRef.current.parentNode.clientWidth);
      updateCanvasCoordinates();
    }
  };

  useEffect(() => {
    handleDynamicDrawingOnCanvas();

    if (canvasRef.current) {
      observer.current = new ResizeObserver(
        handleDynamicDrawingOnCanvas
      ).observe(canvasRef.current.parentNode);

      return () => {
        if (observer.current) return observer.current.disconnect();
      };
    }

    // Adds event listner, removes it after component unmounts.
    // window.addEventListener("resize", handleDynamicDrawingOnCanvas);
    // return () =>
    //   window.removeEventListener("resize", handleDynamicDrawingOnCanvas);
  }, [url]);

  return (
    <StyledCanvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEndAndCancel}
      onTouchCancel={handleTouchEndAndCancel}
      url={url}
    />
  );
};

export default CanvasCreate;
