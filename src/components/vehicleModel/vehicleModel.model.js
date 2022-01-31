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
			type: Number,
			required: true
		},

		active: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

const VehicleModel = mongoose.model('vehicleModel', ModelSchema);
module.exports = VehicleModel;
