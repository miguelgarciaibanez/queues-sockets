
const fs = require('fs');

class Ticket {
    constructor(number, desktop){
    
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets= [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if ( data.today == this.today ){
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            //restart everything
            this.restartCounter();
        }

    }

    restartCounter() {

        this.last = 0;
        this.tikects = [];
        this.lastFour = [];
        this.saveToFile();
    }

    nextTicket() {
        this.last += 1;

        let ticket = new Ticket(this.last,null);

        this.tickets.push(ticket);

        this.saveToFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        //console.log('getting Last ticket');
        return `Ticket ${this.last}`;
    }

    getLastFour(){
        return this.lastFour;
    }

    serveTicket( desktop ){

        if ( this.tickets.length === 0 ){
            return 'No tickets left';
        }

        let ticketNumber = this.tickets[0].number;

        this.tickets.shift(); //erase first

        let serveTicket = new Ticket(ticketNumber, desktop);

        this.lastFour.unshift( serveTicket ); //add at the beginning

        if ( this.lastFour.length > 4 ) {
            this.lastFour.splice( -1 , 1 ); //erase last
        }

        console.log('Last 4');
        console.log(this.lastFour);

        this.saveToFile();

        return serveTicket;

    }

    saveToFile() {

        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json',jsonDataString);
    }
}


module.exports = {
    TicketControl
}