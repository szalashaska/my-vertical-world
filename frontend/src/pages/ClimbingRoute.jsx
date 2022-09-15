import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
import Like from "../components/Like";
import { H2Styled, H3Styled, PStyled } from "../constans/GlobalStyles";
import AuthorContent from "../helpers/AuthorContent";
import { ClimbingRouteStyled } from "./Pages.styled";

const ClimbingRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const { routeId } = useParams();

  const handleGetRoute = async (id) => {
    try {
      const response = await fetch(`/api/routes/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        setRouteData(data);
        // console.log(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (routeId) {
      handleGetRoute(+routeId);
    }
  }, []);

  if (!routeData) {
    return <ClimbingRouteStyled>Route does not exist.</ClimbingRouteStyled>;
  }

  const {
    id,
    author,
    created,
    description,
    grade,
    location,
    name,
    path,
    likes,
    wall,
    comments,
  } = routeData;
  const { image, image_height, image_width } = wall;

  if (!routeData) {
    return <ClimbingRouteStyled>No route</ClimbingRouteStyled>;
  }

  return (
    <ClimbingRouteStyled>
      <H2Styled>{name}</H2Styled>
      <AuthorContent authorId={author.id}>
        <Delete id={id} content={"routes"} children={0} />
      </AuthorContent>
      <H3Styled>
        {wall.name}, {location.name}
      </H3Styled>
      <PStyled>by {author.username}</PStyled>
      <CanvasShowMany
        height={image_height}
        width={image_width}
        url={image}
        routesData={[routeData]}
      />

      <PStyled>{description}</PStyled>
      <Like id={id} currentLikes={likes} content={"routes"} />
      <Comment id={id} currentComments={comments} content={"routes"} />
    </ClimbingRouteStyled>
  );
};

export default ClimbingRoute;
