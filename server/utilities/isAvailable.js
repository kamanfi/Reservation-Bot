const editJsonFile = require("edit-json-file");
const date = require('date-and-time');
const Restaurants = require('../models/Restaurants');
const Reservations = require('../models/Reservations');

let file = editJsonFile('./db/file.json');

function timeValidation(reser_date_obj, present_date_obj) {
    // console.log(reser_date_obj);
    // console.log(present_date_obj);
    return reser_date_obj.getTime() > present_date_obj.getTime();
}



   async function restaurantExist(restaurant_name){
      result = false
     await Restaurants.findOne({'name': restaurant_name}, (err,restaurant) =>{
        
         if(err){
             console.log(err);
         }
         console.log(restaurant);
          result = ((restaurant === null) ? false : true);
          
     });
     return result
}

function validator(restaurant_name, ampm, time, date_now, reser_date_obj,result) {
    //returns underfined if restaurant does not exisit
    // let conflict = db.Restaurants[restaurant_name];

    // if (conflict) {
    //     conflict = conflict.available_slots;
    //     results = conflict.filter((booking => booking.reservation_date === reser_date_obj.getTime()));
    // }
    // console.log(reser_date_obj.getTime());
    // console.log(results);

    if (!timeValidation(reser_date_obj, date_now)) {
        return {
            valid: false,
            msg: `We have not mastered time travel yet....Please pick a time in the future`
        };
    } else if (restaurantExist(restaurant_name) === false) {
        console.log(result);
        return {
            valid: false,
            msg: `${restaurant_name} is not part of our chain of Restaurants`
        }
    } else if (ampm === 'am') {
        return {
            valid: false,
            msg: `${restaurant_name} hours are from 1pm - 10pm`
        };
    } else if (time < 1 || time > 9) {
        return {
            valid: false,
            msg: `${restaurant_name} hours are from 1pm - 10pm`
        };
    } else if (false) {
        return {
            valid: false,
            msg: `Our big Round Tabe has already been booked for ${time}:PM Please pick another time`
        };
    } else {
        return {
            valid: true,
            msg: 'Table Reserved. We look forward to seeing you.'
        };
    }

}
console.log(restaurantExist('Killamanjaro') );

module.exports = validator;