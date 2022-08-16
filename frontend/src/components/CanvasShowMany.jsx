import React, { useRef, useState, useEffect } from "react";
import { StyledCanvasShow } from "./styled/Canvas.styled";

const CanvasShowMany = ({ height, width, url, routesData }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const ratio = height / width;

  let position = { x: 0, y: 0 };
  let mouse = { x: 0, y: 0 };

  const drawLine1 = (x, y) => {
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

  const drawLine = (x, y) => {
    const path = new Path2D();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";

    path.moveTo(position.x, position.y);
    path.lineTo(x, y);
    ctx.closePath();

    ctx.stroke(path);
    position = { x, y };
  };

  // const ctx = canvas.getContext('2d');
  // const path = new Path2D();

  // ctx.strokeStyle = "black";
  // ctx.lineWidth = 5;
  // ctx.lineCap = "butt"; // butt  round  square <-- other options

  // path.moveTo(40, 40);
  // path.lineTo(50, 35);
  // path.lineTo(60, 40);

  // ctx.stroke(path);

  // ctx.strokeStyle = "red";
  // ctx.lineWidth = 3;

  // path.moveTo(40, 40);
  // path.lineTo(50, 35);
  // path.lineTo(60, 40);

  // ctx.stroke(path);

  const drawUsersLine = (path) => {
    path.map((element) => {
      drawLine(
        (element.x * canvasRef.current.width) / 100,
        (element.y * canvasRef.current.height) / 100
      );
    });
  };

  const iterateAndDraw = (routes) => {
    routes.map((route, index) => {
      position = {
        x: (routesData[index].path[0].x * canvasRef.current.width) / 100,
        y: (routesData[index].path[0].y * canvasRef.current.height) / 100,
      };

      return drawUsersLine(route.path);
    });
  };

  const setCanvasHeight = () => {
    const canvasWidth = canvasRef.current.width;
    canvasRef.current.height = canvasWidth * ratio;
  };

  const updateMouseCoordinates = (e) => {
    mouse = {
      x: e.x,
      y: e.y,
    };
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
      setCanvasHeight();
    }

    window.addEventListener("mousemove", updateMouseCoordinates);
    return () =>
      window.removeEventListener("mousemove", updateMouseCoordinates);
  }, []);

  useEffect(() => {
    if (ctx) {
      iterateAndDraw(routesData);
    }
  }, [ctx]);

  return (
    <>
      <StyledCanvasShow ref={canvasRef} url={url} />;
      <button
        onClick={() => {
          ctx.strokeStyle = "yellow";
          console.log("klik");
        }}
      >
        klik
      </button>
    </>
  );
};

export default CanvasShowMany;
