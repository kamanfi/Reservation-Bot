const express = require('express');
const router = express.Router();
const Restaurants = require('../models/Restaurants');
const Reservations = require('../models/Reservations');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ msg: "This is the test route" });
});

router.post('/db', function(req,res,next){
  const newRestaurant = new Restaurants({
    name: req.body.name
  });

  newRestaurant.save()
  .then((Restaurant) => res.json({Restaurant}))
  .catch((err) => console.log(err));

});

router.post('/reserve', function(req,res,next){
  const newReservation = new Reservations({
    phoneNumer: req.body.phoneNumber,
    restaurantName: req.body.restaurantName,
    reservationDate: req.body.reservationDate
  });

  newReservation.save()
  .then((reservation) => res.json({reservation}))
  .catch((err) => console.log(error));
});

router.get('/insert', function(req,res,next){

  Restaurants.findOne({'name': 'Killamanjaro'})
  .then((restaurant) =>{
    if (!restaurant){
      res.status(404).json({ restaurant: "Please Delete" });
    }else{
      const reservation = new Reservations({
        phoneNumer: '+3475612927'
      });
      reservation.save();
      restaurant.reservations.push(reservation);
      restaurant.save();
      res.json(restaurant);
    }
  })
  .catch((err) => console.log(err));



});

module.exports = router;
