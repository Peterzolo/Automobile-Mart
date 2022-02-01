const { check } = require('express-validator');

const message = {
	vehicle: 'Property name must be only letters with min of 3',
	address: 'brand name must be only letters with min of 3',
};

exports.validateLocation = () => {
	return [
		check('propertyName', message.propertyName).isString().isLength({ min: 3 }).trim(),
		check('address', message.address).isString().isLength({ min: 3 }).trim(),
		// check("description").isString(),
		// check("state").isString(),
		// check("priority").isString(),
	];
};
