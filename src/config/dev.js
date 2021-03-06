const dotenv = require('dotenv');

const envFound = dotenv.config({ path: '.env' });
if (!envFound) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
	appName: 'automobile-mart',
	port: 5000,
	dbURI: process.env.MONGO_DEV_URI,
	// dbURI: 'mongodb://localhost:27017/property-management-app',
	// jwtSecret: '3p48-94i1u08qfhdj489135u0t9324i=2r02jf449u130',
	jwtSecret: process.env.JWT_DEV_SECRET,
	tokenType: 'Bearer',
	logs: {
		level: process.env.LOG_LEVEL || 'silly'
	},
	api: {
		prefix: process.env.API_PREFIX
	}
};
