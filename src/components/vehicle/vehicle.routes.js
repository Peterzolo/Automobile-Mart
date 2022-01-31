const express = require('express');
const vehicleRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const vehicleController = require('./vehicle.controllers');
const { validatevehicle } = require('./vehicle.validator');

vehicleRouter.post('/create', catchErrors(vehicleController.postCreateVehicle));
vehicleRouter.get('/get-all', catchErrors(vehicleController.getAllVehicles));
vehicleRouter.put('/edit/:vehicleId', getAuthorize, catchErrors(vehicleController.postEditVehicle));
vehicleRouter.delete('/remove/:id', getAuthorize, catchErrors(vehicleController.postDeleteVehicle));
vehicleRouter.get('/get-one/:id', getAuthorize, catchErrors(vehicleController.postGetAVehicle));

module.exports = vehicleRouter;
