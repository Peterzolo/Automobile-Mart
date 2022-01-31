const mongoose = require('mongoose');
Schema = mongoose.Schema;

const VehicleNameSchema = new mongoose.Schema(
	{
		vehicleName: {
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

const VehicleNames = mongoose.model('vehicleName', VehicleNameSchema);
module.exports = VehicleNames;
