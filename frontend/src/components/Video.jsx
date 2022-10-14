import React from "react";
import homeVideo from "../assets/climb.mp4";
import styled from "styled-components";

const VideoShowcase = styled.div`
  width: 100%;
  height: 30rem;
  background-color: yellow;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoStyled = styled.video`
  width: 100%;
  /* @media only screen and (min-width: 700px) {
    width: 100%;
  } */
`;

const Video = () => {
  return (
    <VideoShowcase>
      <VideoStyled src={homeVideo} muted loop autoPlay />
    </VideoShowcase>
  );
};

export default Video;
