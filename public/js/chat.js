var socket = io();


function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function () {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params, function(err){
        if(err){
            window.location.href = '/';
            alert(err);
        }
    });
});

socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('updateRoomList',function(rooms){
    var ol = jQuery('<ol></ol>');
    rooms.forEach(function(room) {
        ol.append(jQuery('<li></li>').text(room));
    });

    jQuery('#rooms').html(ol);
});

socket.on('newMessage',function (message) {

    var template = jQuery('#message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template,{
        text:message.text,
        from: message.from,
        fromMe: message.fromMe == true ? 'fromMe' : '',
        createdAt: formatedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
});

socket.on('newLocationMessage',function(message) {
    var template = jQuery('#location-message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template,{
        url:message.url,
        from: message.from,
        fromMe: message.fromMe == true ? 'fromMe' : '',
        createdAt: formatedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
});




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
            from: 'User',
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    })
});

