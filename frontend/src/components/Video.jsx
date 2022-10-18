import React from "react";
import homeVideo from "../assets/climb.mp4";
import styled from "styled-components";

const VideoStyled = styled.video`
  background-color: black;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 110%;
  opacity: 0.9;
  @media screen and (min-width: 575px) {
    height: auto;
    width: 100%;
  }
`;

const Video = () => {
  return <VideoStyled src={homeVideo} muted loop autoPlay />;
};

export default Video;
