const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('nextTicket',( data, callback ) => {
        //console.log('nextTicket received',ticketControl.nextTicket());
        dataResponse = {
            message:ticketControl.nextTicket()
        }
        callback(dataResponse);
    });

    //emit event currentState
    client.emit('currentState',{
            currentTicket:ticketControl.getLastTicket(),
            lastFour: ticketControl.getLastFour()
        });

    client.on('serveTicket', (data, callback)=>{
        if (!data.desktop){
            return callback({
                err:true,
                message: 'The desktop is mandatory'
            });
        }

        let serveTicket = ticketControl.serveTicket( data.desktop );
     
        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getLastFour()
        });

        callback( serveTicket );


        //Notify changes in the last four
    });

});