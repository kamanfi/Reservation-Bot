const editJsonFile = require("edit-json-file");
const date = require('date-and-time');

let file = editJsonFile('./db/file.json');

function timeValidation(reser_date_obj, present_date_obj) {
    return reser_date_obj.getTime() > present_date_obj.getTime();
}


function validator(restaurant_name, ampm, time, date_now, reser_date_obj){
//    Restaurant = file.toObject();
//    if (!Restaurant[restaurant]){
//        return {
//            valid: false,
//            err: `${restaurant} is not part of our network`
//        }
//    }else if(time > 10 && time >= 1){
//        return {
//            valid: false,
//            err: `${restaurant} hours of operation is between 1pm and 10pm`
//        }
//    }
//    else if( !Restaurant[restaurant].available_slots[time-1].phoneNumber){
//        return {
//            valid: false,
//            err: `Time slot at ${restaurant} is full`
//        }
//    }
//    else{
//        return{
//            valid: true
//        };
//    }
// {
//     [restaurant_id]: {
//       id: restaurant_id,
//       name,
//       reservation_date,
//       reservation_time: {
//         start: [time, ampm], end: [time + 1, ampm]
//       },
//       created_at: formatNow,
//       restaurant_name, 
//       phone_number: phoneNum
//     }
// }
let db = file.toObject();
    
    if (!timeValidation(reser_date_obj, date_now)) {
        return {
            valid: false, 
            msg: `Please pick a time in the future`
        };
    } else if (!db.Restaurants[restaurant_name]) {
        return {
            valid: false, 
            msg: `${restaurant_name} is not part of our chain of Restaurants`
        };
    } else if (ampm === 'am') {
        return {
            valid: false, 
            msg: `${restaurant_name} hours are from 1pm - 10pm`
        };
    } else if (time < 1 || time > 9) {
        console.log(time);
        return {
            valid: false, 
            msg: `${restaurant_name} hours are from 1pm - 10pm`
        };
    } else if (Object.keys(db
        .Restaurants[restaurant_name]
        .available_slots[time - 1]).length > 0) {
            return {
                valid: false, 
                msg: `Our big Round Tabe has already been booked for ${time}:PM Please pick another time`
            };
    } else {
        return{
            valid: true,
            msg: 'Table Reserved. We look forward to seeing you.'
        };
    }
    
}
module.exports = validator;