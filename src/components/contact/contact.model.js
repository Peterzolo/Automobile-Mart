const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ContactSchema = new mongoose.Schema(
	{
		phone: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		status: {
			type: String,
			enum: [ 'active', 'inactive' ],
			default: 'active'
		}
	},
	{ timestamps: true }
);

const Contact = mongoose.model('contact', ContactSchema);
module.exports = Contact;
