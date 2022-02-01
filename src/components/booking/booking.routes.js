const express = require('express');

const bookingRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const bookingController = require('./booking.controllers');
const { validatebooking } = require('./booking.validator');

bookingRouter.post('/create', catchErrors(bookingController.postCreateBooking));
bookingRouter.get('/get-all', catchErrors(bookingController.getAllBookings));
bookingRouter.put('/edit/:bookingId', catchErrors(bookingController.postEditBooking));
bookingRouter.delete('/remove/:id', catchErrors(bookingController.postDeleteBooking));
bookingRouter.get('/get-one/:id', catchErrors(bookingController.postGetABooking));

module.exports = bookingRouter;
