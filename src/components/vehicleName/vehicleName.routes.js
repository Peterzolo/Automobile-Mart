const express = require('express');

const vehicleNameRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const vehicleNameController = require('./vehicleName.controllers');
const { validatevehicleName } = require('./vehicleName.validator');

vehicleNameRouter.post('/create', catchErrors(vehicleNameController.postCreateVehicleName));
vehicleNameRouter.get('/get-all', catchErrors(vehicleNameController.getAllVehicleNames));
vehicleNameRouter.put('/edit/:vehicleNameId', getAuthorize, catchErrors(vehicleNameController.postEditVehicleName));
vehicleNameRouter.delete('/remove/:id', getAuthorize, catchErrors(vehicleNameController.postDeleteVehicleName));
vehicleNameRouter.get('/get-one/:id', getAuthorize, catchErrors(vehicleNameController.postGetAVehicleName));

module.exports = vehicleNameRouter;
