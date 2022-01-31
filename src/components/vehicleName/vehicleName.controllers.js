const { validationResult } = require('express-validator');

const vehicleNameService = require('./vehicleName.services');
// const userService = require('../user/user.service');
const vehicleNameError = require('./vehicleName.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateVehicleName = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw vehicleNameError.InvalidInput(errors.mapped());
	}

	const authorizedUser = req.currentUser;
	const vehicleNameData = req.body;
	const savedVehicleName = await vehicleNameService.createVehicleName(vehicleNameData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedVehicleName,
			success: true
		})
	);
};

exports.getAllVehicleNames = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const vehicleNames = await vehicleNameService.fetchAllVehicleNames(page, size);

	if (!vehicleNames.length) {
		throw vehicleNameError.NotFound();
	}

	return res.status(200).send(
		sendResponse({
			message: 'vehicleNames successfully loaded',
			content: vehicleNames,
			success: true,
			page,
			size
		})
	);
};

exports.postEditVehicleName = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw vehicleNameError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	// const {name} = req.body;
	const authorizedUser = req.currentUser;
	const { vehicleNameId } = req.params;

	// const isValidOwner = await vehicleNameNameService.checkvehicleNameNameOwnership();

	// if (!isValidOwner) {
	// 	throw vehicleNameNameError.NotAllowed('You cannot perform this action');
	// }

	if (isEmpty(vehicleNameId)) {
		throw vehicleNameError.NotFound('Please specify a vehicleName to edit');
	}

	const query = { _id: vehicleNameId };
	const update = { $set: updateData };
	let editedVehicleName = await vehicleNameService.editVehicleName(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'vehicleName updated',
			content: editedVehicleName,
			success: true
		})
	);
};

exports.postDeleteVehicleName = async (req, res) => {
	try {
		const { id } = req.params;
		const vehicleNameDelete = await vehicleNameService.deleteOneVehicleName(id);
		if (!vehicleNameDelete) {
			res.status(402).send({ Not_found: 'Could not find vehicleName' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${vehicleNameDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

////////////////////////////////////////////////////////////////////

exports.postGetAVehicleName = async (req, res) => {
	try {
		let vehicleNameId = req.params.id;

		if (isEmpty(vehicleNameId)) {
			throw vehicleNameError.NotFound('Please specify a vehicleName to delete');
		}
		const vehicleName = await vehicleNameService.fetchAVehicleName(vehicleNameId);

		if (!vehicleName) {
			throw vehicleNameError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: vehicleName });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding vehicleName' });
	}
};
