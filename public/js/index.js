var socket = io();


socket.on('connect',function () {
    console.log('Connected to server');
    socket.emit('createMessage',{
        from: 'Melissa',
        text: 'Hey. I will go to to lunch'
    });
});

socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('newMessage',function (message) {
    console.log('Got new message from server.',message);
});