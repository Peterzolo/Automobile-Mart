const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new mongoose.Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true
		},

		vehicleNames: {
			type: Schema.Types.ObjectId,
			ref: 'vehicleName',
			required: true
		},

		brand: {
			type: Schema.Types.ObjectId,
			ref: 'brand',
			required: true
		},

		vehicleType: {
			type: String,
			required: true
		},

		vehicleModel: {
			type: Schema.Types.ObjectId,
			ref: 'vehicleModel',
			required: true
		},

		engineType: {
			type: String,
			required: true
		},

		gearType: {
			type: String,
			required: true,
			enum: [ 'automatic', 'manual' ],
			lowerCase: true
		},
		wheelType: {
			type: String,
			required: true,
			enum: [ 'alloy', 'normal' ],
			lowerCase: true
		},

		condition: {
			type: Schema.Types.ObjectId,
			ref: 'condition',
			required: true
		},

		color: {
			type: String,
			required: true
		},

		image: {
			type: Schema.Types.ObjectId,
			ref: 'image',
			required: true
		},

		price: {
			type: Number,
			required: true
		},

		location: {
			type: Schema.Types.ObjectId,
			ref: 'location',
			required: true
		},
		contact: {
			type: Schema.Types.ObjectId,
			ref: 'contact',
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

const Vehicle = mongoose.model('vehicle', VehicleSchema);
module.exports = Vehicle;
