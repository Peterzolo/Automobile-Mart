const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
const handler = require('./library/helpers/errorHandlers');
const config = require('./config');
const {
	userModule, vehicleModule, brandModule, vehicleNameModule,
	
} = require('./components');

const app = express();

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '2mb',
		extended: true
	})
);
app.use(cookieParser());
app.use(helmet());
app.set('trust proxy', 1);

// app.use(`/${config.api.prefix}/users`, userModule.routes);
// app.use(`${config.api.prefix}/todos`, todoModule.routes);

app.use(`/api/users`, userModule.routes);
app.use(`/api/vehicle`, vehicleModule.routes);
app.use(`/api/brand`, brandModule.routes);
app.use(`/api/vehicleName`, vehicleNameModule.routes);
// app.use(`/api/flat-type`, flatTypeModule.routes);
// app.use(`/api/payment`, paymentModule.routes);
// app.use(`/api/request`, requestModule.routes);
// app.use(`/api/chat`, chatModule.routes);
// app.use(`/api/message`, messageModule.routes);

handler.handleErrors(app);

module.exports = app;
