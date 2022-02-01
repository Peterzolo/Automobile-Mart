const mongoose = require('mongoose');
Schema = mongoose.Schema;

const LocationSchema = new mongoose.Schema(  
	{
		area: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum : ['active', 'inactive'],
			default: 'active'
		}
	},
	{ timestamps: true }
);

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
