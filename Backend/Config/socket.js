const { Server } = require('socket.io');

let io;

/**
 * Initialize Socket.io with the HTTP server.
 * Call this once in Server.js after creating the HTTP server.
 *
 * @param {http.Server} httpServer - The Node.js HTTP server instance
 * @returns {Server} The Socket.io server instance
 */
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // Join a room based on election state (for targeted updates)
    socket.on('join-election', (state) => {
      socket.join(state);
      console.log(`[Socket.io] ${socket.id} joined room: ${state}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

/**
 * Get the current Socket.io instance.
 * Use this in controllers to emit events (e.g., after a vote is cast).
 *
 * Example in a controller:
 *   const { getIO } = require('../Config/socket');
 *   getIO().emit('vote-updated', candidate);
 */
const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized. Call initSocket() first.');
  }
  return io;
};

module.exports = { initSocket, getIO };
