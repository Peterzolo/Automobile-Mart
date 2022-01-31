const { validationResult } = require('express-validator');

const vehicleModelService = require('./vehicleModel.services');

const vehicleModelError = require('./vehicleModel.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateVehicleModel = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw vehicleModelError.InvalidInput(errors.mapped());
	}

	const vehicleModelData = req.body;
	const savedVehicleModel = await vehicleModelService.createVehicleModel(vehicleModelData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedVehicleModel,
			success: true
		})
	);
};

exports.getAllVehicleModels = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const vehicleModels = await vehicleModelService.fetchAllVehicleModels(page, size);

	if (!vehicleModels.length) {
		throw vehicleModelError.NotFound();
	}

	return res.status(200).send(
		sendResponse({
			message: 'vehicleModels successfully loaded',
			content: vehicleModels,
			success: true,
			page,
			size
		})
	);
};

exports.postEditVehicleModel = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw vehicleModelError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	const { vehicleModelId } = req.params;

	// const isValidOwner = await vehicleModelNameService.checkvehicleModelNameOwnership();

	// if (!isValidOwner) {
	// 	throw vehicleModelNameError.NotAllowed('You cannot perform this action');
	// }

	if (isEmpty(vehicleModelId)) {
		throw vehicleModelError.NotFound('Please specify a vehicleModel to edit');
	}

	const query = { _id: vehicleModelId };
	const update = { $set: updateData };
	let editedVehicleModel = await vehicleModelService.editVehicleModel(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'vehicleModel updated',
			content: editedVehicleModel,
			success: true
		})
	);
};

exports.postDeleteVehicleModel = async (req, res) => {
	try {
		const { id } = req.params;
		const vehicleModelDelete = await vehicleModelService.deleteOneVehicleModel(id);
		if (!vehicleModelDelete) {
			res.status(402).send({ Not_found: 'Could not find vehicleModel' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${vehicleModelDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

////////////////////////////////////////////////////////////////////

exports.postGetAVehicleModel = async (req, res) => {
	try {
		let vehicleModelId = req.params.id;

		if (isEmpty(vehicleModelId)) {
			throw vehicleModelError.NotFound('Please specify a vehicleModel to delete');
		}
		const vehicleModel = await vehicleModelService.fetchAVehicleModel(vehicleModelId);

		if (!vehicleModel) {
			throw vehicleModelError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: vehicleModel });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding vehicleModel' });
	}
};
