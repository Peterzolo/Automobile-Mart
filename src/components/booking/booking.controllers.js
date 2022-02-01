const { validationResult } = require('express-validator');

const bookingService = require('./booking.services');
// const userService = require('../user/user.service');
const bookingError = require('./booking.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postCreateBooking = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw bookingError.InvalidInput(errors.mapped());
	}

	const authorizedUser = req.currentUser;
	const bookingData = req.body;
	const savedBooking = await bookingService.createBooking(bookingData);

	return res.status(200).send(
		sendResponse({
			message: 'condition created successfully',
			content: savedBooking,
			success: true
		})
	);
};

exports.getAllBookings = async (req, res) => {
	let { page, size } = req.query;

	if (!page) {
		page = 1;
	}
	if (!size) {
		size = 10;
	}

	const bookings = await bookingService.fetchAllBookings(page, size);

	return res.status(200).send(
		sendResponse({
			message: 'bookings successfully loaded',
			content: bookings,
			success: true,
			page,
			size
		})
	);
};

exports.postEditBooking = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw bookingError.InvalidInput(errors.mapped());
	}

	let updateData = req.body;
	// const {name} = req.body;
	const authorizedUser = req.currentUser;
	const { bookingId } = req.params;

	// const isValidOwner = await bookingNameService.checkbookingNameOwnership();

	// if (!isValidOwner) {
	// 	throw bookingNameError.NotAllowed('You cannot perform this action');
	// }

	if (isEmpty(bookingId)) {
		throw bookingError.NotFound('Please specify a booking to edit');
	}

	const query = { _id: bookingId };
	const update = { $set: updateData };
	let editedBooking = await bookingService.editBooking(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'booking updated',
			content: editedBooking,
			success: true
		})
	);
};

exports.postDeleteBooking = async (req, res) => {
	try {
		const { id } = req.params;
		const bookingDelete = await bookingService.deleteOneBooking(id);
		if (!bookingDelete) {
			res.status(402).send({ Not_found: 'Could not find booking' });
		} else {
			res.status(201).send({ Success: `Successfully deleted ${bookingDelete}` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.postGetABooking = async (req, res) => {
	try {
		let bookingId = req.params.id;

		if (isEmpty(bookingId)) {
			throw bookingError.NotFound('Please specify a booking to delete');
		}
		const booking = await bookingService.fetchABooking(bookingId);

		if (!booking) {
			throw bookingError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: booking });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding booking' });
	}
};
