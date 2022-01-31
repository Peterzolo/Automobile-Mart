const { isEmpty } = require('../../library/helpers/validationHelpers');

const Brand = require('./brand.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const brand = await Brand.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return brand[0];
	}
	return brand;
};

const saveBrandWithPayload = async (payload = {}) => {
	const brand = new Brand(payload);
	await brand.save();

	return brand;
};
exports.createBrand = async (payload) => {
	const brand = await saveBrandWithPayload(payload);
	const savedBrand = await findAndPopulate(
		{ _id: brand._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedBrand;
};

////////////////////////////////////////////////////////////////////////////

const findBrand = async (query = {}, findMode = 'one', page, size) => {
	const brand = await Brand.find(query);
	if (findMode === 'one') {
		return brand[0];
	}
	return brand;
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

// const Brands = await Brand.find({}, {}, {limit: limit, skip : skip})
// const Brands = await Brand.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkBrandOwnership = async (brandId) => {
	const brand = await findBrand({ brandId });

	if (isEmpty(brand)) {
		return false;
	}

	return true;
};

exports.fetchAllBrands = async () => {
	const brand = await Brand.find({ status: 'active' }).populate();
	return brand;
};

const updateBrand = async (query, brandObj) => {
	const updatedBrand = await Brand.updateOne(query, brandObj);
	return updatedBrand;
};

exports.editBrand = async (query, brandObj) => {
	await updateBrand(query, brandObj);

	const brand = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return brand;
};

exports.deleteOneBrand = async (id) => {
	let deletedBrand = await Brand.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedBrand;
};

exports.fetchABrand = async (id) => {
	let singleBrand = await Brand.findById(id).populate();

	return singleBrand;
};
