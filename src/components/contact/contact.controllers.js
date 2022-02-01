const { validationResult } = require('express-validator');

const contactService = require('./contact.services');
// const userService = require('../user/user.service');
const contactError = require('./contact.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateContact = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw contactError.InvalidInput(errors.mapped());
	}

	const authorizedUser = req.currentUser;
	const contactData = req.body;
	const savedContact = await contactService.createContact(contactData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedContact,
			success: true
		})
	);
};

exports.getAllContacts = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const contacts = await contactService.fetchAllContacts(page, size);

	return res.status(200).send(
		sendResponse({
			message: 'contacts successfully loaded',
			content: contacts,
			success: true,
			page,
			size
		})
	);
};

exports.postEditContact = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw contactError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	// const {name} = req.body;
	const authorizedUser = req.currentUser;
	const { contactId } = req.params;

	// const isValidOwner = await contactNameService.checkcontactNameOwnership();

	// if (!isValidOwner) {
	// 	throw contactNameError.NotAllowed('You cannot perform this action');
	// }

	if (isEmpty(contactId)) {
		throw contactError.NotFound('Please specify a contact to edit');
	}

	const query = { _id: contactId };
	const update = { $set: updateData };
	let editedContact = await contactService.editContact(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'contact updated',
			content: editedContact,
			success: true
		})
	);
};

exports.postDeleteContact = async (req, res) => {
	try {
		const { id } = req.params;
		const contactDelete = await contactService.deleteOneContact(id);
		if (!contactDelete) {
			res.status(402).send({ Not_found: 'Could not find contact' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${contactDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};



exports.postGetAContact = async (req, res) => {
	try {
		let contactId = req.params.id;

		if (isEmpty(contactId)) {
			throw contactError.NotFound('Please specify a contact to delete');
		}
		const contact = await contactService.fetchAContact(contactId);

		if (!contact) {
			throw contactError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: contact });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding contact' });
	}
};
