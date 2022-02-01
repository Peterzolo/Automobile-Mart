const { isEmpty } = require('../../library/helpers/validationHelpers');

const Booking = require('./booking.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const booking = await Booking.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return booking[0];
	}
	return booking;
};

const saveBookingWithPayload = async (payload = {}) => {
	const booking = new Booking(payload);
	await booking.save();

	return booking;
};
exports.createBooking = async (payload) => {
	const booking = await saveBookingWithPayload(payload);
	const savedBooking = await findAndPopulate(
		{ _id: booking._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedBooking;
};

////////////////////////////////////////////////////////////////////////////

const findBooking = async (query = {}, findMode = 'one', page, size) => {
	const booking = await Booking.find(query);
	if (findMode === 'one') {
		return booking[0];
	}
	return booking;
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

// const Bookings = await Booking.find({}, {}, {limit: limit, skip : skip})
// const Bookings = await Booking.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkBookingOwnership = async (bookingId) => {
	const booking = await findBooking({ bookingId });

	if (isEmpty(booking)) {
		return false;
	}

	return true;
};

exports.fetchAllBookings = async () => {
	const booking = await Booking.find({ status: 'active' }).populate();
	return booking;
};

const updateBooking = async (query, bookingObj) => {
	const updatedBooking = await Booking.updateOne(query, bookingObj);
	return updatedBooking;
};

exports.editBooking = async (query, bookingObj) => {
	await updateBooking(query, bookingObj);

	const booking = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return booking;
};

exports.deleteOneBooking = async (id) => {
	let deletedBooking = await Booking.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedBooking;
};

exports.fetchABooking = async (id) => {
	let singleBooking = await Booking.findById(id).populate();

	return singleBooking;
};
