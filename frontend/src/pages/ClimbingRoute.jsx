import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
import Like from "../components/Like";
import { H2Styled, H3Styled, PStyled } from "../constans/GlobalStyles";
import AuthorContent from "../helpers/AuthorContent";
import { getContent } from "../helpers/Utils.helpers";
import { ClimbingRouteStyled } from "./Pages.styled";

const ClimbingRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const { routeId } = useParams();

  const handleGetRoute = useCallback(async (id) => {
    const routes = await getContent("routes", id);
    if (routes) {
      setRouteData(routes);
    }
  }, []);

  useEffect(() => {
    if (routeId) {
      handleGetRoute(+routeId);
    }
  }, [handleGetRoute]);

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

  return (
    <ClimbingRouteStyled>
      <H2Styled>{name}</H2Styled>

      <AuthorContent authorId={author.id}>
        <Delete id={id} content={"routes"} children={0} />
        <Link to={"edit"} state={{ routeData }}>
          Edit
        </Link>
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
