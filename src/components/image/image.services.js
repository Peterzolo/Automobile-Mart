const { isEmpty } = require('../../library/helpers/validationHelpers');

const Image = require('./image.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const image = await Image.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return image[0];
	}
	return image;
};

const saveImageWithPayload = async (payload = {}) => {
	const image = new Image(payload);
	await image.save();

	return image;
};
exports.createImage = async (payload) => {
	const image = await saveImageWithPayload(payload);
	const savedImage = await findAndPopulate(
		{ _id: Image._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedImage;
};

////////////////////////////////////////////////////////////////////////////

const findImage = async (query = {}, findMode = 'one', page, size) => {
	const image = await Image.find(query);
	if (findMode === 'one') {
		return image[0];
	}
	return image;
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

// const Images = await Image.find({}, {}, {limit: limit, skip : skip})
// const Images = await Image.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkImageOwnership = async (imageId) => {
	const image = await findImage({ imageId });

	if (isEmpty(image)) {
		return false;
	}

	return true;
};

exports.fetchAllImages = async () => {
	const image = await Image.find({ status: 'active' }).populate();
	return image;
};

const updateImage = async (query, ImageObj) => {
	const updatedImage = await Image.updateOne(query, ImageObj);
	return updatedImage;
};

exports.editImage = async (query, ImageObj) => {
	await updateImage(query, ImageObj);

	const image = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return image;
};

exports.deleteOneImage = async (id) => {
	let deletedImage = await Image.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedImage;
};

exports.fetchAImage = async (id) => {
	let singleImage = await Image.findById(id).populate();

	return singleImage;
};
