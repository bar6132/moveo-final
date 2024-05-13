import React from 'react';
import { useNavigate } from 'react-router-dom';
import codeBlocks from './codeBlocksData';
import './LobbyPage.css'; 
const LobbyPage = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    // Navigate to the code block page
    navigate(`/codeblock/${id}`);
  };

  return (
    <div className="lobby-container">
      <h1 className="lobby-heading">Choose a Code Block</h1>
      <ul className="code-block-list">
        {codeBlocks.map((block) => (
          <li key={block.id} className="code-block-item" onClick={() => handleClick(block.id)}>
            {block.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage;
