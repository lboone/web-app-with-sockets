const port = process.env.PORT || 3000;
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.emit('newMessage',{
        from: 'Lloyd',
        text: 'Hey let\'s do lunch',
        createdAt: new Date()
    });

    socket.on('createMessage', (message) => {
        message.createdAt = new Date();
        console.log('Create message from client',JSON.stringify(message,undefined,2));
    });

    socket.on('disconnect',() => {
        console.log('Client disconnected');
    });
});



app.use(express.static(publicPath));

// Start the server
server.listen(port,() => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};