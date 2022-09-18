import React, { useRef, useState, useEffect } from "react";
import { StyledCanvasShow } from "./styled/Canvas.styled";

const ROUTE_COLORS = {
  normal: "blue",
  highlight: "red",
};

const ROUTE_DOTS = {
  border: "white",
  end: "red",
};

const DESCRIPTION_COLOR = {
  normal: "lightblue",
  highlight: "gold",
};

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

  // Creates array that maps routes on canvas and allows to trigger hoover effect
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
          // Assign route to the matrix, values around points for easier triggering
          const coordX = Math.round(coords.x);
          const coordY = Math.round(coords.y);

          arrayMatrix[coordX - 1][coordY - 1] =
            arrayMatrix[coordX - 1][coordY] =
            arrayMatrix[coordX - 1][coordY + 1] =
            arrayMatrix[coordX][coordY - 1] =
            arrayMatrix[coordX][coordY] =
            arrayMatrix[coordX][coordY + 1] =
            arrayMatrix[coordX + 1][coordY - 1] =
            arrayMatrix[coordX + 1][coordY] =
            arrayMatrix[coordX + 1][coordY + 1] =
              index;
        }
      });
    });

    setRouteArray(arrayMatrix);
  };

  const ratio = height / width;

  let position = { x: 0, y: 0 };
  let pointer = { x: 0, y: 0 };

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
  const drawNumber = (x, y, index, color) => {
    let offsetY = y + 20;
    const radius = 8;
    ctx.beginPath();
    ctx.arc(x, offsetY, radius, 0, 2 * Math.PI, false);

    ctx.lineWidth = 1.1;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.font = `${radius}px arial`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.strokeText(index, x, offsetY);
  };

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

  const drawUsersLine = (index, path, color) => {
    if (!ctx) return;
    const dataLength = path.length;

    path.map((element, i) => {
      if (i === 0) {
        drawNumber(
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          index,
          ROUTE_DOTS.border
        );
        drawCircle(
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          color,
          ROUTE_DOTS.border
        );
      }

      if (i === dataLength - 1) {
        drawCircle(
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          ROUTE_DOTS.end,
          ROUTE_DOTS.border
        );
      }
      drawLine(
        (element.x * canvasRef.current.width) / 100,
        (element.y * canvasRef.current.height) / 100,
        color
      );
    });
  };

  const redrawLine = (index, path, color) => {
    position = {
      x: (path[0].x * canvasRef.current.width) / 100,
      y: (path[0].y * canvasRef.current.height) / 100,
    };
    drawUsersLine(index, path, color);
  };

  const iterateAndDraw = (routes) => {
    routes.map((route, index) => {
      position = {
        x: (routesData[index].path[0].x * canvasRef.current.width) / 100,
        y: (routesData[index].path[0].y * canvasRef.current.height) / 100,
      };

      return drawUsersLine(index, route.path, ROUTE_COLORS.normal);
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
        redrawLine(
          currentMousePosition,
          routesData[currentMousePosition].path,
          ROUTE_COLORS.highlight
        );
        setHighlightedRoute(currentMousePosition);

        listRef.current[currentMousePosition].style.backgroundColor =
          DESCRIPTION_COLOR.highlight;
      }
      // On mouse leave
      else if (
        currentMousePosition === null &&
        highlightedRoute !== null &&
        highlightedRoute !== undefined
      ) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        iterateAndDraw(routesData);
        listRef.current[highlightedRoute].style.backgroundColor =
          DESCRIPTION_COLOR.normal;

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
              redrawLine(index, route.path, ROUTE_COLORS.highlight);
            }}
            onMouseLeave={() => {
              redrawLine(index, route.path, ROUTE_COLORS.normal);
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
                      color: ROUTE_COLORS.highlight,
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
