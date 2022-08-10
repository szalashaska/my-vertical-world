import React, { useRef, useState, useEffect } from "react";
import { StyledCanvasShow } from "./styled/Canvas.styled";

const CanvasShow = ({ height, width, url, routePath }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const ratio = height / width;

  let position = {};

  const drawLine = (x, y) => {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();

    position = { x, y };
  };

  const drawUsersLine = (path) => {
    path.map((element) => {
      drawLine(
        (element.x * canvasRef.current.width) / 100,
        (element.y * canvasRef.current.height) / 100
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
      drawUsersLine(routePath);
    }
  }, [ctx]);

  return <StyledCanvasShow ref={canvasRef} url={url} />;
};

export default CanvasShow;
