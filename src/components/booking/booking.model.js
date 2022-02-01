const mongoose = require('mongoose');
Schema = mongoose.Schema;

const BookingSchema = new mongoose.Schema(
	{
		vehicle: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: [ 'active', 'inactive' ],
			default: 'active'
		}
	},
	{ timestamps: true }
);

const Booking = mongoose.model('booking', BookingSchema);
module.exports = Booking;
