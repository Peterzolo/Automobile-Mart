const { validationResult } = require('express-validator');

const conditionService = require('./condition.services');

const conditionError = require('./condition.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateCondition = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw conditionError.InvalidInput(errors.mapped());
	}

	const conditionData = req.body;
	const savedCondition = await conditionService.createCondition(conditionData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedCondition,
			success: true
		})
	);
};

exports.getAllConditions = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const conditions = await conditionService.fetchAllConditions(page, size);

	if (!conditions.length) {
		throw conditionError.NotFound();
	}

	return res.status(200).send(
		sendResponse({
			message: 'conditions successfully loaded',
			content: conditions,
			success: true,
			page,
			size
		})
	);
};

exports.postEditCondition = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw conditionError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	const { conditionId } = req.params;

	if (isEmpty(conditionId)) {
		throw conditionError.NotFound('Please specify a condition to edit');
	}

	const query = { _id: conditionId };
	const update = { $set: updateData };
	let editedCondition = await conditionService.editCondition(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'condition updated',
			content: editedCondition,
			success: true
		})
	);
};

exports.postDeleteCondition = async (req, res) => {
	try {
		const { id } = req.params;
		const conditionDelete = await conditionService.deleteOneCondition(id);
		if (!conditionDelete) {
			res.status(402).send({ Not_found: 'Could not find condition' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${conditionDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

////////////////////////////////////////////////////////////////////

exports.postGetACondition = async (req, res) => {
	try {
		let conditionId = req.params.id;

		if (isEmpty(conditionId)) {
			throw conditionError.NotFound('Please specify a condition to delete');
		}
		const condition = await conditionService.fetchACondition(conditionId);

		if (!condition) {
			throw conditionError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: condition });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding condition' });
	}
};
