const { validationResult } = require('express-validator');
const brandService = require('./brand.services');
// const userService = require('../user/user.service');
const brandError = require('./brand.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateBrand = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw brandError.InvalidInput(errors.mapped());
	}

	const authorizedUser = req.currentUser;
	const brandData = req.body;
	const savedBrand = await brandService.createBrand(brandData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedBrand,
			success: true
		})
	);
};

exports.getAllbrands = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const brands = await brandService.fetchAllBrands(page, size);

	return res.status(200).send(
		sendResponse({
			message: 'brands successfully loaded',
			content: brands,
			success: true,
			page,
			size
		})
	);
};

exports.postEditBrand = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw brandError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	// const {name} = req.body;
	const authorizedUser = req.currentUser;
	const { brandId } = req.params;

	// const isValidOwner = await brandNameService.checkbrandNameOwnership();

	// if (!isValidOwner) {
	// 	throw brandNameError.NotAllowed('You cannot perform this action');
	// }

	if (isEmpty(brandId)) {
		throw brandError.NotFound('Please specify a brand to edit');
	}

	const query = { _id: brandId };
	const update = { $set: updateData };
	let editedBrand = await brandService.editBrand(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'brand updated',
			content: editedBrand,
			success: true
		})
	);
};

exports.postDeleteBrand = async (req, res) => {
	try {
		const { id } = req.params;
		const brandDelete = await brandService.deleteOneBrand(id);
		if (!brandDelete) {
			res.status(402).send({ Not_found: 'Could not find brand' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${brandDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

////////////////////////////////////////////////////////////////////

exports.postGetABrand = async (req, res) => {
	try {
		let brandId = req.params.id;

		if (isEmpty(brandId)) {
			throw brandError.NotFound('Please specify a brand to delete');
		}
		const brand = await brandService.fetchABrand(brandId);

		if (!brand) {
			throw brandError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: brand });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding brand' });
	}
};
