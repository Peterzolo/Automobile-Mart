const { check } = require('express-validator');

const message = {
	vehicleName: 'Vehicle name must be at least 2 characters long'
};

exports.validateVehicleModel = () => {
	return [
		check('vehicleName', message.vehicleName).isString().isLength({ min: 2 }).trim()
		// check('address', message.address).isString().isLength({ min: 3 }).trim()
		// check("description").isString(),
		// check("state").isString(),
		// check("priority").isString(),
	];
};
