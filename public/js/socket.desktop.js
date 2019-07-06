var socket = io();


var searchParams = new URLSearchParams( window.location.search );

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Escritorio is mandatory');
}

var desktop = searchParams.get('escritorio');

var label = $('small');

console.log(desktop);
$('h1').text('Desktop: ' + desktop);

$('button').on('click', function(){

    socket.emit('serveTicket',{desktop: desktop}, function( resp ){
        if (resp === 'No tickets left'){
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket:' + resp.number);
    });

});