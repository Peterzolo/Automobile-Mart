const express = require('express');
const userRouter = express.Router();
const { validateSignUp, validateLogin, validateEdit } = require('./user.validator');
const userController = require('./user.controller');

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');
const { getAuthorize } = require('../../library/middlewares/authMiddleware');

userRouter.post('/register', validateSignUp(), catchErrors(userController.postSignUp));

userRouter.post('/login', validateLogin(), catchErrors(userController.postLogin));

userRouter.get('/get-all', catchErrors(userController.getAllUsers));
userRouter.get('/get-one/:id', catchErrors(userController.postGetAUser));

userRouter.put('/edit/:userId', validateEdit(), catchErrors(userController.postEditUser));

userRouter.delete('/remove/:userId', catchErrors(userController.deleteUser));

module.exports = userRouter;
