import React, { useState, useContext } from "react";
import {
  ButtonStyled,
  FlexContainer,
  PStyled,
  UpperFirstLetter,
  Wrapper,
} from "../constans/GlobalStyles";
import AuthContext from "../contexts/AuthContext";
import AuthorContent from "../helpers/AuthorContent";
import PrivateContent from "../helpers/PrivateContent";
import ExpendedOptions from "./ExpendedOptions";
import FormInput from "./FormInput";
import { CommentContainer, CommentBox } from "./styled/Comments.styled";

const ALLOWED_CONTENT = ["routes", "walls", "locations"];
const Comment = ({ id, content, currentComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState(currentComments);

  const { authTokens, user } = useContext(AuthContext);

  // Check if props are correct
  if (!ALLOWED_CONTENT.includes(content)) return null;

  const commentInput = [
    {
      id: 1,
      name: "comment_body",
      type: "textarea",
      placeholder: "Add a comment...",
      // label: `${user?.username} says:`,
      required: true,
      value: commentBody,
      maxlength: 500,
      onChange: (e) => setCommentBody(e.target.value),
    },
  ];

  const handleCommentForm = async (e) => {
    e.preventDefault();
    if (!commentBody) return;

    const body = { body: commentBody };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
      body: JSON.stringify(body),
    };
    const endpoint = `/api/${content}/${id}/comments`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setComments(data);
        setCommentBody("");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
      body: JSON.stringify({ comment_id: commentId }),
    };
    const endpoint = `/api/${content}/${id}/comments`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setComments(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  return (
    <Wrapper margin="1.5rem 0 0 0">
      {comments.length > 0 ? (
        <CommentContainer>
          {comments.map((comment) => (
            <CommentBox key={comment.id}>
              <FlexContainer justify="space-between">
                <PStyled bold>
                  <UpperFirstLetter>{comment.author.username}</UpperFirstLetter>
                </PStyled>

                <PStyled>
                  {new Date(comment.created).toLocaleDateString()}
                </PStyled>
              </FlexContainer>

              <FlexContainer
                justify="space-between"
                align="flex-start"
                padding="0.5rem 0"
              >
                <Wrapper width="90%">
                  <PStyled>{comment.body}</PStyled>
                </Wrapper>

                <Wrapper width="5%">
                  <AuthorContent authorId={comment.author.id}>
                    <ExpendedOptions>
                      <ButtonStyled
                        onClick={() => handleDeleteComment(comment.id)}
                        type="button"
                      >
                        Delete
                      </ButtonStyled>
                    </ExpendedOptions>
                  </AuthorContent>
                </Wrapper>
              </FlexContainer>
            </CommentBox>
          ))}
        </CommentContainer>
      ) : (
        <PStyled align="center">No comments yet.</PStyled>
      )}

      <PrivateContent>
        <form onSubmit={handleCommentForm}>
          {commentInput.map((input) => (
            <FormInput key={input.id} {...input} />
          ))}

          <ButtonStyled type="submit" disabled={!commentBody}>
            Add comment
          </ButtonStyled>
        </form>
      </PrivateContent>
    </Wrapper>
  );
};

export default Comment;
