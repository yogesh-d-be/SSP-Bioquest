const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');


userRouter.post('/createContactUs',userController.userContactUsController);

module.exports = userRouter;