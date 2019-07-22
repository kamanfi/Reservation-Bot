const editJsonFile = require("edit-json-file");
let file = editJsonFile('./db/file.json');
let db = file.toObject();
const Restaurants = require('../models/Restaurants');
const Reservations = require('../models/Reservations');



// function getRestaurants() {
//     // console.log(Object.keys(db.Restaurants));
//     return (Object.keys(db.Restaurants));
// }

function getReservations(restaurants_name) {
    // get all filled reservations
    reservation = db.Restaurants[restaurants_name].available_slots.filter(booking => {
        return (Object.keys(booking).length > 0 && booking.reservation_date - new Date().getTime() > 3600000);
    });
    //get 
    return reservation;
}

function getRestaurants(){
    let restaurant;
    Restaurants.find({}, (err,restaurants) =>{
        // console.log(restaurants)
        let restaurantsNames=[];
        restaurantsNames=restaurants.map((restaurant)=> restaurant.name)
        restaurant =restaurantsNames
    })
    return restaurant;
}
module.exports = {
    getRestaurants,
    getReservations
}
