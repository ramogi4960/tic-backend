require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const { createServer } = require('http');
const { join, resolve } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`New user -> ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`User disconnected -> ${socket.id}`);
    });
});


server.listen(PORT, console.log(`\n\tServer running on port: ${PORT}\n\n\t*** Happy Hacking  ***`));