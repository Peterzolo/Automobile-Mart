const userRoutes = require('./users/user.routes');
const userModel = require('./users/user.model');
const userService = require('./users/user.service');

const vehicleRoutes = require('./vehicle/vehicle.routes');
const vehicleModel = require('./vehicle/vehicle.model');
const vehicleService = require('./vehicle/vehicle.services');

const brandRoutes = require('./brand/brand.routes');
const brandModel = require('./brand/brand.model');
const brandService = require('./brand/brand.services');

const vehicleNameRoutes = require('./vehicleName/vehicleName.routes');
const vehicleNameModel = require('./vehicleName/vehicleName.model');
const vehicleNameService = require('./vehicleName/vehicleName.services');

const vehicleModelRoutes = require('./vehicleModel/vehicleModel.routes');
const vehicleModelModel = require('./vehicleModel/vehicleModel.model');
const vehicleModelService = require('./vehicleModel/vehicleModel.services');

const conditionRoutes = require('./condition/condition.routes');
const conditionModel = require('./condition/condition.model');
const conditionService = require('./condition/condition.services');

const imageRoutes = require('./image/image.routes');
const imageModel = require('./image/image.model');
const imageService = require('./image/image.services');

const locationRoutes = require('./location/location.routes');
const locationModel = require('./location/location.model');
const locationService = require('./location/location.services');

const contactRoutes = require('./contact/contact.routes');
const contactModel = require('./contact/contact.model');
const contactService = require('./contact/contact.services');

const bookingRoutes = require('./booking/booking.routes');
const bookingModel = require('./booking/booking.model');
const bookingService = require('./booking/booking.services');

const componentModule = {
	userModule: {
		routes: userRoutes,
		model: userModel,
		service: userService
	},
	vehicleModule: {
		routes: vehicleRoutes,
		model: vehicleModel,
		service: vehicleService
	},
	brandModule: {
		routes: brandRoutes,
		model: brandModel,
		service: brandService
	},
	vehicleNameModule: {
		routes: vehicleNameRoutes,
		model: vehicleNameModel,
		service: vehicleNameService
	},
	vehicleModelModule: {
		routes: vehicleModelRoutes,
		model: vehicleModelModel,
		service: vehicleModelService
	},
	conditionModule: {
		routes: conditionRoutes,
		model: conditionModel,
		service: conditionService
	},
	imageModule: {
		routes: imageRoutes,
		model: imageModel,
		service: imageService
	},

	locationModule: {
		routes: locationRoutes,
		model: locationModel,
		service: locationService
	},
	contactModule: {
		routes: contactRoutes,
		model: contactModel,
		service: contactService
	},
	bookingModule: {
		routes: bookingRoutes,
		model: bookingModel,
		service: bookingService
	}
};

module.exports = componentModule;
