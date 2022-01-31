const { isEmpty } = require('../../library/helpers/validationHelpers');

const Condition = require('./condition.model');

const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const condition = await Condition.find(query)
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return condition[0];
	}
	return condition;
};

const saveConditionWithPayload = async (payload = {}) => {
	const condition = new Condition(payload);
	await condition.save();

	return condition;
};
exports.createCondition = async (payload) => {
	const condition = await saveConditionWithPayload(payload);
	const savedCondition = await findAndPopulate(
		{ _id: condition._id },
		null
		// "userId",
		// "name email avatar"
	);

	return savedCondition;
};

////////////////////////////////////////////////////////////////////////////

const findCondition = async (query = {}, findMode = 'one', page, size) => {
	const condition = await Condition.find(query);
	if (findMode === 'one') {
		return condition[0];
	}
	return condition;
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

// const Conditions = await Condition.find({}, {}, {limit: limit, skip : skip})
// const Conditions = await Condition.find().limit(limit).skip(skip);

///////////////////////////////////////////////////////////////

exports.checkConditionOwnership = async (ConditionId) => {
	const condition = await findCondition({ ConditionId });

	if (isEmpty(condition)) {
		return false;
	}

	return true;
};

exports.fetchAllConditions = async () => {
	const condition = await Condition.find({ status: 'active' }).populate();
	return condition;
};

const updateCondition = async (query, ConditionObj) => {
	const updatedCondition = await Condition.updateOne(query, ConditionObj);
	return updatedCondition;
};

exports.editCondition = async (query, conditionObj) => {
	await updateCondition(query, conditionObj);

	const condition = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return condition;
};

exports.deleteOneCondition = async (id) => {
	let deletedCondition = await Condition.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedCondition;
};

exports.fetchACondition = async (id) => {
	let singleCondition = await Condition.findById(id).populate();

	return singleCondition;
};
