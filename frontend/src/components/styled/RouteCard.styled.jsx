import styled from "styled-components";
import Comment from "../../assets/comment.svg";
import Like from "../../assets/like.svg";
import Mountain from "../../assets/mountain.svg";
import Pin from "../../assets/pin.svg";
import User from "../../assets/user.svg";
import Calendar from "../../assets/calendar.svg";
import Route from "../../assets/route.svg";
import { LinkStyled } from "../../constans/GlobalStyles";

export const RouteCardStyled = styled.div`
  background: linear-gradient(135deg, #a14a76, #a2557c, #f19143);
  border-radius: 25px;
  margin-top: 1rem;
  padding: 1.2rem;
  width: 100%;
  max-width: 50rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);

  @media screen and (min-width: 910px) {
    padding: 2rem;
  }
`;

export const RouteCardLink = styled(LinkStyled)`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  margin-bottom: 0.5rem;
  gap: 0.4em;
`;

export const RouteCardCanvasLink = styled(LinkStyled)`
  display: block;
  overflow: hidden;
  border-radius: 10px;
  margin-block: 0.5rem;
  @media screen and (min-width: 910px) {
    margin-block: 1rem;
  }
`;

export const LikeIcon = styled(Like)`
  transform: scale(0.8);
  @media screen and (min-width: 800px) {
    transform: scale(1);
  }
`;
export const CommentIcon = styled(Comment)`
  transform: scale(0.8);
  @media screen and (min-width: 800px) {
    transform: scale(1);
  }
`;

export const LocationIcon = styled(Pin)`
  transform: scale(0.8);
  @media screen and (min-width: 800px) {
    transform: scale(1);
  }
`;

export const WallIcon = styled(Mountain)`
  transform: scale(0.8);
  @media screen and (min-width: 800px) {
    transform: scale(1);
  }
`;

export const UserIcon = styled(User)`
  transform: scale(0.8);
  @media screen and (min-width: 800px) {
    transform: scale(1);
  }
`;

export const DateIcon = styled(Calendar)`
  transform: scale(0.8);
  @media screen and (min-width: 800px) {
    transform: scale(1);
  }
`;

export const RouteIcon = styled(Route)`
  transform: scale(0.8);
  @media screen and (min-width: 800px) {
    transform: scale(1);
  }
`;
