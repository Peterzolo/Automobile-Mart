const { isEmpty } = require('../../library/helpers/validationHelpers');

const Location = require('./location.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const Location = await Location.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return location[0];
	}
	return location;
};

const saveLocationWithPayload = async (payload = {}) => {
	const location = new Location(payload);
	await location.save();

	return location;
};
exports.createLocation = async (payload) => {
	const location = await saveLocationWithPayload(payload);
	const savedLocation = await findAndPopulate(
		{ _id: location._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedLocation;
};

////////////////////////////////////////////////////////////////////////////

const findLocation = async (query = {}, findMode = 'one', page, size) => {
	const location = await Location.find(query);
	if (findMode === 'one') {
		return location[0];
	}
	return location;
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

// const Locations = await Location.find({}, {}, {limit: limit, skip : skip})
// const Locations = await Location.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkLocationOwnership = async (locationId) => {
	const location = await findLocation({ locationId });

	if (isEmpty(location)) {
		return false;
	}

	return true;
};

exports.fetchAllLocations = async () => {
	const location = await Location.find({ status: 'active' }).populate();
	return location;
};

const updateLocation = async (query, LocationObj) => {
	const updatedLocation = await Location.updateOne(query, LocationObj);
	return updatedLocation;
};

exports.editLocation = async (query, LocationObj) => {
	await updateLocation(query, LocationObj);

	const Location = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return location;
};

exports.deleteOneLocation = async (id) => {
	let deletedLocation = await Location.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedLocation;
};

exports.fetchALocation = async (id) => {
	let singleLocation = await Location.findById(id).populate();

	return singleLocation;
};
