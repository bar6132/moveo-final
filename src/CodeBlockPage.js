import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import codeBlocks from "./codeBlocksData";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/default.css"; 
import "./customHighlight.css"; 

hljs.registerLanguage("javascript", javascript);

const CodeBlockPage = () => {
  const { id } = useParams();
  const selectedCodeBlock = codeBlocks.find(
    (block) => block.id === parseInt(id)
  );
  const [numUsers, setNumUsers] = useState(0);
  const [role, setRole] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [code, setCode] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(true); 
  const [showSmiley, setShowSmiley] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const codeRef = useRef(null);

  const checkCode = () => {
    if (code === selectedCodeBlock.solution) {
      setShowSmiley(true);
      alert(" Your code match the solution. Your Great !!!.");
    } else {
      alert("Oops! Your code doesn't match the solution. Please try again.");
    }
  };

  useEffect(() => {
    const ws = new WebSocket(`ws:localhost:3001/${id}`);
    

    ws.onopen = () => {
    console.log('WebSocket connection established.');
  };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "sessionId") {
        setSessionId(message.sessionId);
      } else if (message.type === "numUsers") {
        setNumUsers(message.numUsers);

        // Determine role based on the number of connected users
        const storedRole = localStorage.getItem(`block${id}`);
        if (message.numUsers === 1) {
          if (!storedRole) {
            localStorage.setItem(`block${id}`, "mentor");
            setRole("mentor");
          } else {
            setRole(storedRole);
          }
        } else {
          // If there's no stored role or the stored role is 'student',
          // set the role to 'student'
          if (!storedRole || storedRole === "student") {
            setRole("student");
            setIsReadOnly(false); 
          }
        }
      } else if (message.type === "codeChange") {
        setCode(message.code);
        // Highlight code after updating
        hljs.highlightBlock(codeRef.current);
        codeRef.current.classList.add("green-highlight"); 
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
      // Remove role from localStorage when disconnecting
      localStorage.removeItem(`block${id}`);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [id]);

  useEffect(() => {
    // Initialize code with selected code block's content
    setCode(selectedCodeBlock.codeSnippet);
  }, [selectedCodeBlock]);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);

    // Broadcast code change to other users
    const ws = new WebSocket(`ws://localhost:3001/${id}`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "codeChange", code: newCode }));
      ws.close();
    };
  };

  if (!selectedCodeBlock) {
    return <div>Code block not found!</div>;
  }
  const goToLobby = () => {
    window.location.href = "/";
  };


  
  return (
    <>
      <button className="Lobby-b" onClick={() => goToLobby()}>
        &larr; Back to Lobby
      </button>
      <div className="code-block-container">
        <h1>{selectedCodeBlock.name}</h1>
        <p>{selectedCodeBlock.details}</p>
        <p
          className={`role ${
            role === "mentor" ? "mentor-role" : "student-role"
          }`}
        >
          Your role: {role}
        </p>
        {role === "student" && (
          <>
            <br />
            <textarea
              ref={codeRef}
              value={code}
              onChange={handleCodeChange}
              readOnly={isReadOnly}
              rows={10}
              cols={80}
            />
            <button className="button" onClick={checkCode}>
              Check Code
            </button>

            {showSmiley && (
              <div className="smiley-face-container">
                <div className="smiley-face">😊</div>
              </div>
            )}
          </>
        )}
        {role === "mentor" && (
          <>
            <pre>
              <code ref={codeRef} className="javascript">
                {code}
              </code>
            </pre>
            <pre>
              <code className="solution-code">
                {selectedCodeBlock.solution}
              </code>
            </pre>
          </>
        )}
      </div>
    </>
  );
};

export default CodeBlockPage;
