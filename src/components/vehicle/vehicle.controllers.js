const { validationResult } = require('express-validator');

const vehicleService = require('./vehicle.services');
// const userService = require('../user/user.service');
const vehicleError = require('./vehicle.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateVehicle = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw vehicleError.InvalidInput(errors.mapped());
	}

	const authorizedUser = req.currentUser;
	const vehicleData = req.body;
	const savedVehicle = await vehicleService.createVehicle(vehicleData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedVehicle,
			success: true
		})
	);
};

exports.getAllVehicles = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const vehicles = await vehicleService.fetchAllVehicles(page, size);

	return res.status(200).send(
		sendResponse({
			message: 'vehicles successfully loaded',
			content: vehicles,
			success: true,
			page,
			size
		})
	);
};

exports.postEditVehicle = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw vehicleError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	// const {name} = req.body;
	const authorizedUser = req.currentUser;
	const { vehicleId } = req.params;

	// const isValidOwner = await vehicleNameService.checkVehicleNameOwnership();

	// if (!isValidOwner) {
	// 	throw vehicleNameError.NotAllowed('You cannot perform this action');
	// }

	if (isEmpty(vehicleId)) {
		throw vehicleError.NotFound('Please specify a vehicle to edit');
	}

	const query = { _id: vehicleId };
	const update = { $set: updateData };
	let editedVehicle = await vehicleService.editVehicle(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'vehicle updated',
			content: editedVehicle,
			success: true
		})
	);
};

/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////

exports.postDeleteVehicle = async (req, res) => {
	try {
		const { id } = req.params;
		const vehicleDelete = await vehicleService.deleteOneVehicle(id);
		if (!vehicleDelete) {
			res.status(402).send({ Not_found: 'Could not find vehicle' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${vehicleDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

////////////////////////////////////////////////////////////////////

exports.postGetAVehicle = async (req, res) => {
	try {
		let vehicleId = req.params.id;

		if (isEmpty(vehicleId)) {
			throw vehicleError.NotFound('Please specify a vehicle to delete');
		}
		const vehicle = await vehicleService.fetchAVehicle(vehicleId);

		if (!vehicle) {
			throw vehicleError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: vehicle });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding vehicle' });
	}
};
