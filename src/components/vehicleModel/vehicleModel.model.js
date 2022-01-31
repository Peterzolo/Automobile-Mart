const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
	{
		modelName: {
			type: String,
			required: true
		},
		modelNum: {
			type: String,
			required: true
		},

		manufactureYear: {
			type: Date,
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

const VehicleModel = mongoose.model('vehicleModel', ModelSchema);
module.exports = VehicleModel;
