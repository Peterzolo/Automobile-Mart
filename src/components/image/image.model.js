const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ImageSchema = new mongoose.Schema(
	{
		picture: {
			type: String,
			default: ''
		},
		status: {
			type: String,
			enum: [ 'active', 'inactive' ],
			default: 'active'
		}
	},
	{ timestamps: true }
);

const Image = mongoose.model('image', ImageSchema);
module.exports = Image;
