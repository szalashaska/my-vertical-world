import React, { useRef, useState, useEffect } from "react";
import { StyledCanvasShow } from "./styled/Canvas.styled";

const CanvasShow = ({ height, width, url, routePath }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const routeColor = "yellow";
  const routeDots = {
    border: "white",
    start: routeColor,
    end: "red",
  };

  const ratio = height / width;

  let position = {};

  const drawCircle = (x, y, color1, color2) => {
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
  const drawLine = (x, y, color) => {
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
  const drawUsersLine = (path, color) => {
    const dataLength = path.length;
    path.map((element, index) => {
      if (index === 0) {
        drawCircle(
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          routeDots.start,
          routeDots.border
        );
      }

      if (index === dataLength - 1) {
        drawCircle(
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          routeDots.end,
          routeDots.border
        );
      }
      drawLine(
        (element.x * canvasRef.current.width) / 100,
        (element.y * canvasRef.current.height) / 100,
        color
      );
    });
  };

  const setCanvasHeight = () => {
    const canvasWidth = canvasRef.current.width;
    canvasRef.current.height = canvasWidth * ratio;
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
      setCanvasHeight();

      position = {
        x: (routePath[0].x * canvasRef.current.width) / 100,
        y: (routePath[0].y * canvasRef.current.height) / 100,
      };
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      drawUsersLine(routePath, routeColor);
    }
  }, [ctx]);

  return <StyledCanvasShow ref={canvasRef} url={url} />;
};

export default CanvasShow;
