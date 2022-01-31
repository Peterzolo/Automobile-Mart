const { isEmpty } = require('../../library/helpers/validationHelpers');

const VehicleModel = require('./vehicleModel.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const vehicleModel = await VehicleModel.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return vehicleModel[0];
	}
	return vehicleModel;
};

const saveVehicleModelWithPayload = async (payload = {}) => {
	const vehicleModel = new VehicleModel(payload);
	await vehicleModel.save();

	return vehicleModel;
};
exports.createVehicleModel = async (payload) => {
	const vehicleModel = await saveVehicleModelWithPayload(payload);
	const savedVehicleModel = await findAndPopulate(
		{ _id: vehicleModel._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedVehicleModel;
};

////////////////////////////////////////////////////////////////////////////

const findVehicleModel = async (query = {}, findMode = 'one', page, size) => {
	const vehicleModel = await VehicleModel.find(query);
	if (findMode === 'one') {
		return vehicleModel[0];
	}
	return vehicleModel;
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

// const VehicleModels = await VehicleModel.find({}, {}, {limit: limit, skip : skip})
// const VehicleModels = await VehicleModel.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkVehicleModelOwnership = async (VehicleModelId) => {
	const VehicleModel = await findVehicleModel({ VehicleModelId });

	if (isEmpty(vehicleModel)) {
		return false;
	}

	return true;
};

exports.fetchAllVehicleModels = async () => {
	const vehicleModel = await VehicleModel.find({ status: 'active' }).populate();
	return vehicleModel;
};

const updateVehicleModel = async (query, VehicleModelObj) => {
	const updatedVehicleModel = await VehicleModel.updateOne(query, VehicleModelObj);
	return updatedVehicleModel;
};

exports.editVehicleModel = async (query, VehicleModelObj) => {
	await updateVehicleModel(query, VehicleModelObj);

	const vehicleModel = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return vehicleModel;
};

exports.deleteOneVehicleModel = async (id) => {
	let deletedVehicleModel = await VehicleModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedVehicleModel;
};

exports.fetchAVehicleModel = async (id) => {
	let singleVehicleModel = await VehicleModel.findById(id).populate();

	return singleVehicleModel;
};
