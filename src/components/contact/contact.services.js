const { isEmpty } = require('../../library/helpers/validationHelpers');

const Contact = require('./contact.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const contact = await Contact.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return contact[0];
	}
	return contact;
};

const saveContactWithPayload = async (payload = {}) => {
	const contact = new Contact(payload);
	await contact.save();

	return contact;
};
exports.createContact = async (payload) => {
	const contact = await saveContactWithPayload(payload);
	const savedContact = await findAndPopulate(
		{ _id: contact._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedContact;
};

////////////////////////////////////////////////////////////////////////////

const findContact = async (query = {}, findMode = 'one', page, size) => {
	const contact = await Contact.find(query);
	if (findMode === 'one') {
		return contact[0];
	}
	return contact;
};

// let { page, size } = req.query;

// if (!page) {
// 	page = 1;
// }
// if (!size) {
// 	size = 10;
// }

// const limit = parseInt(size);
// const skip = (page - 1) * size;

// const Contacts = await Contact.find({}, {}, {limit: limit, skip : skip})
// const Contacts = await Contact.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkContactOwnership = async (contactId) => {
	const contact = await findContact({ contactId });

	if (isEmpty(contact)) {
		return false;
	}

	return true;
};

exports.fetchAllContacts = async () => {
	const contact = await Contact.find({ status: 'active' }).populate();
	return contact;
};

const updateContact = async (query, contactObj) => {
	const updatedContact = await Contact.updateOne(query, contactObj);
	return updatedContact;
};

exports.editContact = async (query, contactObj) => {
	await updateContact(query, contactObj);

	const contact = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return contact;
};

exports.deleteOneContact = async (id) => {
	let deletedContact = await Contact.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedContact;
};

exports.fetchAContact = async (id) => {
	let singleContact = await Contact.findById(id).populate();

	return singleContact;
};
