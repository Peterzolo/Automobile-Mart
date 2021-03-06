const { validationResult } = require('express-validator');
// const user = require('../user/user.model')

const userService = require('./user.service');
const userError = require('./user.error');

const { sendResponse } = require('../../library/helpers/responseHelpers');
const { sentenceCase, sentenceCaseNew } = require('../../library/helpers/stringHelpers');
const logger = require('../../library/helpers/loggerHelpers');
const { isEmpty } = require('../../library/helpers/validationHelpers');

exports.postSignUp = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw userError.InvalidInput(errors.mapped());
	}

	const { firstName, lastName, email, password, confirmPassword } = req.body;

	let formattedFirstName = sentenceCase(`${firstName}`);
	let formattedLastName = sentenceCaseNew(`${lastName}`);

	const userExist = await userService.checkUserExist({ email });

	if (userExist) {
		throw userError.UserExist();
	}

	if (confirmPassword !== password) {
		throw userError.NotMatched();
	}

	const user = await userService.signUp({
		formattedFirstName,
		formattedLastName,
		email,
		password
	});

	return res.status(200).send(
		sendResponse({
			message: 'user account created successfully',
			content: user,
			success: true
		})
	);
};

exports.postLogin = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw userError.InvalidInput(errors.mapped());
	}

	const { email, password } = req.body;
	const user = await userService.authenticate(email.toLowerCase(), password);

	return res.status(200).send(
		sendResponse({
			message: 'user successfully logged in',
			content: user,
			success: true
		})
	);
};

exports.getAllUsers = async (req, res) => {
	const user = await userService.findAllUsers();

	if (!user) {
		logger.warn('No user found.');
		return userError.UserNotFound();
	}

	return res.status(200).send(
		sendResponse({
			message: 'Current user successfully loaded',
			content: user,
			success: true
		})
	);
};

exports.postEditUser = async (req, res) => {
	let { userId } = req.params;
	let updateData = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw userError.InvalidInput(errors.mapped());
	}

	if (isEmpty(userId)) {
		throw userError.UserNotFound('Please specify a user to edit');
	}

	const userExist = await userService.checkUserExist({ _id: userId });

	if (!userExist) {
		throw userError.UserNotFound();
	}

	const query = { _id: userId };
	const update = { $set: updateData };
	let editedUser = await userService.editUser(query, update);

	return res.status(200).send(
		sendResponse({
			message: 'user updated',
			content: editedUser,
			success: true
		})
	);
};

exports.deleteUser = async (req, res) => {
	let { userId } = req.params;

	if (isEmpty(userId)) {
		throw userError.UserNotFound('Please specify a user to delete');
	}

	const userExist = await userService.checkUserExist({ _id: userId });

	if (!userExist) {
		throw userError.UserNotFound();
	}

	const query = { _id: userId };
	const isDeleted = await userService.deleteUser(query);

	if (!isDeleted) {
		throw userError.ActionFailed('Unable to delete user');
	}

	const allUsers = await userService.findAllUsers();

	return res.status(200).send(
		sendResponse({
			message: 'user deleted',
			content: allUsers,
			success: true
		})
	);
};

exports.postGetAUser = async (req, res) => {
	try {
		let userId = req.params.id;

		if (isEmpty(userId)) {
			throw userError.UserNotFound('Please specify a user to delete');
		}
		const user = await userService.fetchAUser(userId);

		if (!user) {
			throw userError.ActionFailed('Something went wrong');
		} else {
			res.status(201).send({ Success: user });
		}
	} catch (error) {
		res.status(500).send({ error, message: 'Error finding user' });
	}
};
