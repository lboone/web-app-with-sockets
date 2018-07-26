var socket = io();


socket.on('connect',function () {
    console.log('Connected to server');
});

socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('newMessage',function (message) {
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});


var formMessage = jQuery('[name=message]');
jQuery('#message-form').on('submit',function (e){
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: formMessage.val()
    }, function() {
        
    });
    formMessage.val('');
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage',{
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    })
});

