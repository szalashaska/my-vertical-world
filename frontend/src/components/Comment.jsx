import React, { useState, useContext } from "react";
import { ButtonStyled } from "../constans/GlobalStyles";
import AuthContext from "../contexts/AuthContext";
import AuthorContent from "../helpers/AuthorContent";
import PrivateContent from "../helpers/PrivateContent";
import FormInput from "./FormInput";

const Comment = ({ id, content, currentComments }) => {
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState(currentComments);

  const { authTokens, user } = useContext(AuthContext);

  // Check if props are correct
  const allowedContent = ["routes", "walls", "locations"];
  if (!allowedContent.includes(content)) return null;

  const commentInput = [
    {
      id: 1,
      name: "comment_body",
      type: "textarea",
      placeholder: "Your comment...",
      label: `${user?.username} says:`,
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
    <div>
      {comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <AuthorContent authorId={comment.author.id}>
                <ButtonStyled
                  onClick={() => handleDeleteComment(comment.id)}
                  type="button"
                >
                  X
                </ButtonStyled>
              </AuthorContent>
              <p>{comment.author.username}</p>
              <p>{new Date(comment.created).toLocaleDateString()}</p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
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
    </div>
  );
};

export default Comment;
