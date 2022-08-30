import React, { useRef, useState, useEffect } from "react";
import { StyledCanvasShow } from "./styled/Canvas.styled";

const CanvasShowMany = ({ height, width, url, routesData }) => {
  const canvasRef = useRef(null);
  const listRef = useRef([]);

  const [canvasDimensions, setCanvasDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [ctx, setCtx] = useState(null);
  const [canvasRect, setCanvasRect] = useState({
    deltaX: 0,
    deltaY: 0,
  });
  const [onCanvas, setOnCanvas] = useState(false);
  const [routeArray, setRouteArray] = useState(null);
  const [highlightedRoute, setHighlightedRoute] = useState(null);
  // const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const createRouteArray = () => {
    const arrayLenght = 100;
    const arrayMatrix = new Array(arrayLenght);
    for (let i = 0; i < arrayLenght; i++) {
      arrayMatrix[i] = new Array(arrayLenght).fill(null);
    }

    routesData.forEach((route, index) => {
      route.path.map((coords) => {
        // Skip corner cases
        if (
          coords.x - 1 >= 0 &&
          coords.x + 1 < 100 &&
          coords.y - 1 >= 0 &&
          coords.y + 1 < 100
        ) {
          arrayMatrix[coords.x - 1][coords.y - 1] =
            arrayMatrix[coords.x - 1][coords.y] =
            arrayMatrix[coords.x - 1][coords.y + 1] =
            arrayMatrix[coords.x][coords.y - 1] =
            arrayMatrix[coords.x][coords.y] =
            arrayMatrix[coords.x][coords.y + 1] =
            arrayMatrix[coords.x + 1][coords.y - 1] =
            arrayMatrix[coords.x + 1][coords.y] =
            arrayMatrix[coords.x + 1][coords.y + 1] =
              index;
        }
        // Assign route to the matrix, assign values around points for easier triggering
      });
    });

    setRouteArray(arrayMatrix);
  };

  const ratio = height / width;

  let position = { x: 0, y: 0 };
  let pointer = { x: 0, y: 0 };

  const drawLine = (x, y, color) => {
    const path = new Path2D();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";

    path.moveTo(position.x, position.y);
    path.lineTo(x, y);
    ctx.closePath();

    ctx.stroke(path);
    position = { x, y };
  };

  const drawUsersLine = (path, color) => {
    path.map((element) => {
      drawLine(
        (element.x * canvasRef.current.width) / 100,
        (element.y * canvasRef.current.height) / 100,
        color
      );
    });
  };

  const redrawLine = (path, color) => {
    position = {
      x: (path[0].x * canvasRef.current.width) / 100,
      y: (path[0].y * canvasRef.current.height) / 100,
    };
    drawUsersLine(path, color);
  };

  const iterateAndDraw = (routes) => {
    routes.map((route, index) => {
      position = {
        x: (routesData[index].path[0].x * canvasRef.current.width) / 100,
        y: (routesData[index].path[0].y * canvasRef.current.height) / 100,
      };

      return drawUsersLine(route.path, "blue");
    });
  };

  const setCanvasHeight = () => {
    const canvasWidth = canvasRef.current.width;
    canvasRef.current.height = canvasWidth * ratio;
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

    setCanvasDimensions({
      height: boundingRect.height,
      width: boundingRect.width,
    });

    setCanvasRect({
      deltaX: x,
      deltaY: y,
    });
  };

  const handleMouseEnter = () => {
    setOnCanvas(true);
  };

  const handleMouseMove = (e) => {
    if (onCanvas) {
      pointer = {
        x: Math.floor(
          ((e.pageX - canvasRect.deltaX) * 100) / canvasDimensions.width
        ),
        y: Math.floor(
          ((e.pageY - canvasRect.deltaY) * 100) / canvasDimensions.height
        ),
      };

      const currentMousePosition = routeArray[pointer.x][pointer.y];
      // On mouse enter
      if (
        currentMousePosition !== null &&
        currentMousePosition !== undefined &&
        highlightedRoute === null
      ) {
        redrawLine(routesData[currentMousePosition].path, "red");
        setHighlightedRoute(currentMousePosition);

        listRef.current[currentMousePosition].style.backgroundColor = "yellow";
      }
      // On mouse leave
      else if (
        currentMousePosition === null &&
        highlightedRoute !== null &&
        highlightedRoute !== undefined
      ) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        iterateAndDraw(routesData);
        listRef.current[highlightedRoute].style.backgroundColor = "lightblue";

        setHighlightedRoute(null);
      }
    }
  };

  const handleMouseLeave = () => {
    setHighlightedRoute(null);
    setOnCanvas(false);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    iterateAndDraw(routesData);
  };

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
      setCanvasHeight();
      updateCanvasCoordinates();
    }
    createRouteArray();

    // Adds event listner, removes it after component unmounts.
    window.addEventListener("resize", updateCanvasCoordinates);
    return () => window.removeEventListener("resize", updateCanvasCoordinates);
  }, []);

  useEffect(() => {
    if (ctx) {
      iterateAndDraw(routesData);
    }
  }, [ctx]);

  return (
    <>
      <StyledCanvasShow
        ref={canvasRef}
        url={url}
        onMouseEnter={() => handleMouseEnter()}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => handleMouseLeave()}
      />

      <ul>
        {routesData.map((route, index) => (
          <li
            style={{
              padding: "10px",
              backgroundColor: "lightblue",
              margin: "20px 0",
            }}
            key={route.id}
            onMouseEnter={() => {
              redrawLine(route.path, "red");
            }}
            onMouseLeave={() => {
              redrawLine(route.path, "blue");
            }}
            ref={(ref) => (listRef.current[index] = ref)}
          >
            <p>
              index: {index}, {route.name}{" "}
            </p>
          </li>
        ))}
      </ul>

      {/* {routeArray &&
        routeArray.map((row) => (
          <div>
            {row.map((item) => {
              if (item === null) return <span>#</span>;
              else
                return (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    #
                  </span>
                );
            })}
          </div>
        ))} */}
    </>
  );
};

export default CanvasShowMany;
