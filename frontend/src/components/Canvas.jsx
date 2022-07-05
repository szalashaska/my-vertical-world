import React from "react";
import { StyledCanvas } from "./styled/Canvas.styled";

const Canvas = ({ height, width, url }) => {
  return <StyledCanvas height={height} width={width} url={url}></StyledCanvas>;
};

export default Canvas;
