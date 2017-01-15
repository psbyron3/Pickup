const db = require('../db/db.js');
const User = require('./userModel.js');

const Event = module.exports;

Event.findAllEvents = () => {

}

Event.createEvent = (newEvent) => {
  const newGame = Object.assign({}, newEvent, { attending: 0 } );
  return db.Events.create(newGame)
    .then(event => {
      //User.addHostToEvent(event, newEvent.userId)
        //.then(() => Event.findEventsByUser(newEvent.userId))
        console.log("Here is the event object after write in eventModel ::: ", event)
        return;
    })
}

// used to handle double-booking. Won't allow game to book
// at same time in same location. 
// Event.findEventByLocationAndDate = (lat, long, start, end) => {
//   const eventStart = new Date(start);
//   const eventEnd = new Date(end);
  
//   return db.Events.findAll({
//     where: {
//       latitude: lat,
//       longitude: long,
//       $or: [
//       { gameStart : {$between: [eventStart, eventEnd] } },
//       { gameEnd : {$between: [eventStart, eventEnd ] } },
//       { gameStart : {$lte : eventStart },
//         gameEnd : {$gte : eventEnd },
//       },
//       ],
//     }
//   })
//   .catch((err) => err);
// }

