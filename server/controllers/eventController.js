const Event = require('../models/eventModel');
const url = require('url');
const fs = require('fs');

module.exports = {
  '/': {
    get(req, res) {
      Event.findAllEvents()
        .then((events) => {
          if (events.length === 0) {
            res.end("No events in this area!")
          } else {
            res.send(events);
          }
        })
        .catch((err) => {
          res.send(err)
        });
    },
    post(req, res) {
      const newEvent = {
        eventName: req.body.eventName,
        sport: req.body.sport,
        eventPic: req.body.eventPic,
        description: req.body.description,
        maxPlayers: req.body.maxPlayers,
        playersNeeded: req.body.playersNeeded,
        attending: req.body.attending,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        gameStart: req.body.gameStart,
        gameEnd: req.body.gameEnd,
        userId: req.body.userId
      };
      console.log("Req.body in controller :::::", req.body)
      console.log("In event controller post w/ event obj: ", newEvent);
      // Event.findEventByLocationAndDate(
      //   newEvent.latitude,
      //   newEvent.longitude,
      //   newEvent.gameStart,
      //   newEvent.gameEnd)
      //   console.log("firing findEventByLocationAndDate")
      //   .then((event) => {
      //     console.log("Now attempting to create event...")
      //     if (event.length > 0) {
      //       return res.send('Sorry there is already a game booked at this time and location.')
      //     }
      return Event.createEvent(newEvent)
        .then((result) => {
          if (result) {
            res.send(result);
            res.status(201).json({success: true});
          }
        })
        .catch((err) => {
          res.send(err);
          res.status(404).json({success: false});
        });
    },
    put(req, res) {

    },
    delete(req, res) {

    }
  },
};