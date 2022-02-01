const { check } = require('express-validator');

const message = {
	brandName: 'brand name must be at least 2 characters long'
};

exports.validateBrand = () => {
	return [
		check('brandName', message.brandName).isString().isLength({ min: 3 }).trim()
		// check('address', message.address).isString().isLength({ min: 3 }).trim()
		// check("description").isString(),
		// check("state").isString(),
		// check("priority").isString(),
	];
};
