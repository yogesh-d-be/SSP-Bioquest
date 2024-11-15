const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin.controller');
const {uploads} = require('../middleware/fileUpload');
const {verifyAccessToken} = require('../middleware/auth');

adminRouter.post('/login',adminController.adminLoginController);
adminRouter.post('/refreshaccesstoken',adminController.adminRefreshAccessTokenController);
adminRouter.post('/createproduct',verifyAccessToken("admin"),uploads.fields([
    { name: 'productImage', maxCount: 1 },
   { name: 'specificationsTable', maxCount: 1 }]),adminController.createProductController);

module.exports = adminRouter;