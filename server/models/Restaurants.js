const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);