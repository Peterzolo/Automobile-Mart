const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const User = require('./user.model');
const userError = require('./user.error');

const config = require('../../config');

const logger = require('../../library/helpers/loggerHelpers');
const jwtHelpers = require('../../library/helpers/jwtHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

//Checking for the User existence in the database
exports.checkUserExist = async (query) => {
	const user = await findUser({ ...query });

	if (!user) {
		return false;
	}

	return true;
};

//Formatted items to be sent to the database
exports.signUp = async ({ formattedFirstName, formattedLastName, email, password }) => {
	let avatar = await gravatar.url(email, {
		s: '200', // Size
		r: 'pg', // Rating
		d: 'mm' // Default
	});

	//Encrypt the password here:

	// const hashedPassword = bcrypt.genSalt()

	// Save the User
	let userObj = {
		firstName: formattedFirstName,
		lastName: formattedLastName,
		email,
		avatar: avatar,
		status: 'active',
		password
	};

	const user = new User(userObj);
	await user.save();

	let token = jwtHelpers.encode({ email });

	logger.info(`Auth token created: ${token}`);

	return {
		token: `${config.tokenType} ${token}`,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		avatar: user.avatar,
		enable: user.status
	};
};

exports.authenticate = async (email, password) => {
	const user = await User.findOne({ email }).populate();

	if (!user) {
		logger.warn('Authentication failed. Wrong credential.');
		throw userError.WrongCredential();
	}
	if (!user.status) {
		logger.warn('User account not activated');
		throw userError.Unactivated();
	}
	const isValidPassword = await bcrypt.compareSync(password, user.password);
	if (!isValidPassword) {
		logger.warn('Authentication failed. Wrong credential.');
		throw userError.WrongCredential();
	}

	let token = jwtHelpers.encode({ email });
	logger.info(`Auth token created: ${token}`);

	return {
		token: `${config.tokenType} ${token}`,
		user: {
			firstName: user.firstName,
			lastName: user.lastName,
			avatar: user.avatar,
			status: user.status,
			email: user.email
		}
	};
};

exports.findAllUsers = async () => {
	const users = await User.find({ status: 'active' }).populate().select('-password');
	return users;
};

const updateUser = async (query, userObj) => {
	const updatedUser = await User.updateOne(query, userObj);
	return updatedUser;
};

exports.editUser = async (query, userObj) => {
	await updateUser(query, userObj);

	const User = await findAndPopulate(
		{
			...query
		},
		null,
		'userId',
		'name email avatar'
	);

	return User;
};

exports.deleteUser = async (query) => {
	const res = await deleteOneUser(query);

	if (res.deletedCount === 0) {
		return false;
	}
	return true;
};

exports.findUserByEmail = async (email) => {
	const user = await findUser({ email });

	if (!user) {
		logger.warn('Authentication failed. User not found.');
		throw userError.UserNotFound('Authentication failed. User not found.');
	}

	return user;
};

const findUser = async (query = {}, selectQuery = '', findMode = 'one') => {
	const user = await User.find(query).select(selectQuery).exec();
	if (findMode === 'one') {
		return user[0];
	}
	return user;
};

//This is the collecting process. Fetching from the database.
const findAndPopulate = async (
	query = {},
	selectQuery = {},
	path = '',
	pathQuery = '',
	findMode = 'one',
	sortQuery = { _id: -1 }
) => {
	const user = await User.find(query)
		.select('-password')
		.select(selectQuery)
		.populate({
			path: path,
			select: pathQuery
		})
		.sort(sortQuery);

	if (findMode === 'one') {
		return user[0];
	}
	return user;
};

// const updateUser = async (query, UserObj) => {
// 	await User.updateOne(query, UserObj);
// 	return true;
// };

const deleteOneUser = async (query) => {
	const delUser = await User.deleteOne(query);
	return delUser;
};

//////////////////////////////////////////////////////////////////////////////////
exports.deleteUser = async (id) => {
	let deletedUser = await User.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });

	return deletedUser;
};

/////////////////////////////////////////////////////////////////////////////////

exports.fetchAUser = async (id) => {
	let singleUser = await User.findById(id).populate().select('-password');

	return singleUser;
};
