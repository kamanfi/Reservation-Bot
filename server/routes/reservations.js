var express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const date = require('date-and-time');
const Base64 = require('js-base64').Base64;
const editJsonFile = require("edit-json-file");
let file = editJsonFile('./db/file.json');
const Restaurants = require('../models/Restaurants');
const Reservations = require('../models/Reservations');

let dbAPI  = require('../utilities/dbAPI');
let validator = require('../utilities/isAvailable');

var router = express.Router();

router.post('/sms', function (req, res, next) {
  const twiml = new MessagingResponse();

  // logic for updating the database from the request of the user 
  // 1. make an object for the data and assign it to a var 
  // 2. find the date as we'll need it
  // 3. file.set(whatever, var) file.save() 
  // format of message: 
  // Reservation for NAME (first_last) at DATE TIME at RESTAURANT
  let msg = req.body.Body.split(' ');
  let name = `${msg[2]} ${msg[3]}`;
  let reservation_date = msg[5];
  let stringTime = msg[6];
  let ampm = stringTime.slice(stringTime.indexOf('m') - 1);
  let time = parseInt(stringTime.slice(0, stringTime.indexOf('m') - 1));
  let restaurant_name = msg[8];
  let phoneNum = req.body.From;
  let restaurant_id = Base64.encode(restaurant_name + date + time);

  let reservation_date_obj = new Date(date.parse(`${reservation_date} ${time}p.m.`, 'M-D-YY hA'));

  let now = new Date();
  let formatNow = date.format(now, 'M-D-YY h-A');


  validationObj = validator(restaurant_name, ampm, time, now, reservation_date_obj);

  if (validationObj.valid) {

    const newReservation = new Reservations({
      phoneNumer: phoneNum,
      restaurantName: restaurant_name,
      reservationDate: reservation_date_obj
    });
  
    newReservation.save()
    .then((reservation) => res.json({reservation}))
    .catch((err) => console.log(err));
  }

  twiml.message(validationObj.msg);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());

});


router.get('/restaurants', function (req, res, next) {

  Restaurants.find({}, (err,restaurants) =>{
    // console.log(restaurants)
    let restaurantsNames=[];
    restaurantsNames=restaurants.map((restaurant)=> restaurant.name)
    res.json(restaurantsNames);
})
});

router.post('/list', function (req, res, next) {
  console.log(req.body.name);
  Reservations.find({restaurantName: req.body.name}, (err,reservations) =>{
    // console.log(reservations)
    let reservationsList=[];
    reservationsList=reservations.map((reservation)=> reservation);
    res.json(reservationsList);
})
});



module.exports = router;

