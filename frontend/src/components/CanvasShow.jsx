import React, { useRef, useState, useEffect } from "react";
import { StyledCanvasShow } from "./styled/Canvas.styled";

const routeColor = "yellow";
const routeDots = {
  border: "white",
  start: routeColor,
  end: "red",
};

const CanvasShow = ({ height, width, url, routePath }) => {
  const canvasRef = useRef(null);

  const ratio = height / width;

  let position = {};

  const drawCircle = (ctx, x, y, color1, color2) => {
    const radius = 4;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color2;
    ctx.stroke();

    position = { x, y };
  };

  // Draw single stroke
  const drawLine = (ctx, x, y, color) => {
    const path = new Path2D();
    ctx.strokeStyle = color || "blue";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";

    path.moveTo(position.x, position.y);
    path.lineTo(x, y);
    ctx.closePath();

    ctx.stroke(path);
    position = { x, y };
  };

  // Draw users route
  const drawUsersLine = (ctx, path, color) => {
    const dataLength = path.length;
    path.map((element, index) => {
      if (index === 0) {
        drawCircle(
          ctx,
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          routeDots.start,
          routeDots.border
        );
      }

      if (index === dataLength - 1) {
        drawCircle(
          ctx,
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          routeDots.end,
          routeDots.border
        );
      }
      drawLine(
        ctx,
        (element.x * canvasRef.current.width) / 100,
        (element.y * canvasRef.current.height) / 100,
        color
      );
    });
  };

  const updateCanvasHeight = (width) => {
    canvasRef.current.width = width;
    canvasRef.current.height = width * ratio;
  };

  const handleDynamicDrawingOnCanvas = () => {
    if (canvasRef.current) {
      // Set canvas context
      const ctx = canvasRef.current.getContext("2d");

      // Set canvas width depending on parent element
      updateCanvasHeight(canvasRef.current.parentNode.clientWidth);

      // Reset drawing position according to canvas dimensions
      position = {
        x: (routePath[0].x * canvasRef.current.width) / 100,
        y: (routePath[0].y * canvasRef.current.height) / 100,
      };

      // Draw users input
      drawUsersLine(ctx, routePath, routeColor);
    }
  };

  // useEffect(() => {}, []);

  useEffect(() => {
    handleDynamicDrawingOnCanvas();
    window.addEventListener("resize", handleDynamicDrawingOnCanvas);
    return () =>
      window.removeEventListener("resize", handleDynamicDrawingOnCanvas);
  }, []);

  return <StyledCanvasShow ref={canvasRef} url={url} />;
};

export default CanvasShow;
