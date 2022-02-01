const express = require('express');

const contactRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const contactController = require('./contact.controllers');
const { validatecontact } = require('./contact.validator');

contactRouter.post('/create', catchErrors(contactController.postCreateContact));
contactRouter.get('/get-all', catchErrors(contactController.getAllContacts));
contactRouter.put('/edit/:contactId', catchErrors(contactController.postEditContact));
contactRouter.delete('/remove/:id', catchErrors(contactController.postDeleteContact));
contactRouter.get('/get-one/:id', catchErrors(contactController.postGetAContact));

module.exports = contactRouter;
