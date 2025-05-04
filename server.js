const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS to allow your frontend to connect from Netlify
app.use(cors({
  origin: "https://massanger.netlify.app", // Your Netlify frontend URL
  methods: ["GET", "POST"],
}));

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Send a welcome message to the client
  socket.emit('welcome', 'Hello from the server!');

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Set the port for the server to listen on
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
