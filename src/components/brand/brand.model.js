const mongoose = require('mongoose');
Schema = mongoose.Schema;

const BrandSchema = new mongoose.Schema(  
	{
		brandName: {
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

const Brand = mongoose.model('brand', BrandSchema);
module.exports = Brand;
