const { validationResult } = require('express-validator');
const imageService = require('./image.services');

const imageError = require('./image.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateimage = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw imageError.InvalidInput(errors.mapped());
	}

	const imageData = req.body;
	const savedImage = await imageService.createImage(imageData);

	return res.status(200).send(
		sendResponse({
			message: 'image created successfully',
			content: savedImage,
			success: true
		})
	);
};

exports.getAllImages = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const images = await imageService.fetchAllImages(page, size);

	if (!images.length) {
		throw imageError.NotFound();
	}

	return res.status(200).send(
		sendResponse({
			message: 'images successfully loaded',
			content: images,
			success: true,
			page,
			size
		})
	);
};

exports.postEditImage = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw imageError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	const { imageId } = req.params;

	if (isEmpty(imageId)) {
		throw imageError.NotFound('Please specify a image to edit');
	}

	const query = { _id: imageId };
	const update = { $set: updateData };
	let editedImage = await imageService.editImage(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'image updated',
			content: editedImage,
			success: true
		})
	);
};

exports.postDeleteImage = async (req, res) => {
	try {
		const { id } = req.params;
		const imageDelete = await imageService.deleteOneImage(id);
		if (!imageDelete) {
			res.status(402).send({ Not_found: 'Could not find image' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${imageDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

////////////////////////////////////////////////////////////////////

exports.postGetAImage = async (req, res) => {
	try {
		let imageId = req.params.id;

		if (isEmpty(imageId)) {
			throw imageError.NotFound('Please specify a image to delete');
		}
		const image = await imageService.fetchAImage(imageId);

		if (!image) {
			throw imageError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: image });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding image' });
	}
};
