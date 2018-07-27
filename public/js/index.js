var socket = io();


socket.on('connect',function () {
    console.log('Connected to server');
});

socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('newMessage',function (message) {
    // var formatedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime}: ${message.text}`);
    // jQuery('#messages').append(li);

    var template = jQuery('#message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template,{
        text:message.text,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery("#messages").append(html);
});

socket.on('newLocationMessage',function(message) {
    var template = jQuery('#location-message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template,{
        url:message.url,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery("#messages").append(html);
})


var formMessage = jQuery('[name=message]');
jQuery('#message-form').on('submit',function (e){
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: formMessage.val()
    }, function() {
        formMessage.val('');
    });
    
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled','disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage',{
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    })
});

