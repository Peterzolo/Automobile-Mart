const { check } = require('express-validator');
const { passwordPattern } = require('../../library/helpers/validationHelpers');

const message = {
	firstName: 'Your first name must be only letters with min of 2 and a max 20 characters',
	lastName: 'Your last name must be only letters with min of 5 and a max 20 characters',
	email: 'Please enter a valid email',
	password: 'Your password must include uppercase, numbers, letters and a minimum  of 5 characters',
	confirmPassword: 'Passwords have to match'
};

exports.validateSignUp = () => {
	return [
		check('firstName', message.firstName).isLength({ min: 2, max: 20 }).trim(),
		check('lastName', message.lastName).isLength({ min: 2, max: 20 }).trim(),
		check('email').isEmail().withMessage(message.email).trim().normalizeEmail(),
		check('password', message.password).isLength({ min: 5 }).matches(passwordPattern).trim()
	];
};

exports.validateLogin = () => {
	return [
		check('email').isEmail().withMessage(message.email).trim().normalizeEmail(),
		check('password', message.password).isLength({ min: 5 }).matches(passwordPattern).trim()
	];
};

exports.validateEdit = () => {
	return [
		check('firstName').isLength({ min: 5, max: 20 }).trim().withMessage(message.firstName),
		check('lastName').isLength({ min: 5, max: 20 }).trim().withMessage(message.firstName),
		check('email').isEmail().normalizeEmail().trim().withMessage(message.email)
	];
};
