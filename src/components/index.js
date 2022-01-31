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

// const chatRoutes = require('./chat/chat.routes');
// const chatModel = require('./chat/chat.model');
// const chatService = require('./chat/chat.services');

// const messageRoutes = require('./message/message.routes');
// const messageModel = require('./message/message.model');
// const messageService = require('./message/message.services');

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
	// chatModule: {
	// 	routes: chatRoutes,
	// 	model: chatModel,
	// 	service: chatService
	// },

	// messageModule: {
	// 	routes: messageRoutes,
	// 	model: messageModel,
	// 	service: messageService
	// }
};

module.exports = componentModule;
