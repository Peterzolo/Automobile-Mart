

const userRoutes = require('./users/user.routes');
const userModel = require('./users/user.model');
const userService = require('./users/user.service');

// const tenantRoutes = require('./tenant/tenant.routes');
// const tenantModel = require('./tenant/tenant.model');
// const tenantService = require('./tenant/tenant.service');

// const propertyRoutes = require('./property/property.routes');
// const propertyModel = require('./property/property.model');
// const propertyService = require('./property/property.services');

// const flatRoutes = require('./flat/flat.routes');
// const flatModel = require('./flat/flat.model');
// const flatService = require('./flat/flat.services');

// const flatTypeRoutes = require('./flatType/flatType.routes');
// const flatTypeModel = require('./flatType/flatType.model');
// const flatTypeService = require('./flatType/flatType.services');

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
	}

	// tenantModule: {
	// 	routes: tenantRoutes,
	// 	model: tenantModel,
	// 	service: tenantService
	// },
	// propertyModule: {
	// 	routes: propertyRoutes,
	// 	model: propertyModel,
	// 	service: propertyService
	// },
	// flatModule: {
	// 	routes: flatRoutes,
	// 	model: flatModel,
	// 	service: flatService
	// },
	// flatTypeModule: {
	// 	routes: flatTypeRoutes,
	// 	model: flatTypeModel,
	// 	service: flatTypeService
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
