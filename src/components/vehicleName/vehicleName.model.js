const mongoose = require('mongoose');
Schema = mongoose.Schema;

const VehicleNamesSchema = new mongoose.Schema(
	{
		name: {
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

const VehicleNames = mongoose.model('vehicleName', VehicleNamesSchema);
module.exports = VehicleNames;
