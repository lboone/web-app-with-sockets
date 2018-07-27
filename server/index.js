const port = process.env.PORT || 3000;
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {DEFAULT_ADMIN_NAME,DEFAULT_ADMIN_GREETING, DEFAULT_ADMIN_NEW_USER_MESSAGE} = require('./config');
const publicPath = path.join(__dirname,'../public');
const app = express();

var server = http.createServer(app);
var io = socketIO(server);

// io.emit                - goes to everyone including sender
// socket.emit            - goes only to the sender
// socket.broadcast.emit  - goes to everyone except the sender

io.on('connection', (socket) => {
    console.log('New client connected');

    // Send only to the user that connected.
    socket.emit('newMessage',generateMessage(DEFAULT_ADMIN_NAME,DEFAULT_ADMIN_GREETING));

    // Send to everyone except the one who connected.
    socket.broadcast.emit('newMessage',generateMessage(DEFAULT_ADMIN_NAME,DEFAULT_ADMIN_NEW_USER_MESSAGE));

    socket.on('createMessage', (message, callback) => {
        // Send message from user to everyone except the one who sent it.
        socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        socket.broadcast.emit('newLocationMessage', generateLocationMessage('Admin',coords.lat,coords.lng));
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