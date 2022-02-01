const express = require('express');
const vehicleModelRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const vehicleModelController = require('./vehicleModel.controllers');
const { validatevehicleModel } = require('./vehicleModel.validator');

vehicleModelRouter.post('/create',getAuthorize, catchErrors(vehicleModelController.postCreateVehicleModel));
vehicleModelRouter.get('/get-all', catchErrors(vehicleModelController.getAllVehicleModels));
vehicleModelRouter.put('/edit/:vehicleModelId',getAuthorize, getAuthorize, catchErrors(vehicleModelController.postEditVehicleModel));
vehicleModelRouter.delete('/remove/:id',getAuthorize, catchErrors(vehicleModelController.postDeleteVehicleModel));
vehicleModelRouter.get('/get-one/:id', catchErrors(vehicleModelController.postGetAVehicleModel));

module.exports = vehicleModelRouter;
