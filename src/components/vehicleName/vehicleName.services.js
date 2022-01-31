const { isEmpty } = require('../../library/helpers/validationHelpers');

const VehicleName = require('./vehicleName.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const vehicleName = await VehicleName.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return vehicleName[0];
	}
	return vehicleName;
};

const saveVehicleNameWithPayload = async (payload = {}) => {
	const vehicleName = new VehicleName(payload);
	await v.save();

	return vehicleName;
};
exports.createVehicleName = async (payload) => {
	const vehicleName = await saveVehicleNameWithPayload(payload);
	const savedVehicleName = await findAndPopulate(
		{ _id: vehicleName._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedVehicleName;
};

////////////////////////////////////////////////////////////////////////////

const findVehicleName = async (query = {}, findMode = 'one', page, size) => {
	const vehicleName = await VehicleName.find(query);
	if (findMode === 'one') {
		return vehicleName[0];
	}
	return vehicleName;
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

// const VehicleNames = await VehicleName.find({}, {}, {limit: limit, skip : skip})
// const VehicleNames = await VehicleName.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkVehicleNameOwnership = async (VehicleNameId) => {
	const vehicleName = await findVehicleName({ VehicleNameId });

	if (isEmpty(vehicleName)) {
		return false;
	}

	return true;
};

exports.fetchAllVehicleNames = async () => {
	const vehicleName = await VehicleName.find({ status: 'active' }).populate();
	return vehicleName;
};

const updateVehicleName = async (query, VehicleNameObj) => {
	const updatedVehicleName = await VehicleName.updateOne(query, VehicleNameObj);
	return updatedVehicleName;
};

exports.editVehicleName = async (query, vehicleNameObj) => {
	await updateVehicleName(query, vehicleNameObj);

	const vehicleName = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return vehicleName;
};

exports.deleteOneVehicleName = async (id) => {
	let deletedVehicleName = await VehicleName.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedVehicleName;
};

exports.fetchAVehicleName = async (id) => {
	let singleVehicleName = await VehicleName.findById(id).populate();

	return singleVehicleName;
};
