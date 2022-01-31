const { isEmpty } = require('../../library/helpers/validationHelpers');

const Vehicle = require('./vehicle.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = 'user vehicleName brand vehicleModel condition image state',
	pathQuery = '-password',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const vehicle = await Vehicle.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return vehicle[0];
	}
	return vehicle;
};

const saveVehicleWithPayload = async (payload = {}) => {
	const vehicle = new Vehicle(payload);
	await vehicle.save();

	return vehicle;
};
exports.createVehicle = async (payload) => {
	const vehicle = await saveVehicleWithPayload(payload);
	const savedVehicle = await findAndPopulate(
		{ _id: vehicle._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedVehicle;
};

////////////////////////////////////////////////////////////////////////////

const findVehicle = async (query = {}, findMode = 'one', page, size) => {
	const vehicle = await Vehicle.find(query);
	if (findMode === 'one') {
		return vehicle[0];
	}
	return vehicle;
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

// const Vehicles = await Vehicle.find({}, {}, {limit: limit, skip : skip})
// const Vehicles = await Vehicle.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkVehicleOwnership = async (userId) => {
	const vehicle = await findVehicle({ userId });

	if (isEmpty(vehicle)) {
		return false;
	}

	return true;
};

exports.fetchAllVehicles = async () => {
	const vehicle = await Vehicle.find({ status: 'active' }).populate(
		'user vehicleName brand vehicleModel condition image state',
		'-password'
	);
	return vehicle;
};

const updateVehicle = async (query, vehicleObj) => {
	const updatedVehicle = await Vehicle.updateOne(query, vehicleObj);
	return updatedVehicle;
};

exports.editVehicle = async (query, vehicleObj) => {
	await updateVehicle(query, vehicleObj);

	const vehicle = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return vehicle;
};

exports.deleteOneVehicle = async (id) => {
	let deletedVehicle = await Vehicle.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedVehicle;
};

exports.fetchAVehicle = async (id) => {
	let singleVehicle = await Vehicle.findById(id).populate('user vehicleName brand vehicleModel condition image state', '-password');

	return singleVehicle;
};
