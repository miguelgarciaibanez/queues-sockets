//Command to set connection
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect',function(data){
    console.log('connected to the server');
});

socket.on('disconnect',function(data){
    console.log('disconnected from the server');
});

$('button').on('click', function(){
    console.log('click');

    socket.emit('nextTicket',null, function(nextTicket){
        //console.log(nextTicket);
        label.text(nextTicket.message);
    });

});

socket.on('currentState', function(data){
    label.text(data.currentTicket);
});