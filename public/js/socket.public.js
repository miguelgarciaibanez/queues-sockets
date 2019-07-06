var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblEscritorio1');
var lblDesktop2 = $('#lblEscritorio2');
var lblDesktop3 = $('#lblEscritorio3');
var lblDesktop4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
var lblDesktops = [lblDesktop1,lblDesktop2,lblDesktop3,lblDesktop4];

socket.on('currentState', function(data){
    //console.log( data );
    updateHTML( data.lastFour );
});

socket.on('lastFour', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML( data.lastFour );
});

function updateHTML( last4 ) {
    for (var i =0; i<last4.length; i++){
        lblTickets[i].text('Ticket ' + last4[i].number);
        lblDesktops[i].text('Desktop ' + last4[i].desktop);
    }
}

