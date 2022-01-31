

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

// const vehicleNameTypeRoutes = require('./vehicleNameType/vehicleNameType.routes');
// const vehicleNameTypeModel = require('./vehicleNameType/vehicleNameType.model');
// const vehicleNameTypeService = require('./vehicleNameType/vehicleNameType.services');

// const paymentRoutes = require('./payment/payment.routes');
// const paymentModel = require('./payment/payment.model');
// const paymentService = require('./payment/payment.services');

// const requestRoutes = require('./request/request.routes');
// const requestModel = require('./request/request.model');
// const requestService = require('./request/request.services');

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
	// vehicleNameTypeModule: {
	// 	routes: vehicleNameTypeRoutes,
	// 	model: vehicleNameTypeModel,
	// 	service: vehicleNameTypeService
	// },

	// paymentModule: {
	// 	routes: paymentRoutes,
	// 	model: paymentModel,
	// 	service: paymentService
	// },
	// requestModule: {
	// 	routes: requestRoutes,
	// 	model: requestModel,
	// 	service: requestService
	// },
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
