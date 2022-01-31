const express = require('express');

const conditionRouter = express.Router();

const { catchErrors } = require('../../library/helpers/errorFormatHelpers');

const { getAuthorize } = require('../../library/middlewares/authMiddleware');

const conditionController = require('./condition.controllers');
const { validateCondition } = require('./condition.validator');

conditionRouter.post('/create', catchErrors(conditionController.postCreateCondition));
conditionRouter.get('/get-all', catchErrors(conditionController.getAllConditions));
conditionRouter.put('/edit/:conditionId', getAuthorize, catchErrors(conditionController.postEditCondition));
conditionRouter.delete('/remove/:id', catchErrors(conditionController.postDeleteCondition));
conditionRouter.get('/get-one/:id', getAuthorize, catchErrors(conditionController.postGetACondition));

module.exports = conditionRouter;
