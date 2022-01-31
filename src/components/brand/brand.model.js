const mongoose = require('mongoose');
Schema = mongoose.Schema;

const BrandSchema = new mongoose.Schema(  
	{
		name: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

const Brand = mongoose.model('brand', BrandSchema);
module.exports = Brand;
