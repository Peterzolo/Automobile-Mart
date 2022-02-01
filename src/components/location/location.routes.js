const express = require('express');

const locationRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const locationController = require('./location.controllers');
const { validateLocation } = require('./location.validator');

locationRouter.post('/create', catchErrors(locationController.postCreateLocation));
locationRouter.get('/get-all', catchErrors(locationController.getAllLocations));
locationRouter.put('/edit/:locationId', catchErrors(locationController.postEditLocation));
locationRouter.delete('/remove/:id', catchErrors(locationController.postDeleteLocation));
locationRouter.get('/get-one/:id', catchErrors(locationController.postGetALocation));

module.exports = locationRouter;
