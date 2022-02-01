const { validationResult } = require('express-validator');

const locationService = require('./location.services');
// const userService = require('../user/user.service');
const locationError = require('./location.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateLocation = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw locationError.InvalidInput(errors.mapped());
	}

	const authorizedUser = req.currentUser;
	const locationData = req.body;
	const savedLocation = await locationService.createLocation(locationData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedLocation,
			success: true
		})
	);
};

exports.getAllLocations = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const locations = await locationService.fetchAllLocations(page, size);

	return res.status(200).send(
		sendResponse({
			message: 'locations successfully loaded',
			content: locations,
			success: true,
			page,
			size
		})
	);
};

exports.postEditLocation = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw locationError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	// const {name} = req.body;
	const authorizedUser = req.currentUser;
	const { locationId } = req.params;

	// const isValidOwner = await locationNameService.checklocationNameOwnership();

	// if (!isValidOwner) {
	// 	throw locationNameError.NotAllowed('You cannot perform this action');
	// }

	if (isEmpty(locationId)) {
		throw locationError.NotFound('Please specify a location to edit');
	}

	const query = { _id: locationId };
	const update = { $set: updateData };
	let editedLocation = await locationService.editLocation(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'location updated',
			content: editedLocation,
			success: true
		})
	);
};

exports.postDeleteLocation = async (req, res) => {
	try {
		const { id } = req.params;
		const locationDelete = await locationService.deleteOneLocation(id);
		if (!locationDelete) {
			res.status(402).send({ Not_found: 'Could not find location' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${locationDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};



exports.postGetALocation = async (req, res) => {
	try {
		let locationId = req.params.id;

		if (isEmpty(locationId)) {
			throw locationError.NotFound('Please specify a location to delete');
		}
		const location = await locationService.fetchALocation(locationId);

		if (!location) {
			throw locationError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: location });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding location' });
	}
};
