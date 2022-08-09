import React, { useRef, useState, useEffect } from "react";
import { StyledCanvas } from "./styled/Canvas.styled";

const CanvasShow = ({ height, width, url, routePath }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  let position = {
    x: (routePath[0].x * width) / 100,
    y: (routePath[0].y * height) / 100,
  };

  const drawLine = (x, y) => {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 8;
    ctx.lineJoin = "round";
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();

    position = { x, y };
  };

  const drawUsersLine = (path) => {
    path.map((element) => {
      drawLine((element.x * width) / 100, (element.y * height) / 100);
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      drawUsersLine(routePath);
    }
  }, [ctx]);

  return (
    <>
      <StyledCanvas
        ref={canvasRef}
        height={height}
        width={width}
        url={`${url}`}
      />
    </>
  );
};

export default CanvasShow;
