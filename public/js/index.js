var socket = io();


socket.on('homepage',function (rooms) {
    if(rooms.length > 0){
        var options = '';
        rooms.forEach(function(room) {
            options += `<option value="${room}">`;
        });  
        console.log(options);
        document.getElementById('browsers').innerHTML = options;
    } else {
        jQuery('[name=room]').attr('placeholder','No active rooms...');
    }
    
});

socket.on('updateRoomList',function(rooms){
    var ol = jQuery('<ol></ol>');
    rooms.forEach(function(room) {
        ol.append(jQuery('<li></li>').text(room));
    });

    jQuery('#rooms').html(ol);
});

