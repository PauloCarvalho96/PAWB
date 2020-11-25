import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import * as api from "../../store/actions/api"

function Socketio() {
  const [response, setResponse] = useState("");

  useEffect(() => {

    // Connect to socket.io
    const socket = socketIOClient(api.URL_SOCKETIO, {
      withCredentials: true, transportOptions: {}
    });

    // After connect send token
    socket.on("connect", () => {
      socket.emit("set-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiZXhwIjoxNjA2MzEwNzIzfQ._UZmFkEooG3ZMIvaThvX29JQPNo6gz_oEgEiNKe2Awc")

      socket.emit("add-people", "X")
    })

   

  }, []);

  return (
    <p>
      It's <b id={response}>{response}</b>
    </p>
  );
}

export default Socketio;