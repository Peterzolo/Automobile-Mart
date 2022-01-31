const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ConditionSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true
		},

		conditionType: {
			type: String,
			enum: [ 'Brand New', 'Fairly used - Nigeria', 'Fairly used - Foreign', 'Poorly used' ],
			default: 'Brand New'
		},
		status: {
			type: String,
			enum: [ 'active', 'inactive' ],
			default: 'active'
		}
	},
	{ timestamps: true }
);

const Condition = mongoose.model('condition', ConditionSchema);
module.exports = Condition;
