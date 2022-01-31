const express = require('express');


const imageRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const imageController = require('./image.controllers');
const { validateimage } = require('./image.validator');

imageRouter.post('/create', catchErrors(imageController.postCreateImage));
imageRouter.get('/get-all', catchErrors(imageController.getAllImages));
imageRouter.put('/edit/:imageId', getAuthorize, catchErrors(imageController.postEditImage));
imageRouter.delete('/remove/:id', catchErrors(imageController.postDeleteImage));
imageRouter.get('/get-one/:id', getAuthorize, catchErrors(imageController.postGetAImage));

module.exports = imageRouter;
