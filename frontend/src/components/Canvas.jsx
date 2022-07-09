import React, { useRef, useState, useEffect } from "react";
import { StyledCanvas } from "./styled/Canvas.styled";

const Canvas = ({ height, width, url }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [canvasRect, setCanvasRect] = useState({
    deltaX: 0,
    deltaY: 0,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const drawLine = (x, y) => {
    if (isMouseDown) {
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 10;
      ctx.lineJoin = "round";
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();

      setPosition({ x, y });
    }
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);

    setPosition({
      x: e.pageX - canvasRect.deltaX,
      y: e.pageY - canvasRect.deltaY,
    });
  };

  const handleMouseMove = (e) => {
    drawLine(e.pageX - canvasRect.deltaX, e.pageY - canvasRect.deltaY);
  };

  const handleMouseUpAndLeave = () => {
    setIsMouseDown(false);
  };

  const updateCanvasCoordinates = () => {
    const boundingRect = canvasRef.current.getBoundingClientRect();
    let x;
    let y;
    // Image was not scorlled
    if (window.pageYOffset === 0) {
      y = boundingRect.top;
      // If Image was scrolled down
    } else {
      y = boundingRect.top + Math.round(window.pageYOffset);
    }
    // Image was not scorlled
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

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
      updateCanvasCoordinates();
    }
    window.addEventListener("resize", updateCanvasCoordinates);
    return () => window.removeEventListener("resize", updateCanvasCoordinates);
  }, []);

  return (
    <>
      <StyledCanvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpAndLeave}
        onMouseLeave={handleMouseUpAndLeave}
        height={height}
        width={width}
        url={url}
      />
    </>
  );
};

export default Canvas;
