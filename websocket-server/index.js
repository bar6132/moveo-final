const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
const app = express();
const wss = new WebSocket.Server({ noServer: true });
const clientSessions = new Map();
const blockConnections = {};

const server = app.listen(3001, () => {
  console.log('WebSocket server is running and listening on port 3001');
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

function logBlockConnections() {
  console.log('Active connections per block:');
  Object.entries(blockConnections).forEach(([blockId, connections]) => {
    console.log(`Block ${blockId}: ${connections.length}`);
  });
}

wss.on('connection', (ws, req) => {
  console.log('New client connected');

  const blockId = req.url.split('/')[1];

  if (!blockConnections[blockId]) {
    blockConnections[blockId] = [];
  }

  blockConnections[blockId].push(ws);

  // Generate session ID for the client
  const sessionId = generateSessionId();
  clientSessions.set(ws, sessionId);

  // Send session ID to the client
  ws.send(JSON.stringify({ type: 'sessionId', sessionId }));

  // Broadcast number of connected users to all clients in the block
  broadcastNumUsers(blockId);

  ws.on('close', () => {
    console.log('Client disconnected');
    blockConnections[blockId] = blockConnections[blockId].filter((client) => client !== ws);
    clientSessions.delete(ws);

    // Broadcast updated number of connected users
    broadcastNumUsers(blockId);
  });

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Received:', parsedMessage);

      // Broadcast message to all clients in the block
      blockConnections[blockId].forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
});

function broadcastNumUsers(blockId) {
  const numUsers = blockConnections[blockId].length;
  blockConnections[blockId].forEach(client => {
    client.send(JSON.stringify({ type: 'numUsers', numUsers }));
  });
}

function generateSessionId() {
  // Implement your session ID generation logic here
  // Example: return a random alphanumeric string
  return Math.random().toString(36).substr(2, 9);
}
