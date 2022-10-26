import React, { useRef, useState, useEffect } from "react";
import RouteList from "./RouteList";
import { StyledCanvasShow } from "./styled/Canvas.styled";

const ROUTE_COLORS = {
  normal: "#0909ff",
  highlight: "red",
  shadow: "#0909ff",
};

const ROUTE_DOTS = {
  border: "white",
  end: "red",
  numberFill: "#02064376",
};

const CanvasShowMany = ({ height, width, url, routesData }) => {
  const observer = useRef(null);
  const canvasRef = useRef(null);
  const listRef = useRef([]);
  const contextRef = useRef(null);

  const [canvasDimensions, setCanvasDimensions] = useState({
    height: 0,
    width: 0,
  });
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
    const radius = 5;
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, radius, 0, 2 * Math.PI, false);
    contextRef.current.fillStyle = color1;
    contextRef.current.fill();
    contextRef.current.lineWidth = 1.5;
    contextRef.current.strokeStyle = color2;
    contextRef.current.stroke();

    position = { x, y };
  };

  const drawNumber = (x, y, index, color) => {
    let offsetY = y + 20;
    const radius = 10;
    contextRef.current.beginPath();
    contextRef.current.arc(x, offsetY, radius, 0, 2 * Math.PI, false);

    contextRef.current.lineWidth = 2;
    contextRef.current.strokeStyle = color;
    contextRef.current.stroke();

    // Circle fill
    contextRef.current.fillStyle = ROUTE_DOTS.numberFill;
    contextRef.current.fill();

    contextRef.current.font = `${radius}px arial`;
    contextRef.current.textBaseline = "middle";
    contextRef.current.textAlign = "center";
    contextRef.current.strokeText(index + 1, x, offsetY);
  };

  const drawLine = (x, y, color) => {
    const path = new Path2D();
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = 3;
    contextRef.current.lineJoin = "round";
    contextRef.current.shadowColor = ROUTE_COLORS.shadow;
    contextRef.current.shadowOffsetX = 0;
    contextRef.current.shadowOffsetY = 0;
    contextRef.current.shadowBlur = 0;

    path.moveTo(position.x, position.y);
    path.lineTo(x, y);
    contextRef.current.closePath();

    contextRef.current.stroke(path);
    position = { x, y };
  };

  const drawUsersLine = (index, path, color) => {
    if (!contextRef.current) return;
    const dataLength = path.length;

    path.map((element, i) => {
      // Route start, circle with number
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

      // Route end, only circle
      if (i === dataLength - 1) {
        drawCircle(
          (element.x * canvasRef.current.width) / 100,
          (element.y * canvasRef.current.height) / 100,
          ROUTE_DOTS.end,
          ROUTE_DOTS.border
        );
      }

      // Route line, between start and end circle
      drawLine(
        (element.x * canvasRef.current.width) / 100,
        (element.y * canvasRef.current.height) / 100,
        color
      );
    });
  };

  const redrawLine = (index, path, color) => {
    // Reset starting position
    position = {
      x: (path[0].x * canvasRef.current.width) / 100,
      y: (path[0].y * canvasRef.current.height) / 100,
    };
    // Redraw current route
    drawUsersLine(index, path, color);
  };

  const iterateAndDraw = (routes) => {
    // Maps trough routes array, draws route one by one
    routes.map((route, index) => {
      // Reset drawing postion
      position = {
        x: (routesData[index].path[0].x * canvasRef.current.width) / 100,
        y: (routesData[index].path[0].y * canvasRef.current.height) / 100,
      };
      // Draw current line
      return drawUsersLine(index, route.path, ROUTE_COLORS.normal);
    });
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

        listRef.current[currentMousePosition].classList.add("highlighted");
      }

      // On mouse leave
      else if (
        currentMousePosition === null &&
        highlightedRoute !== null &&
        highlightedRoute !== undefined
      ) {
        contextRef.current.clearRect(
          0,
          0,
          contextRef.current.canvas.width,
          contextRef.current.canvas.height
        );
        iterateAndDraw(routesData);
        listRef.current[highlightedRoute].classList.remove("highlighted");

        setHighlightedRoute(null);
      }
    }
  };

  const handleMouseLeave = () => {
    setHighlightedRoute(null);
    setOnCanvas(false);
    contextRef.current.clearRect(
      0,
      0,
      contextRef.current.canvas.width,
      contextRef.current.canvas.height
    );
    iterateAndDraw(routesData);
  };

  const handleDynamicDrawingOnCanvas = () => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");

      // Set canvas width according to parent container
      updateCanvasDimensions(canvasRef.current.parentNode.clientWidth);
      updateCanvasCoordinates();
      iterateAndDraw(routesData);
    }
  };

  useEffect(() => {
    createRouteArray();
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
  }, []);

  return (
    <>
      <StyledCanvasShow
        ref={canvasRef}
        url={url}
        onMouseEnter={() => handleMouseEnter()}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => handleMouseLeave()}
      />

      <RouteList
        routes={routesData}
        redrawLine={redrawLine}
        listReference={listRef.current}
        highlightLine={ROUTE_COLORS.highlight}
        normalLine={ROUTE_COLORS.normal}
      />
    </>
  );
};

export default CanvasShowMany;
