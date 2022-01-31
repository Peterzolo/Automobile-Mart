const express = require('express');

const brandRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const brandController = require('./brand.controllers');
const { validatebrand } = require('./brand.validator');

brandRouter.post('/create', catchErrors(brandController.postCreateBrand));
brandRouter.get('/get-all', catchErrors(brandController.getAllBrands));
brandRouter.put('/edit/:brandId', getAuthorize, catchErrors(brandController.postEditBrand));
brandRouter.delete('/remove/:id', getAuthorize, catchErrors(brandController.postDeleteBrand));
brandRouter.get('/get-one/:id', getAuthorize, catchErrors(brandController.postGetABrand));

module.exports = brandRouter;
