import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const AddRoute = () => {
  const [notes, setNotes] = useState([]);
  const { authenticationTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authenticationTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed illo
      obcaecati facere itaque quis et nulla autem, deleniti quia totam veniam
      consequuntur neque eos cumque quos veritatis dolor voluptates officiis
      dicta odit rerum tempore impedit. Repudiandae delectus sapiente, eius
      veritatis ipsam praesentium laboriosam cumque mollitia, quaerat nobis,
      architecto rerum consequuntur!
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddRoute;
