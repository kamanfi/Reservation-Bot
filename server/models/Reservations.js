const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationsSchema = new Schema({
    phoneNumber: {
        type: String,
        default: 'ordered through slack',
        required: false
    },
    restaurantName:{
        type: String,
        required: true
    },
    reservationDate: {
        type: Number,
        required: true
    }

},{timestamps: true});
ReservationsSchema.index({ 'creationDate': 1 }, { expireAfterSeconds: 10 }); 


module.exports = Reservations = mongoose.model('reservations', ReservationsSchema);