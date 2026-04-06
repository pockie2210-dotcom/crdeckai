import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e8 // Increase buffer size for large image uploads (100 MB)
});

const STATIC_DIR = path.join('C:', 'Users', 'User', 'Desktop', 'money-counter');

// Serve static files from the money-counter directory
app.use(express.static(STATIC_DIR));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
        // Notify others in the room
        socket.to(roomId).emit('peer-connected', socket.id);
    });

    socket.on('scan-image', (data) => {
        console.log(`Received scan image in room ${data.roomId}`);
        // Relay the image to the PC (all clients in room except sender)
        socket.to(data.roomId).emit('process-image', data.image);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 8888;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
