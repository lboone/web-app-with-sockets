const port = process.env.PORT || 3000;
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {
        DEFAULT_ADMIN_NAME,
        DEFAULT_ADMIN_GREETING, 
        DEFAULT_ADMIN_NEW_USER_MESSAGE,
        DEFAULT_ADMIN_USER_LEAVE_MESSAGE
    } = require('./config');
const {isRealString} = require('./utils/validation');
const {Users, User} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

// io.emit                                      - goes to everyone including sender
// socket.emit                                  - goes only to the sender
// socket.broadcast.emit                        - goes to everyone except the sender
// socket.join('The Office Fans')               - join a room
// socket.leave('The Office Fans')              - leave a room
// io.to('The Office Fans').emit                - goes to everyone in the room including sender
// socket.broadcast.to('The Office Fans').emit  - goes to everyone in the room except the sender
// socket.emit                                  - goes only to the sender

io.on('connection', (socket) => {
    socket.on('join',(params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room Name are required');
        }
        params.room = params.room.toLowerCase();
        users.removeUser(socket.id);
        var user = users.addUser(new User(socket.id,params.name,params.room));
        if(!user){
            return callback('Name is already being used in this room');
        }
        socket.join(params.room);
        // users.addUser(new User(socket.id,params.name,params.room));
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        io.emit('updateRoomList',users.getRoomList());
        socket.emit('newMessage',generateMessage(DEFAULT_ADMIN_NAME,DEFAULT_ADMIN_GREETING(params.room)));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage(DEFAULT_ADMIN_NAME,DEFAULT_ADMIN_NEW_USER_MESSAGE(params.name)));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if( user && isRealString(message.text)){
            socket.broadcast.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
            socket.emit('newMessage',generateMessage('Me',message.text,true));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user) {
            socket.broadcast.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.lat,coords.lng));
            socket.emit('newLocationMessage', generateLocationMessage('Me',coords.lat,coords.lng,true));
        }
    });
    

    socket.on('disconnect',() => {
        var user = users.removeUser(socket.id);
        if( user ) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage(DEFAULT_ADMIN_NAME,DEFAULT_ADMIN_USER_LEAVE_MESSAGE(user.name)));
            io.emit('updateRoomList',users.getRoomList());
        } 
        // Emit event to everyone in the room
        
    });
});





// Start the server
server.listen(port,() => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};